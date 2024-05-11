import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../Context/ToastProvider';
import { useForm } from "react-hook-form"
import { login, signUp, uploadCloudinary } from '../../API/apis';
import axiosInstance from '../../utils/axiosInstance';


const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedImage, setSelectedImage] = useState();
  const [isSignupPage, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUpUser = async (data) => {
    setLoading(true);
    let postData = {};

    const imageUrl = await uploadCloudinary(selectedImage);
    if (imageUrl) {
      postData = { ...data, image: imageUrl };
      try {
        const response = await signUp(postData);
        if (response.status >= 200 && response.status < 300) {
          const message = response.data.message;
          showToast(message, 'success', 4000);
          setLoading(false);
          reset();
        } else if (response.status === 400) {
          const error = response.data.message || 'Error while creating the user';
          showToast(error, 'error', 4000);
        } else {
          const error = response.data.message || 'An error occurred';
          showToast(error, 'error', 4000);
        }

      }
      catch (error) {
        let err = error.response.data.message;
        showToast(err, 'error', 5000);
      }
    } else {
      showToast("Image Required!", 'error', 3000);
    }
    setLoading(false);

  };


  const loginUser = async (data) => {

    try {
      const response = await login(data);
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem('userInfo', JSON.stringify(response.data.data));
        navigate('/home');
        const message = response.data.message;
        showToast(message, 'success', 4000);
        reset();
      } else if (response.status === 400) {
        const error = response.data.message || 'Error while creating the user';
        showToast(error, 'error', 4000);
      } else {
        const error = response.data.message || 'An error occurred';
        showToast(error, 'error', 4000);
      }
    }
    catch (error) {
      let err = error.response.data.message;
      showToast(err, 'error', 5000);
    }
  }


  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { name, ...rest } = data;
    isSignupPage ? signUpUser(data) : loginUser(rest);

  };

  const loginWithGoogle = async () => {
    window.location.href = 'https://typing-game-8c44.onrender.com/auth/google/callback',"_self";
    };

  return (
    <div className='custom-gradient w-full min-h-screen flex items-center justify-center pb-4 relative' >
      <section className='min-w-80 sm:min-w-96  max-w-xl md:max-w-3xl  flex flex-col md:flex-row items-center'>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className='min-h-96 w-full bg-rightGradientColor flex flex-col gap-4 shadow-purple-400 shadow-md px-10 py-6 mt-10 rounded-xl items-center  '>

            <h2 className='text-center font-rubik text-purple-600 font-bold text-3xl tracking-wider'>{isSignupPage ? 'SIGN UP' : 'LOGIN'}</h2>
            {isSignupPage &&
              <div className='text-left flex flex-col mt-2'>
                <label htmlFor="Name" className='text-white text-md font-semibold font-rubik'>
                  Name :
                </label>
                <input
                  {...register("name", { required: "Name is required", })}
                  type="text" className='w-56  sm:w-72 p-2  mt-2 bg-rightGradientColor border-b border-purple-400 focus:outline-none text-white' placeholder='Enter your name' />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
            }
            <div className='text-left flex flex-col'>
              <label htmlFor="Name" className='text-white text-md  font-semibold font-rubik'>
                Email :
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Email is not valid ",
                  },
                })}
                type="text" className='w-56 sm:w-72 p-2  mt-2 bg-rightGradientColor border-b border-purple-400 focus:outline-none text-white' placeholder='Enter your email' />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className='text-left flex flex-col '>
              <label htmlFor="password" className='text-white  text-md  font-semibold font-rubik'>
                Password :
              </label>
              <input
                {...register("password", {
                  required: "password is required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: ` - at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters- at least 8 characters\n
                        `,
                  },
                })}
                type="password" className='w-56  sm:w-72 p-2  mt-2 bg-rightGradientColor border-b border-purple-400 focus:outline-none text-white' placeholder='Enter your password' />
              {errors.password && (
                <p className="text-red-500 max-w-72 text-xs">{errors.password.message}</p>
              )}
            </div>
            {isSignupPage &&
              <div className='text-left flex flex-col pb-8 '>
                <label htmlFor="Name" className='text-white text-md font-semibold font-rubik'>
                  Image :
                </label>
                <input
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  type="file"
                  accept="image/*" className='w-56  sm:w-72 p-2  mt-2 bg-rightGradientColor border-b border-purple-400 focus:outline-none text-white' placeholder='Enter your name' />

              </div>
            }

            <button type='submit' className='border px-8 rounded-md shadow-lg tracking-wide bg-purple-600 text-md font-semibold py-1 border-none text-white hover:bg-purple-800'> {loading ? 'Loading...' : 'SUBMIT'}</button>

            <span className='text-white underline cursor-pointer' onClick={() => setIsSignUp(!isSignupPage)}>{isSignupPage ? "Already have an account?" : "Don't have an account?"}</span>
          </div>
        </form>

        <div className='ml-10'>
          <h3 className='text-xl text-purple-500 text-center '> Or</h3>

          <button onClick={loginWithGoogle}
          className='bg-white text-black ml-4 px-3 p-2 text-center flex items-center rounded-md font-rubik mt-4 '><span className='mr-1'>Login with Google</span> <FcGoogle /></button>

          <h3 className='text-xl mt-3 text-purple-500 text-center '> Or</h3>

          <button disabled className='bg-blue-700 cursor-not-allowed text-white ml-4 px-3 p-2 text-center flex items-center rounded-md font-rubik mt-4 '><span className='mr-1' >Login with Facebook</span> <FaSquareFacebook /></button>
        </div>
      </section>
    </div>

  );
};

export default Form;
