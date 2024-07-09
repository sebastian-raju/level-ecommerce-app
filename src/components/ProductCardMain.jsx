import React from 'react'
import Ratings from './Ratings'
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/constants';

function ProductCardMain({product}) {

  const { _id, name, category, price, image, rating, numReviews } = product;

  return (
    <>
    <Link to={`/single-product/${_id}`} style={{textDecoration:"none", color:'black'}} className='col-span-12 msm:col-span-6 blg:col-span-4 xl:col-span-3 flex justify-center'>
      <div className='flex flex-col items-start p-3 max-w-[300px] vsm:w-[100%]'>
        <div className='product-image sm:w-[100%] h-[270px] rounded-xl overflow-hidden self-center'>
          <img src={`${BASE_URL}${image}`} className='w-[100%] h-[100%] object-cover shadow-xl' alt="" />
        </div>
        <div className='text-[14px] text-gray-400 mt-3 uppercase'>{category}</div>
        {/* <div className='ratings'>★★★★★</div> */}
        <Ratings value={rating} text={`${numReviews} reviews`}/>
        <div className='product-title text-[18px] font-semibold '>{name}</div>
        <div className='price text-[20px]'>${price}</div>
      </div>
    </Link>
    </>
  )
}

export default ProductCardMain


// "https://i.postimg.cc/bJGk2b3z/Supreme-Box-Logo-Hooded-Sweatshirt-FW23-Ash-Grey.webp"
