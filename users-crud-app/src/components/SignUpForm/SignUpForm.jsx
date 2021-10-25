import React, {useState} from 'react';
import {Button, Checkbox, Container, FormControlLabel, TextField, Typography} from "@mui/material";
import {ErrorFormMessage} from "components/StyledComponents/styled";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useHistory} from "react-router-dom";
import {signUp} from "services/auth";

const SignUpForm = () => {


  const history = useHistory()
  const [checked, setChecked] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),

    onSubmit: (values) => {
      if (checked){
        window.localStorage.setItem('userEmail', values.email)
      }
      signUp(values).then((res) => {
        if (res.status === 200) {
          history.push('/home')
        }
      })
    },
  });


  return (
    <Container>
      <Typography variant="h5" component="h3" sx={{ml: '1rem'}}>Sign up</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          margin="dense"
          id="firstName"
          name="firstName"
          label="First name"
          type="text"
          fullWidth
          variant="standard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <ErrorFormMessage>{formik.errors.firstName}</ErrorFormMessage>
        ) : null}
        <TextField
          margin="dense"
          id="lastName"
          name="lastName"
          label="Last name"
          type="text"
          fullWidth
          variant="standard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <ErrorFormMessage>{formik.errors.lastName}</ErrorFormMessage>
        ) : null}
        <TextField
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <ErrorFormMessage>{formik.errors.email}</ErrorFormMessage>
        ) : null}
        <TextField
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorFormMessage>{formik.errors.password}</ErrorFormMessage>
        ) : null}
        <FormControlLabel
          control={<Checkbox
            color="primary"
            name="remember"
            onChange={(event) => setChecked(event.target.checked)}
            value="remember"
          />}
          label="Remember me"
        />
        <Button type={"submit"}>Sign up</Button>
      </form>
    </Container>
  );
};

export default SignUpForm;
