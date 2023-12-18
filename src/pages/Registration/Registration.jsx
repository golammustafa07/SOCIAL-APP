import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiEyeFill,RiEyeCloseFill } from 'react-icons/ri'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

const Registration = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [Email,SetEmail] = useState('')
  const [EmailErr,SetEmailErr] = useState('')
  const handleEmail = (e)=>{
    SetEmail(e.target.value);
    SetEmailErr('')
  }

  const [FirstName,SetFirstName] = useState('')
  const [FirstNameErr,SetFirstNameErr] = useState('')
  const handleFirstName = (e)=>{
    SetFirstName(e.target.value);
    SetFirstNameErr('')
  }

  const [LastName,SetLastName] = useState('')
  const [LastNameErr,SetLastNameErr] = useState('')
  const handleLastName = (e)=>{
    SetLastName(e.target.value);
    SetLastNameErr('')
  }
  
  const [success,setSuccess] = useState('')

  const [ShowPassword,SetShowPassword] = useState(false)
  const [Password,SetPassword] = useState('')
  const [PasswordErr,SetPasswordErr] = useState('')
  const handlePassword = (e)=>{
    SetPassword(e.target.value);
    SetPasswordErr('')
  }

  const handleSignUp = ()=>{
    console.log('Signed Up');
    if (!FirstName) {
      SetFirstNameErr('First Name is required!')
    }
    if (!LastName) {
      SetLastNameErr('Last Name is required!')
    }
    if (!Email) {
      SetEmailErr('Email is required!')
    }else{
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(Email)) {
        SetEmailErr('Email is invalid')
      }
    }
    if (!Password) {
      SetPasswordErr('Password is required!')
    }
    if (FirstName && LastName && Email && Password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(Email)) {
      createUserWithEmailAndPassword(auth, Email, Password)
      .then(() => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          toast.success('registration done');
          SetFirstName('')
          SetLastName('')
          SetEmail('')
          SetPassword('')
          setTimeout(()=>{
          navigate('/login')
        },2000)
        });
    })
      .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      if (errorCode.includes('auth/email-already-in-use')) {
        SetEmailErr('Email is already used')
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
          
          <div className='shadow-lg bg-white ml-[750px] mr-[750px] rounded-lg h-[460px]'>
            <h2 className='text-[25px] font-sans font-semibold leading-6 pt-[10px]'>Create a new account</h2>
            <p className='font-sans text-[15px] text-[#606770] leading-6 mt-[5px]'>It's quick and easy</p>

            <hr className='mt-[10px]'/>

            <div className='relative w-96'>
              <input onChange={handleFirstName} value={FirstName} type="text" placeholder='First Name' className='ml-[20px] w-96 mt-[20px] text-[15px] text-[#606770] pl-[10px] py-[10px] rounded-lg border border-[#b8bacf] outline-none' />
              {
                FirstNameErr && 
                <p className='mr-[210px] text-red-500 font-semibold absolute top-[30px] left-[125px] w-96'>{FirstNameErr}</p>
              } 
            </div>

            <div className='relative w-96'>
              <input onChange={handleLastName} value={LastName} type="text" placeholder='Last Name' className='ml-[20px] w-96 mt-[10px] text-[15px] text-[#606770] pl-[10px] py-[10px] rounded-lg border border-[#b8bacf] outline-none' />
              {
                LastNameErr && 
                <p className='mr-[210px] text-red-500 font-semibold absolute top-[20px] left-[125px] w-96'>{LastNameErr}</p>
              } 
            </div>

            <div className='relative w-96'>
              <input onChange={handleEmail} value={Email} placeholder='Email Address' type="text" className='ml-[20px] mt-[10px] text-[15px] text-[#606770] pl-[10px] w-96 py-[10px] rounded-lg border border-[#b8bacf] outline-none'/>
              {
                EmailErr && 
                <p className='text-red-500 font-semibold absolute top-[20px] left-[135px] w-96'>{EmailErr}</p>
              } 
            </div>

            <div className='relative w-96'>
              <input onChange={handlePassword} value={Password} type={ShowPassword ? 'text' : 'password'} placeholder='Password' className='ml-[20px] text-[15px] mt-[10px] text-[#606770] pl-[10px] w-96 py-[10px] rounded-lg border border-[#b8bacf] outline-none'/>
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

            <button onClick={handleSignUp} className='rounded-lg text-[20px] bg-[#00A400] text-white w-48 outline-none mt-[10px] py-[10px]'>Sign Up</button>

            <p className='font-sans text-[20px] leading-[20px] font-normal text-[#1877F2] mt-[20px]'><Link to='/login'>Already have an account?</Link></p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Registration