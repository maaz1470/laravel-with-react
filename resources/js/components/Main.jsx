import React from "react";
import '../assets/backend/css/styles.css';
import '../assets/backend/js/scripts';
import MasterLayout from "./backend/MasterLayout";
import Dashboard from "./backend/pages/Dashboard";
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './backend/auth/Login';
import Register from './backend/auth/Register'
import axios from 'axios'
import Category from './backend/pages/category/Category'
import AllCategories from './backend/pages/category/AllCategories'
import EditCategory from './backend/pages/category/EditCategory'
import AddProduct from './backend/pages/product/AddProduct'
import PrivateRoutes from './backend/Routes/PrivateRoutes'
axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : null;
    return config;
})
export default function Main(){
    return (
        <div>
            <Routes>
                <Route path="/auth/*" element={<PrivateRoutes />}>
                    <Route path="dashboard" element={
                        <MasterLayout>
                            <Dashboard />
                        </MasterLayout>
                    } />
                    <Route path="add-category" element={
                        <MasterLayout>
                            <Category />
                        </MasterLayout>
                    } />
                    <Route path="all-categories" element={
                        <MasterLayout>
                            <AllCategories />
                        </MasterLayout>
                    } />
                    <Route path="edit-category/:categoryId" element={
                        <MasterLayout>
                            <EditCategory />
                        </MasterLayout>
                    } />
                    <Route path="add-product" element={
                        <MasterLayout>
                            <AddProduct />
                        </MasterLayout>
                    } />
                </Route>
                <Route path="/auth/login" element={ <Login /> } />
                <Route path="/auth/register" element={ localStorage.getItem('auth_token') ? <Navigate to="/auth/dashboard" /> : <Register /> } />
                <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
            
        </div>
    )
}