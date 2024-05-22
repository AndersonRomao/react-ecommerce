import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { productDetails } from "../reducers/productsReducer"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { ProductForm, Toast } from "../components"

const ProductEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector(state => state.products);
  const userData = useSelector(state => state.users.data);
  const params = useParams().id

  useEffect(() => {
    userData.isAdmin ? dispatch(productDetails(params)) : navigate("/login") 
  }, [dispatch, params, userData, navigate])

  return (
  <div className="container">
  <Toast message={data.message} type={"info"} theme={"colored"}/>  
  <div className="row justify-content-center mt-5">
    <ProductForm id={params} />
   <div className="col-sm-7 card">
    <h4 className="text-center mt-3">Name: {data?.name}</h4>
    <h5 className="text-center">Brand: {data?.brand}</h5>
    <div className="row mt-3 justify-content-center">
      <img className="col-sm-6 w-50 h-auto mb-5 p-2" src={data?.image} alt={data?.category?.name}/>
      <div className="col-sm-6">
       <p><strong>Description: </strong>{data?.description}</p> 
       <p><strong>Price: </strong><strong>$</strong>{data?.price}</p>
       <p><strong>Count in stock: </strong>{data?.countInStock}</p>
       <p><strong>Category name: </strong> {data?.category?.name}</p>
       <p><strong>Category image: </strong></p>
       <img className="img-thumbnail w-25" src={data?.category?.image} alt={data?.category?.name}/>
      </div>
    </div>
   </div>
  </div>
  </div>)};

export default ProductEditPage;