import { Product, Loading } from "../components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeProducts } from "../reducers/productsReducer";

const ShopPage = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.products)
  let location = useLocation(); 
  const category = new URLSearchParams(location.search)
  const paramValues = category.get("category") || "";

  useEffect(() => {
    dispatch(initializeProducts(paramValues))
  }, [dispatch, paramValues])
    
  return (
  <div className="container">
  {loading ? <Loading /> :
  <div className="row align-items-end mt-5"> 
  {Array.from(data).map((product) => (
    <div className="col-sm-6 col-lg-4" key={product._id}>
      <Product product={product}/>
    </div>))
  }</div>}
  </div>)};

export default ShopPage;