import React, {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'

export default function Login(){
	const [loginInfo, setLoginInfo] = useState({
		email: '',
		password: ''
	})
	const navigate = useNavigate();

	const handleInput = (e) => {
		setLoginInfo({...loginInfo, [e.target.name]:e.target.value})
	}

	const loginSubmit = (e) => {
		e.preventDefault();

		const data = {
			email: loginInfo.email,
			password: loginInfo.password
		}

		axios.post('/api/login_store', data).then(response => {
			if(response.data.status === 200){
				localStorage.setItem('auth_token',response.data.token);
				localStorage.setItem('username',response.data.username);
				Swal.fire('success',response.data.message,'success');
				navigate('/auth/dashboard',{
					replace: true
				})
			}
		}).catch(error => {
            console.log(error)
            // if(error.response.status === 500){
            //     Swal.fire('error',error.response.data.message,'error')
            // }
        })

	}

	return (
		<div className="bg-primary">
			<div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={loginSubmit}>
                                            <div className="form-floating mb-3">
                                                <input name="email" value={loginInfo.email} onChange={handleInput} className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                                <label htmlFor="inputEmail">Email address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input name="password" value={loginInfo.password} onChange={handleInput} className="form-control" id="inputPassword" type="password" placeholder="Password" />
                                                <label htmlFor="inputPassword">Password</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <button type="submit" className="btn btn-primary">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small">
                                        	<button type="submit">Need an account? Sign up!</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
		</div>
	)
}