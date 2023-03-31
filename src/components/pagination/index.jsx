import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pagination } from "antd";
import context from "../../context";

const PaginationOX = ({ total }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const contextData = useContext(context);
    contextData.changePage(
        location.search.split("&").map((e) => {
            return +e.split("=")[1];
        })[0] || 1
    );
    contextData.changeSize(
        location.search.split("&").map((e) => {
            return +e.split("=")[1];
        })[1] || 10
    );

    useEffect(() => {
        navigate(`?page=${contextData.page}&size=${contextData.size}`);
    }, []);

    return (
        <Pagination
            current={contextData.page}
            pageSize={contextData.size}
            total={total}
            showSizeChanger
            onChange={(cur, pageSize) => {
                navigate(`?page=${cur}&size=${pageSize}`);
                if (contextData.size !== pageSize) {
                    contextData.changePage(1);
                    contextData.changeSize(pageSize);
                    navigate(`?page=${1}&size=${pageSize}`);
                } else {
                    contextData.changePage(cur);
                    contextData.changeSize(pageSize);
                }
            }}
        />
    );
};

export default PaginationOX;
