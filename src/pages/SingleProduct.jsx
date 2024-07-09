import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Accordion from 'react-bootstrap/Accordion';
import './styles/SingleProduct.css'
import ProductCard from '../components/ProductCard';
import Ratings from '../components/Ratings';
import { useCreateReviewMutation, useGetFeaturedProductsQuery, useGetProductDetailsQuery } from '../redux/features/productsApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../services/constants';
import { toast } from 'sonner';


function SingleProduct() {
  const { id:productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const { data: products, isLoading:featuredLoading, error:featuredError } = useGetFeaturedProductsQuery("");

  const [qty, setQty] = useState(1);
  const [noStock, setNoStock] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector((state)=> state.auth);

  // const { name, description, brand, category, image, rating, numReviews, countInStock, price  } = product;

  const changeQuantity = (val) => {
    if(val === 'dec'){
      if(qty > 1) {
        setQty(prev => prev - 1);
        setNoStock(false);
      }
    }
    else if(val === 'inc'){
      if((product?.countInStock - qty) >= 1){
        setQty(prev => prev + 1);
        setNoStock(false);
      }
      else{
        setNoStock(true);
      }
    }
  } 

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart');
  }


  const reviewHandler = async() => {
    try {
      await createReview({ 
        productId,
        rating,
        comment
       }).unwrap();
       refetch();
       toast.success('Review Submitted');
       setRating(0);
       setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  useEffect(() => {
    // Scroll to the top when component mounts
    window.scrollTo(0, 0);
  }, []);


  return (
    <div>
      <Header/>
        {
          isLoading ? (<div className='min-h-[80vh] mt-[100px] lg:mt-[100px] w-[100%] flex justify-center'>
            <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>
              Loading...
            </div>
          </div>) 
          : error ? (<div className='min-h-[80vh] mt-[100px] lg:mt-[100px] w-[100%] flex justify-center'>
          <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>
            {error.data.message || error.error}
          </div>
          </div>) 
          : (<>
            <div className=' w-[100%] flex flex-col gap-[15px] items-center justify-center mt-[100px] sm:mt-[140px]'>
              <Link to={'/products/all-collection'} style={{textDecoration:"none"}} className='w-[100%] flex justify-start max-w-[1280px]'>
                <button className=' text-[14px] py-2 px-3 bg-black text-white'>{"Go back <--"}</button>
              </Link>
          <div className="grid grid-cols-12 gap-[30px] md:gap-[20px] w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]">
            <div className="col-span-12 md:col-span-6 flex justify-center ring-1 pt-[30px] rounded-lg ring-slate-950/5 w-[100%] h-[480px] sm:h-[550px] px-[15px]">
              <div className="img-container w-[100%] h-[480px] sm:h-[500px] relative">
                <img src={`${BASE_URL}${product?.image}`} className='w-[100%] h-[480px] sm:h-[500px] object-contain' alt="" />
                {/* <div className='py-2 px-3 bg-black text-white shadow-xl rounded-xl absolute top-[-15px] left-5px'>20% Off</div> */}
                {/* <div className='py-2 px-2 bg-slate-100 rounded-full absolute bottom-0 right-1'><img src="https://i.postimg.cc/yNPg6SPD/search-icon.png" alt="" className='w-[25px] h-[25px]' /></div> */}
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 px-[15px]">
              <div className="main-product-info-container flex flex-col justify-start">
                <div className='flex items-center justify-between'>
                  <div className='category text-[14px] uppercase text-gray-500'>men</div>
                  {/* <div className="button-container flex items-center gap-1">
                    <button className='p-2 px-3 bg-slate-50 border-1'>{"<"}</button>
                    <button className='p-2 px-3 bg-slate-50 border-1'>{">"}</button>
                  </div> */}
                </div>

                <div className="product-title text-[23px] font-semibold mt-[15px]">{product?.name}</div>
                <div className="product-title text-[11px] mb-[8px]">{product?.brand}</div>
                <Ratings value={product?.rating} text={`${product?.numReviews} reviews`}/>
                <div className="product-price text-[21px] font-bold mt-[15px]">${product?.price}</div>
                <div className="product-description text-[13px] leading-[25px]  mt-[15px] text-gray-500">{product?.description}
                </div>

                <div className={`${product?.countInStock === 0 ? "text-red-500" : "text-green-500"} text-[13px] mt-[20px]`}>{product?.countInStock === 0 ? "Out of Stock":"In Stock"}</div>

                { 
                product.countInStock !== 0 && 
                <>
                 <hr />
  
                   <div className='flex items-center gap-3'>
                    <div className="button-container flex items-center mt-">
                        <button className='p-2 px-3 text-[14px] bg-slate-50 border-1' onClick={()=>{changeQuantity("dec")}}>{"-"}</button>
                        <button className='p-2 px-3 text-[14px] bg-slate-50 border-1'>{qty}</button>
                        <button className='p-2 px-3 text-[14px] bg-slate-50 border-1' onClick={()=>{changeQuantity("inc")}} >{"+"}</button>
                      </div>
                      <button className="add-to-cart button px-3 py-2 bg-black text-[14px] text-white" onClick={addToCartHandler}>Add to cart</button>
                  </div>
                  {noStock && <div className='text-red-700 text-[10px] mt-1'>You can't add more to your cart; stock is empty</div>}
  
                  <hr />
                </>
                }

                
                <div className="category-name text-[12px] text-gray-500">Category : <span className='text-[12px]'>{product?.category}</span></div>

                <div className='mt-[40px]'>
                  <Accordion flush>
                    <Accordion.Item className='shadow-none' eventKey="0">
                      <Accordion.Header style={{fontSize:"13px", marginRight:"10px", width:"100%"}} >Description</Accordion.Header>
                      <Accordion.Body style={{fontSize:"12px"}}>
                        <div className='font-semibold mb-2'>About the product</div>
                        <div>{product?.description}</div>
                        <div className="flex flex-col justify-start gap-1 mt-[20px]">
                          <div className="">○ 100% Cotton</div>
                          <div className="">○ 260 gsm</div>
                          <div className="">○ Breathable fabric</div>
                        </div>
                        <hr />
                        <div className='font-semibold'>Size & Fit</div>
                        <div className="flex flex-col justify-start gap-1 mt-[10px]">
                          <div className="">○ Standard fit for a relaxed, easy feel</div>
                        </div>
                        <hr />
                        <div className='font-semibold mb-2'>Free delivery & returns</div>
                        <div>Free standard delivery on orders over $60.</div>
                        <div className="flex flex-col justify-start gap-1 mt-[20px]">
                          <div className="">○ You can return your order for any reason, free of charge, within 30 days</div>
                          <div className="">○ We also offer a Free-of-Charge shipping label</div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header style={{fontSize:"12px", marginRight:"10px", width:"100%"}}>Reviews</Accordion.Header>
                      <Accordion.Body style={{fontSize:"12px", padding:"0px"}}>

                        {/* review card */}
                        {product.reviews.length > 0 ? 
                        product?.reviews?.map((review) => <div className='p-[5px] py-[10px] md:py-[15px] md:p-[10px] mt-[5px] ring-1 ring-slate-950/5 rounded-xl mb-3'>
                          <div className='text-[14px] font-semibold'>
                            {review?.name}
                          </div>
                          <Ratings value={review?.rating}></Ratings>
                          <div className='text-[11px]'>{review?.createdAt?.substring(0, 10)}</div>

                          <div className='text-[12px] md:text-[14px] mt-[12px]'>
                            {review?.comment}
                          </div>
                        </div>)
                        :
                        <div className='py-3 rounded-lg text-black-600 bg-blue-50 text-[12px] flex justify-center mt-[10px]'>
                          No Reviews
                          </div>}

                          <hr />

                        <div className='mt-[20px] mb-[15px] text-[15px] mx-[15px] font-semibold'>Write a Customer Review</div>

                        {userInfo ? <div className="">
                          <div className='rating-title px-[12px] mb-1'>
                            Rating
                          </div>
                          <select name="" id="" className='w-[100%] max-w-[200px] ring-1 ring-slate-950/5 p-2 mx-[12px] rounded-lg focus:outline-none' value={rating} onChange={(e)=> setRating(Number(e?.target?.value))}>
                          <option value="">Select..</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>

                          <div className='rating-title px-[12px] mt-3 mb-1'>
                            Comment
                          </div>

                          <div className='px-[10px]'><textarea rows={3} type="text" className='py-[10px] rounded-xl px-[12px] ring-1 ring-slate-950/5 w-[100%] focus:outline-none' placeholder='enter a comment...' name="" id="" value={comment} onChange={(e)=>{setComment(e.target.value)}} /></div>

                          <div className='mx-[10px] mt-[10px]'><button className='w-[100%] bg-rose-200 py-[15px] text-[12px] rounded-lg' onClick={reviewHandler}>{loadingProductReview ? "Please Wait":"Submit"}</button></div>
                        </div>
                        :
                        <div className='py-3 rounded-lg text-black-600 bg-blue-50 text-[12px] flex justify-center mt-[10px]'>
                          please <Link className='ms-1 me-1' to={'/login'}>Sign In</Link> to write a review{' '}
                        </div>}


                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
  
              </div>
            </div>

            
             
          </div>

          
        </div>

        <div className='products-container w-[100%] flex  justify-center mt-[100px] lg:mt-[90px]'>
                <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px] px-[20px]'>
                  <div className='title-container flex justify-center items-center gap-3'>

                  <div className='text-[20px] sm:text-[26px] leading-[28px] font-semibold'>Related Products</div>
                  <button className='text-[12px] leading-[20px] py-1.5 px-3 rounded-lg bg-black text-white'>See More</button>
                  </div>

                  <div className='products mt-[40px] flex gap-[10px] overflow-x-scroll mb-[50px]'>

                    { !featuredLoading ?
                    (products?.map(product => <ProductCard product={product}/>))
                    :
                    (<div className='text-[23px] mt-[30px]'>Loading...</div>)
                    }
                            

                  </div>

                </div> 
              </div>
          </>)
        }
        

      <Footer/>
    </div>
  )
}

export default SingleProduct
