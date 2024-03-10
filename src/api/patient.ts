import api from "./axios";


export interface PatientModel {
    patientId: string;
    name: string;
    email: string;
    cpf: string;
    phoneNumber: string
    dateOfBirth: null | Date | string,
    healthInsurance: string;
    planNumber?: string;
    specialNotes?: string
}

export const patientCreate = async (
    payload: Omit<PatientModel, `patientId`>
) => {
    const { data } = await api.request({
        url: `paciente/inserir`,
        data: payload,
        method: 'POST',
    })

    return data;
};

export const patientUpdate = async (
    patientId: string, params: any
) => {
    const { data } = await api.request({
        url: `paciente/editar/${patientId}`,
        data: params,
        method: 'PUT',
    })

    return data;
};


export const patientDelete = async (
    patientId: string
) => {
    await api.delete(`paciente/deletar/${patientId}`)
    return console.log(`Paciente deletado`)
}