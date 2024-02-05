import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const successToast = ({ title, position = 'top-center' }) => {
  toast.success(title, { position: position });
};

export const errorToast = ({ title, position = 'top-center' }) => {
  toast.error(title, { position: position });
};
