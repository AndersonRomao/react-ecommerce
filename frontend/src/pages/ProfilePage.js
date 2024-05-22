import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import { updateProfile } from "../reducers/usersReducer";
import { Loading, Form, Toast, UserCard } from "../components";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { data, loading, error } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !data.name ? navigate("/login") :
      dispatch(getUserProfile())
     
  }, [dispatch, data.name, error, navigate]);

  return (
  <div className="container mt-5">
   {error && <Toast message={data.message} type={"danger"} theme="colored"/> }
   <h2>Profile</h2>
   {loading ? 
   <Loading /> :
   <div className="row justify-content-center">
    <Toast message={data.message} type={"info"} theme="colored"/>
   <div className="card col-sm-3"> 
     <UserCard data={data} att={"p-3 ms-2"}/> 
    <button 
    className="btn btn-primary mt-0 mb-2" 
    data-bs-toggle="collapse" 
    data-bs-target="#collapseFormUpdate" 
    aria-expanded={false} 
    aria-controls="collapseFormUpdate">
      Update profile
    </button>  
   </div>   
   <div className="collapse col-12 col-sm-4 card" id="collapseFormUpdate">
    <Form heading={"Update Account"} submitData={updateProfile} att={"col-10 col-md-8 col-lg-10 mt-3"}/>
   </div>
   <div className="col-sm-5 p-3">
    <h3>Orders: </h3>
    {data.orders?.map((order) =>
    <Link className="d-block link-underline link-underline-opacity-0" key={order} to={`/order/${order}`}>
     <h5>Order {order}</h5>
    </Link>)}
   </div>
  </div>}  
 </div>
)};

export default ProfilePage;