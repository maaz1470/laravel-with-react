import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function AddProduct(){
	const [categoryList, setCategoryList] = useState([]);
	const [productInfo, setProductInfo] = useState({
		category: '',
		product_slug: '',
		product_name: '',
		description: '',
		status: '',
		meta_keywords: '',
		meta_title: '',
		meta_description: '',
		selling_price: '',
		original_price: '',
		qty: '',
		brand: '',
		featured: '',
		popular: '',
		image: ''
	})



	const handleChange = (e) => {
		if(e.target.name == 'image'){
			setProductInfo({
				...productInfo,
				[e.target.name]:e.target.value
			})
		}else{
			setProductInfo({
				...productInfo,
				[e.target.name]:e.target.value
			})
		}
	}


	useEffect(() => {
		axios.get('/api/get-product-page-category').then(response => {
			setCategoryList(response.data.categories)
		})
	},[])
	return (
		<div>
			<div className="container-fluid px-4">
				<div className="card">
					<div className="card-header">
					<h4>Add Product</h4>
				</div>

				<div className="card-body">
					<form id="category_form">
						<ul className="nav nav-tabs" id="myTab" role="tablist">
						  <li className="nav-item" role="presentation">
						  </li>
						  <li className="nav-item" role="presentation">
						    <button className="nav-link active" id="home" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-selected="false">Home</button>
						  </li>
						  <li className="nav-item" role="presentation">
						    <button className="nav-link" id="seo" data-bs-toggle="tab" data-bs-target="#seo-tabs" type="button" role="tab" aria-selected="false">SEO</button>
						  </li>
						  <li className="nav-item" role="presentation">
						    <button className="nav-link" id="others" data-bs-toggle="tab" data-bs-target="#others-tabs" type="button" role="tab" aria-selected="false">Others</button>
						  </li>
						</ul>
						<div className="tab-content card" id="myTabContent">
						  <div className="tab-pane card-body border fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab-pane" tabIndex="0">
						  		<div className="form-group mb-3">
						  			<label htmlFor="slug">Category</label>
						  			<select onChange={handleChange} value={productInfo.category} name="category" id="" className="form-control">
						  			{ categoryList.map(el => (
						  				<option key={el.id} value={el.id}>{el.name}</option>
						  				))
						  			}
						  			</select>
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="product_slug">Product Slug</label>
									<input onChange={handleChange} value={productInfo.product_slug} type="text" id="product_slug" name="product_slug" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="product_name">Product Name</label>
						  			<input onChange={handleChange} value={productInfo.product_name}  type="text" id="product_name" name="product_name" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="description">Description</label>
						  			<textarea  onChange={handleChange} value={productInfo.description} id="description" name="description" className="form-control" />
						  		</div>
						  		
						  		<div className="form-group mb-3">
						  			<label htmlFor="popular">Status</label>
						  			<select onChange={handleChange} value={productInfo.status} name="status" id="status" className="form-control">
						  				<option value="1">Published</option>
						  				<option value="0">Unpublished</option>
						  			</select>
						  		</div>
						  </div>
						  <div className="tab-pane card-body border fade" id="seo-tabs" role="tabpanel" aria-labelledby="seo-tabs" tabIndex="0">
						  		<div className="form-group mb-3">
						  			<label htmlFor="meta_keywords">Meta Keywords</label>
						  			<input onChange={handleChange} value={productInfo.meta_keywords} type="text" id="meta_keywords" name="meta_keywords" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="meta_title">Meta Title</label>
						  			<input onChange={handleChange} value={productInfo.meta_title} type="text" id="meta_title" name="meta_title" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="meta_description">Meta Description</label>
						  			<textarea  onChange={handleChange} value={productInfo.meta_description} id="meta_description" name="meta_description" className="form-control" />
						  		</div>
						  </div>
						  <div className="tab-pane card-body border fade" id="others-tabs" role="tabpanel" aria-labelledby="others-tabs" tabIndex="0">
						  		<div className="form-group mb-3">
						  			<label htmlFor="selling_price">Selling Price</label>
						  			<input  onChange={handleChange} value={productInfo.selling_price} type="number" id="selling_price" name="selling_price" accept="any" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="original_price">Original Price</label>
						  			<input  onChange={handleChange} value={productInfo.original_price} type="number" id="original_price" name="original_price" accept="any" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="qty">Quantity</label>
						  			<input  onChange={handleChange} value={productInfo.qty} type="number" id="qty" name="qty" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="brand">Brand</label>
						  			<input onChange={handleChange} value={productInfo.brand} type="text" id="brand" name="brand" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="image">Image</label>
						  			<input onChange={handleChange} type="file" id="image" name="image" className="form-control" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="featured">Featured</label>
						  			<input  onChange={handleChange} value={productInfo.featured} type="checkbox" id="featured" name="featured" className="form-check-input" />
						  		</div>
						  		<div className="form-group mb-3">
						  			<label htmlFor="popular">Popular</label>
						  			<input onChange={handleChange} value={productInfo.popular} type="checkbox" id="popular" name="popular" className="form-check-input" />
						  		</div>
						  </div>
						  <button type="submit" className="btn btn-primary">Submit</button>
						</div>
					</form>
				</div>
				</div>
			</div>
		</div>
	)
}