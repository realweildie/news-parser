export enum sortType {
  NEWEST = "newest",
  OLDEST = "oldest",
  RELEVANCE = "relevance",
}

export enum statusType {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
  INIT = "",
}

export interface SearchSchema {
  searchVal: string;
  itemsQuantity: number;
  sort: sortType;
  status: statusType;
  currentPage: number;
}

export interface fetchNewsType extends SearchSchema {
  needToClear?: boolean;
}
