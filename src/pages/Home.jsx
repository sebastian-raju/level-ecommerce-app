import React, { useEffect } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import './styles/Home.css'
import ReviewCard from '../components/ReviewCard'
import Footer from '../components/Footer'
import { useGetFeaturedProductsQuery, useGetReviewsQuery, useGetTopRatedProductsQuery } from '../redux/features/productsApiSlice'
import { Link } from 'react-router-dom'


function Home() {

  const { data: products, isLoading:featuredLoading, error:featuredError } = useGetFeaturedProductsQuery("");
  const { data: TopProducts, isLoading:TopLoading, error:TopError } = useGetTopRatedProductsQuery("");
  const { data: sortedProducts, isLoading:reviewLoading, error:reviewError } = useGetReviewsQuery();

  useEffect(() => {
    // Scroll to the top when component mounts
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <Header/>
      {/* hero section */}
      <div className='hero-container w-[100%] flex justify-center mt-[100px]'>
        <div className='grid grid-cols-12 rounded-xl bg-rose-100  w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>
          <div className='hero-title-container col-span-12 lg:col-span-6 flex flex-col justify-center items-center h-[100%] min-h-[250px] p-[50px]'>
            <div className=''>
              <div className='text-[28px] leading-[35px] md:text-[35px] lg:text-[45px] lg:w-[400px] lg:leading-[48px]'>Slick. Modern. Awesome.</div>
              <Link to={'/products/all-collection'} style={{textDecoration:"none"}}><button className='text-[12px] leading-[20px] py-1.5 px-3 rounded-lg bg-black text-white mt-2'>Explore All</button></Link>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-6 relative'>
              <div className='flex justify-center translate-y-0 lg:translate-y-[100px]'>
                <img src="https://i.postimg.cc/XYVVLVYG/hero.png" className='w-[50%] h-[50%] lg:w-[70%] lg:h-[70%] z-20' alt="" />
                <div className='absolute top-[-40px]  md:right-[200px]'>
                  <img src="https://i.postimg.cc/9MQyjQVd/circle-512.png" alt="" className='w-[150px] h-[150px] md:w-[300px] md:h-[300px]' />
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* banner for feature section */}
      <div className='banner-container w-[100%] flex justify-center mt-[50px] lg:mt-[100px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px] grid grid-cols-12 bg-black text-white rounded-lg bg-[url("https://i.postimg.cc/cCZnPW7f/Download-Minimal-Geometry-Black-Shapes-Wallpaper-Get-Walls-io-1.jpg")] bg-center'>
          <div className='col-span-12 md:col-span-4 py-[50px] flex justify-center items-center gap-2'>
          <i class="fa-solid fa-lock fa-md"></i>
            <div className='flex items-center text-[14px]'>
              Secure Payment
            </div>
          </div>
          <div className='col-span-12 md:col-span-4 py-[50px] flex justify-center items-center gap-2'>
          <img src="https://i.postimg.cc/v8jRDfjZ/istockphoto-1451843282-2048x2048-1-removebg-preview.png" className='w-[38px] h-[20px]' alt="" />
          <div className='flex items-center text-[14px]'>
              Express Shipping
            </div>
          </div>
          <div className='col-span-12 md:col-span-4 py-[50px] flex justify-center items-center gap-2'>
          <i class="fa-solid fa-arrows-rotate fa-lg"></i>
          <div className='flex items-center text-[14px]'>
              Free Return
            </div>
          </div>
        </div>
      </div>

      {/* categories and products section */}

      <div className='products-container w-[100%] flex  justify-center mt-[70px] lg:mt-[90px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px] px-[20px]'>
          <div className='title-container flex justify-center items-center gap-3'>

          <div className='text-[20px] sm:text-[26px] leading-[28px] font-semibold'>Top Rated</div>
          <Link to={'/products/all-collection'} style={{textDecoration:"none"}}><button className='text-[12px] leading-[20px] py-1.5 px-3 rounded-lg bg-black text-white'>Shop now</button></Link>
          </div>

          <div className='products mt-[40px] flex gap-[20px] overflow-x-scroll mb-[50px]'>

          { !TopLoading ?
            (TopProducts?.map(product => <ProductCard product={product}/>))
            :
            (<div className='text-[23px] mt-[30px]'>Loading...</div>)
          }            

          </div>

        </div> 
      </div>


      <div className='products-container w-[100%] flex  justify-center mt-[70px] lg:mt-[70px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px] px-[20px]'>
          <div className='title-container flex justify-center items-center gap-3'>

          <div className='text-[20px] sm:text-[26px] leading-[28px] font-semibold'>Featured Products</div>
          <Link to={'/products/all-collection'} style={{textDecoration:"none"}}><button className='text-[12px] leading-[20px] py-1.5 px-3 rounded-lg bg-black text-white'>Shop now</button></Link>
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

      {/* men women category */}
      <div className='category-container w-[100%] flex  justify-center mt-[70px] lg:mt-[70px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px] bg-[linear-gradient(to_right_bottom,rgba(198,198,198,0.8),rgba(28,28,28,0.8)),url("https://i.postimg.cc/Y0WFKJXw/man-and-woman-laughing.webp")] bg-no-repeat flex flex-col justify-center items-start h-[550px] sm:h-[600px] bg-cover bg-center sm:bg-center bg-fixed rounded-xl p-[40px] '>
          <div className='category-tagline text-[27px] leading-[34px] sm:text-[40px] text-white mb-[10px] sm:mb-[15px] w-[100%] flex justify-center'>
            Fashion for Every You
          </div>
          <div className='flex items-center gap-2 vsm:gap-3 w-[100%] justify-center'>
            <Link to={'/products/men'}><button className='text-[12px] sm:text-[13px] px-1.5 py-2 font-light  sm:px-3 sm:py-2 border-2 border-white text-white'>Shop Men</button></Link>
            <Link to={'/products/women'}><button className='text-[12px] sm:text-[13px] px-1.5 py-2 font-light  sm:px-3 sm:py-2 border-2 border-white text-white'>Shop Women</button></Link>
          </div>
         
        </div>
      </div>

      {/* review container */}
      <div className='products-container w-[100%] flex  justify-center mt-[70px] lg:mt-[90px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px] px-[30px]'>
          <div className='title-container flex justify-center items-center gap-3'>

          <div className='text-[20px] sm:text-[30px] leading-[28px] font-semibold'>Reviews</div>
          </div>

          <div className='products mt-[40px] flex gap-[20px] overflow-x-scroll mb-[50px]'>

          { !reviewLoading ?
            (sortedProducts?.map(product => <ReviewCard review={product.reviews[0]}/>))
            :
            (<div className='text-[23px] mt-[30px]'>Loading...</div>)
          }                    

          </div>

        </div> 
      </div>

      <Footer/>

    </>
  )
}

