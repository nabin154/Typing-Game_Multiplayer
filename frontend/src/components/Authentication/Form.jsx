import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";

const Form = () => {
  
  const [isSignupPage , setIsSignUp] = useState(false);

  return (
    <div className='custom-gradient w-full h-screen flex items-center justify-center ' >

        <section className='min-w-80 sm:min-w-96 max-w-xl md:max-w-2xl flex flex-col md:flex-row items-center'>
          <form action="">
            <div className='min-h-96 w-full bg-rightGradientColor flex flex-col gap-4 shadow-gray-200 shadow-sm px-10 py-6 mt-14 rounded-xl items-center  '>

              <h2 className='text-center font-rubik text-purple-600 font-bold text-3xl tracking-wider'>{isSignupPage? 'SIGN UP' : 'LOGIN'}</h2>
            {isSignupPage &&
              <div className='text-left flex flex-col mt-4'>
                <label htmlFor="Name" className='text-white text-md font-semibold font-rubik'>
                  Name :
                </label>
                <input type="text" className='w-56  sm:w-72 p-2  mt-2 bg-rightGradientColor border-b focus:outline-none text-white' placeholder='Enter your name'  />
              </div>
              }
              <div className='text-left flex flex-col'>
                <label htmlFor="Name" className='text-white text-md  font-semibold font-rubik'>
                  Email :
                </label>
              <input type="text" className='w-56 sm:w-72 p-2  mt-2 bg-rightGradientColor border-b focus:outline-none text-white' placeholder='Enter your email'/>
              </div>

              <div className='text-left flex flex-col pb-10'>
                <label htmlFor="Name" className='text-white  text-md  font-semibold font-rubik'>
                  Password :
                </label>
              <input type="password" className='w-56  sm:w-72 p-2  mt-2 bg-rightGradientColor border-b focus:outline-none text-white' placeholder='Enter your password'/>
              </div>

              <button className='border px-8 rounded-md shadow-lg tracking-wide bg-purple-600 text-md font-semibold py-1 border-none text-white '>SUBMIT</button>

              <span className='text-white underline cursor-pointer' onClick={()=>setIsSignUp(!isSignupPage)}>{isSignupPage? "Already have an account?":"Don't have an account?"}</span>
            </div>
          </form>

        <div className='ml-10'>
            <h3 className='text-xl text-purple-500 text-center '> Or</h3>
         
          <button className='bg-white text-black ml-4 px-3 p-2 text-center flex items-center rounded-md font-rubik mt-4'><span className='mr-1'>Login with Google</span> <FcGoogle /></button>

          <h3 className='text-xl mt-3 text-purple-500 text-center '> Or</h3>

          <button className='bg-blue-700 text-white ml-4 px-3 p-2 text-center flex items-center rounded-md font-rubik mt-4 '><span className='mr-1' >Login with Facebook</span> <FaSquareFacebook /></button>
         </div>
        </section>
      </div>

  );
};

export default Form;
