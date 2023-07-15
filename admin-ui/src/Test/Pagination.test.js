import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

test("renders the pagination buttons correctly", () => {
    const currentPage = 2;
    const totalPages = 5;
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={() => {}}
      />
    );
  
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(totalPages + 4); // Total pages + First, Prev, Next, Last buttons
});
  

  
  
test("calls the handlePageChange function with the correct page number when the first page button is clicked", () => {
    const currentPage = 3;
    const totalPages = 5;
    const handlePageChange = jest.fn();
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    );
  
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]); // Click on the first page button
  
    expect(handlePageChange).toHaveBeenCalledTimes(1);
    expect(handlePageChange).toHaveBeenCalledWith(1); // Ensure the correct page number is passed to the function
});

test("calls the handlePageChange function with the correct page number when the last page button is clicked", () => {
    const currentPage = 2;
    const totalPages = 5;
    const handlePageChange = jest.fn();
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    );
  
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 1]); // Click on the last page button
  
    expect(handlePageChange).toHaveBeenCalledTimes(1);
    expect(handlePageChange).toHaveBeenCalledWith(totalPages); // Ensure the correct page number is passed to the function
});
  
  
  