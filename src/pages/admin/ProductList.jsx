import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../redux/features/productsApiSlice'
import { toast } from 'sonner'
import { BASE_URL } from '../../services/constants'



function ProductList() {

  const { data:products, isLoading, error, refetch } = useGetProductsQuery("");

  console.log(products);

  // const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  
  const deleteHandler = async(id) => {
    if(window.confirm('Are you sure?')){
      try {
        await deleteProduct(id);
        toast.success('Deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  } 

  // const createProductHandler = async () => {
  //   if(window.confirm('Are you sure you want to create a new product?')) {
  //     try {
  //       await createProduct();
  //       refetch();
  //     } catch (err) {
  //       toast.error(err?.data?.message || err?.error);
  //     }
  //   }
  // }


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
          <Link to={'/admin/productlist'} style={{textDecoration:"none"}} className='col-span-4 py-3 text-[14px] sm:text-[16px]  rounded-lg bg-blue-300 border-blue-300  text-black flex justify-center cursor-pointer'>Products</Link>
          <Link to={'/admin/orderlist'} style={{textDecoration:"none"}} className='col-span-4 py-3 text-[14px] sm:text-[16px]  rounded-lg bg-green-200 text-black flex justify-center cursor-pointer'>Orders</Link>
        </div>

        <div className='flex justify-end mt-[30px] mb-[40px]'>
          {/* <button className='py-[8px] px-[8px] vsm:px-[12px] text-[11px] vsm:text-[13px] rounded-lg bg-black text-white' onClick={createProductHandler}>{loadingCreate? "Please wait":"+ Create Product"}</button> */}
          <Link to={'/admin/product/create'}><button className='py-[8px] px-[8px] vsm:px-[12px] text-[11px] vsm:text-[13px] rounded-lg bg-black text-white'>{"+ Create Product"}</button></Link>
        </div>

       { isLoading ? (<div className='text-[20px]'>Loading...</div>) : error ? (<div className='py-3 bg-rose-300 rounded-xl flex justify-center text-black'>{error}</div>) : (<>
          <div className='hidden md:grid grid-cols-12 gap-3 bg-slate-100 py-2 px-3 text-[12px] mxd:text-[14px] rounded-lg font-semibold '>
            <div className='col-span-3 ps-2'>Id</div>
            <div className='col-span-1 ps-2'>Image</div>
            <div className='col-span-3 ps-2'>Name</div>
            <div className='col-span-1 ps-2'>Price</div>
            <div className='col-span-1 ps-2'>Category</div>
            <div className='col-span-1 ps-2'>Brand</div>
            <div className='col-span-2 ps-2 flex justify-center'>edit delete</div>
          </div>
  
          {products?.map((product, index)=>(<div className='grid grid-cols-12 gap-2 md:gap-3 mt-[30px] md:mt-[0px] ring-1 ring-gray-200 md:ring-slate-950/5 py-[14px] px-3 text-[16px] md:text-[12px] mxd:text-[14px] rounded-lg md:py-[8px] '>
          <div className='col-span-12 md:col-span-3 ps-2 flex justify-center md:justify-start h-[100%] items-center'>{index + 1}</div>
          <hr className='col-span-12 block w-[100%] md:hidden my-1'/>
            <div className='col-span-12 md:col-span-1 ps-2 w-[100%] md:w-[65px] h-[250px] md:h-[100px] flex justify-start'>
              <img src={`${BASE_URL}${product?.image}`} className='w-[100%] h-[250px] md:h-[100px] object-contain' alt="" />
            </div>
            <div className='col-span-12 md:col-span-3 ps-2 flex font-semibold md:font-normal justify-start h-[100%] items-center'>{product?.name}</div>
            <div className='col-span-12 md:col-span-1 ps-2  flex justify-start h-[100%] items-center '>${product?.price}</div>
            <div className='col-span-12 md:col-span-1 ps-2 flex justify-start h-[100%] items-center'>{product?.category}</div>
            <div className='col-span-12 md:col-span-1 ps-2 flex justify-start h-[100%] items-center'>{product?.brand}</div>
            <div className='col-span-12 md:col-span-2 ps-2 flex justify-center h-[100%] items-center'>
              <div className='button-container w-[100%] flex justify-end md:justify-center gap-2'>
              <Link to={`/admin/product/${product._id}/edit`} style={{textDecoration:"none", color:"black"}}><button><i className="fa-solid fa-pen-to-square"></i></button></Link>
              <button onClick={()=>{deleteHandler(product._id)}}><i className="fa-solid fa-circle-xmark "></i></button>
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

export default ProductList
