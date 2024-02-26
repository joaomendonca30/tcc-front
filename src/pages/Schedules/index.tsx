import React from "react";
import MyCalendar from "../../components/Calendar";

const Schedules: React.FC = () => {
    return (
        <div className="overflow-x-hidden mx-8">
            <MyCalendar />
        </div>
    )
}

export default Schedules;