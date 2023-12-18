import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { RiEyeFill,RiEyeCloseFill } from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/UserSlice/userSlice';

const Login = () => {
    const auth = getAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [Email,SetEmail] = useState('')
    const [EmailErr,SetEmailErr] = useState('')
    const handleEmail = (e)=>{
    SetEmail(e.target.value);
    SetEmailErr('')
    }

    const [ShowPassword,SetShowPassword] = useState(false)
    const [Password,SetPassword] = useState('')
    const [PasswordErr,SetPasswordErr] = useState('')
    const handlePassword = (e)=>{
    SetPassword(e.target.value);
    SetPasswordErr('')
    }

    const handleSignIn = ()=>{
        console.log('signed in');
        if (!Email) {
            SetEmailErr('Email is required')
        }else{
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(Email)) {
              SetEmailErr('Email is invalid')
            }
        }
        if (!Password) {
            SetPasswordErr('Password is required')
        }
        if (Email && Password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(Email)) {
            signInWithEmailAndPassword(auth, Email, Password)
        .then((user) => {
            toast.success('Logged In')
            console.log(user.user, 'user');
            dispatch(userLoginInfo(user.user))
            localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
            SetEmail('')
            SetPassword('')
            setTimeout(()=>{
                navigate('/home')
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode.includes('auth/invalid-credential')) {
               alert('provide your right email and password')
            }
        });
        }
    }
  return (
    <div className='bg-[#F0F2F5] h-screen w-full absolute'>

        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />

        <div className='mt-[50px]'>
            <h1 className='text-[#0866FF] font-bold font-sans text-[60px] text-center'>Social App</h1>

            <div className='mt-[10px] text-center'>
                <div className='shadow-lg bg-white ml-[750px] mr-[750px] rounded-lg'>
                    <h3 className='text-[18px] font-sans font-medium leading-[22px] pt-[20px]'>Log in to Social App</h3>

                    <div className='relative w-96'>
                        <input onChange={handleEmail} value={Email} placeholder='Email Address' type="text" className='ml-[20px] mt-[10px] text-[15px] text-[#606770] pl-[10px] w-96 py-[10px] rounded-lg border border-[#b8bacf] outline-none'/>
                        {
                            EmailErr && 
                            <p className='text-red-500 font-semibold absolute top-[20px] left-[143px] w-96'>{EmailErr}</p>
                        } 
                    </div>

                    <div className='relative w-96'>
                        <input onChange={handlePassword} value={Password} type={ ShowPassword ? 'text' : 'password' } placeholder='Password' className='ml-[20px] text-[15px] mt-[10px] text-[#606770] pl-[10px] w-96 py-[10px] rounded-lg border border-[#b8bacf] outline-none'/>
                        {
                            ShowPassword ?
                            <RiEyeFill onClick={()=>SetShowPassword(!ShowPassword)} className='absolute top-[25px] right-0'/>
                            :
                            <RiEyeCloseFill onClick={()=>SetShowPassword(!ShowPassword)} className='absolute top-[25px] right-0'/>
                        }
                        { 
                            PasswordErr && 
                            <p className='mr-[220px] text-red-500 font-semibold absolute top-[20px] left-[130px] w-96'>{PasswordErr}</p>
                        } 
                    </div> 

                    <div>
                        <button onClick={handleSignIn} className='rounded-lg text-[20px] bg-[#166FE5] text-white w-96 outline-none mt-[10px] py-[10px]'>Log in</button>   
                    </div>

                    <div className='flex justify-center items-center mt-[20px] pb-[30px]'>
                        <p className='font-sans text-[14px] text-[#1877F2] leading-[19px] font-medium'><Link to='/forgotpassword'>Forgot Password?</Link></p> 
                        <p className='ml-[10px] font-sans text-[14px] text-[#1877F2] leading-[19px] font-medium'><Link to='/signup'>Sign up</Link></p>  
                    </div>           
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Login