export default Home


{/* <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col items-start p-3 w-[100%]'>
              <div className='product-image w-[100%] h-[270px]'>
                <img src="https://i.postimg.cc/bJGk2b3z/Supreme-Box-Logo-Hooded-Sweatshirt-FW23-Ash-Grey.webp" className='w-[100%] h-[100%] object-cover shadow-xl' alt="" />
              </div>
              <div className='ratings mt-3'>5 stars</div>
              <div className='product-title'>The Supreme Hoodie</div>
              <div className='price'>$40</div>
            </div>

            <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col items-start p-3 w-[100%] h-[100%] object-cover'>
              <div className='product-image w-[100%] h-[270px]'>
                <img src="https://i.postimg.cc/vZDT0MwB/Product-Your-Design-Here-02-3.jpg" className='w-[100%] shadow-xl' alt="" />
              </div>
              <div className='ratings mt-3'>5 stars</div>
              <div className='product-title'>The Supreme Hoodie</div>
              <div className='price'>$40</div>
            </div>

            <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col items-start p-3 w-[100%] h-[100%] object-cover'>
              <div className='product-image w-[100%] h-[270px]'>
                <img src="https://i.postimg.cc/zf91QKWc/Custom-made-T-Shirts-35.jpg" className='w-[100%] shadow-xl' alt="" />
              </div>
              <div className='ratings mt-3'>5 stars</div>
              <div className='product-title'>The Supreme Hoodie</div>
              <div className='price'>$40</div>
            </div> */}
        