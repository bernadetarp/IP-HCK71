import { toast } from 'react-toastify';

export default function showToastError(error) {
    toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClick: function () {},
        // transition: Bounce,
    })
}


export function showToastSuccess(message) {
    toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClick: function () {},
        // transition: Bounce,
    });
}