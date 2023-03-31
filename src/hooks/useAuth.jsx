import { useMutation, useQueryClient } from "@tanstack/react-query";
const useAuth = (config) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            const response = fetch(`${process.env.REACT_APP_OX_POST}`, {
                method: config.method,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                },

                body: `_username=${data._username}&_password=${data._password}&_subdomain=${data._subdomain}`,
            });
            return (await response).json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries([config?.key]);
        },
    });
};

export default useAuth;
