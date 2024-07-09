import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartCard from '../components/CartCard'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Cart() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state)=> state.cart);
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  const checkoutHandler = () => {
   navigate('/login?redirect=/shipping'); 
  }

  return (
    <>
      <Header/>
        <div className='cart-container min-h-[70vh] w-[100%] flex justify-center mt-[100px] lg:mt-[130px]'>
          <div className='w-[100%] max-w-[1280px] mx-[15px] sm:mx-[45px]'>

            <div className='cart-title text-[30px] tracking-tighter'>
              Shopping Bag
            </div>
            <div className='text-[12px] text-gray-500 mt-1'><span className='text-black me-1'>{cartItems.reduce((acc, item)=> acc + item.qty, 0)} items</span>in the bag</div>

            <div className='grid grid-cols-12 gap-4 md:gap-[20px] mt-[30px]'>

              <div className='col-span-12 md:col-span-8'>
                <div className='cart-products ring-1 ring-slate-950/5 rounded-3xl p-3'>

                  { cartItems?.length > 0 ?
                    (cartItems.map((cartProduct)=><CartCard cartProduct={cartProduct}/>))
                    :
                    (<div className='text-[20px]'>No items in the cart.. <Link to={"/"} style={{textDecoration:"underline", color:"black"}}>Go back to shopping</Link></div>)
                  }


                  
                </div>
              </div>

              <div className='col-span-12 md:col-span-4 '>
                {
                  cartItems?.length > 0 &&
                  <div className='proceed to checkout-container ring-1 ring-slate-950/5 rounded-3xl p-3 sticky top-[100px]'>
                  <div className='heading text-[12px] tracking-tight'>PRICE DETAILS ({cartItems.reduce((acc, item)=> acc + item.qty, 0)} items)</div>
                  <hr />
                  <div className='flex items-center justify-between mb-1'>
                    <div className='field-name text-[12px] text-gray-500'>Total MRP :</div>
                    <div className='field-data text-[14px]'>${itemsPrice}</div>
                    {/* {cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0)} */}
                  </div>
                  <div className='flex items-center justify-between mb-1'>
                    <div className='field-name text-[12px] text-gray-500'>Tax :</div>
                    <div className='field-data text-[14px] text-green-600'>${taxPrice}</div>
                  </div>
                  <div className='flex items-start justify-between'>
                    <div className='flex flex-col justify-start'>
                      <div className='field-name text-[12px] leading-[10px] text-gray-500'>Shipping :</div>
                      { shippingPrice == 0 && <div className='field-name text-[9px] text-gray-500'>Free shipping for you</div>}
                    </div>
                    { shippingPrice == 0 ? 
                    <div className='field-data text-[14px] text-green-600'>Free</div>
                    :
                    <div className='field-data text-[14px] text-green-600'>{shippingPrice}</div>
                  }
                  </div>
                  <hr />

                  <div className='flex items-start justify-between mb-3'>
                    <div className='text-[15px] font-semibold text-black'>Total Amount : </div>
                    <div className='text-[15px] font-semibold text-black'>${totalPrice}</div>
                  </div>

                  <div className='grid grid-cols-12 gap-1 py-[28px] bg-gray-200 justify-items-center rounded-md'>
                    <div className='col-span-4  flex flex-col items-center gap-2'>
                      <img src="https://i.postimg.cc/59QN1dtK/5650917.png" className='w-[30px] h-[30px]' alt="" />
                      <div className='text-[9px] text-center'>Genuine Products</div>
                    </div>
                    <div className='col-span-4  flex flex-col items-center gap-2'>
                      <img src="https://i.postimg.cc/nLyvgPpj/png-transparent-contactless-card-pay-payment-elasto-ecommerce-ui-flat-outline-icons-icon-removebg-pr.png" className='w-[30px] h-[30px]' alt="" />
                      <div className='text-[9px] text-center'>Contactless Delivery</div>
                    </div>
                    <div className='col-span-4  flex flex-col items-center gap-2'>
                      <img src="https://i.postimg.cc/YSn3kmSF/secure-payment2785-removebg-preview.png" className='w-[40px] h-[30px]' alt="" />
                      <div className='text-[9px] text-center'>Secure Payments</div>
                    </div>
                  </div>
                  <button className='py-[13px] font-semibold rounded-md bg-rose-300 text-[12px] mt-2 w-[100%] ring-1 ring-slate-950' onClick={checkoutHandler}>
                      proceed to checkout
                  </button>

                </div>
                }
              </div>

            </div>

          </div>
        </div>
      <Footer/>
    </>
  )
}

export default Cart
