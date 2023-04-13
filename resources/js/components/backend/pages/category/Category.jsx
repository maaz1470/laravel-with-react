import React, {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
export default function Category(){
	const [categoryInfo, setCategoryInfo] = useState({
		slug: '',
		name: '',
		description: '',
		status: '',
		meta_keywords: '',
		meta_title: '',
		meta_description: ''
	});
	const handleChange = (e) => {
		setCategoryInfo({...categoryInfo,[e.target.name]:e.target.value})
	}
	const categorySubmit = (e) => {
		e.preventDefault();
		const data = {
			slug: categoryInfo.slug,
			name: categoryInfo.name,
			description: categoryInfo.description,
			status: categoryInfo.status,
			meta_keywords: categoryInfo.meta_keywords,
			meta_title: categoryInfo.meta_title,
			meta_description: categoryInfo.meta_description,
		}
		axios.post('/api/category_store',data).then((response) =>{
			if(response){
				if(response.data.errors){
					toastr.options.positionClass = 'toast-bottom-right'
					toastr.options.progressBar = true
					toastr.options.debug = false
					response.data.errors.forEach(el => {

						toastr.error(el)
					})
				}else{
					Swal.fire('Success',response.data.message,'success')
					setCategoryInfo({
						...categoryInfo,
						slug:'',
						name: '',
						description: '',
						status: '',
						meta_keywords: '',
						meta_title: '',
						meta_description: ''
					})
				}
			}
		})

	}
	return (
		<>
			<div className="container-fluid px-4">
				<h1 className="mt-4">Add Category</h1>

				<form onSubmit={categorySubmit} id="category_form">
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
		</>
	)
}