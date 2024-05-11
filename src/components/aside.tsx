import react from 'react'
import calendar from '../assets/schedule.svg'
import user from '../assets/user.svg'
import doctor from '../assets/doctor.svg'
import stock from '../assets/stock.svg'
import patient from '../assets/patient.svg'
import config from '../assets/config.svg'
import logout from '../assets/logout.svg'
import service from '../assets/service.svg'



const Aside: React.FC = () => {

    const usuarios = {
        userId: "",
        name: "",
        email: "",
        cpf: "",
        phoneNumber: "",
        profile: '',
        council: "",
        federativeUnit: "",
        password: ""
    }

    return (
        <div className='flex flex-col mt-20 ml-2'>
            <a className='flex items-center hover:bg-white mr-2 p-2 cursor-pointer'
                href='/schedule'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={calendar} />
                <span className=' text-base font-medium md:text-sm sm:hidden'> Atendimentos </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/users'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={user} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Usuários </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/patients'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={patient} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Pacientes </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/professional'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={doctor} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Profissionais </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/services'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={service} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Serviços </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/list/stock'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={stock} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Estoque </span>
            </a>
            <a className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                href='/configuration'>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={config} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Configuração </span>
            </a>
            <button className='flex items-center mt-5 hover:bg-white mr-2 p-2 cursor-pointer'
                onClick={() => {
                    localStorage.setItem('@welcome-app/loggedUser', JSON.stringify(usuarios))
                    setTimeout(function () { window.location.href = '/' }, 1500);
                }}>
                <img className='w-10 mr-2 md:w-8 sm:w-6' src={logout} />
                <span className=' text-base font-medium md:text-sm sm:text-xs sm:hidden'> Saír </span>
            </button>
        </div>
    );
}

export default Aside;