import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function AllCategories(){
	const [loading, setLoading] = useState(true);
	const [categoryList, setCategoryList] = useState([]);

	const deleteCategory = (e, id) => {
		e.preventDefault();
		e.target.textContent = 'Deleting...'
		axios.get(`/api/delete-category/${id}`).then(response => {
			if(response.data.status === 200){
				Swal.fire('Success', response.data.message,'success');
				e.target.textContent = 'Deleted'
				e.target.closest('tr').remove();
			}else if(response.data.status === 404){
				Swal.fire('Error', response.data.message, 'error');
			}
		})
	}

	useEffect(() => {
		axios.get('/api/get-all-categories').then(response => {
			if(response.data.status === 200){
				setCategoryList(response.data.categories)
			}
			setLoading(false)
		});

		return () => {
			setCategoryList([])
		}
	},[]);
	var category_view = '';
	if(loading){
		return <h1>Loading</h1>
	}else{
		let i=1;
		category_view =
		categoryList.map((item) => {
			return (
				<tr key={item.id}>
					<td>{i++}</td>
					<td>{item.name}</td>
					<td>{item.slug}</td>
					<td>{item.status == 1 ? 'Published' : 'Unpublished'}</td>
					<td>
						<Link to={`/auth/edit-category/${item.id}`} className="btn btn-primary btn-sm">Edit</Link>
					</td>
					<td>
						<button onClick={(e) => deleteCategory(e,item.id) } className="btn btn-danger btn-sm">Delete</button>
					</td>
				</tr>
			)
		});
	}
	return (
		<>
			<div className="container px-4">
				<div className="card">
					<div className="card-header">
						<h4>Category List
							<Link to={'/auth/add-category'} className="btn btn-primary btn-sm float-end">Add Category</Link>
						</h4>
					</div>
					<div className="card-body">
						<table className="table table-striped table-bordered">
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Slug</th>
									<th>Status</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>

							</thead>							
							<tbody>
								{category_view}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	)
}