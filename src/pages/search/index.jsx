import { Alert, Input, message, Space, Spin, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useQueryData } from "../../hooks";
import { SearchOutlined } from "@ant-design/icons";
import PaginationOX from "../../components/pagination";
import context from "../../context";
const Search = () => {
    const [search, setSearch] = useState("");
    const contextData = useContext(context);
    const {
        data: mydata,
        isLoading,
        isError,
        refetch,
    } = useQueryData({
        url: "search",
        method: "GET",
        key: `search-${contextData.page}-${contextData.size}`,
    });
    useEffect(() => {
        refetch();
    }, [contextData.page, contextData.size]);
    const [messageApi, contextHolder] = message.useMessage();
    const errorMessage = (err) => {
        messageApi.open({
            type: "error",
            content: err,
        });
    };
    const handleChange = (e) => {
        setSearch(e.target.value);
        console.log(search);
    };
    if (isLoading) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "500px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spin tip="Loading..."></Spin>
            </div>
        );
    }
    if (isError) {
        errorMessage("server error!");
    }
    const columns = [
        {
            title: "Number",
            dataIndex: "number",
            width: 100,
            ellipsis: true,
        },
        {
            title: "Name",
            dataIndex: "name",
            ellipsis: true,
        },
        {
            title: "Supplier",
            dataIndex: "supplier",
            ellipsis: true,
        },
        {
            title: "Unit",
            dataIndex: "unit",
            ellipsis: true,
        },
        {
            title: "Date",
            dataIndex: "date",
            ellipsis: true,
        },
    ];
    const result = mydata?.items
        .map((item, i) => {
            return {
                key: item.id,
                number: i + 1,
                name: item.name ? item.name : "",
                supplier: item.supplier,
                unit: item.unit,
                date: item.lastUpdateTime,
            };
        })
        .filter((item) =>
            item?.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        .sort((x, y) => {
            return (
                x?.name?.toLocaleLowerCase().indexOf(search) -
                y?.name?.toLocaleLowerCase().indexOf(search)
            );
        });
    return (
        <div>
            {contextHolder}
            <Input
                size="large"
                placeholder="large size"
                onChange={handleChange}
                prefix={<SearchOutlined />}
            />
            <div className="table_container">
                <Table
                    columns={columns}
                    dataSource={result}
                    pagination={false}
                    scroll={{
                        y: 400,
                    }}
                />
                <PaginationOX total={mydata?.total_count} />
            </div>
        </div>
    );
};

export default Search;
