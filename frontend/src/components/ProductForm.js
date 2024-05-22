import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateProduct } from "../reducers/productsReducer";

const ProductForm = (props) => {
  const { id } = props;
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);


  const uploadProduct = async (event) => {
    event.preventDefault()
    dispatch(updateProduct(
      id,
      {
       name: name,
       image: image,
       description: description,
       brand: brand,
       category: {name: categoryName, image: categoryImage},
       price: price,
       countInStock: countInStock, 
      }
    ))
  }

  const uploadProductHandler = async(event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }  
    }
    const { data } = await axios.post("http://localhost:5000/api/upload/product", formData, config)
    setImage(data)
    console.log(data)  
  }

  const uploadCategoryHandler = async(event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const { data } = await axios.post("http://localhost:5000/api/upload/category", formData, config)
    setCategoryImage(data)
    console.log(data)
  }


  return (
     <form onSubmit={uploadProduct} className="col-sm-5">
   <div className="mb-3">
      <label htmlFor="inputName" className="form-label fs-5">Name</label>
      <input type="name" value={name} name="Name" className="form-control" id="inputName" 
      onChange={({ target }) => setName(target.value)} />
     </div>

    <div className="mb-3">
      <label htmlFor="formFile" className="form-label fs-5">Image</label>
      <input className="form-control" type="file" id="formFile" onChange={uploadProductHandler} />  
    </div> 

    <div className=" mb-3">
      <label htmlFor="inputDescription" className="form-label fs-5">Description</label>
      <textarea type="description" value={description} name="Description" className="form-control" id="inputDescription" 
      onChange={({ target }) => setDescription(target.value)} />
     </div>

     <div className=" mb-3">
      <label htmlFor="inputBrand" className="form-label fs-5">Brand</label>
      <input type="brand" value={brand} name="Brand" className="form-control" id="inputBrand" 
      onChange={({ target }) => setBrand(target.value)} />
     </div>

     <div className=" mb-3">
      <label htmlFor="inputCategoryName" className="form-label fs-5">Category name</label>
      <input type="category" value={categoryName} name="Category" className="form-control" id="inputCategoryName" 
      onChange={({ target }) => setCategoryName(target.value)} />
     </div>

     <div className=" mb-3">
      <label htmlFor="inputCategoryImage" className="form-label fs-5">Category image</label>
      <input onChange={uploadCategoryHandler} name="CategoryImage" className="form-control" type="file" id="inputCategoryImage" 
       />
     </div>

     <div className=" mb-3">
      <label htmlFor="inputPrice" className="form-label fs-5">Price</label>
      <input type="price" value={price} name="Price" className="form-control" id="inputPrice" 
      onChange={({ target }) => setPrice(target.value)} />
     </div>

     <div className=" mb-3">
      <label htmlFor="inputStock" className="form-label fs-5">Count in stock</label>
      <input type="stock" value={countInStock} name="stock" className="form-control" id="inputStock" 
      onChange={({ target }) => setCountInStock(target.value)} />
     </div>
     <button className="btn btn-md btn-success">Create</button>
   </form>
  ) 
 

}

export default ProductForm;