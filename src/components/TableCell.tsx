import React, { FC, Fragment, useState } from "react";
import classnames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import MuiTableCell from "@material-ui/core/TableCell";
import MuiTextField from "@material-ui/core/TextField";

import IconEdit from "@material-ui/icons/Edit";
import IconClose from "@material-ui/icons/Close";

import { TableActions, TableColumn, TableRow } from "../types";

const useStyles = makeStyles({
  cell: {
    padding: "0.25rem 0.5rem",
    whiteSpace: "nowrap"
  },
  cellContent: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    fontSize: "0.875rem"
  },
  icon: {
    cursor: "pointer",
    marginLeft: "0.5rem"
  }
});

export const TableCell: FC<{
  column: TableColumn;
  row: TableRow;
  actions: TableActions;
}> = ({ column, row, actions }) => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <MuiTableCell className={classnames(classes.cell, column.cellClassName)}>
      <div className={classes.cellContent}>
        {editMode ? (
          <Fragment>
            <MuiTextField
              autoFocus
              inputProps={{
                className: classes.input
              }}
              defaultValue={row[column.field]}
              onKeyUp={({ key }) => key === "Enter" && setEditMode(false)}
            />
            <IconClose
              fontSize="small"
              className={classes.icon}
              color="primary"
              onClick={() => setEditMode(false)}
            />
          </Fragment>
        ) : (
          <Fragment>
            {column.render ? column.render(row, actions) : row[column.field]}
            {column.editable && (
              <IconEdit
                fontSize="small"
                className={classes.icon}
                color="primary"
                onClick={() => setEditMode(true)}
              />
            )}
          </Fragment>
        )}
      </div>
    </MuiTableCell>
  );
};
