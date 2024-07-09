import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useDeleteUserMutation, useGetUsersQuery } from '../../redux/features/usersApiSlice'
import { toast } from 'sonner'



function UserList() {

  const { data:users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  console.log(users);

  const deleteHandler = async(id) => {
    if(window.confirm('Are you sure')) {
      try{
        await deleteUser(id);
        toast.success('User deleted !');
        refetch();
      } catch(err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  }

  return (
    <>
      <Header/>
       <div className='user-profile-container min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>
          <div className='text-[23px] flex justify-center'>
            Dashboard
          </div>
  
          {/* common component to navigate */}
          <div className='grid grid-cols-12 gap-[8px] sm:gap-[12px] mt-[30px] w-[100%] mb-[60px]'>
            <Link to={'/admin/userlist'} style={{textDecoration:"none"}} className='col-span-4 py-3 text-[14px] sm:text-[16px] rounded-lg bg-red-300 border-red-300 text-black flex justify-center cursor-pointer'>Users</Link>
            <Link to={'/admin/productlist'} style={{textDecoration:"none"}} className='col-span-4 py-3 text-[14px] sm:text-[16px]  rounded-lg bg-blue-200   text-black flex justify-center cursor-pointer'>Products</Link>
            <Link to={'/admin/orderlist'} style={{textDecoration:"none"}} className='col-span-4 py-3 text-[14px] sm:text-[16px]  rounded-lg bg-green-200 text-black flex justify-center cursor-pointer'>Orders</Link>
          </div>


          { isLoading ? (<div className='text-[20px]'>Loading...</div>) : error ? (<div className='py-3 bg-rose-300 rounded-xl flex justify-center text-black'>{error}</div>) : (<>
          <div className='hidden blg:grid grid-cols-12 gap-3 bg-slate-100 py-2 px-3 text-[12px] blg:text-[14px] rounded-lg font-semibold '>
            <div className='col-span-3 ps-2'>Id</div>
            <div className='col-span-3 ps-2'>Name</div>
            <div className='col-span-2 ps-2'>Email</div>
            <div className='col-span-2 ps-2'>Role</div>
            <div className='col-span-2 ps-2 flex justify-center'>edit delete</div>
          </div>
  
          {users.map((user)=>(<div className='grid grid-cols-12 gap-2 blg:gap-3 mt-[30px] blg:mt-[0px] ring-1 ring-gray-200 blg:ring-slate-950/5 py-[14px] px-3 text-[16px] blg:text-[14px] rounded-lg blg:py-[40px] '>
          <div className='col-span-12 blg:col-span-3 ps-2 flex justify-center blg:justify-start h-[100%] items-center'>{user._id}</div>
          <hr className='col-span-12 block w-[100%] blg:hidden my-1'/>
            <div className='col-span-12 blg:col-span-3 ps-2 flex font-semibold blg:font-normal justify-start h-[100%] items-center'>{user?.name}</div>
            <div className='col-span-12 blg:col-span-2 ps-2  flex justify-start h-[100%] items-center '>{user?.email}</div>
            <div className='col-span-12 blg:col-span-2 ps-2 flex justify-start h-[100%] items-center'>{user?.isAdmin ? "Admin": "User"}</div>
            <div className='col-span-12 blg:col-span-2 ps-2 flex justify-center h-[100%] items-center'>
              <div className='button-container w-[100%] flex justify-end blg:justify-center gap-2'>
              <Link to={`/admin/user/${user._id}/edit`} style={{textDecoration:"none", color:"black"}}><button><i className="fa-solid fa-pen-to-square"></i></button></Link>
              <button onClick={()=>{deleteHandler(user?._id)}}><i className="fa-solid fa-circle-xmark "></i></button>
              </div>
            </div>
          </div>))}
        </>)
        }


  
        </div>
       </div>
       <Footer/>
    </> 
  )
}

export default UserList
