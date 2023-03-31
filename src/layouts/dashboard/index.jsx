import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    ReadOutlined,
} from "@ant-design/icons";
import { Layout, Menu, notification, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";
const { Header, Sider, Content } = Layout;
const DashboadLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">dsdsd</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <ReadOutlined />,
                            label: "Read",
                            onClick: () => {
                                navigate("/read");
                            },
                        },
                        {
                            key: "2",
                            icon: <SearchOutlined />,
                            style: { border: 0 },
                            label: "Search",
                            onClick: () => {
                                navigate("/search");
                            },
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",

                            onClick: () => setCollapsed(!collapsed),
                        }
                    )}
                </Header>
                <Content
                    style={{
                        margin: "20px 16px",
                        boxSizing: "border-box",
                        padding: 24,
                        height: "calc(100vh - 104px)",
                        overflow: "auto",
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default DashboadLayout;
