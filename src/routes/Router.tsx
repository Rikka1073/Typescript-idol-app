import Clothe from "@/components/pages/Clothe";
import Clothes from "@/components/pages/Clothes";
import Login from "@/components/pages/Login";
import Register from "@/components/pages/Register";
import SignUp from "@/components/pages/SignUp";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/SignUp" element={<SignUp />}></Route>
      <Route path="/Clothes" element={<Clothes />}></Route>
      <Route path="/Clothes/:id" element={<Clothe />}></Route>
      <Route path="/Clothes/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
