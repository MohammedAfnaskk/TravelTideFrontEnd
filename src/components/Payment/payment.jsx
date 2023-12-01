import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import { Payment } from '../../services/userApi';

// import './HomePage.css';

const HomePages = () => {
	// const location = useLocation();

	// useEffect(() => {
	// 	// Check to see if this is a redirect back from Checkout
	// 	// const query = new URLSearchParams(window.location.search);
	// 	// const values = queryString.parse(location.search);

	// 	if (values.success) {
	// 		console.log(
	// 			'Order placed! You will receive an email confirmation.'
	// 		);
	// 	}

	// 	if (values.canceled) {
	// 		console.log(
	// 			"Order canceled -- continue to shop around and checkout when you're ready."
	// 		);
	// 	}
	// }, []);


    const SubmitPayment = async () => {
 
        try {
           const response = await Payment();
          if (response.status === 201) {
            toast.success("Payment sent successfully");
          } else {
            console.log("Error Response:", response.data);
            toast.error("Error sending Payment");
          }
        } catch (error) {
          console.log("Error:", error);
          toast.error("Error sending Payment");
        }
         
      };

	return (
		<section>
			<div className='product'>
				<img
					src='https://i.imgur.com/EHyR2nP.png'
					alt='The cover of Stubborn Attachments'
				/>
				<div className='description'>
					<h3>Stubborn Attachments</h3>
					<h5>$20.00</h5>
				</div>
			</div>
				<button className='button' type='submit' onClick={SubmitPayment}>
					Checkout
				</button>
		
		</section>
	);
};

export default HomePages;