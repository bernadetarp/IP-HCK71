import { useParams } from "react-router-dom";
import axios from "../utils/axios";

export default function Payment() {
    const { id } = useParams();

    async function paid() {
        try {
            const { data } = await axios({
                method: "POST",
                url: `/${id}/generate-midtrans-token`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
                })
            console.log(data.orderId, "<<< dari PaymentPage")

            window.snap.pay(data.midtransToken.token, {
                // window.snap.embed(data.token, {
                // embedId: 'snap-container',
                onSuccess: async function (result) {
                    alert("payment success!"); console.log(result);
                    await axios({
                        method: "PATCH",
                        url: `/${id}/payment`,
                        data: {
                            orderId: data.orderId
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.access_token}`
                        }
                    })
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
            //   });

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button onClick={paid}>Bayar Sekarang</button>
    )
}