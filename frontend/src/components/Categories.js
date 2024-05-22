import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { useSelector } from 'react-redux';
import 'react-multi-carousel/lib/styles.css'

const Categories = () => {
    const  categories  = useSelector(state => state.categories);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
    <div className="container w-100 text-center">
        <Carousel responsive={responsive}>        
                {categories.map((category) => (
                <div className="card text-center mt-0 border-0 mb-0" key={category._id.name}>
                    <Link className="link-underline link-underline-opacity-0" to={`/products?category=${category._id.name}`}>    
                      <div className="card-body pb-0">    
                         <img className="img-fluid w-100 pt-3" alt={category._id.image} src={category._id.image}/>
                         <h5 className="card-title fs-1 bg-black text-white pb-3 pt-3">{category._id.name}</h5>
                      </div>
                    </Link>
                </div>))}
             </Carousel>
    </div>)};

export default Categories;