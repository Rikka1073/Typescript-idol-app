import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import Login from "../components/pages/Login";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { User } from "../domain/User";
import { getAllUsersData } from "../utils/supabaseFunction";
import Clothes from "../components/pages/Clothes";
import Register from "../components/pages/Register";
import Answer from "../components/pages/Answer";
// import Register from "../components/pages/Register";
// import Answer from "../components/pages/Answer";
// import { AnswerData } from "../domain/AnswerData";
// import { addAnswer } from "../utils/supabaseFunction";

const mockUserDate = jest.fn().mockResolvedValue([new User("userName", "passWord")]);
const mockImgDate = jest.fn().mockResolvedValue([{ file_name: "testImg", file_url: "testUrl" }]);

jest.mock("../utils/supabaseFunction", () => {
  return {
    getAllUsersData: () => mockUserDate(),
    fetchImages: () => mockImgDate(),
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
      screen.debug();
    });
  });
});

// describe("Answer", () => {
//   const mockAnswerDate = jest
//     .fn()
//     .mockResolvedValue([new AnswerData("テストリンク", "テストアイドル", "テスト", "1")]);

//   jest.mock("../utils/supabaseFunction", () => {
//     return {
//       addAnswer: () => mockAnswerDate(),
//     };
//   });

//   const mockDate = jest
//     .fn()
//     .mockResolvedValue([new AnswerData("テストリンク", "テストアイドル", "テスト", "1")]);

//   beforeEach(() => {
//     render(
//       <BrowserRouter>
//         <ChakraProvider value={defaultSystem}>
//           <Answer />
//         </ChakraProvider>
//       </BrowserRouter>
//     );
//   });

//   test("タイトルがあること", async () => {
//     await waitFor(() => {
//       const title = screen.getByTestId("pageTitle");
//       expect(title).toBeInTheDocument();
//       screen.debug();
//     });
//   });

//   test("登録ボタンを押すと回答が登録できる", async () => {
//     // await act(async () => {
//     //   render(
//     //     <MemoryRouter initialEntries={["/cards/register"]}>
//     //       <Routes>
//     //         <Route path="/cards/register" element={<Register />} />
//     //       </Routes>
//     //     </MemoryRouter>
//     //   );
//     // });

//     const button = screen.getByTestId("registerButton");
//     fireEvent.click(button);
//   });
// });
