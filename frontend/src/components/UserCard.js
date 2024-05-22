const UserCard = (props) => {
  const { data, att} = props;

  return(
    <div className={att}>
     <h3 className="mb-4 text-center">User Data</h3>   
     <h4>Name: <br/><p className="fs-5">{data.name}</p></h4>
     <h4>Email: <br/><p className="fs-5">{data.email}</p></h4>
     <h4>Id: <br/><p className="fs-5">{data.id}</p></h4>
     <h4>Created at: <br/> <p className="fs-5">{data.createdAt?.substring(0, 10)}</p></h4>
     <h4>Last update: <br/> <p className="fs-5">{data.updatedAt?.substring(0, 10)}</p></h4>
    </div>
  )
};

export default UserCard;