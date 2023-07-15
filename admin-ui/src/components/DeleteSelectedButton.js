import React from "react";
import { Button } from "@mui/material";
import "./DeleteSelectedButton.css"

const DeleteSelectedButton = ({ handleDeleteSelected }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      className="DeleteSelectedButton"
      onClick={handleDeleteSelected}
      style={{ marginTop: "1rem" }}
    >
      Delete Selected
    </Button>
  );
};

export default DeleteSelectedButton;
