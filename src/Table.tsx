import React, { FC, useState, MouseEvent } from "react";
import debounce from "lodash/debounce";

import { makeStyles } from "@material-ui/core/styles";
import MuiCheckbox from "@material-ui/core/Checkbox";
import MuiCircularProgress from "@material-ui/core/CircularProgress";
import MuiPaper from "@material-ui/core/Paper";
import MuiTable from "@material-ui/core/Table";
import MuiTableCell from "@material-ui/core/TableCell";
import MuiTableHead from "@material-ui/core/TableHead";
import MuiTablePagination from "@material-ui/core/TablePagination";
import MuiTableRow from "@material-ui/core/TableRow";

import { TableSearch } from "./components/TableSearch";
import { TableHeaderCell } from "./components/TableHeaderCell";
import { TableBody } from "./components/TableBody";
import { TablePagination } from "./components/TablePagination";

import { TableProps, Query } from "./types";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    padding: "1rem",
    margin: "0.25rem 0.5rem",
    fontSize: "1.25rem",
    fontWeight: 500
  },
  tableContainer: {
    position: "relative"
  },
  cell: {
    padding: "0.25rem 0.5rem"
  },
  loader: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export const Table: FC<TableProps> = ({
  title,
  options,
  columns,
  dataFetcher
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState<Query>({
    search: "",
    page: 0,
    rowsPerPage: 5,
    order: columns.reduce(
      (order, { field, order: fieldOrder }) => ({
        ...order,
        [field]: fieldOrder
      }),
      {}
    )
  });
  const [error, setError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [totalRowsCount, setTotalRowsCount] = useState<number>(0);
  const rowsPerPageOptions = options.rowsPerPageOptions || [5, 10, 15];
  const sortingMode = options.sortingMode || "single";
  const onChange = debounce(
    (value: string) => setQuery({ ...query, search: value }),
    200
  );

  return (
    <MuiPaper>
      <div className={classes.header}>
        <h1 className={classes.title}>{title}</h1>
        {options.search && <TableSearch onChange={onChange} />}
      </div>
      <div className={classes.tableContainer}>
        <MuiTable>
          <MuiTableHead>
            <MuiTableRow>
              <MuiTableCell className={classes.cell}>
                <MuiCheckbox />
              </MuiTableCell>
              {columns.map((column, index) => (
                <TableHeaderCell
                  key={index}
                  order={query.order[column.field]}
                  column={{
                    sorting: true,
                    ...column
                  }}
                  onOrderChange={(field, order) => {
                    setQuery({
                      ...query,
                      order:
                        sortingMode === "single"
                          ? { [field]: order }
                          : { ...query.order, [field]: order }
                    });
                  }}
                />
              ))}
            </MuiTableRow>
          </MuiTableHead>
          <TableBody
            options={options}
            columns={columns}
            dataFetcher={dataFetcher}
            query={query}
            setQuery={setQuery}
            error={error}
            setError={setError}
            loaded={loaded}
            setLoaded={setLoaded}
            setTotalRowsCount={setTotalRowsCount}
          />
        </MuiTable>
        {!loaded && (
          <div className={classes.loader}>
            <MuiCircularProgress size={32} />
          </div>
        )}
      </div>
      {options.pagination && !!totalRowsCount && !error && (
        <MuiTablePagination
          page={query.page}
          rowsPerPage={query.rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          count={totalRowsCount}
          ActionsComponent={TablePagination}
          component="div"
          onChangePage={(
            _event: MouseEvent<HTMLButtonElement> | null,
            page: number
          ) => setQuery({ ...query, page })}
          onChangeRowsPerPage={event =>
            setQuery({
              ...query,
              rowsPerPage: Number(event.target.value),
              page: Math.min(
                0,
                Math.ceil(totalRowsCount / Number(event.target.value)) - 1
              )
            })
          }
        />
      )}
    </MuiPaper>
  );
};
