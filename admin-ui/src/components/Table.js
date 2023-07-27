import React from "react";
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
import "./Table.css"

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
                    value={user.name}
                    onChange={(e) =>
                      setUserData((prevData) =>
                        prevData.map((prevUser) =>
                          prevUser.id === user.id
                            ? { ...prevUser, name: e.target.value }
                            : prevUser
                        )
                      )
                    }
                  />
                ) : (
                  user.name
                )}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {editingRow === user.id ? (
                  <Button
                    variant="text"
                    className="Icon-color"
                    onClick={() => handleSaveRow(user.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="text"
                    className="Icon-color"
                    onClick={() => handleEditRow(user.id)}
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
