import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const Toast = (props) => {
  const { message, type, theme } = props;

  const notify = (message) => {
    toast[type](message, {
        toastId: `${message}`    })
  }
  useEffect(() => {
   notify(message)
  },[message, notify])

  return (
    <ToastContainer position="top-center" autoClose={5000} theme={`${theme}`}/>
  )
}

export default Toast;