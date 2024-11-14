import Clothe from "@/components/pages/Clothe";
import Clothes from "@/components/pages/Clothes";
import Login from "@/components/pages/Login";
import Register from "@/components/pages/Register";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/Clothes" element={<Clothes />}></Route>
      <Route path="/Clothes/:id" element={<Clothe />}></Route>
      <Route path="/Clothes/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
