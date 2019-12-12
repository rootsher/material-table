import React, { useEffect, useState, Fragment } from "react";
import classnames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import MuiTableCell from "@material-ui/core/TableCell";

import IconArrowDownward from "@material-ui/icons/ArrowDownward";

import { TableColumn, OrderDirection } from "../types";

const useStyles = makeStyles({
  cell: {
    padding: "0.25rem 0.5rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "&:hover": {
      color: "black"
    },
    "&:hover $icon": {
      opacity: 1
    }
  },
  title: {
    marginRight: "0.2rem"
  },
  icon: {
    opacity: 0,
    transition:
      "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&.asc": {
      transform: "rotate(180deg)"
    }
  },
  visible: { opacity: 1 }
});

export const TableHeaderCell = ({
  order: defaultOrder,
  column,
  onOrderChange
}: {
  order: OrderDirection;
  column: TableColumn;
  onOrderChange: (field: string, order: OrderDirection) => void;
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState<OrderDirection>(defaultOrder);

  useEffect(() => setOrder(defaultOrder), [defaultOrder]);

  function changeOrder() {
    let direction: OrderDirection = null;

    if (!order) {
      direction = "asc";
    } else if (order === "asc") {
      direction = "desc";
    } else if (order === "desc") {
      direction = null;
    }

    setOrder(direction);
    onOrderChange(column.field, direction);
  }

  return (
    <MuiTableCell
      className={classnames(classes.cell, column.headerClassName)}
      onClick={changeOrder}
    >
      <span className={classes.title}>{column.title}</span>
      {column.sorting && (
        <Fragment>
          {order ? (
            <IconArrowDownward
              fontSize="small"
              className={classnames(order, classes.icon, classes.visible)}
            />
          ) : (
            <IconArrowDownward fontSize="small" className={classes.icon} />
          )}
        </Fragment>
      )}
    </MuiTableCell>
  );
};
