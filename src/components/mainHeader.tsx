import react from 'react'
import logo from '../assets/UClinic_logo.png'



const Menu: React.FC = () => {
    const userString: any = localStorage.getItem('@welcome-app/loggedUser');

    let userObj: any = null

    if (userString !== null) {
        userObj = JSON.parse(userString)
    }

    return (
        <div className='bg-primary w-full flex justify-between items-center px-5'>
            <img className='w-44 md:w-28 sm:w-24' src={logo} />
            
        </div>
    );
}

export default Menu;