import React, { useEffect, useState } from 'react'
import { addToCart, removeFromCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../services/constants';

function CartCard({cartProduct}) {

  // const { name, price, image} = cartProduct;
  // console.log(cartProduct);
  const [qty, setQty] = useState(cartProduct?.qty);
  const [noStock, setNoStock] = useState(false);
  const dispatch = useDispatch();

  const changeQuantity = (val) => {
    if(val === 'dec'){
      if(qty > 1) {
        setQty(prev => prev - 1);
        setNoStock(false);
      }
    }
    else if(val === 'inc'){
      if((cartProduct?.countInStock - qty) >= 1){
        setQty(prev => prev + 1);
        setNoStock(false);
      }
      else{
        setNoStock(true);
      }
    }
  }

  const removeFromCartHandler = async(id) =>{
    dispatch(removeFromCart(id));
  }

  useEffect(()=>{
    dispatch(addToCart({...cartProduct, qty}));
  },[qty])


  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <div className='product-container flex items-center gap-2'>
          <div className='img-container w-[100px] h-[100px]'>
            <img src={`${BASE_URL}${cartProduct?.image}`} className='w-[100%] h-[100%] object-cover' alt="" />
          </div>
          <div className='product-info'>
            <div className='category text-[11px] text-gray-500'>MEN</div>
            <div className='product-title text-[14px] sm:text-[16px] tracking-tight mb-2'>{cartProduct?.name}</div>
            {/* <div className='size text-black text-[11px]'><span className='text-gray-400 me-1 text-[11px] font-normal'>size : </span>40</div> */}
            <div className='price text-[14px] sm:text-[15px] font-semibold mb-2'><span className='text-gray-400 me-1 text-[11px] font-normal'>price : </span>${cartProduct?.price}</div>
            <div className='flex justify-between items-center w-[100%] gap-2'>
              <button className='delete button text-[10px] py-1 px-2 bg-rose-200' onClick={()=>{removeFromCartHandler(cartProduct?._id)}}>Remove</button>
              {noStock && <div className='text-red-700 text-[6px] vsm:text-[10px]'>You can't add more to your cart; stock is empty</div>}
            </div>
          </div>
        </div>
        <div className='inc-dec-button flex items-center'>
          <button className='p-[4px] px-[8px] text-[11px] sm:p-[8px] sm:px-[12px] sm:text-[14px] bg-slate-50 border-1' onClick={()=>{changeQuantity("dec")}}>{"-"}</button>
          <button className='p-[4px] px-[8px] text-[11px] sm:p-[8px] sm:px-[12px] sm:text-[14px] bg-slate-50 border-1'>{qty}</button>
          <button className='p-[4px] px-[8px] text-[11px] sm:p-[8px] sm:px-[12px] sm:text-[14px] bg-slate-50 border-1' onClick={()=>{changeQuantity("inc")}}>{"+"}</button>
        </div>
      </div>
      <hr />
    </>
  )
}

export default CartCard
