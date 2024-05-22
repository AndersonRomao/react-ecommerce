import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../reducers/usersReducer";
import { useEffect } from "react";
import { Loading } from "../components"
import { deleteUser } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UsersListPage = () => {
  const params = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector(state => state.users)
  
  const deleteHandler = (id) => {
    if(window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }
  
  useEffect(() => {
    data?.isAdmin ? dispatch(getAllUsers()) : navigate("/login")
  },[data.isAdmin, dispatch, navigate, params])

  return (
  <>
  {loading ? <Loading /> : 
  <div className="container mt-3">
   <h2>Users</h2>
   <div className="table-responsive">
   <table className="table align-middle">
    <thead>
      <tr>
       <th scope="col">ID</th>
       <th scope="col">NAME</th>
       <th scope="col">EMAIL</th>
       <th scope="col">ADMIN</th>
       <th scope="col">CREATED AT</th>
       <th scope="col"></th> 
      </tr>  
    </thead>
    <tbody className="table-group-divider">
    {data.listUsers?.map((user) => (
    <tr key={user.id}> 
     <td>{user.id}</td>
     <td>{user.name}</td>
     <td>{user.email}</td>
     <td>{user.isAdmin ? "true" : "false"}</td>
     <td>{user.createdAt.substring(0, 10)}</td>
     <td>
      <Link to={`/admin/users/${user.id}`}>
      <button className="btn btn-primary btn-sm me-2">
       <i className="bi bi-pencil-square"></i></button>
      </Link>
      <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(user.id)}>
       <i className="bi bi-trash"></i>
      </button>
    </td>
    </tr>        
    ))}
    </tbody>
   </table>
   </div>
  </div>
  }
  </>)};

export default UsersListPage;