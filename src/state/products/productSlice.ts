import { ProductServices } from "@/services/products/products.services";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ProductSliceState {
  products: ProductState[];
  singleProduct: ProductState | null;
  isLoading: boolean;
}

export interface ProductState {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating?: Rating;
}

enum Category {
  Electronics = "electronics",
  Jewelery = "jewelery",
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

interface Rating {
  rate: number;
  count: number;
}

const initialState: ProductSliceState = {
  products: [],
  singleProduct: null,
  isLoading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    editProductField: (state, action: PayloadAction<{ key: keyof ProductState; value: ProductState[keyof ProductState] }>) => {
      if(state.singleProduct){
        (state.singleProduct[action.payload.key] as typeof action.payload.value) = action.payload.value;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProductsAsync.fulfilled,
        (state, action: PayloadAction<ProductState[]>) => {
          state.products = action.payload.map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ rating, ...product }) => product
          );
          state.isLoading = false;
        }
      );

    builder
      .addCase(getSingleProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getSingleProductAsync.fulfilled,
        (state, action: PayloadAction<ProductState>) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { rating, ...product } = action.payload;
          state.singleProduct = product;
          state.isLoading = false;
        }
      );

    builder
      .addCase(deleteSelectedProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteSelectedProductAsync.fulfilled,
        (state, action: PayloadAction<ProductState[]>) => {
          state.products = action.payload;
          state.isLoading = false;
        }
      );

    builder
      .addCase(editSelectedProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        editSelectedProductAsync.fulfilled,
        (state, action: PayloadAction<ProductState[]>) => {
          state.products = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const { editProductField } = productSlice.actions;

export const getProductsAsync = createAsyncThunk(
  "products/getProductsAsync",
  async () => {
    const response: ProductState[] =
      (await ProductServices.getAllProducts()) as ProductState[];

    return response;
  }
);
export const getSingleProductAsync = createAsyncThunk(
  "products/getSingleProductAsync",
  async (param: number) => {
    const response: ProductState = (await ProductServices.getSingleProduct(
      param
    )) as ProductState;

    return response;
  }
);
export const deleteSelectedProductAsync = createAsyncThunk(
  "products/deleteSelectedProductAsync",
  async (param: number, { getState }) => {
    //simulate delete product
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const state = getState() as RootState;

    const filteredProducts: ProductState[] = state.product.products.filter(
      (item) => item.id !== param
    );

    return filteredProducts;
  }
);
export const editSelectedProductAsync = createAsyncThunk(
  "products/editSelectedProductAsync",
  async (param: ProductState | null, { getState }) => {
    //simulate update product
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const state = getState() as RootState;

    const updatedProducts = state.product.products.map((product) =>
      product.id === param?.id ? { ...product, ...param } : product
    );
    return updatedProducts;
  }
);

export default productSlice.reducer;
