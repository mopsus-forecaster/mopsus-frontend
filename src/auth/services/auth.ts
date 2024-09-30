import { apiClient } from "../../http-client/api-client";

export const userLogin = async (email: string, password: string) => {
    const response = await apiClient({
      api: "auth",
      service: "/",
      verb: "post",
      dataSend: {
        email,
        password,
      },
    });
    return response.data;
}

export const createUser = async (email: string, password: string, name:string) => {
    const response = await apiClient({
        api: "auth",
        service: "/register",
        verb: "post",
        dataSend: {
        email,
        password,
        name
        },
    });
    return response.data;
    }