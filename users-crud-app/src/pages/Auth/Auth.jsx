import React from 'react';
import LoginForm from "components/LoginForm/LoginForm";
import SignUpForm from "components/SignUpForm/SignUpForm";
import {Container, Grid, Typography} from "@mui/material";


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
    </Container>
  );
};

export default Auth;
