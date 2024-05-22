import { useDispatch } from "react-redux";
import { postReview } from "../reducers/productsReducer";
import { useState } from "react";
import { useSelector } from "react-redux";
import {Toast} from "../components";

const CreateReview = (props) => {
  const dispatch = useDispatch()
  const { message } = useSelector(state => state.products.data)
  const { data } = useSelector(state => state.users)  
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const { params } = props;
  
  const submitReview = async (e) => {
      e.preventDefault()
      dispatch(postReview(params, {rating, comment}))
      //if(message) toast.info(message)
    } 

  return (
    <form className="row text-left align-items-center p-4 card card-body rounded-4 mt-5" onSubmit={submitReview}> 
     <Toast message={message} type={"info"} theme={"colored"} />  
        <h3 className="text-center">Create Review</h3>  
        <div className="col-sm-12 me-1 ms-1 mt-4">
         <div className="card-title"><h5 className="mt-3">{data?.name}</h5></div>
         <div className="form-check form-check-inline">
          <input onClick={(e) => setRating(e.target.value)} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={1}/>
          <label className="form-check-label" htmlFor="inlineRadio1">1<i className="bi bi-star-fill text-warning"></i></label>
         </div>
         <div className="form-check form-check-inline">
          <input onClick={(e) => setRating(e.target.value)} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={2}/>
          <label className="form-check-label" htmlFor="inlineRadio2">2<i className="bi bi-star-fill text-warning"></i></label>
         </div>
         <div className="form-check form-check-inline">
          <input onClick={(e) => setRating(e.target.value)} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={3}/>
          <label className="form-check-label" htmlFor="inlineRadio3">3<i className="bi bi-star-fill text-warning"></i></label>
         </div>
         <div className="form-check form-check-inline">
          <input onClick={(e) => setRating(e.target.value)} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value={4}/>
          <label className="form-check-label" htmlFor="inlineRadio4">4<i className="bi bi-star-fill text-warning"></i></label>
         </div>
         <div className="form-check form-check-inline">
          <input onClick={(e) => setRating(e.target.value)} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value={5}/>
          <label className="form-check-label" htmlFor="inlineRadio5">5<i className="bi bi-star-fill text-warning"></i></label>
         </div>                 
         <div className="mb-3 mt-4">
          <label htmlFor="exampleFormControlTextarea1" className="form-label"><h5>Leave a comment:</h5></label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
         </div>
         <button type="submit" className="btn btn-primary fs-5 w-50">Submit</button>           
        </div>   
      </form>
  )};

export default CreateReview;