import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { UserUrl } from "../../constants/constants";
import axios from "axios"; // Add this import statement
import jwt_decode from "jwt-decode";
import { userAxiosInstant } from "../../utils/axiosUtils";

const Payment = (props) => {
  const tripData = props.props
  const trip_id = tripData.id
  const main_place = tripData.main_place
  const budget = tripData.budget
  const image = tripData.place_image
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const user_id = decode.user_id;

  const updatePaymentStatus = async () => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];

      const res = await userAxiosInstant.post(
        `payments/strippayments/`,
        {
          user :user_id,
          trip: trip_id,
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

  useEffect(() => {
    const handlePaymentStatus = () => {
      const success = new URLSearchParams(window.location.search).get("success");
      const canceled = new URLSearchParams(window.location.search).get("canceled");

      if (success === "true") {
        updatePaymentStatus();
      } else if (canceled === "true") {
        console.log("Payment canceled");
      }
    };

    const timer = setTimeout(handlePaymentStatus, 3000);

    return () => clearTimeout(timer);

  }, []);

  const SubmitPayment = async () => {
    try {
       
  
      const response = await axios.post(
        `${UserUrl}/payments/create-checkout-session`,
        {trip_id,main_place,budget,image},
        {
          withCredentials: true,
        }
      );
      window.location.href = response.data.message.url
 
     } catch (error) {
      // Handle errors
      console.error("Error creating checkout session:", error);
      toast.error("Error creating checkout session");
    }
  };
  

  return (
    <section>
      <div className="product">
      
        <div className="description">
          <h3>{tripData.main_place}</h3>
          <h5>{tripData.budget}</h5>
        </div>
      </div>

      <button  onClick={SubmitPayment}>
        Checkout
      </button>
    </section>
  );
};

export default Payment;
