import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart,decreaseToCart } from "../reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CartPage = () => {
  const itemsCart  = useSelector(state => state.cart.cartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const checkout = () => {
    navigate('/shipping')
  }

  useEffect(() => {
    //dispatch(clearCart())
  }, [itemsCart.length])

  return (
  <div className="container pt-5">
  {itemsCart.length === 0 ? 
  <div className="text-center">
    <h1 className=""><i className="bi bi-cart"></i></h1>
    <h4 className="text-center">The cart is empty!</h4> 
  </div> :
  <div className="row justify-content-center text-center">
   <div className="col-sm-9">
    <table className="table">
     <thead>
      <tr>
       <th scope="col">Product</th>
       <th scope="col">Quantity</th>
       <th scope="col">Price</th>
       <th></th>
      </tr> 
     </thead>
     <tbody className="table-group-divider">
     {itemsCart.map((item) => 
     <tr key={item._id}>
      <td>
      <div className="p-1">
       <img src={item.image} className="rounded w-auto pb-2" alt={item.name} height={85}/>
       <h5 className="fs-6">{item.name}</h5>
      </div>
      </td>
      <td>
       <div className="btn-group btn-group-sm mt-5 mb-5" role="group" aria-label="qty-example">
       <button className="btn btn-primary me-2 rounded-1" 
       type="button" 
       onClick={() => dispatch(addToCart(item, 1))}
       disabled={item.qty === item.countInStock}>
         <i className="bi bi-plus"></i>
       </button>
       <span className="pt-1 fs-6">{item.qty}</span>
       <button className="btn btn-secondary ms-2 rounded-1" 
       type="button" 
       onClick={() => dispatch(decreaseToCart(item, 1))}
       disabled={item.qty === 0}>
         <i className="bi bi-dash"></i>
       </button>
       </div>
      </td>
      <td>
       <h5 className="mt-5 mb-5">
        <strong>$</strong>{(item.price * item.qty).toFixed(2)}
       </h5>
      </td>
      <td>
       <div className="mt-5 mb-5" key={item._id}>
        <i className="bi bi-trash-fill text-danger fs-5" 
        role="button" 
        onClick={() => dispatch(removeFromCart(item))}></i>
       </div>
      </td>
     </tr>)}
     <tr>
      <th scope="row"><h4 className="mt-4 mb-4">Total<i className="bi bi-cart-fill"></i></h4></th>
      <td></td>
      <td>
       <div>
        <h4 className="mt-4 mb-4">
         <strong>$</strong>
         {itemsCart.map((item) => { 
          return item.price * item.qty 
          }).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2)}
         </h4>
          
       </div>
      </td>
     </tr>
     </tbody>
    </table>
    <div className="d-inline-block align-item-left">
           <button type="button" onClick={checkout} className="btn btn-success">
            Checkout
           </button>
          </div>
   </div>
   </div>}
  </div>
  )};

export default CartPage;