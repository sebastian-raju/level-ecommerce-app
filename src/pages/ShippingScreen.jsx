import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { saveShippingAddress } from '../redux/features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


function ShippingScreen() {

  const cart = useSelector((state)=> state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState( shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState( shippingAddress?.postalCode || "");
  const [country, setCountry] = useState( shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    if(!address || !city || !postalCode || !country){
      toast.error('please enter all the fields');
    }
    else{
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      navigate('/payment');
    }

  }


  return (
    <>
     <Header/>
     
     <div className='shipping-container min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>

          {/* progress element */}
          <div className='progress-element flex items-center gap-2.5 vsm:gap-3 justify-start'>
            <div className='text-[12px] vsm:text-[17px] text-rose-700 font-semibold'>Cart</div>
            <div className='text-rose-700 font-semibold'>{'>'}</div>
            <div className='text-[12px] vsm:text-[17px] text-rose-700 font-bold'>Shipping</div>
            <div className='text-rose-700 font-semibold'>{'>'}</div>
            <div className='text-[12px] vsm:text-[17px] text-gray-400'>Payment</div>
            <div className='text-gray-400'>{'>'}</div>
            <div className='text-[12px] vsm:text-[17px] text-gray-400'>Order</div>
          </div>

          <div className='shipping-title mt-[30px] text-[23px] sm:text-[35px] tracking-tight w-[100%] flex justify-center'>
            Shipping Details
          </div>

          <div className='main-shipping-input flex flex-col items-center gap-3 mt-[15px] mb-[10px]  sm:mt-[20px]  md:mt-[20px] sm:mb-[20px] w-[100%]'>
            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>Address</div>
              <input type="text" name="address" id="" placeholder='Enter address..' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={address} onChange={(e)=>{setAddress(e.target.value)}} />
            </div>

            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>City</div>
              <input type="text" name="address" id="" placeholder='Enter City name...' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={city} onChange={(e)=>{setCity(e.target.value)}}/>
            </div>

            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>Postal Code</div>
              <input type="text" name="address" id="" placeholder='Enter postal code...' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={postalCode} onChange={(e)=>{setPostalCode(e.target.value)}}/>
            </div>

            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>Country</div>
              <input type="text" name="address" id="" placeholder='Enter country name...' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
            </div>
           
            <div className='button-container flex gap-3 w-[100%] max-w-[600px]'>
              <Link to={'/cart'} style={{textDecoration:"none", color:"black"}} className='flex-1 bg-gray-200 py-2 rounded-md justify-center flex'>Go back{' <'}</Link>
              <button className='flex-1 bg-red-300 py-2 rounded-md' onClick={submitHandler}>Continue</button>
            </div>
        
          </div>
        </div>
     </div>

     <Footer/> 
    </>
  )
}

export default ShippingScreen
