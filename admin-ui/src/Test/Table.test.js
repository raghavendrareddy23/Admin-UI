import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "../components/Table.js";

test("calls handleEditRow when edit button is clicked", () => {
    const data = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    ];
    const setUserData = jest.fn();
    const selectedRows = [];
    const handleRowSelect = jest.fn();
    const handleEditRow = jest.fn();
    const handleSaveRow = jest.fn();
    const handleDeleteRow = jest.fn();
    const editingRow = null;
    const selectAllRows = false;
  
    render(
      <Table
        data={data}
        setUserData={setUserData}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleEditRow={handleEditRow}
        handleSaveRow={handleSaveRow}
        handleDeleteRow={handleDeleteRow}
        editingRow={editingRow}
        selectAllRows={selectAllRows}
        handleSelectAllRows={() => {}}
      />
    );
  
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);
  
    expect(handleEditRow).toHaveBeenCalledTimes(1);
    expect(handleEditRow).toHaveBeenCalledWith(1);
  });

test("renders TableImplementation component correctly", () => {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];
  const setUserData = jest.fn();
  const selectedRows = [1];
  const handleRowSelect = jest.fn();
  const handleEditRow = jest.fn();
  const handleSaveRow = jest.fn();
  const handleDeleteRow = jest.fn();
  const editingRow = 2;
  const selectAllRows = true;

  render(
    <Table
      data={data}
      setUserData={setUserData}
      selectedRows={selectedRows}
      handleRowSelect={handleRowSelect}
      handleEditRow={handleEditRow}
      handleSaveRow={handleSaveRow}
      handleDeleteRow={handleDeleteRow}
      editingRow={editingRow}
      selectAllRows={selectAllRows}
      handleSelectAllRows={() => {}}
    />
 );

  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();

  const tableRows = screen.getAllByRole("row");
  expect(tableRows).toHaveLength(data.length + 1); // +1 for table header row
});

test("calls handleSaveRow when save button is clicked", () => {
    const data = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    ];
    const setUserData = jest.fn();
    const selectedRows = [];
    const handleRowSelect = jest.fn();
    const handleEditRow = jest.fn();
    const handleSaveRow = jest.fn();
    const handleDeleteRow = jest.fn();
    const editingRow = 2;
    const selectAllRows = false;
  
    render(
      <Table
        data={data}
        setUserData={setUserData}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleEditRow={handleEditRow}
        handleSaveRow={handleSaveRow}
        handleDeleteRow={handleDeleteRow}
        editingRow={editingRow}
        selectAllRows={selectAllRows}
        handleSelectAllRows={() => {}}
      />
    );
  
    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);
  
    expect(handleSaveRow).toHaveBeenCalledTimes(1);
    expect(handleSaveRow).toHaveBeenCalledWith(2); // Check if the correct row ID is passed
});

test("calls handleDeleteRow when delete button is clicked", () => {
    const data = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    ];
    const setUserData = jest.fn();
    const selectedRows = [];
    const handleRowSelect = jest.fn();
    const handleEditRow = jest.fn();
    const handleSaveRow = jest.fn();
    const handleDeleteRow = jest.fn();
    const editingRow = null;
    const selectAllRows = false;
  
    render(
      <Table
        data={data}
        setUserData={setUserData}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleEditRow={handleEditRow}
        handleSaveRow={handleSaveRow}
        handleDeleteRow={handleDeleteRow}
        editingRow={editingRow}
        selectAllRows={selectAllRows}
      />
    );
  
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
  
    expect(handleDeleteRow).toHaveBeenCalledTimes(1);
    expect(handleDeleteRow).toHaveBeenCalledWith(1);
});
  
  
  
  

