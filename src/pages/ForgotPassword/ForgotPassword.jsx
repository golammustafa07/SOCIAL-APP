import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const auth = getAuth()
    const [Email,SetEmail] = useState('')
    const [EmailErr,SetEmailErr] = useState('')
    const handleEmail = (e)=>{
    SetEmail(e.target.value);
    SetEmailErr('')
    }

    const handleReset = ()=>{
        console.log('reset done');
        if (!Email) {
            SetEmailErr('Email is required!')
        }else{
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(Email)) {
              SetEmailErr('Email is invalid')
            }
        }
        if (Email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(Email)) {
            sendPasswordResetEmail(auth, Email)
            .then(() => {
            console.log('mail sent');
            SetEmail('')
            })
            .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            });
        }
    }
  return (
    <div className='bg-[#E9EBEE] h-screen w-full absolute'>
        <div className='mt-[80px]'>
            <div className='shadow-lg bg-white w-[500px] h-[400px] rounded-lg ml-[700px] mr-[700px]'>
                <h3 className='font-sans font-semibold text-[20px] leading-6 text-[#162643] pl-[40px] pt-[20px]'>Forgot Password</h3>
                <hr className='mt-[20px]'/>
                <p className='text-[#1C1E21] text-[17px] leading-5 font-sans pl-[40px] pt-[20px]'>Enter your email address</p>
                <div className='relative w-96'>
                    <input onChange={handleEmail} value={Email} placeholder='Email Address' type="text" className='ml-[40px] mt-[20px] text-[15px] text-[#606770] pl-[10px] w-96 py-[10px] rounded-lg border border-[#b8bacf] outline-none'/>
                    {
                        EmailErr && 
                        <p className='text-red-500 font-semibold absolute top-[30px] left-[290px] w-96'>{EmailErr}</p>
                    } 
                </div>
                <button onClick={handleReset} className='rounded-lg text-[20px] bg-[#166FE5] text-white w-24 outline-none mt-[10px] py-[10px] ml-[40px]'>Reset</button>
                <Link to='/login'><button className='rounded-lg text-[20px] bg-[#166FE5] text-white w-36 outline-none mt-[10px] py-[10px] ml-[20px]'>Cancel</button></Link> 
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword