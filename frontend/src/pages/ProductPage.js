import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productDetails } from "../reducers/productsReducer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reducers/cartReducer";
import { Link } from "react-router-dom";
import { Reviews, Loading, CreateReview, Rating } from "../components";
import { Toast}  from "../components";

const ProductPage = () => {
  const dispatch = useDispatch()
  const params = useParams().id
  const { data, loading }= useSelector(state => state.products)
  const message = useSelector(state => state.products.data.message)
  const userData = useSelector(state => state.users.data) 
  const [qty, setQty] = useState(1)

  const addProduct = async () => {
    dispatch(addToCart(data, qty))
  }
  
  useEffect(() => {
    dispatch(productDetails(params))
  },[params, userData, dispatch])

  return (
  <div className="container">
  {loading ? 
  <Loading /> : 
  <>
  {message && <Toast message={message} type={"info"} theme="light"/>}
  <div className="row align-items-center justify-content-center">
   <div className="col-md-5 mt-3">
    <img className="img-fluid" src={data.image} alt={data._id}/>
   </div>
   <div className="col-lg-6 mt-5 bg-body p-5">
     <h5 className="fs-5">{data.category?.name}</h5> 
     <h4 className="fs-2">{data.name}</h4> 
     <h5 className="fs-5">{data.brand}</h5>
     <Rating value={data.rating} reviews={data.numReviews}/>
     <h4 className="fs-3">${data.price}</h4>
     <p className="mt-3">{data.description}</p>
     <div className="d-flex col-lg-8">
      <button type="button" className="btn btn-success fs-5 rounded-3 w-50" onClick={addProduct}>
        Add to cart
      </button>
      <select className="ms-2 form-select w-25" value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
      {[...Array(data.countInStock).keys()].map((quantity) => 
       (<option key={quantity + 1} value={quantity + 1}>{quantity + 1}</option>))}
      </select>
     </div>
   </div>
  </div>
  <div className="container w-100 h-100 mt-5">   
   <div className="row">
    <div className="col-lg-5">
    {userData.name ? 
      <CreateReview params={params}/> :
      <div className="text-center mt-3 p-5 mb-4">
       <div className="">
         <h3>
          <Link className="link-underline link-underline-opacity-0" to="/login">
          Log-in </Link> or <Link className="link-underline link-underline-opacity-0" to="/register"> create a account 
          </Link> <br/>to leave a review.
         </h3>
       </div>
      </div>}
    </div>
    <div className="col-md-7 mt-5">
     <div className="row align-items-center">
     {data.numReviews !== 0 ?
      <div className="col-md-12 pe-5 ps-5">
        <Reviews />
      </div> : 
      <div className="col-md-12">
        <h3 className="m-3 p-5 text-center">There are no reviews yet.</h3>
      </div>}
     </div>
    </div>
    </div>
  </div>
  </>}
  </div>
)};

export default ProductPage;