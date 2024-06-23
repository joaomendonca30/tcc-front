import react, { useCallback, useEffect, useState } from 'react'
import closeButton from "../assets/close.svg"
import { PatientHistoryModel } from '../api/patientHistory';
import { UserModel } from '../api/user';
import axios from "axios";
import { baseURL } from '../config';

interface ScheduleProps {
    info: any
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
    cancel: (refresh?: boolean, info?: string | UserModel) => void
}



type initialValues = {
    historyId: string,
    patientId: string,
    scheduleId: string,
    sheduleDate: string | undefined,
    scheduleNotes: string,
    professionalName: string
}

export function PatientLatestSchedule({ info, setOpenModal, isOpen, cancel }: ScheduleProps) {
    const [latestPatientSchedule, setLatestPatientSchedule] = useState<PatientHistoryModel[]>([]);

    function dataAtualFormatada(data: any) {
        const dataF = new Date(data)
        const dia = dataF.getDate().toString()
        const diaF = (dia.length == 1) ? '0' + dia : dia
        const mes = (dataF.getMonth() + 1).toString() //+1 pois no getMonth Janeiro começa com zero.
        const mesF = (mes.length == 1) ? '0' + mes : mes
        const anoF = dataF.getFullYear()
        return diaF + "/" + mesF + "/" + anoF;
    }

    //Retornando os ultimos atendimentos
    const getPatientLastSchedule = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}paciente/ultimasConsultas`);
            const data = await response.data;
            setLatestPatientSchedule(data)
        } catch {
            console.log(`Deu ruim`)
        }
    }, [])


    useEffect(() => {
        getPatientLastSchedule()
    }, [getPatientLastSchedule])


    if (info) {
        const patientIdData = info.event.extendedProps.patientId
        const initialPatientId = patientIdData.patientId
        console.log("Teste-- >" + initialPatientId)
        // const patientIdTest = "24"
        // const patientHistory = [{
        //     historyId: "1",
        //     patientId: "22",
        //     scheduleId: "4",
        //     sheduleDate: "05/12/2023",
        //     scheduleNotes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        //     professionalName: "Gabriella Accarini"
        // },
        // {
        //     historyId: "1",
        //     patientId: "23",
        //     scheduleId: "4",
        //     sheduleDate: "05/12/2023",
        //     scheduleNotes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        //     professionalName: "Gabriella Accarini"
        // },
        // {
        //     historyId: "1",
        //     patientId: "22",
        //     scheduleId: "4",
        //     sheduleDate: "07/12/2023",
        //     scheduleNotes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        //     professionalName: "Gabriella Accarini"
        // },
        // {
        //     historyId: "1",
        //     patientId: "25",
        //     scheduleId: "4",
        //     sheduleDate: "05/12/2023",
        //     scheduleNotes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        //     professionalName: "Gabriella Accarini"
        // },
        // {
        //     historyId: "1",
        //     patientId: "22",
        //     scheduleId: "4",
        //     sheduleDate: "10/12/2023",
        //     scheduleNotes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        //     professionalName: "Gabriella Accarini"
        // },
        // ]

        const latestPatientScheduleProcessed = latestPatientSchedule.filter(item => item.patientId.toString() === initialPatientId.toString())


        if (isOpen) {
            return (
                <div className='flex items-start justify-center fixed top-0 left-0 w-full min-h-screen bg-black z-50 bg-opacity-70 px-3 py-5 max-h-full overflow-y-auto'>
                    <div className='bg-white p-8 rounded w-11/12 md:w-5/12'>
                        <div className='flex justify-end'>
                            <button
                                onClick={() => setOpenModal(false)}>
                                <img src={closeButton} />
                            </button>
                        </div>
                        <div className='flex justify-center'>
                            <h2 className='text-lg font-roboto text-primary font-semibold'>
                                Ultimos Atendimentos
                            </h2>
                        </div>
                        <div className='mt-12'>
                            {latestPatientScheduleProcessed.length === 0 ?
                                <div> Não tem atendimentos anteriores </div>
                                :
                                latestPatientScheduleProcessed.map((item, index) =>

                                    item.patientId.toString() === initialPatientId.toString() ?
                                        <div className='mt-2 border rounded-md p-3 '>
                                            <p className='mb-2 font-semibold'> Data do Atendimento: {item.sheduleDate} </p>
                                            <p className='font-semibold'>Evolução do Atendimento:</p>
                                            <p>
                                                {item.scheduleNotes}
                                            </p>
                                        </div>
                                        :
                                        ""
                                )}

                        </div>

                    </div>
                </div>
            )

        } else {
            return <></>
        }
    }
    return <></>
}
