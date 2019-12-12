import React, { MouseEvent } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import IconFirstPage from "@material-ui/icons/FirstPage";
import IconKeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconKeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconLastPage from "@material-ui/icons/LastPage";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexShrink: 0
    }
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export const TablePagination = (props: TablePaginationActionsProps) => {
  const { count, page, rowsPerPage, onChangePage } = props;
  const classes = useStyles();

  const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        <IconFirstPage />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        <IconKeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <IconKeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <IconLastPage />
      </IconButton>
    </div>
  );
};
