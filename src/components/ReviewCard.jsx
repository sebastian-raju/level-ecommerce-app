import React from 'react'
import Ratings from './Ratings'

function ReviewCard({review}) {
  const { comment, name, rating} = review;
  return (
    <div className='flex flex-col items-center p-3 w-[350px]  vsm:w-[400px]'>
      <div className='review-content w-[350px] text-[15px] vsm:w-[400px] text-center mb-[15px]'>
        {comment}
      </div>  
      {/* <div className='stars text-[20px]'>★★★★★</div> */}
      <Ratings value={rating} text={""}/>
      <div className='text-gray-500'>{name}</div>
    </div>
  )
}

export default ReviewCard
