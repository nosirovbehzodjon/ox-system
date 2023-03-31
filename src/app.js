import "antd/dist/reset.css";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import context from "./context";
import { useState } from "react";
import Protected from "./routes/protected";
import Login from "./pages/register/login";
import { Read,Search } from "./pages";
const App = () => {
    const [isOk, setIsOk] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(100);
    const changeIsOk = () => {
        setIsOk(true);
    };
    const changePage = (n) => {
        setPage(n);
    };
    const changeSize = (n) => {
        setSize(n);
    };

    return (
        <context.Provider
            value={{
                status: isOk,
                page: page,
                size: size,
                changeStatus: changeIsOk,
                changePage: changePage,
                changeSize: changeSize,
            }}
        >
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Protected />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/read" element={<Read />} />
                        <Route path="/search" element={<Search />} />
                    </Route>
                </Route>
            </Routes>
        </context.Provider>
    );
};

export default App;
