import api from "./axios";


export interface ServicesModel {
    serviceId: string;
    name: string;
    serviceCost: string | number;
    endDate?: null | Date | string;
}

export const serviceCreate = async (
    payload: Omit<ServicesModel, `serviceId`>
) => {
    const { data } = await api.request({
        url: `servico/inserir`,
        data: payload,
        method: 'POST',
    })

    return data;
};

export const serviceUpdate = async (
    serviceId: string, params: any
) => {
    const { data } = await api.request({
        url: `servico/editar/${serviceId}`,
        data: params,
        method: 'PUT',
    })

    return data;
};


export const serviceDelete = async (
    serviceId: string
) => {
    await api.delete(`servico/deletar/${serviceId}`)
    return console.log(`Servico deletado`)
}