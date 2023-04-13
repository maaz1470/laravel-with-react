import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
export default function Navbar(){
    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(response => {
            if(response.status === 200){
                localStorage.removeItem('auth_token')
                localStorage.removeItem('username')
                Swal.fire('success',response.data.message,'success')
                navigate('/auth/login',{
                    replace: true
                })
            }
        }).catch(error => {
            if(error.response.status === 500){
                Swal.fire(error.response.data.message)
            }
        })
    }
    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand ps-3" href="index.html">Start Bootstrap</a>
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </form>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#!">Settings</a></li>
                            <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" type="logout" onClick={logout}>Logout</button></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    )
}