import react, { ReactNode } from 'react';
import Menu from './mainHeader';
import Aside from './aside';
import Content from './content';


interface LayoutChildren {
    children: ReactNode
}

const Layout: React.FC<LayoutChildren> = ({ children }) => {

    const userString: any = localStorage.getItem('@welcome-app/loggedUser');

    let userObj: any = null

    if (userString !== null) {
        userObj = JSON.parse(userString)
    }

    return (
        <div className='w-full h-screen min-w-[350px] bg-white grid 
        grid-rows-[70px_auto] grid-cols-[220px_auto] md:grid-cols-[200px_auto] sm:grid-cols-[60px_auto]'>
            <Menu />
            <div className='flex bg-primary justify-end items-center px-5'>
                <span className='text-white font-roboto text-lg md:text-sm sm:text-xs'>
                    Olá, {userObj.name}
                </span>
            </div>
            <div className='bg-secondary'>
                <Aside />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout;