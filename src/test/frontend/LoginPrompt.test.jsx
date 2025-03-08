import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LoginPrompt from '../../frontend/components/LoginPrompt'; 

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Get real react-router-dom
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock useNavigate
  };
});

describe("LoginPrompt Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Reset mocks before each test
  });

  it("renders the default message", () => {
    render(
      <MemoryRouter>
        <LoginPrompt />
      </MemoryRouter>
    );

    expect(
      screen.getByText("You must be logged in to view this page.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Go to Login/i })).toBeInTheDocument();
  });

  it("renders a custom message", () => {
    render(
      <MemoryRouter>
        <LoginPrompt message="Custom message: log in!" />
      </MemoryRouter>
    );

    expect(screen.getByText("Custom message: log in!")).toBeInTheDocument();
  });

  it("navigates to login page when button is clicked", () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate); // Use mocked navigate function

    render(
      <MemoryRouter>
        <LoginPrompt />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Go to Login/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
