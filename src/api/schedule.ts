import api from "./axios";


export interface ScheduleModel {
    scheduleId: string
    userId: string,
    patientId: string,
    start: Date | undefined | string,
    end: Date | undefined | string,
    title: string,
    scheduleType: "Primeira consulta" | "Retorno" | "Procedimento"
}

export const scheduleCreate = async (
    payload: Omit<ScheduleModel, `scheduleId`>
) => {
    const { data } = await api.request({
        url: `agenda/inserir`,
        data: payload,
        method: 'POST',
    })

    return data;
};

export const scheduleUpdate = async (
    scheduleId: string, params: any
) => {
    const { data } = await api.request({
        url: `agenda/editar/${scheduleId}`,
        data: params,
        method: 'PUT',
    })

    return data;
};


export const scheduleDelete = async (
    scheduleId: string
) => {
    await api.delete(`agenda/deletar/${scheduleId}`)
    return console.log(`Agendamento deletado`)
}

export const getProfessionalScheduleById = async (userId: string) => {
    const { data } = await api.request({
        method: 'get',
        url: `agenda/${userId}`,
    });
    return data;
};