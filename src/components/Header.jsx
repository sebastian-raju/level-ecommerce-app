import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './styles/Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRegister } from '../redux/features/registerSlice';
import { useLogoutMutation } from '../redux/features/usersApiSlice';
import { logout } from '../redux/features/authSlice';
import { resetCart } from '../redux/features/cartSlice';



function Header() {

  const { cartItems } = useSelector((state)=> state.cart);
  const { userInfo } = useSelector((state)=> state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToRegister = () => {
    dispatch(setRegister(true));
    navigate('/login');
  }

  const navigateToSignIn = () => {
    dispatch(setRegister(false)); 
    navigate('/login');
  }

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async() => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      localStorage.removeItem('cart');
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }

  const navigateToProfile = () => {
    navigate('/profile');
  }

  const navigateToDashboard = () => {
    navigate('/admin/orderlist');
  }

  return (
    <>
     <Navbar key={"lg"} expand={"lg"} className="bg-white mb-3 z-50" fixed='top'>
          <Container fluid={'lg'} className='py-2.5 px-4'>
            <Navbar.Brand href="#" className='flex justify-content-center me-0'><Link to={'/'} style={{textDecoration:"none"}}><img src="https://i.postimg.cc/2SR5rGvj/level-icon.png" alt="" className='w-[53px] h-[20px] sm:w-[60px] sm:h-[25px]' /></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} className='shadow-none border-0' />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${"lg"}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"lg"}`}>
                <img src="https://i.postimg.cc/2SR5rGvj/level-icon.png" alt="" className='w-[53px] h-[20px] sm:w-[60px] sm:h-[25px]' />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='flex flex-col blg:flex-row blg:justify-between blg:items-center blg:ms-4'>
                
                  <div className='mb-[20px] blg:mb-[0px]'>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Link to={'/'} style={{textDecoration:"none"}}><Nav.Link href="#action1" style={{fontSize:"14px", color:"black"}}>Home</Nav.Link></Link>
                      <Link to={'/products/men'} style={{textDecoration:"none"}}><Nav.Link href="#action2" style={{fontSize:"14px", color:"black"}}>Men</Nav.Link></Link>
                      <Link to={'/products/women'} style={{textDecoration:"none"}}><Nav.Link href="#action3" style={{fontSize:"14px", color:"black"}}>Women</Nav.Link></Link>
                      <Link to={"/products/all-collection"} style={{textDecoration:"none"}}><Nav.Link href="#action4" style={{fontSize:"14px", color:"black"}}>All Collection</Nav.Link></Link>
                      {/* <Nav.Link href="#action5" style={{fontSize:"14px", color:"black"}}>About Us</Nav.Link> */}
                    </Nav>
                  </div>
                
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
                  <Nav>
                <div className='flex flex-col blg:flex-row blg:items-center gap-[15px] blg:gap-[10px] '>
                    <div className='relative'>
                      {/* <input type="text" name="" id="" placeholder='search products..' className='rounded-3xl border-1 p-2 px-3 placeholder:text-[13px] w-[100%]' /> */}
                      <Link to={'/products/search'}>
                        <div className='cursor-pointer'>
                          <img src="https://i.postimg.cc/yNPg6SPD/search-icon.png" alt="" className='w-[21px] h-[21px]' />
                        </div>
                      </Link>
                    </div>
                    <Link to={'/cart'} style={{textDecoration:"none"}}>
                      <div className='px-[2px] blg:ps-[15px] blg:p-[10px] flex items-center gap-3 relative'>
                        <i class="fa-solid fa-bag-shopping fa-lg text-black"></i>
                        {
                        cartItems.length >0 && 
                        (<div className='w-[20px] h-[20px] flex justify-center items-center rounded-full leading-[0px] bg-rose-800 text-[10px] text-white absolute left-[24px] bottom-[8px]'>{ cartItems.reduce((a,c)=> a + c.qty, 0) }</div>)
                        }
                        <div className='text-[15px] blg:hidden text-black'>Cart</div>
                      </div>
                    </Link>
                    {userInfo && userInfo.isAdmin ? 
                       (<NavDropdown
                        title={
                          <div className='flex items-center gap-3'>
                            <img src="https://i.postimg.cc/52yZw1V7/Pngtree-avatar-icon-profile-icon-member-5247852-1.png" className='w-[20px] h-[20px]' alt="" />
                            <div className='text-[15px]'>{userInfo?.name}</div>
                          </div>
                        }
                        id={`offcanvasNavbarDropdown-expand-${"lg"}`}
                        align={'end'}
                      >
                        <NavDropdown.Item style={{fontSize:"14px"}} onClick={navigateToDashboard}>Dashboard</NavDropdown.Item>
                         <NavDropdown.Item style={{fontSize:"14px"}} onClick={navigateToProfile}>Profile</NavDropdown.Item>
                          <NavDropdown.Item style={{fontSize:"14px"}} onClick={logoutHandler}>
                            Logout
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          {/* <NavDropdown.Item href="#action8" style={{fontSize:"14px"}}>
                          About Us
                          </NavDropdown.Item> */}
                        </NavDropdown>) 
                        :
                    userInfo ? (<NavDropdown
                        title={
                          <div className='flex items-center gap-3'>
                            <img src="https://i.postimg.cc/52yZw1V7/Pngtree-avatar-icon-profile-icon-member-5247852-1.png" className='w-[20px] h-[20px]' alt="" />
                            <div className='text-[15px]'>{userInfo?.name}</div>
                          </div>
                        }
                        id={`offcanvasNavbarDropdown-expand-${"lg"}`}
                        align={'end'}
                      >
                        
                         <NavDropdown.Item style={{fontSize:"14px"}} onClick={navigateToProfile}>Profile</NavDropdown.Item>
                          <NavDropdown.Item style={{fontSize:"14px"}} onClick={logoutHandler}>
                            Logout
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          {/* <NavDropdown.Item href="#action8" style={{fontSize:"14px"}}>
                          About Us
                          </NavDropdown.Item> */}
                        </NavDropdown>) 
                    
                    : 

                    (<NavDropdown
                        title={
                          <div className='flex items-center gap-3'>
                            <img src="https://i.postimg.cc/52yZw1V7/Pngtree-avatar-icon-profile-icon-member-5247852-1.png" className='w-[20px] h-[20px]' alt="" />
                            <div className='text-[15px]'>Sign In</div>
                          </div>
                        }
                        id={`offcanvasNavbarDropdown-expand-${"lg"}`}
                        align={'end'}
                      >
                        
                         <NavDropdown.Item style={{fontSize:"14px"}} onClick={navigateToSignIn} >Sign In</NavDropdown.Item>
                          <NavDropdown.Item style={{fontSize:"14px"}} onClick={navigateToRegister}>
                            Create Account
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          {/* <NavDropdown.Item href="#action8" style={{fontSize:"14px"}}>
                          About Us
                          </NavDropdown.Item> */}
                        </NavDropdown>) }
                  
                      </div>
                  </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar> 
    </>
  )
}

export default Header
