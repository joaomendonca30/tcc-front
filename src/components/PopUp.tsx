import React from 'react';

interface PopUpProps {
  show: boolean;
  children: React.ReactNode
  
}

const PopUp: React.FC<PopUpProps> = ({ children, show }) => {
  return (
    <>
      {show ? (
        <div className="flex items-start justify-center fixed top-0 left-0 w-full min-h-screen bg-black z-50 bg-opacity-70 px-3 py-5 max-h-full overflow-y-auto ">
          {children}
        </div>
      ) : null}
    </>
  );
};

export default PopUp;