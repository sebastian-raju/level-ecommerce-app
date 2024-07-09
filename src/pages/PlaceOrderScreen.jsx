import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useCreateOrderMutation } from '../redux/features/ordersApiSlice'
import { clearCartItems } from '../redux/features/cartSlice'
import { BASE_URL } from '../services/constants'




function PlaceOrderScreen() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state)=> state.cart);

  const [createOrder, {isLoading, error} ] = useCreateOrderMutation();

  useEffect(()=>{
    if(!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  },[cart.paymentMethod, cart.shippingAddress.address, navigate])


  const placeOrderHandler = async() => {
    try{
      console.log('hello world');
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error("request failed");
    }
  }

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
            <div className='text-[12px] vsm:text-[17px] text-rose-700 font-semibold'>Payment</div>
            <div className='text-rose-700'>{'>'}</div>
            <div className='text-[12px] vsm:text-[17px] text-rose-700 font-bold'>Order</div>
          </div>

          <div className='grid grid-cols-12 gap-4 mt-[40px]'>
            <div className='col-span-12 mxd:col-span-8'>
              <div className='shipping-container p-4 rounded-3xl ring-2 ring-slate-950/5'>
                <div className='shipping-heading text-[17px] msm:text-[21px] font-semibold mb-2'>
                  Shipping
                </div>
               
                <div className='address text-[12px]'>
                  <span className='font-semibold'>Address :</span> {cart.shippingAddress.address}, {cart.shippingAddress.city},{cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </div>
              </div>

              <div className='shipping-container p-4 rounded-3xl ring-2 ring-slate-950/5 mt-4'>
                <div className='shipping-heading text-[17px] msm:text-[21px] font-semibold mb-2'>
                  Payment Method
                </div>
               
                <div className='address text-[12px]'>
                  <span className='font-semibold'>Method :</span> {cart.paymentMethod}
                </div>
              </div>

              <div className='shipping-container p-4 pb-2 rounded-3xl ring-2 ring-slate-950/5 mt-4'>
                <div className='shipping-heading text-[17px] msm:text-[21px] font-semibold '>
                  Order Items
                </div>
               
                <div className='order p-1 msm:p-3'>

                  {cart.cartItems.length === 0 ? (
                    <div className='w-[100%] py-3 bg-rose-300 text-black text-[14px] flex justify-center items-center rounded-2xl'>Your cart is Empty</div>
                  ) 
                  : 
                  (cart.cartItems.map((item, index) => (
                    <>
                      <div className='flex justify-between items-center pt-[8px] msm:pt-[12px]'>
                    <div className='flex items-center gap-2'>
                      <div className='img-container w-[100%] max-w-[100px] h-[100px]'>
                        <img src={`${BASE_URL}${item?.image}`} alt="" className='w-[100%] h-[100%] object-contain' />
                      </div>
                      <div className='product-title text-[11px] msm:text-[13px] w-[100%] msm:w-[200px] flex justify-center'>
                        {item?.name}
                      </div>
                    </div>
                    <div className='price-details text-[12px] msm:text-[15px] flex justify-center'>
                      <span>{item?.qty}</span> x <span>${item.price}</span> = <span>${item.qty * item.price}</span>
                    </div>
                  </div>

                  <hr />
                    </>
                  ))
                    
                  )}

                  


                  

                </div>
              </div>

            </div>
            
            { cart.cartItems.length !== 0 &&
            <div className='col-span-12 mxd:col-span-4'>
              <div className='order-summary-container p-3 px-4 rounded-3xl ring-2 ring-slate-950/5'>
                <div className='shipping-heading text-[17px] msm:text-[21px] font-semibold mb-3'>
                  Order Summary
                </div>

                <div className='flex items-center justify-between mb-1'>
                    <div className='field-name text-[12px] text-gray-500'>Items :</div>
                    <div className='field-data text-[14px] text-black'>${cart.itemsPrice}</div>
                </div>

                <div className='flex items-center justify-between mb-1'>
                    <div className='field-name text-[12px] text-gray-500'>Shipping :</div>
                    <div className='field-data text-[14px] text-black'>${cart.shippingPrice}</div>
                </div>

                <div className='flex items-center justify-between mb-1'>
                    <div className='field-name text-[12px] text-gray-500'>Tax :</div>
                    <div className='field-data text-[14px] text-black'>${cart.taxPrice}</div>
                </div>

                <hr />

                <div className='flex items-start justify-between mb-2'>
                    <div className='text-[14px] font-semibold text-black'>Total Amount : </div>
                    <div className='text-[14px] font-semibold text-black'>${cart.totalPrice}</div>
                  </div>

                  {error?.message && <div className='py-2 rounded-xl bg-red-100 text-black flex justify-center items-center w-[100%]'>something went wrong</div>}

                <button className='place-order-btn py-[13px] font-semibold rounded-md bg-rose-300 text-[12px] mt-2 w-[100%] ring-1 ring-slate-950' onClick={placeOrderHandler} >
                  {isLoading ? "Please wait..":"Place Order"}
                </button>
              </div> 
            </div>
            }
          </div>

          </div>
        </div>

      <Footer/>
    </div>
  )
}

export default PlaceOrderScreen
