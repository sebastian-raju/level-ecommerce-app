import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../redux/features/cartSlice'

function PaymentScreen() {

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state)=> state.cart);
  const { shippingAddress } = cart;

  useEffect(()=>{
    if(!shippingAddress){
      navigate('/shipping');
    }
  },[shippingAddress, navigate])

  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  }

  console.log(paymentMethod);

  return (
    <div>
      <Header/>
        <div className='payment-container min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
          <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>

             {/* progress element */}
          <div className='progress-element flex items-center gap-2.5 vsm:gap-3 justify-start'>
            <div className='text-[12px] vsm:text-[17px] text-rose-700 font-semibold'>Cart</div>
            <div className='text-rose-700 font-semibold'>{'>'}</div>
            <div className='text-[12px] vsm:text-[17px] text-rose-700 font-semibold'>Shipping</div>
            <div className='text-rose-700 font-semibold'>{'>'}</div>
            <div className='text-[12px] vsm:text-[17px] text-rose-700 font-bold'>Payment</div>
            <div className='text-rose-700'>{'>'}</div>
            <div className='text-[12px] vsm:text-[17px] text-gray-400'>Order</div>
          </div>

          <div className='payment-title mt-[30px] text-[23px] sm:text-[35px] tracking-tight w-[100%] flex justify-center'>
            Payment Method
          </div>

            <div className='mt-[150px] sm:mt-[150px] text-[18px] w-[100%] flex justify-center mb-[30px]'>
              Select Method
            </div>

            {/* radio button */}
            <div class="flex items-center w-[100%] justify-center">
              <input checked id="default-radio-2" type="radio" value="PayPal" name="colored-radio" class="w-4 h-4 checked:bg-rose-500  border-gray-300 outline-none cursor-pointer" onChange={(e)=>{setPaymentMethod(e.target.value)}}/>
              <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 ">PayPal or Credit Card</label>
            </div>

            <div className='flex w-[100%] justify-center mt-[40px]'>
              <button className='submit bg-rose-300 py-2 px-3 rounded-md' onClick={submitHandler}>
                Continue
              </button>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default PaymentScreen
