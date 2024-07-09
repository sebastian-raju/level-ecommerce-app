import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'


function Ratings({value, text}) {
  return (
    <div className='Rating flex text-yellow-300 items-center'>
      <span>
        { value >= 1 ? <FaStar/> : value >=0.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
      </span>

      <span>
        { value >= 2 ? <FaStar/> : value >=1.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
      </span>

      <span>
        { value >= 3 ? <FaStar/> : value >=2.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
      </span>

      <span>
        { value >= 4 ? <FaStar/> : value >=3.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
      </span>

      <span>
        { value >= 5 ? <FaStar/> : value >=4.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
      </span>
      <span className="rating-text text-black text-[12px]  ms-1.5">{ text && text }</span>
    </div>
  )
}

export default Ratings
