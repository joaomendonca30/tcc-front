import react, { ReactNode } from 'react'

interface ContentProps {
    children: ReactNode,
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <div >
            {children}
        </div>
    );
}

export default Content;