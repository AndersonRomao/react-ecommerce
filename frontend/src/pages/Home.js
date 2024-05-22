import image from "../img/inspiracao-retrato-de-mulher-jovem.jpg";
import { Categories } from "../components";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleWindowResize)
  }, [])

  return (
  <>
  <div className="container-expand">
   <img className="img w-100" src={image} alt="banner-img"/>
   <div className="container w-75">
    <div className="d-block d-sm-none mt-4 pt-1 text-center">
      <h3 className="display-3">React Shop:</h3>
      <button className="fs-1 bg-black text-white rounded-5 p-3">
        <Link className="link-underline link-underline-opacity-0 text-white" to="/products">
        <strong>Shop all products <i className="bi bi-arrow-right ms-2"></i></strong>
        </Link>
      </button>
    </div>
    <h1 className={`display-1 d-none d-sm-block position-absolute ${width > 1290 ? `top-50` : `bottom-50`} text-white`}> 
      React Shop:<p className="fs-1 d-none d-sm-block">Notebooks, smartphones, headphones<br/> and more!</p>
      <button className="d-none d-sm-block fs-1 pb-2 ps-4 pe-4 bg-white mt-4 rounded-5">
        <Link className="link-underline link-underline-opacity-0 text-black " to="/products">
          <strong>Shop all products<i className="bi bi-arrow-right ms-2"></i></strong>
        </Link>
      </button>
    </h1>
   </div>      
  </div>
  <Categories />
  </>
)
};

export default Home;
