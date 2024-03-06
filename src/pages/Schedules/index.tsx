import React from "react";
import MyCalendar from "../../components/Calendar";

const Schedules: React.FC = () => {
    return (
        <div>

            <div className="mt-4 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <h1 className="mx-8 my-6 px-8 py-3 border border-secondary rounded-full font-roboto text-darkgray text-base text-center md:mx-6 md:my-4 md:px-6 md:py-2 md:text-base sm:mx-4 sm:my-2 sm:px-4 sm:py-2 sm:text-sm">
                    Agendamentos
                </h1>                

                <div className="overflow-x-hidden mx-8">
                    <MyCalendar />
                </div>
            </div>


        </div>


    )
}

export default Schedules;