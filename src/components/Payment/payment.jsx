import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { UserUrl } from "../../constants/constants";
import axios from "axios"; // Add this import statement
import jwt_decode from "jwt-decode";
import { userAxiosInstant } from "../../utils/axiosUtils";

const HomePages = () => {
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const user_id = decode.user_id;
  const updatePaymentStatus = async () => {
    try {
      const currentDate = new Date().toISOString();

      const res = await userAxiosInstant.patch(
        `payments/payment/${user_id}/`,
        {
          payment: true,
          payment_date: currentDate,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Axios Response:", res.data);
      toast.success("Payment successful");
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Error updating payment status");
    }
  };

  const SubmitPayment = async () => {
    try {
      const response = await axios.post(
        `${UserUrl}/payments/create-checkout-session`,
        {},
        {
          withCredentials: true,
        }
      );
 
      console.log("Checkout URL:", response.data.checkout_url);

      window.location.href = response.data.checkout_url;

	  setTimeout(() => {
 		const success = new URLSearchParams(window.location.search).get("success");
		if (success === "true") {
 		  updatePaymentStatus();
		} else {
 		  const canceled = new URLSearchParams(window.location.search).get("canceled");
		  if (canceled === "true") {
			console.log("Payment canceled");
 		  }
		}
	  }, 3000); 
	  
    } catch (error) {
      console.error("Error sending payment:", error);
      toast.error("Error sending Payment");
    }
  };

  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>

      <button className="button" onClick={SubmitPayment}>
        Checkout
      </button>
    </section>
  );
};

export default HomePages;
