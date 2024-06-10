import api from "./axios";


export interface PatientHistoryModel {
    historyId: string,
    patientId: string;
    scheduleId: string;
    sheduleDate: string | undefined;
    scheduleNotes: string
    professionalName: string
}

export const patientHistoryCreate= async (
    payload: Omit<PatientHistoryModel, `historyId`>
) => {
    const { data } = await api.request({
        url: `paciente/criarHistorico`,
        data: payload,
        method: 'POST',
    })

    return data;
};