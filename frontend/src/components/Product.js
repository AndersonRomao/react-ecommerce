import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useState } from "react";

const Product = (props) => {
  const { product } = props;
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
  <>
   <div className="modal fade" id={`id${product._id}`} tabIndex={-1} aria-labelledby="modalProduct" aria-hidden={true}>
    <div className="modal-dialog">
     <div className="modal-content">
      <div className="modal-header">
       <h1 className="modal-title fs-5" id="exampleModalLabel">{product.category.name}</h1>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body p-3">
       <div className="row"> 
        <img className="col-sm-6 p-1" src={product.image} alt={product.category.name}/>
        <div className="col-sm-6 d-inline">
         <h5 className="mt-3 mb-3">{product.name}</h5>
         <p>{product.description}</p>
        </div>
       </div> 
      </div>
      <div className="modal-footer">
       <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
        <Link className="link-underline link-underline-opacity-0 text-white" to={`/product/${product._id}`}>
          Go to product page
        </Link>
       </button>
      </div>
     </div>
    </div>
   </div>
   <div className={`card text-center ${isHovered ? "border-2 shadow-lg" : "border-0"} mt-3 mb-2`} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} key={product._id}>
    <div className="card-body">
     <Link className="link-underline link-underline-opacity-0 text-black" to={`/product/${product._id}`}>
      <img className= "card-img-top mb-3 w-75"  src={product.image} alt={product.category.name}/>
      <h4 className="card-title fs-5">{product.name}</h4> 
      <h6 className="card-subtitle text-body-secondary">{product.category.name}</h6>
      <h3 className="card-title pt-2">
        <Rating value={product.rating} reviews={product.numReviews}/>
      </h3>
     </Link> 
     <h4 className="card-title fs-5">
      <button className="btn btn-md btn-secondary me-2" data-bs-toggle="modal" data-bs-target={`#id${product._id}`}>
        Overview
      </button>
      <strong>$</strong>{product.price}
     </h4>
    </div>
   </div>
  </>)};

export default Product;