import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { info } from 'console';

const MyCalendar = () => {

    const events = [
        {
            title: "The title",
            start: "2024-02-25T08:00:00",
            end: "2024-02-25T09:00:00",
        }
    ]
    return (
        <div>
            <FullCalendar
                headerToolbar={{
                    start: "today prev next",
                    center: "title",
                    end: "dayGridMonth dayGridWeek dayGridDay",
                }}
                plugins={[dayGridPlugin, timeGrigPlugin, interactionPlugin]}
                initialView={'timeGridDay'}
                height={'90vh'}
                events={events}                            
            />
        </div>
    );
};

export default MyCalendar