import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

export default function Payment() {
    const { id } = useParams();
    let navigate = useNavigate();

    async function paid() {
        try {
            const { data } = await axios({
                method: "POST",
                url: `/transaction/${id}/generate-midtrans-token`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            console.log(data, "<<<< data dari PaymentPage")

            window.snap.pay(data.midtransToken.token, {
                // window.snap.embed(data.token, {
                // embedId: 'snap-container',
                onSuccess: async function (result) {
                    alert("payment success!"); console.log(result);
                    await axios({
                        method: "PATCH",
                        url: `/transaction/${id}/payment`,
                        data: {
                            orderId: data.orderId
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.access_token}`
                        }
                    })

                    navigate("/")
                },
                onPending: function (result) {
                    alert("wating your payment!"); console.log(result);
                },
                onError: function (result) {
                    alert("payment failed!"); console.log(result);
                },
                onClose: function () {
                    alert('you closed the popup without finishing the payment');
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="mb-4">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-green-100 text-green-800">
                    <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M19.707 5.293a1 1 0 0 0-1.414 0L7.5 16.086 2.707 11.293a1 1 0 0 0-1.414 1.414l6 6a1 1 0 0 0 1.414 0l12-12a1 1 0 0 0 0-1.414z" clipRule="evenodd" />
                    </svg>
                    Thank you for filling the form!
                </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">Click the button below to proceed with payment.</p>
            <button onClick={paid} className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">
                Pay Now
            </button>
        </div>
    )
}