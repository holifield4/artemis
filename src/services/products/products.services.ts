import http from "../service-provider.service";

export class ProductServices {
  static async getAllProducts() {
    try {
      const url = "products";

      const response: Promise<Response> = http.get(url);
      return await response;

    } catch (error) {
      return error;
    }
  }

  static async getSingleProduct(param: number) {
    try {
      const url: string = "products/"+param;

      const response: Promise<Response> = http.get(url);
      return await response;

    } catch (error) {
      return error;
    }
  }
}
