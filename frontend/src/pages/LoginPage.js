import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserLogin }  from '../reducers/usersReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from '../components';
import { dataFetched } from '../reducers/usersReducer';

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { data, error } = useSelector(state => state.users)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(getUserLogin({email, password})) 
  }

  useEffect(() => {
   data.name ? navigate(-1) : dispatch(dataFetched([])) 
  },[error, navigate, dispatch, data.name])

  return (
  <div className="container mt-5"> 
   <Toast message={data.error} type={"warn"} theme="colored" />
   <div className="row justify-content-center">  
    <form onSubmit={handleLogin} name="login-form" className="col-10 col-md-8 col-lg-4 justify-content-center">
     <h2 className="text-center mb-3">Login</h2>
     <div className="form-floating mb-3">
      <input type="email" value={email} placeholder="name@example.com" className="form-control" id="floatingInputEmail" 
      onChange={({ target }) => setEmail(target.value)} /> 
      <label htmlFor="floatingInputEmail" className="form-label">Email address</label>
     </div>
     <div className="form-floating mt-3 mb-3">
      <input type="password" value={password} placeholder="enter password" className="form-control" id="inputPassword" 
      onChange={({ target }) => setPassword(target.value)} /> 
      <label htmlFor="inputPassword" className="form-label">Password</label>
     </div>
      <button type="submit" className="btn btn-primary fs-5">Submit</button>
    </form>
   </div>
  </div>
)}

export default LoginPage;