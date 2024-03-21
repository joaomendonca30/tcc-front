import react, { useCallback, useEffect, useState } from 'react'
import closeButton from "../assets/close.svg"
import { Formik } from 'formik';
import { PatientModel } from '../api/patient';
import { UserModel } from '../api/user';
import axios from "axios";
import { baseURL } from '../config';
import { scheduleUpdate } from '../api/schedule';
import { UpDateScheduleByCalendar } from './UpDateSchedule';
import { DeleteSchedule } from './DeleteSchedule';
import scheduleImage from '../assets/scheduleImage.png'

interface ScheduleProps {
    info: any
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
    setUpDateModal: (upDateOpen: boolean) => void
    setDeleteModal: (deleteOpen: boolean) => void
}

type initialValues = {
    userId: string,
    patientId: string,
    start: string | undefined,
    end: string | undefined,
    title: string,
    scheduleType: "Primeira consulta" | "Retorno" | "Procedimento"
}


export function ScheduleDetails({ info, setOpenModal, isOpen, setUpDateModal, setDeleteModal }: ScheduleProps) {

    const [professionalUser, setprofessionalUser] = useState<UserModel[]>([]);
    const [patient, setPatient] = useState<PatientModel[]>([]);
    const [showUpDateSchedule, setShowUpDateSchedule] = useState<boolean>(false);
    const [showDeleteSchedule, setShowDeleteSchedule] = useState<boolean>(false);
    const [scheduleInfo, setScheduleInfo] = useState<any>()

    if (info) {

        const patientIdData = info.event.extendedProps.patientId
        const userIdData = info.event.extendedProps.userId
        const scheduleTypeData = info.event.extendedProps.scheduleType
        const scheduleIdData = info.event.extendedProps.scheduleId
        const startDate = info.event.start
        const endDate = info.event.end


        const titleData = info.event.title
        const titleDataArray = titleData.split(' - ')
        const patientName = titleDataArray[1]
        const userName = titleDataArray[2].slice(4)
        const startDateProcessed = startDate.toLocaleDateString()
        const endDateProcessed = endDate.toLocaleDateString()
        const startHour = startDate.getHours()
        const startMinutes = String(startDate.getMinutes()).padStart(2, "0")
        const endHour = endDate.getHours()
        const endMinutes = String(endDate.getMinutes()).padStart(2, "0")


        console.log("Paciente Id: " + patientIdData)
        console.log("Profissional Id: " + userIdData)
        console.log("Tipo de agendamento: " + scheduleTypeData)
        console.log("Id do agendamento: " + scheduleIdData)
        console.log("Inicio: " + startDate.toLocaleDateString())


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


        const handleUpDateSchedule = (info: any, callback?: Function) => {
            setUpDateModal(true)
            setOpenModal(false)

            if (info) {
                setScheduleInfo(info)
                console.log(scheduleInfo)
            }

            callback && callback()
        };

        const handleDeleteSchedule = (info: any, callback?: Function) => {
            setDeleteModal(true)
            setOpenModal(false)

            if (info) {
                setScheduleInfo(info)
                console.log(scheduleInfo)
            }

            callback && callback()
        };

        if (isOpen) {
            return (
                <div>
                    <div className='flex items-start justify-center fixed top-0 left-0 w-full bg-black z-50 bg-opacity-70 bg-black z-50 bg-opacity-70 '>
                        <div className='bg-white rounded w-screen h-screen p-8'>
                            <div className='flex justify-end'>
                                <button
                                    onClick={() => setOpenModal(false)}>
                                    <img src={closeButton} />
                                </button>
                            </div>

                            <div className='flex justify-center w-full mt-8'>
                                <h1 className="mx-8 mb-8 px-8 py-3  w-full border border-secondary rounded-full font-roboto text-darkgray text-lg text-center md:mx-6 md:my-4 md:px-6 md:py-2 md:text-base sm:mx-4 sm:my-2 sm:px-4 sm:py-2 sm:text-sm">
                                    Detalhes da Consulta
                                </h1>
                            </div>
                            <div className='flex justify-end mr-10 my-3'>
                                <button
                                    className='border border-primary px-6 py-2 rounded-md bg-primary text-white text-roboto hover:bg-white hover:text-black transition duration-200 mr-3'
                                    onClick={() => handleUpDateSchedule(info)}
                                > Editar
                                </button>
                                <button
                                    className='border border-warning px-6 py-2 rounded-md bg-warning text-white text-roboto hover:bg-white hover:text-black transition duration-200'
                                    onClick={() => handleDeleteSchedule(info)}
                                > Excluir
                                </button>
                            </div>
                            <div className='w-full sm:h-full  grid grid-cols-2 grid-rows-1 gap-3 sm:flex sm:flex-col sm:items-center'>
                                <div className="columns-1 col-span-1 col-span-1 sm:h-1/4 sm:flex sm:justify-center h-1/5 ">
                                    <img alt='' src={scheduleImage}
                                        className='w-2/3 ml-3 sm:w-3/6 sm:mb-3' />
                                </div>
                                <div className='font-roboto text-darkgray columns-1 col-span-1 sm:flex' >

                                    <div className='w-full h-full flex items-center '>
                                        <div className="h-2/5 w-full md:h-auto sm:h-auto flex flex-col items-start justify-around border-secondary border rounded-2xl shadow-lg px-8 py-3 lg:mr-10 sm:mr-0">
                                            <div>
                                                <span className='text-base sm:text-sm'><strong>Nome do Profissional da Saúde :</strong> {userName} </span>
                                            </div>
                                            <div>
                                                <span className='text-base sm:text-sm'><strong>Nome do Paciente Agendado :</strong> {patientName} </span>
                                            </div>
                                            <div>
                                                <span className='text-base sm:text-sm'><strong>Tipo do Agendamento :</strong> {scheduleTypeData} </span>
                                            </div>
                                            <div>
                                                <span className='text-base sm:text-sm'><strong>Data e Horário de Início :</strong> {startDateProcessed + " " + startHour + ":" + startMinutes}  </span>
                                            </div>
                                            <div>
                                                <span className='text-base'><strong>Data e Horário de Início :</strong> {endDateProcessed + " " + endHour + ":" + endMinutes}  </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >

                </div >
            )

        } else {
            return <></>
        }
    }
    return <></>
}