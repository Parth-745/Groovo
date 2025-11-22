import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Header from "../components/Header.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route
                path="/"
                element={<Home/>}
            />
            <Route
                path="/register"
                element={<Register/>}
            />
            <Route
                path="/login"
                element={<Login/>}
            />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter