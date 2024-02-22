import react from 'react'
import calendar from '../assets/schedule.svg'
import user from '../assets/user.svg'
import doctor from '../assets/doctor.svg'
import stock from '../assets/stock.svg'
import patient from '../assets/patient.svg'



const Aside: React.FC = () => {
    return (
        <div className='flex flex-col mt-20 ml-2'>
            <a className='flex items-center hover:bg-white mr-2 p-2 cursor-pointer'
                href='/'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={calendar} />
                <span className=' text-base font-medium md:text-sm sm:hidden'> Atendimentos </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/users'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={user} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Usuários </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/clients'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={patient} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Clientes </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/doctors'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={doctor} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Doutores </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/stock'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={stock} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Estoque </span>
            </a>
        </div>
    );
}

export default Aside;