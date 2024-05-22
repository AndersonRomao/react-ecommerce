import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loading, CreateProductForm, Toast } from "../components";
import { Link } from "react-router-dom";
import { initializeProducts, removeProduct } from "../reducers/productsReducer";

const ProductsListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, data } = useSelector(state => state.products);
  const dataUser  = useSelector(state => state.users.data)

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure?')) {
       dispatch(removeProduct(id)) 
    }
  }

  useEffect(() => {
    dataUser.isAdmin ? dispatch(initializeProducts("")) : navigate("/login")
  }, [dataUser.isAdmin, dispatch, navigate])

  return (
  <>
  {loading ? <Loading /> : 
  <div className="container mt-3">
   {<Toast message={data?.message} type={"info"} theme={"colored"} />} 
   <div className="row justify-content-center"> 
   <h2>Products({data?.length})  
   <button className="ms-2 btn btn-md btn-primary" data-bs-toggle="collapse" data-bs-target="#collapseForm" 
   aria-expanded={false} aria-controls="collapseForm">
    <i className="bi bi-plus"></i> Create product
   </button>
   </h2>
   <div className="collapse card col-sm-4 p-2" id="collapseForm">
    <CreateProductForm />
   </div>
   <div className="col-sm-8">   
   <div className="table-responsive col-12">
   <table className="table align-middle">
    <thead>
      <tr>
       <th scope="col">ID</th>
       <th scope="col">NAME</th>
       <th scope="col">PRICE</th>
       <th scope="col">CATEGORY</th>
       <th scope="col">BRAND</th>
       <th scope="col"></th> 
      </tr>  
    </thead>
    <tbody className="table-group-divider">
    {Array.from(data)?.map((product) => (
    <tr key={product._id}> 
     <td>{product._id}</td>
     <td>{product.name}</td>
     <td>${product.price}</td>
     <td>{product.category.name}</td>
     <td>{product.brand}</td>
     <td>
      <Link to={`/admin/products/${product._id}`}>
      <button className="btn btn-primary btn-sm me-2">
       <i className="bi bi-pencil-square"></i></button>
      </Link>
      <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(product._id)}>
       <i className="bi bi-trash"></i>
      </button>
    </td>
    </tr>        
    ))}
    </tbody>
   </table>
   </div>
   </div>
   </div>
  </div>
  }
  </>)};

export default ProductsListPage;