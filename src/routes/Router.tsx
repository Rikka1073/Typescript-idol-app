import Answer from "@/components/pages/Answer";
import Clothe from "@/components/pages/Clothe";
import Clothes from "@/components/pages/Clothes";
import Home from "@/components/pages/Home";
import Login from "@/components/pages/Login";
import Register from "@/components/pages/Register";
import SignUp from "@/components/pages/SignUp";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/SignUp" element={<SignUp />}></Route>
      <Route path="/Clothes" element={<Clothes />}></Route>
      <Route path="/Clothes/:id" element={<Clothe />}></Route>
      <Route path="/Clothes/Register" element={<Register />} />
      <Route path="/Clothes/Answer" element={<Answer />} />
    </Routes>
  );
};

export default Router;
