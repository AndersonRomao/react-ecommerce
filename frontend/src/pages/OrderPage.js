import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOrder } from "../reducers/orderReducer";
import { clearCart } from "../reducers/cartReducer";
import { Toast, Loading } from "../components";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.order);
  const user = useSelector(state => state.users.data);
  const params = useParams().id;

  useEffect(() => {
   if(user?.name) {
      dispatch(clearCart())
      dispatch(getOrder(params))
    } else {
      navigate('/login')
    }
    console.log(user)
  },[params, user, dispatch, navigate]);

  return (
  <div className="container">
   {loading ? 
    <Loading /> :
    <>
    {error && data.message && <Toast message={data.message} type={"error"} theme={"colored"}/>}
    <h2 className="mt-5 ms-5">Order: {data.id}</h2>
     <div className="container w-75">
      <div className="row text-left">
       <div className="col-sm-6 mt-4">
        <h2>User</h2>
        <h5 className="d-inline">{data.user?.name}</h5>
        <h5 className="">{data.user?.email}</h5>
       </div>
       <div className="col-sm-6 mt-4">
        <h2>Items</h2>
        {data.orderItems?.map((item) => 
        <div key={item._id}>
         <img src={item.image} alt={item.name} height={30}/>
         <h5 className="d-inline">{item.name}</h5>
         <h5><strong>$</strong>{item.price}</h5>
        </div>)}
       </div>
       <div className="col-sm-6 mt-4">
        <h2>Shipping</h2>
        <h5>{data.shippingAddress?.address}</h5>
        <h5>{data.shippingAddress?.city}</h5>
        <h5>{data.shippingAddress?.postalCode}</h5>
        <h5>{data.shippingAddress?.country}</h5>       
       </div>
       <div className="col-sm-6 mt-4">
        <h2>Order</h2>
        <h5>ShippingPrice: <strong>$</strong>{data.shippingPrice}</h5>
        <h5>Total: <strong>$</strong>{data.totalPrice}</h5>
       </div>
      </div>
     </div>
    </>}
  </div>
  )};

export default OrderPage;