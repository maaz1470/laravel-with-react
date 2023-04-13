import React, {useEffect, useState} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export default function EditCategory(props){
	const {categoryId} = useParams();
	const navigate = useNavigate();

	const [categoryInfo, setCategoryInfo] = useState({
		slug: '',
		name: '',
		description: '',
		status: '',
		meta_keywords: '',
		meta_title: '',
		meta_description: ''
	});
	const [loading, setLoading] = useState(true);

	const handleChange = (e) => {
		
		if(e.target.name == 'status'){
			setCategoryInfo({...categoryInfo, status: e.target.checked})
		}else{
			setCategoryInfo({...categoryInfo,[e.target.name]:e.target.value})
		}

		
	}

	const categorySubmit = (e) => {
		e.preventDefault();
	}

	useEffect(() => {
		axios.get('/api/get-category-using-id/' + categoryId).then(response => {
			if(response.data.status === 200){
				setCategoryInfo(
					{
						...categoryInfo, 
						slug: response.data.category.slug ?? '',
						name: response.data.category.name ?? '',
						description: response.data.category.description ?? '',
						status: response.data.category.status === 1 ? true : false,
						meta_keywords: response.data.category.meta_keywords ?? '',
						meta_title: response.data.category.meta_title ?? '',
						meta_description: response.data.category.meta_description ?? ''
					}
				)
			}else if(response.data.status === 404){
				Swal.fire('Error', response.data.message, 'error');
				navigate('/auth/all-categories',{
					replace: true
				})
			}
			setLoading(false)
		});

		return () => setCategoryInfo(
			{
				...categoryInfo, 
				slug: '',
				name: '',
				description: '',
				status: '',
				meta_keywords: '',
				meta_title: '',
				meta_description: ''
			}
		)
	},[])

	const updateCategorySubmit = (e) => {
		e.preventDefault();
		toastr.options.positionClass = 'toast-bottom-right'
		toastr.options.debug = false;
		toastr.options.progressBar = true;
		axios.post('/api/update-category/' + categoryId,categoryInfo).then(response => {

			if(response.data.status === 200){

				if(response.data.errors){

					response.data.errors.forEach(el => {
						toastr.error(el)
					})
				}else{
					Swal.fire('Success', response.data.message, 'success')
				}
			}else if(response.data.status === 404){
				Swal.fire('Error',response.data.message,'error')
			}else if(response.data.status === 500){
				Swal.fire('Error',response.data.message,'error')
			}else if(response.data.status === 422){
				Swal.fire('Error',response.data.message,'error')
			}
		});

	}

	if(loading){
		return <h1>Loading...</h1>
	}
	
	return (
		<>
			<div className="container-fluid px-4">
				<div className="card">
					<div className="card-header">
					<h4>Edit Category
						<Link to={'/auth/all-categories'} className="btn btn-primary btn-sm float-end">Back</Link>
					</h4>
				</div>

				<div className="card-body">
					<form onSubmit={updateCategorySubmit} id="category_form">
						<ul className="nav nav-tabs" id="myTab" role="tablist">
						  <li className="nav-item" role="presentation">
						    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-selected="true">Home</button>
						  </li>
						  <li className="nav-item" role="presentation">
						    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#seo-tabs" type="button" role="tab" aria-selected="false">Seo</button>
						  </li>
						</ul>
						<div className="tab-content card" id="myTabContent">
						  <div className="tab-pane card-body border fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
						  		<div className="form-group mb-3">
						  			<label htmlFor="slug">Slug</label>
						  			<input value={categoryInfo.slug} onChange={handleChange} type="text" id="slug" name="slug" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="name">Name</label>
						  			<input value={categoryInfo.name} onChange={handleChange} type="text" id="name" name="name" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="description">Description</label>
						  			<textarea value={categoryInfo.description} onChange={handleChange} id="description" name="description" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="status">Status</label>
						  			<input value={categoryInfo.status} onChange={handleChange} type="checkbox" id="status" name="status" />
						  		</div>
						  </div>
						  <div className="tab-pane card-body border fade" id="seo-tabs" role="tabpanel" aria-labelledby="seo-tabs" tabIndex="0">
						  		<div className="form-group mb-3">
						  			<label htmlFor="meta_keywords">Meta Keywords</label>
						  			<input value={categoryInfo.meta_keywords} onChange={handleChange} type="text" id="meta_keywords" name="meta_keywords" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="meta_title">Meta Title</label>
						  			<input value={categoryInfo.meta_title} onChange={handleChange} type="text" id="meta_title" name="meta_title" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="meta_description">Meta Description</label>
						  			<textarea value={categoryInfo.meta_description} onChange={handleChange} id="meta_description" name="meta_description" className="form-control" />
						  		</div>
						  </div>
						  <button type="submit" className="btn btn-primary">Submit</button>
						</div>
					</form>
				</div>
				</div>
			</div>
		</>
	)
}