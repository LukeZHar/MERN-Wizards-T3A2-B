import { expect, test } from "vitest";
import App from "./src/App";
import { render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//Level 1 testing - render content and check if as expected
 
test ("Render the App component", () => {
    render (<App />);

    const mainPageHeader = screen.getByText("Vite + React");
    expect(mainPageHeader).toBeInTheDocument();
})

// Level 2 testing - render content simulate interactions

test ("Render the App component with a button that increases the count", async () => {
    render (<App />)

    //Find button
    const counterButton = screen.getByTestId ("counterButton");

    // check button set to "count is 0"
    expect(counterButton).toBeInTheDocument();
    expect(counterButton).toHaveTextContent("count is 0");

    // click on button
    //Create user
    const user = userEvent.setup();

    //Button click action
    await user.click(counterButton);

    //check text is now "count is 1"
    expect(counterButton).toHaveTextContent("count is 1");
})