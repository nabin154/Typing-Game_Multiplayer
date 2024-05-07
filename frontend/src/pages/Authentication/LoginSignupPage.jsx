import React, { useEffect } from 'react';
import Form from '../../components/Authentication/Form';
import { useNavigate } from 'react-router-dom';

const LoginSignupPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate]);

  return(
    <div>
       <Form />
    </div>
 
  );
};

export default LoginSignupPage;
