import react, { useCallback, useEffect, useState } from 'react'
import closeButton from "../assets/close.svg"
import { Formik } from 'formik';
import { scheduleCreate } from '../api/schedule';
import { PatientModel } from '../api/patient';
import { UserModel } from '../api/user';
import axios from "axios";
import { baseURL } from '../config';

interface ScheduleProps {
    info: any
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
}

type initialValues = {
    userId: string,
    patientId: string,
    start: string | undefined,
    end: string | undefined,
    title: string,
    scheduleType: "Primeira consulta" | "Retorno" | "Procedimento"
}


export function AddScheduleByCalendar({ info, setOpenModal, isOpen }: ScheduleProps) {

    const [professionalUser, setprofessionalUser] = useState<UserModel[]>([]);
    const [patient, setPatient] = useState<PatientModel[]>([]);

    const getUserProfessional = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}usuario/profissionaisDaSaude`);
            const data = await response.data;
            setprofessionalUser(data)
        } catch {
            console.log(`Deu ruim`)
        }
    }, [])

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


    useEffect(() => {
        getUserProfessional()
        getPatients()
    }, [getUserProfessional, getPatients])



    if (info) {
        const { start, end } = info



        const initialValues: initialValues = {
            userId: '',
            patientId: '',
            start: start,
            end: end,
            title: '',
            scheduleType: "Primeira consulta"
        }



        const handleSubmit = async (values: typeof initialValues, action: any) => {
            const { userId, patientId, scheduleType } = values


            let processedPatientId = patientId[0]
            let processedUserId = userId[0]

            const processedValues = {
                userId: processedUserId,
                patientId: processedPatientId,
                start,
                end,
                title: `${scheduleType} - ${patientId.slice(2)} - Dr. ${userId.slice(2)}`,
                scheduleType
            }


            console.log(processedValues)

            const promisse = scheduleCreate(processedValues)

            setTimeout(function () { window.location.reload(); }, 1500);
            window.alert("Nova Consulta Adicionada Com Sucesso")
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
        //     userId: '3',
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
        //     patientId: "1",
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
        //     patientId: "2",
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
                                Novo Agendamento
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
                                                <option>Selecione</option>
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
                                                <option>Selecione</option>
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
                                                value={values.scheduleType}>
                                                <option> Selecione </option>
                                                <option> Primeira consulta </option>
                                                <option> Retorno </option>
                                                <option> Procedimento </option>
                                            </select>
                                        </div>

                                        <div className='flex justify-end mt-3'>
                                            <button
                                                className='border border-primary px-6 py-2 rounded-full bg-primary text-white text-roboto hover:bg-white hover:text-black transition duration-200'
                                                type="submit" disabled={isSubmitting}>
                                                Cadastrar
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
