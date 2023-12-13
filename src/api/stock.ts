
import api from "./axios";


export interface StockModel {
    productId: string;
    name: string;
    quantity: string | number;
    producer: string;
    type: 'farmaco' | 'instrumento' | string,
    startDate: null | Date | string;
    endDate: null | Date | string;
}

export const productCreate = async (
    payload: Omit<StockModel, `productId`>
) => {
    const { data } = await api.request({
        url: `estoque/inserir`,
        data: payload,
        method: 'POST',
    })

    return data;
};

export const productUpdate = async (
    productId: string, params: any
) => {
    const { data } = await api.request({
        url: `estoque/editar${productId}`,
        data: params,
        method: 'PUT',
    })

    return data;
};


export const productDelete = async (
    productId: string
) => {
    await api.delete(`estoque/deletar/${productId}`)
    return console.log(`Produto deletado`)
}