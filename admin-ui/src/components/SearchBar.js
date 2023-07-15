import React from "react";
import { TextField } from "@mui/material";
import "./SearchBar.css"

const SearchBar = ({ searchQuery, handleSearchChange }) => {
  return (
    <TextField
      label="Search"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search by name, email, or role..."
      fullWidth
      variant="outlined"
      className="searchBar"
      style={{ marginBottom: "1rem" }}
    />
  );
};

export default SearchBar;
