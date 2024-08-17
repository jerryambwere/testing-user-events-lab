import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

// Existing tests...

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const reactCheckbox = screen.getByLabelText(/react/i);
  const jsCheckbox = screen.getByLabelText(/javascript/i);
  const cssCheckbox = screen.getByLabelText(/css/i);

  expect(reactCheckbox).toBeInTheDocument();
  expect(jsCheckbox).toBeInTheDocument();
  expect(cssCheckbox).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const reactCheckbox = screen.getByLabelText(/react/i);
  const jsCheckbox = screen.getByLabelText(/javascript/i);
  const cssCheckbox = screen.getByLabelText(/css/i);

  expect(reactCheckbox).not.toBeChecked();
  expect(jsCheckbox).not.toBeChecked();
  expect(cssCheckbox).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });

  expect(nameInput.value).toBe("John Doe");
  expect(emailInput.value).toBe("john.doe@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const reactCheckbox = screen.getByLabelText(/react/i);
  const jsCheckbox = screen.getByLabelText(/javascript/i);
  const cssCheckbox = screen.getByLabelText(/css/i);

  fireEvent.click(reactCheckbox);
  fireEvent.click(jsCheckbox);

  expect(reactCheckbox).toBeChecked();
  expect(jsCheckbox).toBeChecked();
  expect(cssCheckbox).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const reactCheckbox = screen.getByLabelText(/react/i);
  const jsCheckbox = screen.getByLabelText(/javascript/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  fireEvent.click(reactCheckbox);
  fireEvent.click(jsCheckbox);
  fireEvent.click(submitButton);

  expect(screen.getByText(/thank you for signing up, john doe!/i)).toBeInTheDocument();
  expect(screen.getByText(/we'll send updates to john.doe@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/interests: react, javascript/i)).toBeInTheDocument();
});