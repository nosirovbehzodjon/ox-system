import { Alert, notification, Space, Spin, Table } from "antd";
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../../components/pagination";
import context from "../../context";
import { useQueryData } from "../../hooks";

const Read = () => {
    const contextData = useContext(context);
    const {
        data: mydata,
        isLoading,
        isError,
        refetch,
    } = useQueryData({
        url: "red",
        method: "GET",
        key: `read-${contextData.page}-${contextData.size}`,
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description:
                "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        });
    };

    useEffect(() => {
        refetch();
    }, [contextData.page, contextData.size]);
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
        openNotificationWithIcon("error", "server error!");
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
    return (
        <div>
            {contextHolder}

            <div className="table_container">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{
                        y: 400,
                    }}
                />
                <Pagination total={mydata?.total_count} />
            </div>
        </div>
    );
};

export default Read;
