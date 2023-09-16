import react, { ReactNode } from 'react';
import Menu from './mainHeader';
import Aside from './aside';
import Content from './content';


interface LayoutChildren {
    children: ReactNode
}

const Layout: React.FC<LayoutChildren> = ({ children }) => {
    return (
        <div className='w-full h-screen min-w-[315px] bg-white grid 
        grid-rows-[70px_auto] grid-cols-[250px_auto]'>
            <Menu />
            <div>
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