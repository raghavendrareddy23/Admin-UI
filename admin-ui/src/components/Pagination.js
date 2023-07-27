import React from "react";
import { Button } from "@mui/material";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPaginationButtons = () => {
    const buttons = [];

    buttons.push(
      <Button
        key="first"
        variant="outlined"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="PaginationButton"
      >
        {"<<"}
      </Button>
    );

    buttons.push(
      <Button
        key="prev"
        variant="outlined"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="PaginationButton"
      >
        {"<"}
      </Button>
    );

    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <Button
          key={page}
          variant="outlined"
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
          className={`PaginationButton ${
            currentPage === page ? "ActivePage" : ""
          }`}
        >
          {page}
        </Button>
      );
    }

    buttons.push(
      <Button
        key="next"
        variant="outlined"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="PaginationButton"
      >
        {">"}
      </Button>
    );

    buttons.push(
      <Button
        key="last"
        variant="outlined"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="PaginationButton"
      >
        {">>"}
      </Button>
    );

    return buttons;
  };

  return (
    <div className="PaginationButtonsContainer">
      {renderPaginationButtons()}
    </div>
  );
};

export default Pagination;
