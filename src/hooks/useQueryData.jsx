import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../functions";
import { useContext } from "react";
import context from "../context";
const useQueryData = (config) => {
    const contextData = useContext(context);
    
    return useQuery({
        queryKey: [config.key],
        queryFn: async () => {
            const response = await fetch(
                `${process.env.REACT_APP_OX_GET}?page=${contextData.page}&size=${contextData.size}`,
                {
                    method: config.method,
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            return await response.json();
        },
    });
};

export default useQueryData;
