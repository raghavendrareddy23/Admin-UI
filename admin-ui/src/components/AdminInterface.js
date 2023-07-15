import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Box,
  Table,
  TableBody
} from "@mui/material";
import TableImplementation from "./Table";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
// import TableHeader from "./TableHeader";
import DeleteSelectedButton from "./DeleteSelectedButton";
import { fetchUsers } from "../api/users";

export default function AdminInterface() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [selectAllRows, setSelectAllRows] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const calculateTotalPages = useCallback(() => {
    const filteredData = userData.filter(
      (user) =>
        user.id.toString().includes(searchQuery) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const pages = Math.ceil(filteredData.length / 10);
    setTotalPages(pages);
    setCurrentPage((prevPage) => Math.min(prevPage, pages));
  }, [searchQuery, userData]);

  useEffect(() => {
    // Recalculate total pages when search query or user data changes
    calculateTotalPages(userData);
    setCurrentPage(1);
  }, [searchQuery, userData, calculateTotalPages]);

  // Get the data for the current page
  const getCurrentPageData = () => {
    const filteredData = userData.filter(
      (user) =>
        user.id.toString().includes(searchQuery) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;

    return filteredData.slice(startIndex, endIndex);
  };

  // Handler for search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };
  
  // Handler for page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handler for row selection
  const handleRowSelect = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  // Handler for selecting or deselecting all rows on the current page
  const handleSelectAllRows = () => {
    const currentPageData = getCurrentPageData();
    const currentPageIds = currentPageData.map((user) => user.id);
    if (selectedRows.length === currentPageIds.length) {
      setSelectedRows([]);
      setSelectAllRows(false);
    } else {
      setSelectedRows(currentPageIds);
      setSelectAllRows(true);
    }
  };

  // Handler for editing a row
  const handleEditRow = (rowId) => {
    setEditingRow(rowId);
  };

  // Handler for saving the edited row
  const handleSaveRow = (rowId) => {
    // Implement the logic to save the edited row
    setEditingRow(null);
  };

  // Handler for deleting a row
  const handleDeleteRow = (rowId) => {
    // Implement the logic to delete the row with the given ID from the userData state
    setUserData((prevData) => prevData.filter((user) => user.id !== rowId));
  };

  // Handler for deleting selected rows
  const handleDeleteSelected = () => {
    // Implement the logic to delete the selected rows from the userData state
    setUserData((prevData) =>
      prevData.filter((user) => !selectedRows.includes(user.id))
    );
    setSelectedRows([]);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
      </Box>
      <Box>
        <Table>
          <TableBody>
            {
              <TableImplementation
                data={getCurrentPageData()}
                selectedRows={selectedRows}
                handleRowSelect={handleRowSelect}
                handleEditRow={handleEditRow}
                handleSaveRow={handleSaveRow}
                handleDeleteRow={handleDeleteRow}
                editingRow={editingRow}
                handleSelectAllRows={handleSelectAllRows}
                selectAllRows={selectAllRows}
              />
            }
          </TableBody>
        </Table>
      </Box>
      <Box mt={2} display="flex" justifyContent="space-between">
        <DeleteSelectedButton handleDeleteSelected={handleDeleteSelected} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
}
