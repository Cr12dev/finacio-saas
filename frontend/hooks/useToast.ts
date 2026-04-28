import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
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