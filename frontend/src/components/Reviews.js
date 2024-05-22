import Rating from "./Rating";
import { useSelector } from "react-redux";

const Reviews = () => {
  const { data } = useSelector(state => state.products)
  
  return (
   <>
    <h3 className="mt-4 text-center">Reviews</h3>
      <div className="overflow-y-scroll">
      <ul className="list-group">
      {data?.reviews?.map((review) => (
        <li className="mt-4" key={review._id}>
        <h5 className="ms-1">{review.name}</h5>
        <Rating value={review.rating} reviews={data.numReviews}/>
        <h5 className="ms-1">{review.createdAt.substring(0, 10)}</h5>
        <p className="ms-1">{review.comment}</p>
        </li>
        ))}
      </ul>
     </div>
   </>
  )

}

export default Reviews;