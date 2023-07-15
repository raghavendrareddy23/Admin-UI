import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

test("renders SearchBar component correctly", () => {
  const searchQuery = "John";
  const handleSearchChange = jest.fn();
  render(
    <SearchBar
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
    />
  );

  const searchBar = screen.getByLabelText("Search");
  expect(searchBar).toBeInTheDocument();
  expect(searchBar.value).toBe(searchQuery);
});

test("calls handleSearchChange when search input value is changed", () => {
  const searchQuery = "John";
  const handleSearchChange = jest.fn();
  render(
    <SearchBar
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
    />
  );

  const searchBar = screen.getByLabelText("Search");
  fireEvent.change(searchBar, { target: { value: "Jane" } });

  expect(handleSearchChange).toHaveBeenCalledTimes(1);
  expect(handleSearchChange).toHaveBeenCalledWith(expect.any(Object));
});

test("displays the correct placeholder in the search input", () => {
  const placeholderText = "Search by name, email, or role...";
  render(<SearchBar searchQuery="" handleSearchChange={() => {}} />);

  const searchBar = screen.getByLabelText("Search");
  expect(searchBar).toHaveAttribute("placeholder", placeholderText);
});
