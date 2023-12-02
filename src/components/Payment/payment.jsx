import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { UserUrl } from '../../constants/constants';
import axios from 'axios'; // Add this import statement
import { useNavigate } from 'react-router-dom';

const HomePages = () => {
	const navigate = useNavigate();

	const SubmitPayment = async () => {
		try {
		  const response = await axios.post(`${UserUrl}/payments/create-checkout-session`, {
			// Include any necessary data in the request payload
			// dataKey: dataValue,
		  }, {
			withCredentials: true, // Set to true if needed
		  });
	  
		  console.log("Checkout URL:", response.data.checkout_url);
	  
 		  window.location.href = response.data.message.url

		  // Redirect the user to the Stripe Checkout page
		//   window.location.href = `https://checkout.stripe.com/pay/cs_test_a1i1GDq4cc6bt5zYhwfqZlbhXyCFmx0xz7KVGouG3P3mVGRRMpcdlFegQ1#fidkdWxOYHwnPyd1blpxYHZxWjA0SjBKU1RWTWloS1VEY1ZPR1QwS0RHSFBKQ31GND1DRGwxSUtyV189UnxHQWdualxUYl9MbnFwPGRgcHc0R2o8SExsUHxwQTBCPF1RXzdCT1NdXVVKSGxtNTVwdUpDSHJwaCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl`;
		} catch (error) {
		  console.error("Error sending payment:", error);
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

      <button className='button' onClick={SubmitPayment}>
        Checkout
      </button>
    </section>
  );
};

export default HomePages;
