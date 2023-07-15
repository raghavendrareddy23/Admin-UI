import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteSelectedButton from "../components/DeleteSelectedButton";

test("renders the delete selected button", () => {
  render(<DeleteSelectedButton />);
  const buttonElement = screen.getByRole("button", { name: "Delete Selected" });
  expect(buttonElement).toBeInTheDocument();
});

test("calls the handleDeleteSelected function when the button is clicked", () => {
  const handleDeleteSelected = jest.fn();
  render(<DeleteSelectedButton handleDeleteSelected={handleDeleteSelected} />);
  const buttonElement = screen.getByRole("button", { name: "Delete Selected" });
  fireEvent.click(buttonElement);
  expect(handleDeleteSelected).toHaveBeenCalled();
});
