import React from 'react'
import Ratings from './Ratings';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/constants';

function ProductCard({product}) {

  const { _id, name, category, price, image, rating, numReviews } = product;

  return (
    <Link to={`/single-product/${_id}`} style={{textDecoration:"none", color:'black'}}  className='flex flex-col items-start p-3 w-[280px]  vsm:w-[300px]'>
      <div className='product-image w-[280px] vsm:w-[300px] h-[320px] rounded-xl overflow-hidden'>
        <img src={`${BASE_URL}${image}`} className='w-[100%] h-[100%] object-cover shadow-xl' alt="" />
      </div>
      <div className='text-[14px] text-gray-400 mt-3 uppercase'>{category}</div>
      <Ratings value={rating} text={`${numReviews} reviews`}/>
      <div className='product-title text-[18px] font-semibold '>{name}</div>
      <div className='price text-[20px]'>${price}</div>
    </Link>
  )
}

export default ProductCard
