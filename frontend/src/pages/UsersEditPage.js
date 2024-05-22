import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserAccount, updateAccount } from "../reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loading, UserCard} from "../components";

const UsersEditPage = () => {
  const navigate = useNavigate()
  const { data, loading, account } = useSelector(state => state.users)
  const [name, setName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const params = useParams().id  
  const dispatch = useDispatch();

  useEffect(() => {
    data?.isAdmin ? dispatch(getUserAccount(params)) &&
    setIsAdmin(account.isAdmin) : navigate("/") 
  },[dispatch, params, account.isAdmin, navigate, data.isAdmin])  

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(isAdmin)
    dispatch(updateAccount(params, name, isAdmin))
    setName("")
  }

  return (
  <div className="container mt-5">
    {loading ? <Loading /> :
    <div className="row justify-content-center">     
    <form onSubmit={submitHandler} className="card p-3 col-sm-10 col-md-5 col-lg-4 mt-3">
      <h3 className="text-center mb-3">Edit User</h3>
      <div className="mb-3">
       <label htmlFor="InputName" className="form-label fs-5">Name</label>
       <input type="name" value={name} onChange={({ target }) => setName(target.value)} 
       className="form-control" id="InputName" />
      </div>
      <div className="mb-3 form-check form-switch">
       <input type="checkbox" role="switch" className="form-check-input" checked={isAdmin} 
       id="InputAdmin" onChange={({target}) => setIsAdmin(target.checked)}/>
       <label htmlFor="InputAdmin" className="form-check-label fs-5">Admin</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    <div className="col-sm-10 col-md-5 col-lg-4 mt-3">
    {account && <UserCard data={account} att={"card p-3"}/>}
    </div>
    <div className="col-sm-10 col-md-5 col-lg-3 mt-3 p-3">
    <h3>Orders: </h3>
    {account?.orders?.map((order) =>
    <Link className="d-block link-underline link-underline-opacity-0" key={order} to={`/order/${order}`}>
     <h5>Order {order}</h5>
    </Link>)}
    </div>
    </div>}
  </div>
  )
}

export default UsersEditPage;