import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../redux/features/productsApiSlice'
import Footer from '../../components/Footer';
import Header from '../../components/Header';



function ProductEditScreen() {

  const {id: productId} = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setcountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate();


  useEffect(()=>{
    if(product){
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setcountInStock(product.countInStock);
      setDescription(product.description);
    }
  },[product]);

  const submitHandler = async() => {
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);
    if(result?.error) {
      toast.error(result?.error);
    }
    else{
      toast.success('Product updated');
      navigate('/admin/productlist');
      refetch();
    }
  }


  const uploadFileHandler = async(e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  }



  return (
    <>
    <Header/>
      <div className='shipping-container min-h-[80vh] w-[100%] flex justify-center mt-[100px] lg:mt-[100px]'>
        <div className='w-[100%] max-w-[1280px] mx-[25px] sm:mx-[45px]'>

          <div className='Edit-title mt-[30px] text-[23px] sm:text-[35px] tracking-tight w-[100%] flex justify-center'>
            Edit Product
          </div>

          { isLoading ? (<div className='text-[20px]'>Loading...</div>) : error ? (<div className='py-3 bg-rose-300 rounded-xl flex justify-center text-black'>{error}</div>) :
          (<div className='main-shipping-input flex flex-col items-center gap-3 mt-[15px] mb-[10px]  sm:mt-[20px]  md:mt-[20px] sm:mb-[20px] w-[100%]'>
            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>Name</div>
              <input type="text" name="address" id="" placeholder='Enter name..' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={name} onChange={(e)=>{setName(e.target.value)}} />
            </div>

            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>Price</div>
              <input type="number" name="address" id="" placeholder='Enter price...' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            </div>

            <div className='w-[100%] max-w-[600px] flex flex-col text-[14px] text-gray-500 justify-start'>
              <div>Image</div>
              <input type="text" name="img" id="" placeholder='Enter img url' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={image} onChange={(e)=>{setImage}} />
              <input type="file" name="image" id="" placeholder='Enter image...' label="choose file" className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' onChange={uploadFileHandler} />
            </div>

            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>Brand</div>
              <input type="text" name="address" id="" placeholder='Enter brand...' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={brand} onChange={(e)=>{setBrand(e.target.value)}} />
            </div>

            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>Count In Stock</div>
              <input type="number" name="address" id="" placeholder='Enter count in stock...' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={countInStock} onChange={(e)=>{setcountInStock(e.target.value)}}/>
            </div>

            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start'>
              <div>Category</div>
              <select
                  className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 text-black outline-none ring-2 ring-slate-950/5 mb-1'
                  value={category}
                  onChange={(e) => { setCategory(e.target.value) }}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
            </div>

            <div className='w-[100%] max-w-[600px] flex flex-col gap-1 text-[14px] text-gray-500 justify-start mb-[15px]'>
              <div>Description</div>
              <input type="text" name="address" id="" placeholder='Enter description...' className='bg-white rounded-lg w-[100%] max-w-[600px] p-2.5 px-3 placeholder:text-[14px] sm:placeholder:text-[13px] text-black outline-none ring-2 ring-slate-950/5 mb-1' value={description} onChange={(e)=>{setDescription(e.target.value)}} />
            </div>
           
            <div className='button-container flex gap-3 w-[100%] max-w-[600px]'>
              <Link to={'/admin/productlist'} style={{textDecoration:"none", color:"black"}} className='flex-1 bg-gray-200 py-2 rounded-md flex justify-center text-[15px]'> Go back{' <'}</Link>
              <button className='flex-1 bg-red-300 py-2 rounded-md' onClick={submitHandler}>{loadingUpdate ? "Please wait":"Edit"}</button>
            </div>
        
          </div>)}
        </div>
     </div>

     <Footer/> 
    </>
  )
}

export default ProductEditScreen
