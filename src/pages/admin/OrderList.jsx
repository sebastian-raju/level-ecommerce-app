import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useGetOrdersQuery } from '../../redux/features/ordersApiSlice'


function OrderList() {

  const { data: orders, refetch, isLoading, error } = useGetOrdersQuery();

  useEffect(()=>{
    refetch();
  },[])
 

  return (
    <>
    <Header/>
      <div className='user-profile-container min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>
          <div className='text-[23px] flex justify-center'>
            Dashboard
          </div>

            {/* common component to navigate */}
            <div className='grid grid-cols-12 gap-[8px] sm:gap-[12px] mt-[30px] w-[100%]'>
              <Link to={'/admin/userlist'} style={{textDecoration:"none"}} className='col-span-4 py-3 text-[14px] sm:text-[16px] rounded-lg bg-red-200 text-black flex justify-center cursor-pointer'>Users</Link>
              <Link to={'/admin/productlist'} style={{textDecoration:"none"}} className='col-span-4 py-3 text-[14px] sm:text-[16px]  rounded-lg bg-blue-200 text-black flex justify-center cursor-pointer'>Products</Link>
              <Link to={'/admin/orderlist'} style={{textDecoration:"none"}} className='col-span-4 py-3 text-[14px] sm:text-[16px]  rounded-lg bg-green-300 text-black flex justify-center border-green-300 cursor-pointer'>Orders</Link>
            </div>
            <div className='flex flex-col gap-3 mt-[50px]'>
              {
                isLoading ? <div className='text-[20px]'>Loading...</div> 
                : error ? <div className='py-3 bg-rose-300 rounded-xl flex justify-center text-black'>{error}</div>
                  : 
                  (orders?.length > 0 ? orders.map((order)=> 
                    <div className='ring-2 ring-slate-950/5 rounded-3xl p-[17px] vsm:p-[25px]'>
                      <div className='flex justify-between items-center gap-[20px]'>
                        <div className='order-content flex-grow'>
                          <div className='order-no text-[12px] vsm:text-[15px] flex-2 font-semibold  flex-nowrap vsm:flex '>Order <span className='text-[12px] vsm:text-[14px] font-normal ms-[5px]'>#{order._id}</span> 
                          </div>
                          {order.isPaid ? <div className='mt-[8px] text-[11px] text-green-500'>paid on : <span className='ms-[5px]'>{order.paidAt.substring(0, 10)}</span></div>
                          :<div className='mt-[8px] text-[11px] text-red-500'>Not Paid</div>}
                          <div className='text-[12px]'>User : {order?.user?.name}</div>
                          <hr />
                          <div className='flex flex-col gap-[5px] mt-[20px]'>
                            {
                              order.orderItems.map((orderItem, index)=>
                                <div className='text-[12px] vsm:text-[14px]'>
                                    {index+1}. {orderItem.name} <span className='ms-[8px]'>x</span><span className='ms-[8px]'>{orderItem.qty}</span>
                                </div> 
                            )
                              
                            
                            }
                          </div>
                          <div className='flex items-center mt-[20px] gap-[10px]'>
                            <div className='Total text-[14px]'>
                              Total Amount:
                            </div>
                            <div className='text-[15px]'>${order.totalPrice}</div>
                          </div>
                        </div>
      
                        <div className='details-button flex-shrink-0 p-0 justify-end items-end flex flex-col '>
                         <Link to={`/order/${order._id}`}>
                            <button className='px-[8px] vsm:px-[16px] py-[8px] bg-rose-200 text-black rounded-lg text-[13px] vsm:text-[14px]'>
                              Details
                            </button>
                         </Link>
                          <div className='text-[10px] vsm:text-[12px] mt-[10px]'>Delivered : <span className=''>{order.isDelivered ? <i className="fa-solid fa-circle-check fa-lg text-green-500"></i> : <i className="fa-solid fa-circle-xmark fa-lg text-red-500"></i>}</span></div>
                        </div>
                      </div>
                    </div>) 
                    :
                    <div className='no-order flex justify-center text-[20px]'>No Orders Here...</div>)  
              }
              
            </div> 
        </div>
      </div> 
    <Footer/>
    </>
  )
}

export default OrderList
