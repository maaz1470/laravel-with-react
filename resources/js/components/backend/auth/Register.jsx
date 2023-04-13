import React, {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import toastr from 'toastr'
import {useNavigate} from 'react-router-dom'
import 'toastr/build/toastr.css'


export default function Register(){
	const [registerInfo, setRegisterInfo] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setRegisterInfo({...registerInfo, [e.target.name]:e.target.value})
	}

	const registerSubmit = (e) => {
		e.preventDefault();
		if(registerInfo.password !== registerInfo.confirmPassword){
			return toastr.error('Password and Confirm Password not match.');
		}
		const data = {
			firstName: registerInfo.firstName,
			lastName: registerInfo.lastName,
			email: registerInfo.email,
			password: registerInfo.password
		}

		axios.post('/api/register',data).then(response => {
			if(response.data.status === 200){
				setRegisterInfo({
					firstName: '',
					lastName: '',
					email: '',
					password: '',
					confirmPassword: ''
				})
				Swal.fire('Success',response.data.success,'success');
				navigate('/auth/login',{
					replace: true
				})
			}else{
				toastr.options.positionClass = 'toast-bottom-right'
				toastr.options.progressBar = true
				toastr.options.debug = false

				response.data.errors.forEach(el => {
					toastr.error(el)
				})
			}
		})
	}

	return (
		<div className="bg-primary">
			<div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={registerSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input name="firstName" value={registerInfo.firstName} onChange={handleChange} className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" />
                                                        <label htmlFor="inputFirstName">First name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input name="lastName" value={registerInfo.lastName} onChange={handleChange} className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" />
                                                        <label htmlFor="inputLastName">Last name</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input name="email" value={registerInfo.email} onChange={handleChange} className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                                <label htmlFor="inputEmail">Email address</label>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input name="password" value={registerInfo.password} onChange={handleChange} className="form-control" id="inputPassword" type="password" placeholder="Create a password" />
                                                        <label htmlFor="inputPassword">Password</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input name="confirmPassword" value={registerInfo.confirmPassword} onChange={handleChange} className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                                        <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 mb-0">
                                                <div className="d-grid">
                                                	<button type="submit" className="btn btn-primary btn-block" href="login.html">Create Account</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><a href="login.html">Have an account? Go to login</a></div>
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