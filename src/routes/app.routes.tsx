import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Schedules from '../pages/Schedules'
import Layout from '../components/layout';
import Stock from '../pages/Stock';
import Users from '../pages/Users';
import AddUser from '../components/AddUser';
import AddProduct from '../components/AddProduct';


const AppRoutes: React.FC = () => (
    <Layout>
        <BrowserRouter>
            <Routes>
                <Route Component={Schedules} path='/' />
                <Route Component={Stock} path='/list/stock' />
                <Route Component={Users} path='/list/users' />
                <Route Component={AddUser} path='/usuario/criar' />
                <Route Component={AddProduct} path='/produto/criar' />

            </Routes>
        </BrowserRouter>
    </Layout>
)

export default AppRoutes;