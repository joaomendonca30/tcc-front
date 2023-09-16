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
                <img className='w-10 mr-2' src={calendar} />
                <span className=' text-lg font-medium'> Atendimentos </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/users'>
                <img className='w-10 mr-2' src={user} />
                <span className=' text-lg font-medium'> Usuários </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/clients'>
                <img className='w-10 mr-2' src={patient} />
                <span className=' text-lg font-medium'> Clientes </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/doctors'>
                <img className='w-10 mr-2' src={doctor} />
                <span className=' text-lg font-medium'> Doutores </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/stock'>
                <img className='w-10 mr-2' src={stock} />
                <span className=' text-lg font-medium'> Estoque </span>
            </a>
        </div>
    );
}

export default Aside;