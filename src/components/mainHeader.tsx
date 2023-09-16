import react from 'react'
import logo from '../assets/UClinic_logo.png'



const Menu: React.FC = () => {
    return (
        <div className='w-screen bg-primary flex justify-between items-center px-5'>
            <img className='w-44' src={logo} />
            <span className='text-white font-roboto text-lg'>
                Olá, 'Nome do Usuário'
            </span>
        </div>
    );
}

export default Menu;