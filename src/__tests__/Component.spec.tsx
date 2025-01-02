import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../components/pages/Login";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { User } from "../domain/User";
import Clothes from "../components/pages/Clothes";
import Answer from "../components/pages/Answer";
import { AnswerData } from "../domain/AnswerData";
import Register from "../components/pages/Register";

const mockUserDate = jest.fn().mockResolvedValue([new User("userName", "passWord")]);
const mockImgDate = jest.fn().mockResolvedValue([{ file_name: "testImg", file_url: "testUrl" }]);
const mockAnswerDate = jest
  .fn()
  .mockResolvedValue([new AnswerData("テストリンク", "テストアイドル", "テスト", "1")]);

jest.mock("../utils/supabaseFunction", () => {
  return {
    getAllUsersData: () => mockUserDate(),
    fetchImages: () => mockImgDate(),
    addAnswer: () => mockAnswerDate(),
  };
});

const mockNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigator,
}));

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  test("名前のバリデーションメッセージが表示されること", async () => {
    const input = screen.getByPlaceholderText("userName");
    fireEvent.focus(input);
    fireEvent.blur(input);

    await waitFor(() => {
      const errorMessage_userName = screen.getByTestId("userNameError");
      expect(errorMessage_userName).toBeInTheDocument();
    });
  });

  test("パスワードのバリデーションメッセージが表示されること", async () => {
    const input = screen.getByPlaceholderText("password");
    fireEvent.focus(input);
    fireEvent.blur(input);

    await waitFor(() => {
      const errorMessage_password = screen.getByTestId("passwordError");
      expect(errorMessage_password).toBeInTheDocument();
    });
  });

  test("登録が成功した場合、Clothesページに遷移すること", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/Clothes"]}>
          <ChakraProvider value={defaultSystem}>
            <Routes>
              <Route path="/Clothes" element={<Clothes />} />
            </Routes>
          </ChakraProvider>
        </MemoryRouter>
      );
    });

    const userNameInput = screen.getByTestId("userName") as HTMLInputElement;
    const userPasswordInput = screen.getByTestId("password") as HTMLInputElement;

    fireEvent.change(userNameInput, { target: { value: "userName" } });
    fireEvent.change(userPasswordInput, { target: { value: "passWord" } });
    fireEvent.blur(userNameInput);
    fireEvent.blur(userPasswordInput);

    await waitFor(() => {
      expect(userNameInput.value).toBe("userName");
      expect(userPasswordInput.value).toBe("passWord");
    });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    const userData = await mockUserDate();
    console.log(userData);

    await waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledWith("/Clothes");
    });
    screen.debug();
  });
});

describe("Answer", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <Answer />
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

  // test("登録ボタンを押すと回答が登録できる", async () => {
  //   await act(async () => {
  //     render(
  //       <BrowserRouter>
  //         <ChakraProvider value={defaultSystem}>
  //           <Routes>
  //             <Route path="/Clothes" element={<Clothes />} />
  //           </Routes>
  //         </ChakraProvider>
  //       </BrowserRouter>
  //     );
  //   });

  //   const answerLinkInput = screen.getByTestId("linkInput") as HTMLInputElement;
  //   const answerIdolInput = screen.getByTestId("idolInput") as HTMLInputElement;
  //   const answerTextInput = screen.getByTestId("textInput") as HTMLInputElement;

  //   fireEvent.change(answerLinkInput, { target: { value: "テストリンク" } });
  //   fireEvent.change(answerIdolInput, { target: { value: "テストアイドル" } });
  //   fireEvent.change(answerTextInput, { target: { value: "テスト" } });

  //   const form = screen.getByRole("form");
  //   fireEvent.submit(form);

  //   await waitFor(() => {
  //     expect(mockNavigator).toHaveBeenCalledWith("/Clothes");
  //   });

  //   screen.debug();
  // });

  // test("新規登録を押すと遷移する", async () => {
  //   await act(async () => {
  //     render(
  //       <BrowserRouter>
  //         <ChakraProvider value={defaultSystem}>
  //           <Routes>
  //             <Route path="/Clothes/Register" element={<Register />} />
  //           </Routes>
  //         </ChakraProvider>
  //       </BrowserRouter>
  //     );
  //   });
  //   const button = screen.getByTestId("addButton");
  //   fireEvent.click(button);

  //   await waitFor(() => {
  //     expect(mockNavigator).toHaveBeenCalledWith("/Clothes/Register");
  //   });
  //   screen.debug();
  // });
});
