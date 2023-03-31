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
        key: "search",
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
            <Space
                direction="vertical"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <Spin tip="Loading...">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin>
            </Space>
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
    const data = [];
    for (let i = 0; i < mydata?.items?.length; i++) {
        data.push({
            key: mydata?.items[i].id,
            number: i + 1,
            name: mydata?.items[i].name,
            supplier: mydata?.items[i].supplier,
            unit: mydata?.items[i].unit,
            date: mydata?.items[i].lastUpdateTime,
        });
    }
    const result = data
        .filter((item) =>
            item?.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        .sort(
            (x, y) =>
                x?.name?.toLocaleLowerCase().indexOf(search) -
                y?.name?.toLocaleLowerCase().indexOf(search)
        );

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
