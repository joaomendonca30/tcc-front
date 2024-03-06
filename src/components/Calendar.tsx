import React, { useState, useCallback, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ScheduleModel, getProfessionalScheduleById } from '../api/schedule';
import axios from "axios";
import { baseURL } from '../config';
import { Formik } from 'formik';



interface ProfessionalUserProps {
    userId: string,
    name: string,
    events: ScheduleModel

}

type initialValues = {
    userId: string
}

const MyCalendar = () => {

    const [professionalUser, setprofessionalUser] = useState<ProfessionalUserProps[]>([]);
    const [events, setEvents] = useState<ScheduleModel[]>([])

    // Get que retorna uma lista dos profissionais de saúde
    const getUserProfessional = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}\profissional`);
            const data = await response.data;
            setprofessionalUser(data)
        } catch {
            console.log(`Deu ruim`)
        }
    }, [])

    useEffect(() => {
        getUserProfessional()
    }, [getUserProfessional])


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


    const professional = [{
        userId: '2',
        name: 'Gabriella Accarini',
        events: {
            scheduleId: '1',
            userId: '1',
            start: new Date(),
            end: new Date(),
            title: 'Gabriella Accarini',
            scheduleType: "Primeira consulta"
        }

    },
    {
        userId: '23',
        name: 'Lucas Accarini',
        events: {
            scheduleId: '1',
            userId: '1',
            start: new Date(),
            end: new Date(),
            title: 'Lucas Accarini',
            scheduleType: "Primeira consulta"
        }



    }]

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
                                        {professional.map((item, index) =>
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
                />
            </div>

        </div >
    );
};

export default MyCalendar