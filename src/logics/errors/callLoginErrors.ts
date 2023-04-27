import { toast } from 'react-toastify';

export const callNotification = (message: string, type: 'success' | 'error') => {
  const toastType = type === 'success' ? toast.success : toast.error;

  toastType(message, {
    position: toast.POSITION.TOP_LEFT,
    autoClose: 3500,
  });
};
