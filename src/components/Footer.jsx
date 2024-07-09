import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
     <div className='footer-container w-[100%] flex  justify-center mt-[70px] lg:mt-[90px] bg-rose-100'>
        <div className='w-100%  flex flex-col justify-center items-center py-[40px] sm:py-[80px] bg-rose-100'>
          <div className='check-socials text-[19px] font-semibold mb-1'>Follow Us for More</div>
          <div className='text-gray-600 text-[11px] sm:text-[12px] w-[100%] max-w-[500px] px-[30px] text-center mb-4'>Your one-stop shop for the latest in men's and women's fashion
          </div>
          <div className='grid grid-cols-12 place-items-center   w-[100%] max-w-[500px]'>
            <Link to={'/products/all-collection'} style={{textDecoration:"none", color:"black"}} className='text-[13px] col-span-12 sm:col-span-3'>All Collection</Link>
            <Link to={'/products/women'} style={{textDecoration:"none", color:"black"}} className='text-[13px] col-span-12 sm:col-span-3'>Women</Link>
            <Link to={'/products/men'} style={{textDecoration:"none", color:"black"}} className='text-[13px] col-span-12 sm:col-span-3'>Men</Link>
            <Link to={'/products/all-collection'} style={{textDecoration:"none", color:"black"}} className='text-[13px] col-span-12 sm:col-span-3'>About Us</Link>
          </div>
          <div className='flex items-center gap-3 text-black mt-[20px]'>
            <i class="fa-brands fa-x-twitter"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-square-instagram"></i>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center text-[11px] sm:text-[14px] text-white w-[100%] bg-black py-[50px]'>
        Copyright @ 2024 leveL | Powered by Sebastian Raju
      </div> 
    </>
  )
}

export default Footer
