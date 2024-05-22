import { useSelector } from "react-redux";
import { registerUser, dataFetched } from "../reducers/usersReducer";
import { Form, Toast } from "../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, data } = useSelector(state => state.users);
  useEffect(() => {
    data.name ? navigate("/") : dispatch(dataFetched([]))
  },[dispatch, data.name, navigate]);

  return (
  <div className="container"> 
   {error && <Toast message={data.message} type={"warn"} theme={"colored"} />}
   <Form heading={"Register"} submitData={registerUser} att={"col-10 col-md-8 col-lg-4 justify-content-center mt-5"}/>
  </div>
)};

export default RegistrationPage;