import React from 'react';
import LoginForm from "components/Auth/LoginForm/LoginForm";
import SignUpForm from "components/Auth/SignUpForm/SignUpForm";
import {Container, Grid, Typography} from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Auth = () => {


  return (
    <Container>
      <Grid container spacing={8}>
        <Grid item xs={12} md={12} textAlign={"center"}>
          <Typography variant="h3" component="h2">Authentication</Typography>
          <Typography sx={{mt:'1rem'}}>Before using this app, please log in or sign up :)</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <LoginForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <SignUpForm />
        </Grid>
      </Grid>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
    </Container>
  );
};

export default Auth;
