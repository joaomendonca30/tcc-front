import api from "./axios";


export interface UserModel {
    userId: string;
    name: string;
    email: string;
    cpf: string;
    phoneNumber: string
    profile: 'Profissional da Saúde' | 'Recepcionista' | string,
    council?: null | string;
    federativeUnit?: null | string;
}

export const userCreate = async (
    payload: Omit<UserModel, `userId`>
) => {
    const { data } = await api.request({
        url: `usuario/inserir`,
        data: payload,
        method: 'POST',
    })

    return data;
};

export const userUpdate = async (
    userId: string, params: any
) => {
    const { data } = await api.request({
        url: `usuario/editar/${userId}`,
        data: params,
        method: 'PUT',
    })

    return data;
};


export const userDelete = async (
    userId: string
) => {
    await api.delete(`usuario/deletar/${userId}`)
    return console.log(`Usuario deletado`)
}