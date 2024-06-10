import React, { useState } from 'react';
import './OtpPage.css';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';


function OtpPage() {

    const { register, handleSubmit } = useForm();
    let {state} = useLocation();

  const [otp, setOtp] = useState(new Array(6).fill(''));

  const handleChange = (element, index) => {
    //allows to enter only numeric values
    //if (isNaN(element.value)) return false;

    //Update the state of the OTP array with the new value entered by the user.
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //checks if there is a next input field 
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  function handleOTPSubmit(data) {
      
      console.log(otp.join(''));
      console.log(state.otp)
      // console.log(otp.join('') === data.otp);
    //   if(otp.join('') === data.otp){
    //     alert("OTP Verified");
    //   }
    //   else{
    //     alert("OTP Not Verified");
    //   }
    //   console.log(data);
  }

  return (
    <><Box height={100}/>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bord rounded-3 mt-5 p-3">
          <h2 className="text-center mt-5 mb-2">OTP Verification</h2>
          <div className=''>
            <p className=' text-center'>Enter OTP Code sent to {state.email}</p>
          <form id="otp-form " onSubmit={handleSubmit(handleOTPSubmit)} >
            <div className="text-center">
              {otp.map((data, index) => {
                return (
                  <input
                    key={index}
                    type="password"
                    name="otp"
                    maxLength="1"
                    className="otp-input rounded mb-4"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    {...register("otp", { required: true })}
                  />
                );
              })}
            </div>
            <div className="form-group text-center">
              <button type="submit" className=" button bg-primary mt-4">Verify & Proceed</button>
            </div>
          </form>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default OtpPage;