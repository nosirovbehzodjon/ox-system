import React, { useContext, useEffect } from "react";
import styled from "./login.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import img from "../../assets/images/org-login.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import context from "../../context";
import { useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { setCookie } from "../../functions";
import { notification } from "antd";
import { useAuth } from "../../hooks";
const schema = yup.object().shape({
    _username: yup.string().required(),
    _password: yup.string().required(),
});
const Login = () => {
    const protect = useContext(context);
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description:
                "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        });
    };
    const { isLoading, data, mutateAsync, isError } = useAuth({
        key: "auth",
        method: "POST",
        url: "auth",
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            _subdomain: "toko",
        },
    });
    const onSubmit = handleSubmit((data) => {
        mutateAsync(data);
    });

    useEffect(() => {
        if (data?.token) {
            protect.changeStatus();
            setCookie("token", data?.token);
            navigate("/read");
        }
        if (data?.message) {
            openNotificationWithIcon("error", "Username or password is wrong!");
        }
    }, [isLoading]);
    if (isError) {
        openNotificationWithIcon("error", "server error!");
    }
    return (
        <section className={styled.login_container}>
            {contextHolder}
            <div className={styled.main_box}>
                <div className={styled.img_box}>
                    <img src={img} alt="login img" />
                </div>
                <div className={styled.input_box}>
                    <form onSubmit={onSubmit}>
                        <div className={styled.input_container}>
                            <input
                                type="text"
                                placeholder="username"
                                {...register("_username")}
                            />
                            <span className={styled.icon_container}>
                                <UserOutlined />
                            </span>
                            <span className={styled.error_message}>
                                {errors?.username && errors.username?.message}
                            </span>
                        </div>

                        <div className={styled.input_container}>
                            <input
                                type="password"
                                placeholder="password"
                                {...register("_password")}
                            />
                            <span className={styled.icon_container}>
                                <LockOutlined />
                            </span>
                            <span className={styled.error_message}>
                                {errors?.password && errors.password?.message}
                            </span>
                        </div>
                        <button type="submit" className={styled.submit}>
                            {isLoading ? (
                                <BallTriangle
                                    height={20}
                                    width={20}
                                    radius={5}
                                    color="#fff"
                                    ariaLabel="ball-triangle-loading"
                                    visible={true}
                                />
                            ) : (
                                ""
                            )}
                            Sign me in Now
                        </button>
                    </form>
                    <div className={styled.founder}>
                        <a
                            href="https://abez.uz/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Create by ABEZ IT Company
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Login;
