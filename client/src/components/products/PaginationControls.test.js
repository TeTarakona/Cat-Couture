import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginationControls from "./PaginationControls";

describe("PaginationControls", () => {
  test("WHEN the user is on the first page of the products page, THEN the previous/back button of the pagination control will be disabled", () => {
    const onPrev = jest.fn();
    const currentPage = 1;
    const prevDisabled = currentPage > 1 ? false : true;
    render(
      <PaginationControls
        onPrev={onPrev}
        page={currentPage}
        prevDisabled={prevDisabled}
      />
    );
    const previousButton = screen.getByRole("button", {
      name: "Previous page",
    });
    expect(previousButton).toBeDisabled();
    userEvent.click(previousButton);
    expect(onPrev).not.toHaveBeenCalled();
  });

  test("WHEN the user is on the second page of the main product page, THEN the previous/back button of the pagination control will be enabled.", () => {
    const onPrev = jest.fn();
    const currentPage = 2;
    const prevDisabled = currentPage > 1 ? false : true;
    render(
      <PaginationControls
        onPrev={onPrev}
        page={currentPage}
        prevDisabled={prevDisabled}
      />
    );
    const previousButton = screen.getByRole("button", {
      name: "Previous page",
    });
    userEvent.click(previousButton);
    expect(onPrev).toHaveBeenCalled();
  });

  test("WHEN the user is on the last page of the main product page, THEN next button of the pagination control will be disabled.", () => {
    const onNext = jest.fn();
    const currentPage = 10;
    const totalPages = 10;
    const nextDisabled = currentPage < totalPages ? false : true;
    render(
      <PaginationControls
        onNext={onNext}
        page={currentPage}
        nextDisabled={nextDisabled}
      />
    );
    const nextButton = screen.getByRole("button", { name: "Next page" });
    expect(nextButton).toBeDisabled();
    userEvent.click(nextButton);
    expect(onNext).not.toHaveBeenCalled();
  });
});
