

const Rating = (props) => {
    const { value }= props;
    const { reviews } = props;
    return(
      <div className="fs-5">
        <span className="text-warning">
            <i className={value >= 1 ? "bi bi-star-fill" : value >= 0.5 ? "bi bi-star-half" : "bi bi-star"}></i>
        </span>
        <span className="text-warning">
            <i className={value >= 2 ? "bi bi-star-fill" : value >= 1.5 ? "bi bi-star-half" : "bi bi-star"}></i>
        </span>
        <span className="text-warning">
            <i className={value >= 3 ? "bi bi-star-fill" : value >= 2.5 ? "bi bi-star-half" : "bi bi-star"}></i>
        </span>
        <span className="text-warning">
            <i className={value >= 4 ? "bi bi-star-fill" : value >= 3.5 ? "bi bi-star-half" : "bi bi-star"}></i>
        </span>
        <span className="text-warning">
            <i className={value >= 5 ? "bi bi-star-fill" : value >= 4.5 ? "bi bi-star-half" : "bi bi-star"}></i>
        </span>
        <h5 className="d-inline-block display-1 fs-6">({reviews})</h5>
      </div>
    )
}

export default Rating;