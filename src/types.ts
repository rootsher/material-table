import { CSSProperties, ReactElement } from "react";

export type TableProps = {
  title: string;
  options: TableOptions;
  columns: TableColumn[];
  dataFetcher: DataFetcher;
};

export type TableOptions = {
  search?: boolean;
  pagination?: boolean;
  refresh?: number;
  rowsPerPageOptions?: number[];
  sortingMode?: "single" | "multiple";
};

export type TableActions = {
  refresh: () => void;
};

export type QueryResult<T> = { count: number; list: T[] };
export type DataFetcher = (query: Query) => Promise<QueryResult<any>>;

export type TableRow = { [key: string]: any };
export type TableColumn = {
  field: string;
  title: string;
  render?: (row: TableRow, actions: TableActions) => ReactElement;
  editable?: boolean;
  headerClassName?: string;
  cellClassName?: string;
  order?: OrderDirection;
  sorting?: boolean;
};

export type Query = {
  search: string;
  page: number;
  rowsPerPage: number;
  order: {
    [key: string]: OrderDirection;
  };
};

export type OrderDirection = "asc" | "desc" | null;
