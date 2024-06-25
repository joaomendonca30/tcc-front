import react, { useCallback, useEffect, useState } from 'react'
import closeButton from "../assets/close.svg"
import { Formik } from 'formik';
import { scheduleCreate } from '../api/schedule';
import { PatientModel } from '../api/patient';
import { UserModel } from '../api/user';
import axios from "axios";
import { baseURL } from '../config';
import { scheduleUpdate } from '../api/schedule';
import { ServicesModel } from '../api/service';
import { toast } from 'react-toastify';

interface ScheduleProps {
    info: any
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
    cancel: (refresh?: boolean, info?: string | UserModel) => void
}

type initialValues = {
    scheduleId: string,
    userId: string,
    patientId: string,
    start: string | undefined,
    end: string | undefined,
    title: string,
    scheduleType: string,
    scheduleStatus: "Agendado" | "Atendido" | "Faltou"
}

export function UpDateScheduleByCalendar({ info, setOpenModal, isOpen, cancel }: ScheduleProps) {

    const [professionalUser, setprofessionalUser] = useState<UserModel[]>([]);
    const [patient, setPatient] = useState<PatientModel[]>([]);
    const [service, setService] = useState<ServicesModel[]>([]);


    //Retornando os profissionais da saúde cadastrados
    const getUserProfessional = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}usuario/profissionaisDaSaude`);
            const data = await response.data;
            setprofessionalUser(data)
        } catch {
            console.log(`Deu ruim`)
        }
    }, [])

    //Retornando os pacientes cadastrados
    const getPatients = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}\paciente`);

            const data = response.data;
            setPatient(data)
        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    //Retornando os serviços cadastrados
    const getServices = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}\servicos`);
            const data = response.data;
            setService(data)
        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);


    useEffect(() => {
        getUserProfessional()
        getPatients()
        getServices()
    }, [getUserProfessional, getPatients, getServices])



    if (info) {

        const patientIdData = info.event.extendedProps.patientId
        const userIdData = info.event.extendedProps.userId
        const scheduleTypeData = info.event.extendedProps.scheduleType
        const scheduleIdData = info.event.extendedProps.scheduleId
        const scheduleStatusData = info.event.extendedProps.scheduleStatus

        const intialStartData = new Date(info.event.start)
        console.log('Inicio:' + intialStartData)


        const initialUserId = userIdData.userId
        const initialUserName = userIdData.name

        const initialPatientId = patientIdData.patientId
        const initialPatientName = patientIdData.name

        const initialScheduleId = scheduleTypeData.serviceId
        const initialScheduleDuration = scheduleTypeData.endDate
        const initialScheduleName = scheduleTypeData.name


        const { start, end, title } = info.event

        const initialValues: initialValues = {
            scheduleId: scheduleIdData,
            userId: userIdData.userId,
            patientId: patientIdData.patientId,
            start: start,
            end: end,
            title: title,
            scheduleType: initialScheduleName,
            scheduleStatus: scheduleStatusData,
        }


        const handleSubmit = async (values: typeof initialValues, action: any) => {
            const { start, scheduleType, userId, patientId, scheduleStatus } = values
            console.log(userId)

            let processedPatientId = ""
            let processedUserId = ""
            let processedUserName = ""
            let processedPatientName = ""
            let serviceDuration = ""
            let serviceName = ""
            let serviceDurationHour = 0
            let serviceDurationMinutes = 0
            let processedEnd: any = ''
            let processedStart: any = ''
            let startToDate: any = ''
            let startValidation: any = ''

            // configurando o fuso horário
            const opcoesFormatacao = { timeZone: 'America/Sao_Paulo' };

            if (start) {
                startValidation = new Date(start)
            }


            // Mudou o tipo da agenda ?
            if (initialScheduleName.toString() !== scheduleType.toString()) {
                const scheduleTypeInfo = scheduleType.split(",")
                serviceDuration = scheduleTypeInfo[1]
                serviceName = scheduleTypeInfo[0]


                //pegando a hora e os minutos
                const serviceDurationApart = serviceDuration.split(":")
                serviceDurationHour = Number(serviceDurationApart[0])
                serviceDurationMinutes = Number(serviceDurationApart[1])
            } else {
                console.log('tchau' + scheduleType)
                const serviceDurationApart = initialScheduleDuration.split(":")
                serviceDurationHour = Number(serviceDurationApart[0])
                serviceDurationMinutes = Number(serviceDurationApart[1])
                serviceName = scheduleType
            }

            //Mudou o tipo do agendamento, mas a hora ta igual
            if (startValidation && startValidation === intialStartData && initialScheduleName.toString() !== serviceName.toString()) {
                processedStart = new Date(startValidation)
                startToDate = new Date(startValidation)
                processedEnd = startToDate.setHours(startToDate.getHours() + serviceDurationHour)
                processedEnd = startToDate.setMinutes(startToDate.getMinutes() + serviceDurationMinutes)
            }

            // Mudou o inicio, mas não mudou o tipo do agendamento 
            if (startValidation && startValidation !== intialStartData && initialScheduleName.toString() === serviceName.toString()) {
                processedStart = new Date(startValidation)
                startToDate = new Date(startValidation)
                processedEnd = startToDate.setHours(startToDate.getHours() + serviceDurationHour)
                processedEnd = startToDate.setMinutes(startToDate.getMinutes() + serviceDurationMinutes)
                serviceName = initialScheduleName
            }

            //Se mudar o tipo de atendimento e o inicio
            if (startValidation && startValidation !== intialStartData && initialScheduleName.toString() !== serviceName.toString()) {
                processedStart = new Date(startValidation)
                startToDate = new Date(startValidation)
                processedEnd = startToDate.setHours(startToDate.getHours() + serviceDurationHour)
                processedEnd = startToDate.setMinutes(startToDate.getMinutes() + serviceDurationMinutes)


            }

            if (initialUserId != userId) {
                const userInfo = userId.split(",")
                processedUserId = userInfo[0]
                processedUserName = userInfo[1]
            } else if (initialUserId === userId) {
                processedUserId = initialUserId
                processedUserName = initialUserName
            }


            if (initialPatientId != patientId) {
                const patientInfo = patientId.split(",")
                processedPatientId = patientInfo[0]
                processedPatientName = patientInfo[1]
            } else if (initialPatientId === patientId) {
                processedPatientId = initialPatientId
                processedPatientName = initialPatientName
            }

            const processedValues = {
                scheduleId: scheduleIdData,
                userId: processedUserId,
                patientId: processedPatientId,
                start: start ? new Date(start).toLocaleString('pt-BR', opcoesFormatacao) : start,
                end: new Date(processedEnd).toLocaleString('pt-BR', opcoesFormatacao),
                title: `${serviceName} - ${processedPatientName} - Dr. ${processedUserName}`,
                scheduleType: serviceName,
                scheduleStatus,
            }

            console.log(processedValues)

            const promisse = scheduleUpdate(scheduleIdData, processedValues)

            toast.promise(promisse, {
                pending: 'Atualizando Agendamento',
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

        // const servicos = [
        //     {
        //         serviceId: "23",
        //         serviceCost: "50,00",
        //         name: "Clareamento Dantal",
        //         endDate: "01:00"
        //     },
        //     {
        //         serviceId: "20",
        //         serviceCost: "200,00",
        //         name: "Tratamento de Canal",
        //         endDate: "03:30"
        //     },
        //     {
        //         serviceId: "20",
        //         serviceCost: "200,00",
        //         name: "Retorno",
        //         endDate: "03:30"
        //     }

        // ]



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
                                Editar Agendamento
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
                                            <select className='border rounded-md border-lightgray shadow-sm p-3 mr-2 w-full'
                                                name='userId'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.userId}
                                                required
                                            >
                                                <option>{initialUserName}</option>
                                                {professionalUser.map((item, index) =>
                                                    <option value={[item.userId, item.name]}> {item.name} </option>)}
                                            </select>
                                        </div>

                                        <div className='flex flex-col'>
                                            <label className='text-primary text-base mr-2'>
                                                Nome do Paciente:
                                            </label>
                                            <select className='border rounded-md border-lightgray shadow-sm p-3 mr-2 w-full'
                                                name='patientId'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.patientId}
                                                required
                                            >
                                                <option>{initialPatientName}</option>
                                                {patient.map((item, index) =>
                                                    <option value={[item.patientId, item.name]}> {item.name} </option>)}
                                            </select>
                                        </div>

                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                Tipo de Consulta:
                                            </label>
                                            <select className='border rounded-md border-lightgray shadow-sm p-3'
                                                name='scheduleType'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.scheduleType}
                                                required>
                                                <option> {initialScheduleName} </option>
                                                {service.map((item, index) =>
                                                    <option value={item.endDate ? [item.name, item.endDate.toString(), item.serviceId] : item.serviceId
                                                    }> {item.name} </option>)}
                                            </select>
                                        </div>
                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                Horário de Início:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                type='datetime-local'
                                                min="2024-01-01"
                                                name='start'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.start}
                                            />
                                        </div>

                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                Status da Consulta:
                                            </label>
                                            <div className='flex'>
                                                <input className='border rounded-md border-lightgray shadow-sm p-3'
                                                    name='scheduleStatus'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value="Atendido"
                                                    type="radio" />
                                                <label>Atendido</label>

                                                <input className='border rounded-md border-lightgray shadow-sm p-3 ml-3'
                                                    name='scheduleStatus'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value="Faltou"
                                                    type="radio" />
                                                <label>Faltou</label>
                                            </div>

                                        </div>

                                        <div className='flex justify-end mt-3'>
                                            <button
                                                className='border border-primary px-6 py-2 rounded-full bg-primary text-white text-roboto hover:bg-white hover:text-black transition duration-200'
                                                type="submit" disabled={isSubmitting}>
                                                Atualizar
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