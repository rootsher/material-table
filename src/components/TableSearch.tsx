import React, { FC } from "react";

import { makeStyles } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import MuiIconButton from "@material-ui/core/IconButton";

import IconSearch from "@material-ui/icons/Search";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    marginRight: "0.5rem"
  },
  input: {
    padding: "0.5rem 0.25rem"
  }
});

export const TableSearch: FC<{ onChange: (value: string) => void }> = ({
  onChange
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiTextField
        inputProps={{ className: classes.input }}
        onChange={event => onChange(event.target.value)}
        placeholder="Search..."
      />
      <MuiIconButton>
        <IconSearch />
      </MuiIconButton>
    </div>
  );
};
