import { useDispatch, useSelector } from "react-redux";
import { saveOrder } from "../reducers/orderReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "../components";

const PlaceOrderPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  const shippingPrice = itemsPrice > 100 ? 0 : 100
  const totalPrice = Number(itemsPrice + shippingPrice).toFixed(2)
  const { data, error } = useSelector(state => state.order)
  const dataUser = useSelector(state => state.users.data)
   
  useEffect(() => {
  data.order && dataUser.name && navigate(`/order/${data.order.id}`)  
  }, [navigate, data.order, dataUser])
    
  const placeOrderHandler = async () => {
    dispatch(saveOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
    }))
  }

  return (
  <div className="container w-75 mt-5">
  {error && data.message && <Toast message={data.message} type={"error"} theme={"colored"}/>}
  <div className="row align-items-center"> 
    <div className="col-sm-5">
     <table className="table">
      <thead>
        <tr>
         <th><h3>Products</h3></th>
        </tr>
      </thead>
      <tbody>
      {cart.cartItems.map((item) => (
        <tr key={item._id}>
          <td>
            <img src={item.image} alt={item.name} height={90} className="d-inline"/>
            <h5 className="d-inline ms-2">{item.qty}x  {item.name}</h5>
            <h5 className=""><strong>$</strong>{item.price}</h5>
          </td>
        </tr>
      ))}
      </tbody>
     </table>
    </div>
    <div className="col-7"> 
      <table className="table">
        <thead>
         <tr>
          <th><h3>Shipping</h3></th>
         </tr>
        </thead>
        <tbody>
          <tr><td> <h5>Address: {cart.shippingAddress.address}</h5> </td></tr> 
          <tr><td> <h5>City: {cart.shippingAddress.city}</h5> </td></tr>
          <tr><td> <h5>Postal Code: {cart.shippingAddress.postalCode}</h5> </td></tr>  
          <tr><td> <h5>Country: {cart.shippingAddress.country}</h5> </td></tr>
        </tbody>
      </table>
      <table className="table mt-3">
        <thead>
          <tr>
            <th><h3>Order</h3></th>
          </tr>
        </thead>
        <tbody>
          <tr><td> <h5>Items price: <strong>$</strong>{itemsPrice}</h5> </td></tr>
          <tr><td> <h5>Shipping price: <strong>$</strong>{shippingPrice}</h5> </td></tr>
          <tr><td> <h5>Total: <strong>$</strong>{totalPrice}</h5> </td></tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={placeOrderHandler}>Place order</button>
    </div>        
  </div>
  </div>)}

export default PlaceOrderPage;