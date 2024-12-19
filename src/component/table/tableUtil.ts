import {
  deleteSelectedProductAsync,
  getSingleProductAsync,
  editSelectedProductAsync,
  ProductState,
} from "@/state/products/productSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonCheckBoxOptions, ButtonOptions } from "../button/Button";

/**
 *
 * Table Utilities
 */
export const useTableUtil = (tableData: ProductState[]) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [pageList, setPageList] = useState<ButtonOptions[]>([]);
  const [searchData, setSearchData] = useState<string>("");
  const [sortKey, setSortKey] =
    useState<keyof Omit<ProductState, "rating">>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const sortingOptions: ButtonOptions[] = Object.keys(tableData?.[0] || {}).map(
    (key) => ({
      name: key,
      value: key.charAt(0) + key.slice(1),
    })
  );

  const viewOptions: ButtonCheckBoxOptions[] = Object.keys(
    tableData?.[0] || {}
  ).map((key) => ({
    name: key,
    value: key.charAt(0) + key.slice(1),
  }));

  const [visibleColumn, setVisibleColumn] = useState<string[]>([]);
  
  useEffect(() => {
    if (tableData.length > 0) {
      const columnKeys = Object.keys(tableData[0]);
      setVisibleColumn(columnKeys); 
    }
  }, [tableData]);

  const handleSelectedView = (selectedView: string[]) => {
    setVisibleColumn(selectedView);
  };

  useEffect(() => {
    const newPageList: ButtonOptions[] = Array.from(
      { length: totalPages },
      (_, index) => ({
        name: `${index + 1}`,
        value: index + 1,
      })
    );
    setPageList(newPageList);
  }, [totalPages]);

  const handlePageChange = (page: number) => {
    console.log(page);
    setCurrentPage(page);
  };

  const handleRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const filteredData = tableData.filter((item) => {
    return Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchData.toLowerCase())
    );
  });

  const sortData = (
    key: keyof Omit<ProductState, "rating">,
    order: "asc" | "desc"
  ) => {
    return filteredData.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      if (valueA < valueB) {
        return order === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedData = sortData(sortKey, sortOrder);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSort = (key: keyof Omit<ProductState, "rating">) => {
    setSortKey(key);
  };

  return {
    handlePageChange,
    rowsPerPage,
    setRowsPerPage,
    handleRowsPerPage,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    pageList,
    searchData,
    setSearchData,
    sortingOptions,
    paginatedData,
    toggleSortOrder,
    handleSort,
    viewOptions,
    visibleColumn,
    handleSelectedView,
  };
};

/**
 *
 * Options related
 */
export const tableOptionsUtil = () => {
  /**
   * options button
   */
  const [isOptionsClicked, setIsOptionsClicked] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleOptionsClick = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setPosition({ x: clientX, y: clientY });
    setIsOptionsClicked(true);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (optionsRef.current && !optionsRef.current.contains(e.target as Node)) {
      setIsOptionsClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /**
   * Detail container
   */
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  /**
   * Edit Transaction container
   */
  const [isEditTransaction, setIsEditTransaction] = useState<boolean>(false);

  /**
   *
   * Handle button clicking
   */
  const handleButtonOptions = (
    actionType: "detail" | "edit" | "both",
    option: boolean
  ) => {
    if (actionType === "detail") {
      setIsDetailOpen(option);
      setIsEditTransaction(false);
    } else if (actionType === "edit") {
      setIsEditTransaction(option);
      setIsDetailOpen(false);
    } else if (actionType === "both") {
      setIsEditTransaction(option);
      setIsDetailOpen(option);
    }

    setIsOptionsClicked(false);
  };

  return {
    isOptionsClicked,
    position,
    handleOptionsClick,
    optionsRef,
    isDetailOpen,
    handleButtonOptions,
    isEditTransaction,
  };
};

/**
 *
 * Row related
 */
export const tableRowUtil = () => {
  const [selectedRow, setSelectedRow] = useState<ProductState>(
    {} as ProductState
  );
  const rowData = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectedRow = (row: ProductState) => {
    setSelectedRow(row);
  };

  const handleActions = (actions: "detail" | "delete" | "edit") => {
    switch (actions) {
      case "detail": {
        dispatch(getSingleProductAsync(selectedRow.id));
        break;
      }
      case "delete": {
        dispatch(deleteSelectedProductAsync(selectedRow.id));
        break;
      }
      case "edit": {
        dispatch(editSelectedProductAsync(rowData.singleProduct));
        break;
      }
      default:
        return null;
    }
  };

  return {
    setSelectedRow,
    handleSelectedRow,
    rowData,
    selectedRow,
    dispatch,
    handleActions,
  };
};
