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
    const [showUpDateScheduleByCalendar, setShowUpDateScheduleByCalendar] = useState<boolean>(false);
    const [scheduleInfo, setScheduleInfo] = useState<any>()

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
    //     events: {
    //         scheduleId: '1',
    //         userId: '1',
    //         start: '2024-03-17T19:16',
    //         end: '2024-03-17T19:30',
    //         title: 'Lucas Accarini',
    //         scheduleType: "Primeira consulta"
    //     }



    // }]



    // const [eventos, setEventos] = useState([
    //     {
    //         scheduleId: '1',
    //         patientId:`3`,
    //         userId: '1',
    //         start: '2024-03-17T18:00',
    //         end: '2024-03-17T18:30',
    //         title: `Retorno - Gabriella Accarini - Dr. Lucas Accarini`,
    //         scheduleType: "Primeira consulta"
    //     },

    //     {
    //         scheduleId: '2',
    //         patientId:`3`,
    //         userId: '1',
    //         start: '2024-03-17T19:00',
    //         end: '2024-03-17T19:30',
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
        setShowUpDateScheduleByCalendar(true)
        if (info) {
            setScheduleInfo(info)
        }

        callback && callback()
    };


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
                <UpDateScheduleByCalendar isOpen={showUpDateScheduleByCalendar} setOpenModal={setShowUpDateScheduleByCalendar} info={scheduleInfo} />
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
                    editable={true}
                    selectable
                    select={handleSelect}
                    eventClick={handleEventClick}

                />
            </div>

        </div >
    );
};

export default MyCalendar