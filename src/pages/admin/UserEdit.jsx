import React, { useEffect, useState } from 'react';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../redux/features/usersApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { toast } from 'sonner';



function UserEdit() {

  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(()=>{
    setName(user?.name);
    setEmail(user?.email);
    setIsAdmin(user?.isAdmin);
  },[user]);

  const submitHandler = async() => {
    try {
      await updateUser({userId, name, email, isAdmin});
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userList');
    } catch (err){
      toast.error(err?.data?.message || err?.error );
    }
  }

  return (
    <>
     <Header/>
      <div className='min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>

          <div className='Edit-title mt-[30px] text-[23px] sm:text-[35px] tracking-tight w-[100%] flex justify-center'>
            Edit User
          </div>

          { isLoading ? (<div className='text-[20px]'>Loading...</div>) : error ? (<div className='py-3 bg-rose-300 rounded-xl flex justify-center text-black'>{error}</div>) :
          (<div className='main-shipping-input flex flex-col items-center gap-3 mt-[15px] mb-[10px]  sm:mt-[20px]  md:mt-[20px] sm:mb-[20px] w-[100%]'>
            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>Name</div>
              <input type="text" name="address" id="" placeholder='Enter name..' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={name} onChange={(e)=>{setName(e.target.value)}} />
            </div>


            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>Email</div>
              <input type="email" name="email" id="" placeholder='Enter email...' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </div>

            <div className='w-[100%] max-w-[600px] flex gap-2 justify-start mb-[20px] mt-[10px] items-center'>
              <input type="checkbox" name="isAdmin" id="" placeholder='' label='is Admin' checked={isAdmin} className='bg-white rounded-lg p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none' onChange={(e)=>{setIsAdmin(e.target.value)}} />

              <div className='text-[14px] text-gray-500'>is Admin </div>
              </div>

           
            <div className='button-container flex gap-3 w-[100%] max-w-[600px]'>
              <Link to={'/admin/userlist'} style={{textDecoration:"none", color:"black"}} className='flex-1 bg-gray-200 py-2 rounded-md flex justify-center text-[15px]'> Go back{' <'}</Link>
              <button className='flex-1 bg-red-300 py-2 rounded-md' onClick={submitHandler}>{loadingUpdate ? "Please wait":"Edit"}</button>
            </div>
        
          </div>)}
        </div>
     </div>

     <Footer/>  
    </>
  )
}

export default UserEdit
