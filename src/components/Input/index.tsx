import React, { useState } from "react";
import { Box, TextField, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    color: "#000000",
    marginRight: "15px",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "Poppins",
  },
  textField: {
    width: "200px",
    fontFamily: "Poppins",
  },
  notchedOutline: {
    color: "yellow !important",
  },
}));

export const Input: React.FC<{}> = () => {
  const classes = useStyles();

  const [name, setName] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(name);
    setName('');
  };

  return (
    <Box component="form" className={classes.box} onSubmit={handleSubmit}>
      <InputLabel id="labelId" className={classes.label}>
        Add Project
      </InputLabel>
      <TextField
        id="task-name"
        label="Name"
        variant="outlined"
        className={classes.textField}
        onChange={handleChange}
        value={name}
        inputProps={{
          classes: {
            notchedOutline: classes.notchedOutline,
          },
          style: {
            fontFamily: "Poppins",
            fontSize: "12px",
            color: "#323232",
          },
        }}
      />
    </Box>
  );
};

export default Input;
