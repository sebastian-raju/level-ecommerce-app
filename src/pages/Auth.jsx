import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../redux/features/usersApiSlice';
import { setCredentials } from '../redux/features/authSlice';
import { setRegister } from '../redux/features/registerSlice';
import { toast } from 'sonner';



function Auth() {

  // const [register, setRegister] = useState(false);
  // const isLargeScreen = useMediaQuery('(min-width: 640px)')

  const [input, setInput] = useState({
    name:"",
    email:"",
    password:"" 
  })

  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();
  const [registerMutation, {isRegisterLoading}] = useRegisterMutation();

  const { userInfo } = useSelector((state)=> state.auth);
  const { register } = useSelector((state)=> state.register);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(()=>{
    if(userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // const changeOrder = () => {
  //   setRegister(prev => !prev);
  // }

  const getInput = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setValidName(!/^[a-zA-Z ]+$/.test(value));
    }

    if (name === "email") {
      setValidEmail(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value));
    }

    if (name === "password") {
      setValidPassword(!/^[a-zA-Z0-9]+$/.test(value));
    }

    setInput({
      ...input, [name]: value
    });
  };

  useEffect(()=>{
    setValidName(false);
    setValidEmail(false);
    setValidPassword(false);
    setInput({ name: "", email: "", password: "" });
  },[register])


  const isFormInvalid = validName || validEmail || validPassword;


  const handleLogin = async() => {
    const {email, password} = input;
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res,}));
      navigate(redirect);
    } catch (err) {
      console.error("Login error:", err); // Debug log
      toast.error(err?.data.message || err?.error)
    }
  }

  const handleRegister = async() => {
    const {name, email, password} = input; 
    try {
      const res = await registerMutation({name, email, password}).unwrap();
      console.log(res);
      dispatch(setCredentials({...res,}));
      navigate(redirect);
    } catch (err) {
      console.error("Login error:", err); // Debug log
      toast.error(err?.data.message || err?.error)
    }
  }



  return (
    <div className='auth-page flex justify-center items-center'>

        <div className="auth-container p-[8px] sm:p-[16px] rounded-3xl bg-slate-50 grid grid-cols-12 gap-3 min-h-[90vh] w-[100%] md:max-w-[80%] shadow-2xl mx-[20px] mt-[40px] mb-[40px]">

          <div className={`img-container ${register? "md:order-1": "md:order-2"} col-span-12 md:col-span-6 overflow-hidden rounded-xl h-[28vh] md:h-[100%] 
          ${register?'bg-[url("https://i.postimg.cc/XYBbyL7t/pexels-ekaterina-bolovtsova-4049942-1.jpg")]': 'bg-[url("https://i.postimg.cc/qqc0bX5j/pexels-athena-2043590.jpg")]'} bg-center`}>
            {/* <img src="https://i.postimg.cc/XYBbyL7t/pexels-ekaterina-bolovtsova-4049942-1.jpg" alt="" className='w-[100%] h-[100%] object-cover object-center' /> */}
          </div>

          <div className={`auth-input-container ${register? "md:order-2": "md:order-1"} col-span-12 md:col-span-6 p-[10px] pt-[0px] sm:p-[15px] sm:pt-[15px] h-[100%] md:mt-[0px]`}>
            <div className="brand-logo">
            <img src="https://i.postimg.cc/2SR5rGvj/level-icon.png" alt="" className='w-[33px] h-[13px] sm:w-[40px] sm:h-[15px]' />
            </div>
            <div className="auth-main-container flex flex-col items-start justify-center h-[100%]">
              <div className='text-[18px] sm:text-[25px] font-semibold tracking-tight'>{register?'Sign Up':'Sign In'}</div>

              <div className='text-[9px] sm:text-[11px] mb-[0px] md:mb-[10px]'>{register ? "Sign up for updates on new arrivals, special offers, and more." : "Sign in to unlock your personalized shopping experience"}</div>

              <div className='flex flex-col gap-2 mt-[15px] mb-[10px]  sm:mt-[20px]  md:mt-[20px] sm:mb-[20px] w-[100%]'>
                {register && 
                <div>
                  <input type="text" placeholder='username' name="name" id="" className='bg-white rounded-lg w-[100%] p-2.5 px-3 placeholder:text-[10px] sm:placeholder:text-[11px] outline-none ring-1 ring-slate-950/5 mb-1' value={input.name} onChange={getInput}/>
                  {validName && <div className='text-[9px] sm:text-[11px] text-danger'>invalid username !</div>}
                </div>}
  
                <div>
                  <input type="email" placeholder='email' name="email" id="" className='bg-white rounded-lg w-[100%] p-2.5 px-3 placeholder:text-[10px] sm:placeholder:text-[11px] outline-none ring-1 ring-slate-950/5 mb-1' value={input.email} onChange={getInput}/>
                  {validEmail && <div className='text-[9px] sm:text-[11px] text-danger'>invalid email !</div>}
                </div>
  
                <div>
                  <input type="password" placeholder='password' name="password" id="" className='bg-white rounded-lg w-[100%] p-2.5 px-3 placeholder:text-[10px] sm:placeholder:text-[11px] outline-none ring-1 ring-slate-950/5 mb-1' value={input.password} onChange={getInput}/>
                  {validPassword && <div className='text-[9px] sm:text-[11px]  text-danger'>invalid password !</div>}
                </div>
              </div>
              {register ?
              <button className={`w-[100%] py-[13px] bg-black text-white  rounded-lg mt-[10px] text-[14px]`} disabled={isFormInvalid} onClick={handleRegister} >{isRegisterLoading ? "Please Wait.." : "Sign Up"}</button>
              :
              <button className={`w-[100%] py-[13px]  bg-black text-white rounded-lg mt-[10px] text-[14px]`} disabled={isFormInvalid} onClick={handleLogin} >{isLoading ? "Please Wait.." : "Log In"}</button>}
              {/* <button className='w-[100%] py-[13px] bg-white rounded-lg text-black mt-[10px] ring-1 ring-slate-950/5 text-[13px]'> <i class="fa-brands fa-google me-1"></i> Login with Google</button> */}

              <div className='flex gap-[20px] mt-[15px] items-center justify-center w-[100%]'>
                <div className='text-[11px] sm:text-[12px]'>Already have an account ? </div>
                {register?
                <button className='px-3 py-2 bg-white text-black rounded-lg ring-1 ring-slate-950/5 text-[11px] outline-none' onClick={()=>{dispatch(setRegister(false))}}>Sign in</button>
                :
                <button className='px-3 py-2 bg-white text-black rounded-lg ring-1 ring-slate-950/5 text-[11px] outline-none' onClick={()=>{dispatch(setRegister(true))}}>Sign up</button>}
              </div>

            </div>
          </div>

        </div>

    </div>
  )
}

export default Auth
