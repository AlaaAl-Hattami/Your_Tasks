import { createContext , useState,useContext } from "react";
import Mysanck from "../componets/Mysanck";


export const ToastContext = createContext({});
export const ToastProvider=({children})=>{
    const [open, setOpen] = useState(false); // انقل تعريف useState إلى داخل مكون App
    const [Message, setMessage] = useState("");
  
    function showmessage( Message) {
        setOpen(true);
        setMessage(Message)
        setTimeout(() => {
        setOpen(false);
        }, 2000);
      }
  return (
    <ToastContext.Provider value={{ showmessage }}>
    <Mysanck open={open} Message={Message} />

    {children}
  </ToastContext.Provider>
  )
 }

export const useToast =()=>{
    return useContext(ToastContext)

 }