import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Schedules from '../pages/Schedules'
import Layout from '../components/layout';
import Stock from '../pages/Stock';
import Users from '../pages/Users';
import AddUser from '../components/AddUser';
import AddProduct from '../components/AddProduct';
import AddSchedule from '../components/AddSchedule';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AppRoutes: React.FC = () => (
    <Layout>
        <BrowserRouter>
            <Routes>
                <Route Component={Schedules} path='/' />
                <Route Component={Stock} path='/list/stock' />
                <Route Component={Users} path='/list/users' />
                <Route Component={AddUser} path='/usuario/criar' />
                <Route Component={AddProduct} path='/produto/criar' />
                <Route Component={AddSchedule} path='/agenda/criar' />
            </Routes>

        </BrowserRouter>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover />
    </Layout>
)

export default AppRoutes;