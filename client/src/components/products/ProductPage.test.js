import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductPage from "./ProductPage";

describe("ProductPage", () => {
  test("WHEN a user goes to the Products page, THEN the pagination control will be displayed", () => {
    render(<ProductPage />);
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    expect(previousPageButton).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
  });

  test("WHEN a user navigates to the first page of the Products page, THEN the previous/back button of the pagination control will be disabled", () => {
    render(<ProductPage />);
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    expect(previousPageButton).toBeDisabled();
  });

  test("WHEN the user navigates to the second page of the Products page, THEN the previous/back button of the pagination control will be enabled", () => {
    render(<ProductPage />);
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    const pageDisplay = screen.queryByText(/page/i);
    expect(pageDisplay.textContent).toBe("Page 1 of 10");
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    userEvent.click(nextPageButton);
    expect(pageDisplay.textContent).toBe("Page 2 of 10");
    expect(previousPageButton).not.toBeDisabled();
  });

  test("WHEN the user navigates to the last page of the Products page, THEN next button of the pagination control will be disabled", () => {
    render(<ProductPage />);
    const pageDisplay = screen.queryByText(/page/i);
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    //Forgive me for what I'm about to do. I don't know how to skip to page 10, but I know how to have the user event navigate 10 times.
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    expect(pageDisplay.textContent).toBe("Page 10 of 10");
    expect(nextPageButton).toBeDisabled();
  });

  test("WHEN a user goes to the Products page, THEN the current page will be highlighted in the pagination control", () => {
    render(<ProductPage />);
    const pageDisplay = screen.queryByText(/page/i);
    expect(pageDisplay.textContent).toBe("Page 1 of 10");
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    userEvent.click(nextPageButton);
    expect(pageDisplay.textContent).toBe("Page 2 of 10");
  });
});
