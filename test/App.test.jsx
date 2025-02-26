import { test } from "vitest";
import App from "../src/App";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

//check if rendered content is performing as expected

test("Render the App conponent", () => {
    render (<App />);

    const mainPageHeader = screen.getByText("Vite + React");
    expect (mainPageHeader).toBeInTheDocument();
});

// render content and simulate inteactions

test("Render the App component with a button that increses the count", async () => {
    render(<App />)

    // Find button element 
    const counterButton = screen.getByTestId("counterButton");

    // Check the buttons test for count is 0
    expect (counterButton).toBeInTheDocument();
    expect (counterButton).toHaveTextContent("count is 0");

    // Click on button 
        // create user
    const user = userEvent.setup();

        // implement click action
    await user.click(counterButton);

    // Check the buttons test for count is 0
    expect (counterButton).toHaveTextContent("count is 1");

})