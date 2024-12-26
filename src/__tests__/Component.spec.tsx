import { render, screen, waitFor } from "@testing-library/react";
import Login from "../components/pages/Login";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { User } from "../domain/User";

const mockDate = jest.fn().mockResolvedValue([new User("usetName", "passWord")]);

jest.mock("../utils/supabaseFunction", () => {
  return {
    getAllUsersData: () => mockDate(),
  };
});

describe("Login", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <Login />
        </ChakraProvider>
      </BrowserRouter>
    );
  });

  test("タイトルがあること", async () => {
    await waitFor(() => {
      const title = screen.getByTestId("pageTitle");
      expect(title).toBeInTheDocument();
    });
  });
});
