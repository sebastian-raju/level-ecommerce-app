import React from 'react'
import './styles/App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import SingleProduct from './pages/SingleProduct'
import MensCollection from './pages/MensCollection'
import WomensCollection from './pages/WomensCollection'
import AllCollection from './pages/AllCollection'
import SearchCollection from './pages/SearchCollection'
import Cart from './pages/Cart'
import { Toaster } from 'sonner';
import ShippingScreen from './pages/ShippingScreen'
import { useSelector } from 'react-redux'
import PaymentScreen from './pages/PaymentScreen'
import PlaceOrderScreen from './pages/PlaceOrderScreen'
import OrderScreen from './pages/OrderScreen'
import ProfileScreen from './pages/ProfileScreen'
import OrderList from './pages/admin/OrderList'
import ProductList from './pages/admin/ProductList'
import UserList from './pages/admin/UserList'
import ProductEditScreen from './pages/admin/ProductEditScreen'
import ProductCreate from './pages/admin/ProductCreate'
import UserEdit from './pages/admin/UserEdit'


function App() {

  const { userInfo } = useSelector((state)=> state.auth);


  return (
    <>
      <div className=''>
      <Routes>  
        <Route path={'/login'} element={<Auth/>}></Route>
        <Route path={'/'} element={<Home/>}></Route>
        <Route path={'/single-product/:id'} element={<SingleProduct/>}></Route>
        <Route path={'/cart'} element={<Cart/>}></Route>
        <Route path={'/products/men'} element={<MensCollection/>}></Route>
        <Route path={'/products/women'} element={<WomensCollection/>}></Route>
        <Route path={'/products/all-collection'} element={<AllCollection/>}></Route>
        <Route path={'/products/search'} element={<SearchCollection/>}></Route>
        <Route path={'/shipping'} element={userInfo ? <ShippingScreen/> : <Navigate to={'/login'}/>}></Route>
        <Route path={'/payment'} element={userInfo ? <PaymentScreen/> : <Navigate to={'/login'}/>}></Route>
        <Route path={'/placeorder'} element={userInfo ? <PlaceOrderScreen/> : <Navigate to={'/login'}/>}></Route>
        <Route path={'/order/:id'} element={userInfo ? <OrderScreen/> : <Navigate to={'/login'}/>}></Route>
        <Route path={'/profile'} element={userInfo ? <ProfileScreen/> : <Navigate to={'/login'}/>}></Route>
        {/* admin routes */}
        <Route path={'/admin/orderlist'} element={userInfo && userInfo.isAdmin ? <OrderList/> : <Navigate to={'/login'}/>}></Route>
        <Route path={'/admin/productlist'} element={userInfo && userInfo.isAdmin ? <ProductList/> : <Navigate to={'/login'}/>}></Route>
        <Route path={'/admin/userlist'} element={userInfo && userInfo.isAdmin ? <UserList/> : <Navigate to={'/login'}/>}></Route>
        <Route path={'/admin/user/:id/edit'} element={userInfo && userInfo.isAdmin ? <UserEdit/> : <Navigate to={'/login'}/>}></Route>
        <Route path={'/admin/product/create'} element={userInfo && userInfo.isAdmin ? <ProductCreate/> : <Navigate to={'/login'}/>}></Route>
        <Route path={'/admin/product/:id/edit'} element={userInfo && userInfo.isAdmin ? <ProductEditScreen/> : <Navigate to={'/login'}/>}></Route>
      </Routes>
      </div>
      <Toaster position="bottom-center" richColors />
    </>
  )
}

export default App
