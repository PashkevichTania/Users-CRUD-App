import React from 'react';
import LoginForm from "components/LoginForm/LoginForm";
import SignUpForm from "components/SignUpForm/SignUpForm";


const Auth = () => {


  return (
    <div>
      Authentication
      <LoginForm />
      <SignUpForm />
    </div>
  );
};

export default Auth;
