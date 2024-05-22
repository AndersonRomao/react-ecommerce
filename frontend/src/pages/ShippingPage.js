import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveAddress } from "../reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ShippingPage = () => {
  const { data } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shippingAddress  = useSelector(state => state.cart?.shippingAddress || "")
  const [address, setAddres] = useState(shippingAddress.address || "")
  const [city, setCity] = useState(shippingAddress.city || "")
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "")
  const [country, setCountry] = useState(shippingAddress.country || "")

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(saveAddress({ address, city, postalCode, country}))
    navigate("/order")
  }

  useEffect(() => {
   !data.name && navigate("/login")
  },[navigate, data.name])

  return(
  <div className="container w-75 pt-5">
   <form className="row justify-content-end" name="shipping-form" onSubmit={submitHandler}>
    <div className="col-sm-9">
     <div className="col-12 col-sm-6 mb-3">
      <label className="fs-5 form-label">Address</label>
      <input type="text" className="form-control" value={address} 
      onChange={(e) => setAddres(e.target.value)} placeholder="Address"/>
     </div>         
     <div className="col-12 col-sm-6 mb-3">
      <label className="fs-5 form-label">City</label>
      <input type="text" className="form-control" value={city} 
      onChange={(e) => setCity(e.target.value)} placeholder="City"/>
     </div>
     <div className="col-12 col-sm-6 mb-3">
      <label className="fs-5 form-label">Country</label>
      <input type="text" className="form-control" value={country} 
      onChange={(e) => setCountry(e.target.value)} placeholder="Country"/>
     </div>
     <div className="col-sm-6 mb-3">
      <label className="fs-5 form-label">Postal Code</label>
      <input type="text" className="form-control" value={postalCode} 
      onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code"/>
     </div>
    <button type="submit" className="btn btn-primary fs-5 col-4">Submit</button>
    </div>
   </form>
  </div>)}

export default ShippingPage;