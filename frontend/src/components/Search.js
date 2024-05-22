import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const [keyword, setKeyword] = useState("");  
  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault()
    navigate(`products?category=${keyword.trim()}`)
  };  

  return (
   <form onSubmit={submitHandler} className="d-flex" role="search">
     <input className="form-control form-control-sm me-2" type="search" placeholder="Search" aria-label="Search"
      onChange={({ target }) => setKeyword(target.value)} />
     <button className="btn btn-outline-white" type="submit">
      <span className='h5 bi bi-search text-white'></span>
     </button>
    </form>)
}

export default Search;