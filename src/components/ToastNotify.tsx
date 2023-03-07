import { toast } from "react-toastify";

export const toastNotify = (message: string) => {
  // notification purposes
  toast.info(`${message}`, {
    position: "bottom-left",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
