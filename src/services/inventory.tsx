import { apiClient } from "../http-client/api-client";

export const createInventory = async (description, products) => {
    const productData = products.map(({ id, quantity }) => ({
        id_product: id,
        quantity: quantity,
    }));

    const response = await apiClient({
        api: 'incomes',
        service: '/create',
        verb: 'post',
        dataSend: {
            products: productData,
            description,
        },
    });
    return response.data;
};


export const getInventory = async ({ }) => {
    const response = await apiClient({
        api: 'incomes',
        service: '',
        verb: 'get',
    });
    return response.data;
};


export const getInventoryById = async (id) => {
    const respones = await apiClient({
        api: 'incomes',
        service: `/${id}`,
        verb: 'get',
        dataSend: {
            id,
        },
    });
    return respones.data;
};