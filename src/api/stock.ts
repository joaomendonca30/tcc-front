
import api from "./axios";


export interface StockModel {
    name: string;
    quantity: string | number;
    producer: string;
    type: 'farmaco' | 'instrumento',
    startDate: null | Date;
    endDate: null | Date;
}

export const productCreate = async (
    payload: StockModel
) => {
    const { data } = await api.request({
        url: `estoque/inserir`,
        data: payload,
        method: 'POST',
    })

    return data;
};