import { SearchSchema } from "@/store/searchSlice/types";
import axios from "axios";

export const apiLink = "https://content.guardianapis.com/";
export const apiToken = "dfc11983-8edb-43df-8c5f-54dd885423b1";

axios.defaults.baseURL = apiLink;

export default class PostService {
  static async getNewsByTitle(params: SearchSchema) {
    const response = await axios.get("search", {
      params: {
        "api-key": apiToken,
        q: params.searchVal,
        "order-by": params.sort,
        "page-size": params.itemsQuantity,
        "show-fields": "thumbnail",
        page: params.currentPage,
      },
    });
    return response;
  }
}
