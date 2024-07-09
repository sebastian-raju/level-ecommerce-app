import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import { useDeliverOrderMutation, useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from "../redux/features/ordersApiSlice";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../services/constants';




function OrderScreen() {

  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  
  const [payOrder, { isLoading:loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal  } = useGetPayPalClientIdQuery();

  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const { userInfo } = useSelector((state)=> state.auth);

  


  useEffect(()=>{
    if(!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency:'USD',
          }
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      if(order && !order.isPaid) {
        if(!window.paypal){
          loadPayPalScript();
        }
      }
    }
  },[order, paypal, paypalDispatch, loadingPayPal, errorPayPal])


  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({orderId, details});
        refetch();
        toast.success('Payment Successful')
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }); 
  }

  async function onApproveTest() {
    await payOrder({orderId, details:{ payer:{}}});
    refetch();
    toast.success('Payment Successful')
  }

  function onError(err) {
    toast.error(err?.message)
  }

  function createOrder(data, actions) {
    return actions.order
    .create({
      purchase_units:[
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    })
    .then((orderId)=>{
      return orderId;
    })
  }


  const deliverOrderHandler = async() => {
      try {
        await deliverOrder(orderId);
        refetch();
        toast.success('Order delivered');
      } catch(err) {
        toast.error(err?.data?.message || err?.message);
      }
  }

   console.log(order);



  return isLoading ? (<div className='loader min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
    <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'> Loading... </div>
  </div>) 
  : 
  error ? (  <div className='error min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
    <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>  </div>
  </div>) 
  :  
  (
    <>
      <Header/>
      <div className='payment-container min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>
          <div className='order-details-title text-[23px] sm:text-[30px] mb-[30px]'>
            Order Details
          </div>

          { userInfo && userInfo.isAdmin && <Link to={'/admin/orderlist'} style={{textDecoration:"none"}} className='text-[14px] px-3 py-2 bg-black text-white flex justify-center w-[100%] max-w-[150px]'>{"<-- Dashboard"}</Link>}
          
          <div className='grid grid-cols-12 gap-4'>

            <div className='col-span-12 mxd:col-span-8'>
              
            <div className='shipping-container p-4 rounded-3xl ring-2 ring-slate-950/5'>
                <div className='shipping-heading text-[17px] msm:text-[21px] font-semibold mb-3'>
                  Shipping
                </div>

                <div className='address text-[12px] mb-2'>
                  <span className='font-semibold'>Name :</span> {order?.user.name}
                </div>

                <div className='address text-[12px] mb-2'>
                  <span className='font-semibold'>Email :</span> {order?.user.email}
                </div>
               
                <div className='address text-[12px] mb-3'>
                  <span className='font-semibold'>Address :</span> {order?.shippingAddress.address}, {order?.shippingAddress.city},{order?.shippingAddress.postalCode}, {order?.shippingAddress.country}
                </div>

                {order?.isDelivered ? <div className='py-3 rounded-lg text-green-600 bg-green-100 text-[12px] flex justify-center'>
                  Delivered
                </div> 
                :
                <div className='py-3 rounded-lg text-rose-600 bg-rose-100 text-[12px] flex justify-center'>
                  Not delivered
                </div>}


              </div>

              <div className='shipping-container p-4 rounded-3xl ring-2 ring-slate-950/5 mt-4'>
                <div className='shipping-heading text-[17px] msm:text-[21px] font-semibold mb-3'>
                  Payment Method
                </div>
               
                <div className='address text-[12px] mb-3'>
                  <span className='font-semibold'>Method :</span> {order?.paymentMethod}
                </div>

                {order.isPaid ? 
                <div className='py-3 rounded-lg text-green-600 bg-green-100 text-[12px] flex justify-center'>
                  Paid
                </div>
                :
                <div className='py-3 rounded-lg text-rose-600 bg-rose-100 text-[12px] flex justify-center'>
                  Not Paid
                </div>}
              </div>

              <div className='shipping-container p-4 pb-2 rounded-3xl ring-2 ring-slate-950/5 mt-4'>
                <div className='shipping-heading text-[17px] msm:text-[21px] font-semibold '>
                  Order Items
                </div>
               
                <div className='order p-1 msm:p-3'>

                  {order?.orderItems?.length === 0 ? (
                    <div className='w-[100%] py-3 bg-rose-300 text-black text-[14px] flex justify-center items-center rounded-2xl'>Your cart is Empty</div>
                  ) 
                  : 
                  (order?.orderItems.map((item, index) => (
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
                      <span>{item?.qty}</span> x <span>{item?.price}</span> = <span>${item?.qty * item?.price}</span>
                    </div>
                  </div>

                  <hr />
                    </>
                  ))
                    
                  )}
                  
                </div>
              </div>


            </div>

            <div className='col-span-12 mxd:col-span-4'>
            { order?.orderItems?.length !== 0 &&
            <div className='col-span-12 mxd:col-span-4'>
              <div className='order-summary-container p-3 px-4 rounded-3xl ring-2 ring-slate-950/5'>
                <div className='shipping-heading text-[17px] msm:text-[21px] font-semibold mb-3'>
                  Order Summary
                </div>

                <div className='flex items-center justify-between mb-1'>
                    <div className='field-name text-[12px] text-gray-500'>Items :</div>
                    <div className='field-data text-[14px] text-black'>${order?.itemsPrice}</div>
                </div>

                <div className='flex items-center justify-between mb-1'>
                    <div className='field-name text-[12px] text-gray-500'>Shipping :</div>
                    <div className='field-data text-[14px] text-black'>${order?.shippingPrice}</div>
                </div>

                <div className='flex items-center justify-between mb-1'>
                    <div className='field-name text-[12px] text-gray-500'>Tax :</div>
                    <div className='field-data text-[14px] text-black'>${order?.taxPrice}</div>
                </div>

                <hr />

                <div className='flex items-start justify-between mb-2'>
                    <div className='text-[14px] font-semibold text-black'>Total Amount : </div>
                    <div className='text-[14px] font-semibold text-black'>${order?.totalPrice}</div>
                  </div>

                  {error?.message && <div className='py-2 rounded-xl bg-red-100 text-black flex justify-center items-center w-[100%]'>something went wrong</div>}

                 { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered ? (<button className='mt-[25px] test-payment py-2.5 text-[14px] rounded-lg bg-rose-100 text-black ring-1 flex justify-center ring-black w-[100%] mb-2' onClick={deliverOrderHandler} >{ loadingDeliver ? "Please Wait":"Mark as Delivered"}</button>)
                  : 
                  (!order.isPaid && 
                  (<>
                   <button className='mt-[25px] test-payment py-2.5 text-[14px] rounded-lg bg-rose-100 text-black ring-1 flex justify-center ring-black w-[100%] mb-3' onClick={ onApproveTest }>{ isPending ? "Please Wait":"Test Payment"}</button>
  
                    <div>
                      <PayPalButtons 
                        createOrder={ createOrder }
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
  
                  </>
                  ))}

                 

              </div> 
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

export default OrderScreen


// isLoading ? (
  // <div className='loader min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
  //   <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'> Loading... </div>
  // </div>
// ) : error ? (
//   <div className='error min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
//     <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>  </div>
//   </div>
// ) :
