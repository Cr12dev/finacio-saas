import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
    const options: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };
    
  return {
    success: (message: string, options?: ToastOptions) => {
      toast.success(message, options);
    },
    error: (message: string, options?: ToastOptions) => {
      toast.error(message, options);
    },
    info: (message: string, options?: ToastOptions) => {
      toast.info(message, options);
    },
    warning: (message: string, options?: ToastOptions) => {
      toast.warning(message, options);
    },
  };
};

export default useToast;