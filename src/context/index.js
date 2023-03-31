import { createContext } from "react";

const context = createContext({
    status: false,
    page: 1,
    size: 100,
    changeStatus: () => {},
    changePage: () => {},
    changeSize: () => {},
});

export default context;
