import react from 'react'
import logo from '../assets/UClinic_logo.png'



const Menu: React.FC = () => {
    return (
        <div className='w-screen bg-primary flex justify-between items-center px-5'>
            <img className='w-44 md:w-28 sm:w-24' src={logo} />
            <span className='text-white font-roboto text-lg md:text-sm sm:text-xs'>
                Olá, 'Nome do Usuário'
            </span>
        </div>
    );
}

export default Menu;