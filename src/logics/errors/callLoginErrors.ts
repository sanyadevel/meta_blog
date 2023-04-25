import { toast } from 'react-toastify';

export const callLoginErrors = (message:string)=>
  toast.error(message, {
    position: toast.POSITION.TOP_LEFT,
    autoClose: 3500,
  });
