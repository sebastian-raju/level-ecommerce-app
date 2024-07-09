import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCardMain from '../components/ProductCardMain'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useGetWomenProductsQuery } from '../redux/features/productsApiSlice';

function WomensCollection() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const { data:products, isLoading, error } = useGetWomenProductsQuery();

  useEffect(() => {
    // Scroll to the top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header/>
      <div className='mens-collection-container min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
      <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>
        <div className='path-name flex items-center gap-2'>
          <div className='text-[13px] text-gray-500'>Home</div>
          <div className='text-[13px] text-gray-500'>/</div>
          <div className='text-[13px] text-gray-500'>Women</div>
        </div>

        <div className='mt-[20px] text-[50px] tracking-tighter'>
          Women's
        </div>

        <div className='flex items-center justify-between mt-[20px]'>
          <div className='text-[14px] text-gray-500'>Showing all {products?.length} results</div>
          {/* <div onClick={toggleShow} className='cursor-pointer'><img src="https://i.postimg.cc/wBQKVFhq/png-transparent-filter-filtering-filters-funnel-sort-sorting-minimalisticons-icon-thumbnail-removebg.png" alt="" className='w-[30px] h-[30px]' /></div> */}
        </div>

        { !isLoading ?
        <div className='grid grid-cols-12 mt-[30px] gap-2'>

          
        {
          (products?.map(product => <ProductCardMain product={product}/>))
        } 
          
          
        </div>
        :
        (<div className='text-[23px] mt-[30px]'>Loading...</div>)
        }

      </div>
     </div>

     <Offcanvas show={show} onHide={handleClose} placement='end' name='Enable backdrop (default)' scroll={false} backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sort By</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='sort-section'>
            sort according to your needs
          </div>
        </Offcanvas.Body>
      </Offcanvas>

     <Footer/>
    </>
  )
}

export default WomensCollection
