import react, { useCallback, useEffect, useState } from 'react'
import closeButton from "../assets/close.svg"
import { Formik } from 'formik';
import { patientHistoryCreate } from '../api/patientHistory';
import { PatientHistoryModel } from '../api/patientHistory';
import { UserModel } from '../api/user';
import { toast } from 'react-toastify';

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

export function AddPatientHistory({ info, setOpenModal, isOpen, cancel }: ScheduleProps) {

    const [patientHistory, setprofessionalHistory] = useState<PatientHistoryModel[]>([]);

    function dataAtualFormatada(data: any) {
        const dataF = new Date(data)
        const dia = dataF.getDate().toString()
        const diaF = (dia.length == 1) ? '0' + dia : dia
        const mes = (dataF.getMonth() + 1).toString() //+1 pois no getMonth Janeiro começa com zero.
        const mesF = (mes.length == 1) ? '0' + mes : mes
        const anoF = dataF.getFullYear()
        return diaF + "/" + mesF + "/" + anoF;
    }


    if (info) {

        const patientIdData = info.event.extendedProps.patientId
        const userIdData = info.event.extendedProps.userId
        const scheduleTypeData = info.event.extendedProps.scheduleType
        const scheduleIdData = info.event.extendedProps.scheduleId
        const scheduleStatusData = info.event.extendedProps.scheduleStatus

        const initialUserId = userIdData.userId
        const initialUserName = userIdData.name

        const initialPatientId = patientIdData.patientId
        const initialPatientName = patientIdData.name

        const { start, end, title } = info.event

        const initialValues: initialValues = {
            historyId: '',
            scheduleId: scheduleIdData,
            professionalName: initialUserName,
            patientId: patientIdData.patientId,
            sheduleDate: start,
            scheduleNotes: '',
        }


        const handleSubmit = async (values: typeof initialValues, action: any) => {
            const { scheduleId, professionalName, patientId, sheduleDate, scheduleNotes } = values


            let processedPatientId = ""
            let processedUserId = ""
            let processedUserName = ""
            let processedPatientName = ""


            const processedValues = {
                scheduleId: scheduleIdData,
                professionalName: initialUserName,
                patientId: patientIdData.patientId,
                sheduleDate: start,
                scheduleNotes,
            }

            console.log(processedValues)

            const promisse = patientHistoryCreate(processedValues)

            toast.promise(promisse, {
                pending: 'Adicionando ao historico',
                success: {
                    render() {
                        action.setSubmitting(false);
                        cancel(true, processedUserId);
                        return 'Agendamento atualizado';
                    },
                },
                error: {
                    render({ data }) {
                        action.setSubmitting(false);
                        cancel(true, processedUserId);
                        return 'Algo deu errado';
                    },
                },
            });

        }



        // const profissional = [{
        //     userId: '2',
        //     name: 'Gabriella Accarini',
        //     events: {
        //         scheduleId: '1',
        //         userId: '1',
        //         patientId: `1`,
        //         start: new Date(),
        //         end: new Date(),
        //         title: 'Gabriella Accarini',
        //         scheduleType: "Primeira consulta"
        //     }

        // },
        // {
        //     userId: '23',
        //     name: 'Lucas Accarini',
        //     events: {
        //         scheduleId: '2',
        //         userId: '1',
        //         patientId: `2`,
        //         start: new Date(),
        //         end: new Date(),
        //         title: 'Lucas Accarini',
        //         scheduleType: "Primeira consulta"
        //     }



        // }]

        // const pacientes = [{
        //     patientId: "2",
        //     name: "Gabriella Accarini",
        //     email: "gabi@gmail.com",
        //     cpf: "123456",
        //     phoneNumber: "2524757",
        //     dateOfBirth: "05/12/1995",
        //     healthInsurance: "Bradesco",
        //     planNumber: "1538475487",
        //     specialNotes: "Olá como vai"
        // },
        // {
        //     patientId: "23",
        //     name: "Lucas Accarini",
        //     email: "lucas@gmail.com",
        //     cpf: "78910",
        //     phoneNumber: "2524757",
        //     dateOfBirth: "03/06/1997",
        //     healthInsurance: "Bradesco",
        //     planNumber: "1538475487",
        //     specialNotes: "Olá como vai"
        // }]


        if (isOpen) {
            return (
                <div className='flex items-start justify-center fixed top-0 left-0 w-full min-h-screen bg-black z-50 bg-opacity-70 px-3 py-5 max-h-full overflow-y-auto m-5'>
                    <div className='bg-white p-8 rounded w-11/12 md:w-5/12'>
                        <div className='flex justify-end'>
                            <button
                                onClick={() => setOpenModal(false)}>
                                <img src={closeButton} />
                            </button>
                        </div>
                        <div className='flex justify-center'>
                            <h2 className='text-lg font-roboto text-primary font-semibold'>
                                Incluir Atendimento
                            </h2>
                        </div>
                        <div className='mt-12'>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    isSubmitting
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className='flex flex-col'>
                                            <label className='text-primary text-base mr-2'>
                                                Nome do Profissional:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-3 mr-2 w-full'
                                                name='professionalName'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder={initialUserName}
                                                disabled
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label className='text-primary text-base mr-2'>
                                                Nome do Paciente:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-3 mr-2 w-full'
                                                name='patientId'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder={initialPatientName}
                                                disabled                                                
                                            />
                                        </div>

                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                Data da Consulta:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                type='text'
                                                name='start'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder={dataAtualFormatada(start)}
                                                disabled
                                                required />
                                        </div>

                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                Evolução da Consulta:
                                            </label>
                                            <textarea className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='scheduleNotes'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.scheduleNotes}
                                                placeholder='Bloco para anotações'
                                            />
                                        </div>

                                        <div className='flex justify-end mt-3'>
                                            <button
                                                className='border border-primary px-6 py-2 rounded-full bg-primary text-white text-roboto hover:bg-white hover:text-black transition duration-200'
                                                type="submit" disabled={isSubmitting}>
                                                Finalizar Atendimento
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
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