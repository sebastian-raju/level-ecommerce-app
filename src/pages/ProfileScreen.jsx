import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useProfileMutation } from '../redux/features/usersApiSlice'
import { setCredentials } from '../redux/features/authSlice'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useGetMyOrdersQuery } from '../redux/features/ordersApiSlice'
import { Link } from 'react-router-dom'



function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const dispatch = useDispatch();

  const { userInfo } = useSelector((state)=> state.auth);
  const [isEdit, setIsEdit] = useState(false);

  const [updateProfile, { isLoading:loadingUpdateProfile }] = useProfileMutation();

  const {data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(()=>{
    if(userInfo) {
      setName(userInfo?.name);
      setEmail(userInfo?.email);
    }
  },[userInfo, userInfo?.name, userInfo?.email, isEdit])

  const submitHandler = async () => {
    if(password !== confirmPassword){
      toast.error('password do not match');
    }
    try {
      const res = await updateProfile({ _id:userInfo._id, name, email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success('user-profile updated');
      setIsEdit(false);
    } catch (err) {
      toast.error(err?.data?.message || err?.error)
    }
  }


  return (
    <>
      <Header/>
      <div className='user-profile-container min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>

          <div className='text-[23px]'>User Profile</div>

          <div className='grid grid-cols-12 gap-4 mt-[40px]'>

            <div className='col-span-12 mxd:col-span-4'>
           { isEdit ? 
           (<div className='order-summary-container p-3 px-4 rounded-3xl ring-2 ring-slate-950/5'>
                <div className='shipping-heading text-[17px] text-green-700 msm:text-[21px] font-semibold mb-3'>
                  Edit Profile
                </div>

                <div className='flex items-center gap-2 mb-2.5'>
                    <div className='field-name text-[14px] text-gray-500 w-[100px]'>Name :</div>
                    {/* <div className='field-data text-[16px] text-black'>{userInfo?.name}</div> */}
                    <input type="text" className='w-[100%] border-1 border-gray-300 rounded-lg placeholder:text-[12px] focus:ring-0 focus:border-1 px-[8px] py-[8px] focus:border-gray-300  text-[14px]' placeholder='Username' name="" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>

                <div className='flex items-center gap-2 mb-2.5'>
                    <div className='field-name text-[14px] text-gray-500 w-[100px]'>Email :</div>
                    {/* <div className='field-data text-[16px] text-black'>{userInfo?.email}</div> */}
                    <input type="email" className='w-[100%] border-1 border-gray-300 rounded-lg placeholder:text-[12px] focus:ring-0 focus:border-1 px-[8px] py-[8px] focus:border-gray-300  text-[14px]' placeholder='email..' name="" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>

                <div className='flex items-center gap-2 mb-2.5'>
                    <div className='field-name text-[14px] text-gray-500 w-[100px]'>Password :</div>
                    {/* <div className='field-data text-[16px] text-black'>{userInfo?.email}</div> */}
                    <input type="password" className='w-[100%] border-1 border-gray-300 rounded-lg placeholder:text-[12px] focus:ring-0 focus:border-1 px-[8px] py-[8px] focus:border-gray-300   text-[14px]' placeholder='enter your password..' name="password" id="" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <div className='flex items-center gap-2 mb-2.5'>
                    <div className='field-name text-[14px] text-gray-500 w-[100px]'>Confirm :</div>
                    {/* <div className='field-data text-[16px] text-black'>{userInfo?.email}</div> */}
                    <input type="password"  className='w-[100%] border-1 border-gray-300 rounded-lg placeholder:text-[12px] focus:ring-0 focus:border-1 px-[8px] py-[8px] focus:border-gray-300  text-[14px]' placeholder='confirm password..' name="cnfrm" id="cnfrm" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                </div>

                <div className='w-[100%] flex gap-2 items-center'>
                  <button className='py-[13px] font-semibold rounded-md bg-gray-200 text-[12px] mt-2 w-[100%] ring-1 ring-slate-950' onClick={()=>{setIsEdit(false)}}>
                    {"<---"}
                  </button>
                  <button className='py-[13px] font-semibold rounded-md bg-green-200 text-[12px] mt-2 w-[100%] ring-1 ring-slate-950'
                  onClick={submitHandler}>
                      {loadingUpdateProfile ? "Please wait":"Submit"}
                  </button>
                </div>
                

            </div>)
               :
            (<div className='order-summary-container p-3 px-4 rounded-3xl ring-2 ring-slate-950/5'>
                <div className='shipping-heading text-[17px] text-rose-700 msm:text-[21px] font-semibold mb-3'>
                  User Info
                </div>

                <div className='flex items-center gap-2 mb-2.5'>
                    <div className='field-name text-[14px] text-gray-500 w-[70px]'>Name :</div>
                    <div className='field-data text-[16px] text-black'>{name}</div>
                </div>

                <div className='flex items-center gap-2 mb-[90px]'>
                    <div className='field-name text-[14px] text-gray-500 w-[70px]'>Email :</div>
                    <div className='field-data text-[16px] text-black'>{email}</div>
                </div>

                <button className='py-[13px] font-semibold rounded-md bg-rose-200 text-[12px] mt-2 w-[100%] ring-1 ring-slate-950' onClick={()=>{setIsEdit(true)}}>
                    Edit profile
                </button>
                

               </div>)}
            </div>

            <div className='col-span-12 mxd:col-span-8 flex flex-col gap-[25px]'>

              {isLoading ?
              (<div className='text-[25px]'>Loading....</div>)
              : 
              error ? (<div className='py-3 w-[100%] bg-rose-200 text-black rounded-xl text-[14px] flex justify-center'>{error?.data?.message || error?.error}</div>) 
              :
              (orders?.length > 0 ? orders.map((order)=> 
              <div className='ring-2 ring-slate-950/5 rounded-3xl p-[17px] vsm:p-[25px]'>
                <div className='flex justify-between items-center'>
                  <div className='order-content'>
                    <div className='order-no text-[12px] vsm:text-[15px] flex-2 font-semibold  flex-nowrap vsm:flex '>Order <span className='text-[12px] vsm:text-[14px] font-normal ms-[5px]'>#{order._id}</span> 
                    </div>
                    {order.isPaid ? <div className='mt-[8px] text-[11px] text-green-500'>paid on : <span className='ms-[5px]'>{order.paidAt.substring(0, 10)}</span></div>
                    :<div className='mt-[8px] text-[11px] text-red-500'>Not Paid</div>}
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

                  <div className='details-button container p-0 justify-end items-end flex flex-col'>
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
              <div className='no-order flex justify-center text-[20px]'>No Orders Here...</div>)}

              
            </div>

          </div>

        </div>  
      </div>
      <Footer/>
    </>
  )
}

export default ProfileScreen
