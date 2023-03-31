import Cookie from "js-cookie";
const setCookie = (cookiename, value) => {
    Cookie.set(cookiename, value, {
        expires: 1,
        secure: true,
        sameSite: "strict",
    });
};

const getCookie = (cookiename) => {
    return Cookie.get(cookiename);
};

const removeCookie = (cookiename) => {
    Cookie.remove(cookiename);
};

export { setCookie, getCookie, removeCookie };
