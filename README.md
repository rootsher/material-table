# [@rootsher/material-table](https://github.com/rootsher/material-table)

[![npm version](https://img.shields.io/npm/v/@rootsher/material-table.svg)](https://www.npmjs.com/package/@rootsher/material-table)
[![npm downloads](https://img.shields.io/npm/dm/@rootsher/material-table.svg)](https://www.npmjs.com/package/@rootsher/material-table)
[![GitHub issues](https://img.shields.io/github/issues/rootsher/material-table.svg)](https://github.com/rootsher/material-table/issues)
[![GitHub PRs](https://img.shields.io/github/issues-pr/rootsher/material-table.svg)](https://github.com/rootsher/material-table/pulls)
[![MIT license](https://img.shields.io/npm/l/@rootsher/material-table.svg)](https://opensource.org/licenses/MIT)

## motivation

TBA

## installation

```sh
yarn add @rootsher/material-table
```

## demo

TBA

## full working example

```ts
import { Table, Query, TableActions } from '@rootsher/material-table';

export default () => (
    <Table
        title="Simple list"
        dataFetcher={(query: Query) => productService.list({ query })} // (query: Query) => Promise<Row[]>
        options={{
            search: true, // enable search field
            pagination: true, // enable pagination
            refresh: 5000, // hidden data refreshing
            sortingMode: "multiple", // "single" | "multiple"
            rowsPerPageOptions: [5, 25, 50] // default [5, 10, 15]
        }}
        columns={[
            {
                field: "id",
                title: "ID",
                order: "desc" // default sort in descending order
            },
            {
                field: "createdAt",
                title: "created at",
                sorting: false // disable sorting this column
            },
            {
                field: "name",
                title: "name",
                editable: true, // allow edit this field directly in the table
                headerClassName: "py-2 px-1", // add own CSS classes to the header cell
                cellClassName: "py-2 px-1", // add own CSS classes to the cell,
                render: (row: Row, actions: TableActions) => (
                    <div onClick={actions.refresh}>
                        {row.name.toUpperCase()}
                    </div>
                )
            }
        ]}
    />
);
```

## types

```ts
import { ReactElement } from "react";

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
```

## TODO

### more important for now

1. make package installable on the NPM
2. add code formatter (like prettier)
3. add eslint
4. create demo screenshots (e.g. gif)
5. create github page with live example

### development

TBA
