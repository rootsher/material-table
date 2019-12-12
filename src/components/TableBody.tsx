import React, { FC, useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import isEmpty from "lodash/isEmpty";

import { makeStyles } from "@material-ui/core/styles";
import MuiCheckbox from "@material-ui/core/Checkbox";
import MuiTableBody from "@material-ui/core/TableBody";
import MuiTableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";

import interval from "utils/hooks/useInterval";

import { TableCell } from "./TableCell";

import {
  DataFetcher,
  Query,
  TableActions,
  TableColumn,
  TableOptions,
  TableRow
} from "../types";

const useStyles = makeStyles({
  cell: {
    padding: "0.25rem 0.5rem"
  },
  infoCell: {
    padding: "1rem",
    textAlign: "center"
  },
  error: {
    color: "red"
  }
});

export const TableBody: FC<{
  options: TableOptions;
  columns: TableColumn[];
  dataFetcher: DataFetcher;
  query: Query;
  setQuery: (query: Query) => void;
  error: boolean;
  setError: (loaded: boolean) => void;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
  setTotalRowsCount: (count: number) => void;
}> = ({
  options = {},
  columns,
  dataFetcher,
  query,
  setQuery,
  error,
  setError,
  loaded,
  setLoaded,
  setTotalRowsCount
}) => {
  const classes = useStyles();
  const [rows, setRows] = useState<TableRow[]>([]);

  const fetchData = useCallback(() => {
    (async () => {
      const [error, response] = await dataFetcher(query)
        .then(response => [null, response])
        .catch(error => [error]);

      if (error) {
        setError(error);
        setLoaded(true);

        return;
      }

      // if you are on a page that isn't there..
      if (
        response.count <= query.rowsPerPage * query.page &&
        query.page !== 0
      ) {
        setQuery({
          ...query,
          // ..move it to the available one closest to where you were:
          page: Math.max(0, Math.ceil(response.count / query.rowsPerPage) - 1)
        });
      } else {
        setError(false);
        setRows(response.list);
        setTotalRowsCount(response.count);
        setLoaded(true);
      }
    })();
  }, [dataFetcher, query, setQuery, setError, setLoaded, setTotalRowsCount]);

  const refresh = () => fetchData();
  const actions: TableActions = {
    refresh
  };

  useEffect(() => {
    setLoaded(false);

    fetchData();
  }, [setLoaded, fetchData, query]);

  if (options.refresh) {
    // intentionally react parser was cheated here - hidden conditional hook:
    interval(refresh, options.refresh);
  }

  return (
    <MuiTableBody>
      {error ? (
        <MuiTableRow>
          <MuiTableCell
            className={classnames(classes.infoCell, classes.error)}
            colSpan={columns.length + 1}
          >
            {JSON.stringify(error)}
          </MuiTableCell>
        </MuiTableRow>
      ) : isEmpty(rows) && loaded ? (
        <MuiTableRow>
          <MuiTableCell
            className={classes.infoCell}
            colSpan={columns.length + 1}
          >
            No results for the given query...
          </MuiTableCell>
        </MuiTableRow>
      ) : (
        rows.map((row, index) => (
          <MuiTableRow key={index}>
            <MuiTableCell className={classes.cell}>
              <MuiCheckbox />
            </MuiTableCell>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                column={column}
                row={row}
                actions={actions}
              />
            ))}
          </MuiTableRow>
        ))
      )}
    </MuiTableBody>
  );
};
