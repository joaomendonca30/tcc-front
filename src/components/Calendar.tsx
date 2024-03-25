import React, { useState, useCallback, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ScheduleModel, getProfessionalScheduleById } from '../api/schedule';
import axios from "axios";
import { baseURL } from '../config';
import { Formik } from 'formik';
import { AddScheduleByCalendar } from './AddScheduleByCalendar';
import { UpDateScheduleByCalendar } from './UpDateSchedule';
import { ScheduleDetails } from './ScheduleDetails';
import { DeleteSchedule } from './DeleteSchedule';




interface ProfessionalUserProps {
    userId: string,
    name: string,
    events: ScheduleModel[]

}

type initialValues = {
    userId: string
}

const MyCalendar = () => {

    const [professionalUser, setprofessionalUser] = useState<ProfessionalUserProps[]>([]);
    const [events, setEvents] = useState<ScheduleModel[]>([])
    const [showAddScheduleByCalendar, setShowAddScheduleByCalendar] = useState<boolean>(false);
    const [showScheduleDetails, setShowScheduleDetails] = useState<boolean>(false);
    const [scheduleInfo, setScheduleInfo] = useState<any>()
    const [showUpDateSchedule, setShowUpDateSchedule] = useState<boolean>(false);
    const [showDeleteSchedule, setShowDeleteSchedule] = useState<boolean>(false);
    const [toggleRefreshData, setToggleRefreshData] = useState<boolean>(false)





    // Get que retorna uma lista dos profissionais de saúde
    const getUserProfessional = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}usuario/profissionaisDaSaude`);
            const data = await response.data;
            setprofessionalUser(data)
        } catch {
            console.log(`Deu ruim`)
        }
    }, [])





    useEffect(() => {
        getUserProfessional()
    }, [getUserProfessional])



    // Requisição para retornar os eventos atrelados a agenda do profissional de saúde selecionado
    const initialValues: initialValues = {
        userId: '',
    }


    const handleSubmit = async (values: typeof initialValues, action: any) => {
        const { userId } = values

        const processedValues = {
            userId,
        }

        console.log(processedValues)
        const promisse = await getProfessionalScheduleById(processedValues.userId)
        const data = await promisse.data;
        setEvents(data)
    }




    // const professional = [{
    //     userId: '23',
    //     name: 'Gabriella Accarini',
    //     events: {
    //         scheduleId: '1',
    //         userId: '1',
    //         start: '2024-03-17T18:16',
    //         end: '2024-03-17T18:30',
    //         title: 'Gabriella Accarini',
    //         scheduleType: "Primeira consulta"
    //     }

    // },
    // {
    //     userId: '3',
    //     name: 'Lucas Accarini',
    //     events: [{
    //         scheduleId: '1',
    //         userId: {
    //             userId: "",
    //             name: "Gabriella Accarini",
    //             email: "gabi@gmail.com",
    //             cpf: "123456",
    //             phoneNumber: "2524757",
    //             profile: "oi",
    //             council: "blabla",
    //             federativeUnit: "SP"
    //         },
    //         patientId: {
    //             patientId: "",
    //             name: "Gabriella Accarini",
    //             email: "gabi@gmail.com",
    //             cpf: "123456",
    //             phoneNumber: "2524757",
    //             dateOfBirth: "05/12/1995",
    //             healthInsurance: "Bradesco",
    //             planNumber: "1538475487",
    //             specialNotes: "Olá como vai"
    //         },
    //         start: '2024-03-17T19:16',
    //         end: '2024-03-17T19:30',
    //         title: 'Lucas Accarini',
    //         scheduleType: "Primeira consulta"
    //     }]
    // }]
    // const [eventos, setEventos] = useState([
    //     {
    //         scheduleId: '1',
    //         patientId: `3`,
    //         userId: '1',
    //         start: '2024-03-24T18:00',
    //         end: '2024-03-24T18:30',
    //         title: `Retorno - Gabriella Accarini - Dr. Lucas Accarini`,
    //         scheduleType: "Primeira consulta"
    //     },

    //     {
    //         scheduleId: '2',
    //         patientId: `3`,
    //         userId: '23',
    //         start: '2024-03-24T19:00',
    //         end: '2024-03-24T19:30',
    //         title: `Retorno - Gabriella Accarini - Dr. Lucas Accarini`,
    //         scheduleType: "Primeira consulta"
    //     }
    // ])


    //Funçào para permitir a adição e deleção de consultas via calendário
    const handleSelect = (info: any, callback?: Function) => {
        setShowAddScheduleByCalendar(true)
        if (info) {
            setScheduleInfo(info)
        }

        callback && callback()
    };

    const handleEventClick = (info: any, callback?: Function) => {
        setShowScheduleDetails(true)
        if (info) {
            setScheduleInfo(info)
        }

        callback && callback()
    };


    const handleCancel = async (refresh: boolean = false, info?: any) => {
        if (refresh) {
            setToggleRefreshData(!toggleRefreshData)
        }
        setShowDeleteSchedule(false);
        setShowUpDateSchedule(false);

        const promisse = await getProfessionalScheduleById(info)
        const data = promisse.data;
        return setEvents(data)
    }


    return (
        <div>
            <div className='flex items-center justify-between py-5 w-full py-6'>
                <div className='w-3/4'>
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
                            <form onSubmit={handleSubmit} target="_self">
                                <div className='w-full'>

                                    <select className='border rounded-md border-lightgray shadow-sm p-3 w-9/12 mr-2'
                                        name='userId'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.userId}
                                    >
                                        <option>Selecione o profissional</option>
                                        {professionalUser.map((item, index) =>
                                            <option value={item.userId}> {item.name} </option>)}
                                    </select>

                                    <button
                                        className='border border-primary px-3 py-2 rounded-full bg-primary text-white text-roboto text-base hover:bg-white hover:text-black transition duration-200'
                                        type="submit" disabled={isSubmitting}>
                                        Buscar
                                    </button>

                                </div>
                            </form >
                        )}
                    </Formik >
                </div >
                <div >
                    <a
                        className="border border-secondary rounded-md p-3 text-base font-roboto text-darkgray hover:bg-primary hover:text-white md:text-sm md:p-2 sm:text-xs sm:p-1"
                        href="/agenda/criar">
                        Nova Consulta
                    </a>
                </div>
            </div >
            <div>
                <AddScheduleByCalendar isOpen={showAddScheduleByCalendar} setOpenModal={setShowAddScheduleByCalendar} info={scheduleInfo} />
            </div>
            <div>
                <ScheduleDetails isOpen={showScheduleDetails} setOpenModal={setShowScheduleDetails} info={scheduleInfo} setUpDateModal={setShowUpDateSchedule} setDeleteModal={setShowDeleteSchedule} />
                <UpDateScheduleByCalendar isOpen={showUpDateSchedule} setOpenModal={setShowUpDateSchedule} info={scheduleInfo} cancel={handleCancel} />
                <DeleteSchedule isOpen={showDeleteSchedule} setOpenModal={setShowDeleteSchedule} info={scheduleInfo} />
            </div>
            <div>
                <FullCalendar
                    headerToolbar={{
                        start: "today prev next",
                        center: "title",
                        end: "timeGridWeek timeGridDay"
                    }}
                    plugins={[dayGridPlugin, timeGrigPlugin, interactionPlugin]}
                    initialView={'timeGridDay'}
                    height={'60vh'}
                    events={events}
                    locale={`pt-br`}
                    selectable
                    select={handleSelect}
                    eventClick={handleEventClick}

                />
            </div>

        </div >
    );
};

export default MyCalendar