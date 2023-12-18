import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import cover from '../../assets/cover.jpg'
import { FaCamera } from "react-icons/fa";

const Home = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const data = useSelector(state=>state.userLoginInfo.userInfo)
  console.log(data, 'userdata');
  const [verify,setverify] = useState(false)
  const [profilemodal,setprofilemodal] = useState(false)
  const handleprofilemodal =()=>{
    setprofilemodal(true)
  }
  console.log(profilemodal);

  useEffect(()=>{
    if (!data) {
      navigate('/login')
    }
  },[])

  onAuthStateChanged(auth, (user) => {
    console.log(user, 'userr');
    if (user.emailVerified) {
      setverify(true)
    }
  });
  




  return (
    <div className='bg-[#F0F2F5] h-screen w-full absolute'>
      {
        verify ? 
        <div className='max-w-container mx-auto bg-red-300'>
          <div className='w-full relative overflow-hidden group'>
            <img src={cover} alt="" />
            <div onClick={handleprofilemodal} className='w-0 group-hover:w-full h-full '>
              <FaCamera className='absolute bottom-0 right-0 text-3xl text-white'/>
            </div>
          </div>
        </div>
        : 
        <div className='h-screen w-full bg-[#0866FF] flex justify-center items-center'>
          <div className='bg-white w-800px rounded-lg p-10'>
            <h1 className='font-bold font-sans text-[60px]'>Please verify your email</h1>
            <Link to='/login'><button className='rounded-lg text-[20px] bg-[#feda12] text-white w-48 outline-none mt-[10px] py-[10px]'>Back to Login</button></Link>
          </div>
        </div>
      }
    </div>
  )
}

export default Home