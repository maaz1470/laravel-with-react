import React, {useEffect, useState} from 'react'
import {Outlet, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function PrivateRoutes(){
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	useEffect(() => {
		axios.get('/api/checkAuthentication').then(response => {
			if(response){
				if(response.data.status === 200){
					setAuthenticated(true)
				}else if(response.data.status === 403){
					Swal.fire('Forbidden',response.data.message,'error')
				}
				setLoading(false)
			}
		})
		return () => {
			setAuthenticated(false)
		}
	},[])
	axios.interceptors.response.use(undefined,function axiosRetryInterceptor(error){
		if(error.response){
			if(error.response.status === 401){
				Swal.fire('Unauthorized',error.response.data.message,'error');
				navigate('/auth/login',{
					replace: true
				})
			}
		}

		return Promise.reject(error);
	})
	axios.interceptors.response.use(function(response){
		return response;
	},function(error){
		if(error.response.status === 401){

			Swal.fire('Forbidden',error.response.data.message,'error');
			navigate('/auth/login',{
				replace: true
			})
		}else if(error.response.status === 403){
			Swal.fire('Unauthorized',error.response.data.message,'error');
			localStorage.getItem('auth_token') ? localStorage.removeItem('auth_token') : null;
			navigate('/auth/login',{
				replace: true
			})
		}

	})
	if(loading){
		return <h1>Loading...</h1>
	}
	return authenticated ? <Outlet /> : <Navigate to="/auth/login" />
}