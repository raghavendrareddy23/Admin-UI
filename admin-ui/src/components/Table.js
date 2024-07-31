import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TextField,
  Button
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import "./Table.css";

const TableImplementation = ({
  data,
  setUserData,
  selectedRows,
  handleRowSelect,
  handleEditRow,
  handleSaveRow,
  handleDeleteRow,
  editingRow,
  selectAllRows,
  handleSelectAllRows
}) => {
  const [editValues, setEditValues] = useState({});

  const handleInputChange = (id, field, value) => {
    setEditValues(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSave = (user) => {
    setUserData(prevData =>
      prevData.map(prevUser =>
        prevUser.id === user.id
          ? { ...prevUser, ...editValues[user.id] }
          : prevUser
      )
    );
    handleSaveRow(user.id);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectAllRows}
                onChange={handleSelectAllRows}
                inputProps={{ "aria-label": "Select all rows" }}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} selected={selectedRows.includes(user.id)}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowSelect(user.id)}
                />
              </TableCell>
              <TableCell>
                {editingRow === user.id ? (
                  <TextField
                    value={editValues[user.id]?.name || user.name}
                    onChange={(e) => handleInputChange(user.id, 'name', e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </TableCell>
              <TableCell>
                {editingRow === user.id ? (
                  <TextField
                    value={editValues[user.id]?.email || user.email}
                    onChange={(e) => handleInputChange(user.id, 'email', e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </TableCell>
              <TableCell>
                {editingRow === user.id ? (
                  <TextField
                    value={editValues[user.id]?.role || user.role}
                    onChange={(e) => handleInputChange(user.id, 'role', e.target.value)}
                  />
                ) : (
                  user.role
                )}
              </TableCell>
              <TableCell>
                {editingRow === user.id ? (
                  <Button
                    variant="text"
                    className="Icon-color"
                    onClick={() => handleSave(user)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="text"
                    className="Icon-color"
                    onClick={() => {
                      setEditValues((prev) => ({
                        ...prev,
                        [user.id]: {
                          name: user.name,
                          email: user.email,
                          role: user.role
                        }
                      }));
                      handleEditRow(user.id);
                    }}
                    data-testid="edit-button"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                )}
                <Button
                  variant="text"
                  className="Icon-color1"
                  onClick={() => handleDeleteRow(user.id)}
                  data-testid="delete-button"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableImplementation;
