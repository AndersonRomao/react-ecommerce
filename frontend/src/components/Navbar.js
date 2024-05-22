import { Link } from 'react-router-dom';
import img from './../logo512.png';
import { useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/usersReducer';
import Search from './Search';

const Navbar = () => {
  const categories = useSelector(state => state.categories)  
  const { cartItems } = useSelector(state => state.cart) 
  const { data }  = useSelector(state => state.users)
  const dispatch = useDispatch()
  const location = useLocation();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    console.log(location.pathname)
  };

  return (
  <nav className="navbar navbar-expand-lg bg-black pb-0 py-0">
   <div className="container"> 
    <Link className="navbar-brand d-flex me-4 ms-4" to="/" >
     <img className="d-inline-block ms-2 me-2" src={img} alt="logo" width={40} height={40}/>
     <h4 className="pt-1 text-white">React Shop</h4>
    </Link>
    <button className="navbar-toggler focus-ring focus-ring-light" 
    type="button" 
    data-bs-toggle="offcanvas" 
    data-bs-target="#offcanvasNavbar" 
    aria-expanded={true} 
    aria-label="Toggle navigation">
     <span className="bi bi-list text-white"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
     <li className="offcanvas-header bg-black">
      <img className="d-inlne align-items-center" src={img} alt="logo" width={30} height={30} />
      <p className="fs-3 mt-3 text-white">React Shop</p>
      <button className="btn-close text-white" type="button" data-bs-dismiss="offcanvas" aria-label="Close">X</button>   
     </li>
     <div className="offcanvas-body bg-black"> 
      <ul className="navbar-nav ms-2 pt-1 me-auto">
       <li className="nav-item pt-2 ms-3">
       <Link className="link-underline link-underline-opacity-0 text-white" to="/products">
        <p className="fs-6 pt-2">Products</p>
       </Link>
       </li>
       <li className="nav-item dropdown-center mt-2 pt-1 ms-3">
        <span className="dropdown-toggle fs-5 text-black" href="#" role="button" 
        data-bs-toggle="dropdown" aria-expanded={false}>
         <p className=" fs-6 d-inline-block text-white">Categories</p>
        </span>
        <ul className="dropdown-menu">
        {categories.map((category) => 
        <li key={category._id.name}>
          <Link className="dropdown-item" to={`/products?category=${category._id.name}`}>
          <p className="">{category._id.name}</p>
          </Link>
        </li>)}
        </ul>
       </li>
      </ul>
      <ul className="navbar-nav">
       <li className='nav-item pt-1 mt-2 mb-3'>
        <Search />
       </li>
       <li className="nav-item ms-4 text-white pt-1">
       <Link className="link-underline link-underline-opacity-0 text-white" to="/cart"> 
       <span className={`nav-link bi bi-cart${cartItems.length > 0 ? "-fill" : ""} fs-4 text-white`}>
        <p className="fs-6 d-inline-block">
        Cart{cartItems.length > 0 &&
        <span className="translate-middle ms-0  badge rounded-pill text-bg-warning">
        {cartItems.map(item => {return item.qty}).reduce((accumulator, currentVal) => accumulator + currentVal, 0,)}
        </span>}
        </p>
       </span>
       </Link>
       </li>
       <li className="nav-item pt-1 ms-2 text-white">
       {data.name ? 
       <div className="dropdown">
         <span className="nav-link bi bi-person-fill fs-4 bg-black text-white ms-3" role="button" data-bs-toggle="dropdown" aria-expanded={false}>
          <p className="fs-6 display-1 d-inline-block">{data.name}</p>
         </span>
         <ul className="dropdown-menu dropdown-menu-end">
          <li className="dropdown-item">
          <Link className="link-underline link-underline-opacity-0 text-black" to="/profile">Profile</Link>
          </li>
          <li className="dropdown-item">
           <Link onClick={() => dispatch(logoutUser())} className="link-underline link-underline-opacity-0 text-black" >Logout</Link>
          </li>
          {data.isAdmin && 
           <>
           <li className="dropdown-item">
            <Link className="link-underline link-underline-opacity-0 text-black" to="/admin/users">Users</Link>
           </li>
           <li className="dropdown-item">
            <Link className="link-underline link-underline-opacity-0 text-black" to="/admin/products">Products</Link>
           </li>
           </>}
         </ul>
       </div> : 
       <div className="ms-1 dropdown-center">
        <span className="nav-link bi bi-person ms-2 fs-4 text-white" role="button" data-bs-toggle="dropdown" aria-expanded={false}>
         <p className="fs-6 display-1 pt-2 d-inline-block text-white">Sign-in</p>
        </span>
        <ul className="dropdown-menu">
         <li className="dropdown-item">
          <Link to="/login" className="link-underline link-underline-opacity-0 text-black">Login</Link>
         </li>
         <li className="dropdown-item">
           <Link to="/registration" onClick={handleLogout}
            className="link-underline link-underline-opacity-0 text-black">Registration</Link>
         </li>
        </ul>
       </div>}
       </li>
      </ul>                        
     </div>
    </div>
    </div>
  </nav>
 )};

export default Navbar;