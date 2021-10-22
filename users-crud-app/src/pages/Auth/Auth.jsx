import React from 'react';
import {login} from "services/auth";
import {useHistory} from "react-router-dom";


const Auth = () => {

  const history = useHistory()


  const loginHandler = async () => {
    const res = await login({
      email: "ann.forman@mail.comm",
      password: "123"
    })
    console.log('res:s2 ', res)

    if (res.isAuth) {
      history.push('/home')
    }
  }

  return (
    <div>
      auth
      <button onClick={loginHandler}>login</button>
    </div>
  );
};

export default Auth;
