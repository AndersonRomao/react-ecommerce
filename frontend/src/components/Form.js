import { useDispatch } from "react-redux";
import { useState } from "react";

const Form = (props) => {
  const dispatch = useDispatch()  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { heading, submitData, att} = props;

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(submitData(name, email, password))
    setName("")
    setEmail("")
    setPassword("")
  }
  
  return (
   <div className="row justify-content-center">
   <form onSubmit={handleSubmit} className={att}>
     <h3 className="text-center mb-3">{heading}</h3>
     <div className="form-floating mb-3">
      <input type="name" placeholder="name" value={name} onChange={({ target }) => setName(target.value)} 
      className="form-control" id="InputName" />
       <label htmlFor="InputName" className="form-label">Name</label>
     </div>
     <div className="form-floating mb-3">
      <input type="email" placeholder="name@example.com" value={email} onChange={({ target }) => setEmail(target.value)} 
      className="form-control" id="InputEmail" aria-describedby="emailHelp"/>
      <label htmlFor="InputEmail" className="form-label">Email address</label>
     </div>
     <div className="form-floating mb-3">
      <input type="password" placeholder="enter password" value={password} onChange={({ target }) => setPassword(target.value)} 
      className="form-control" id="InputPassword" aria-describedby="passwordHelp" />
      <label htmlFor="InputPassword" className="form-label">Password</label>
     </div>
     <button type="submit" className="btn btn-primary mt-3">Submit</button>
   </form>
   </div>
  )  
}

export default Form;