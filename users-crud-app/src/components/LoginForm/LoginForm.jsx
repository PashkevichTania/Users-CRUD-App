import React, {useState} from 'react';
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {ErrorFormMessage} from "components/StyledComponents/styled";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useHistory} from "react-router-dom";
import {login} from "services/auth";

const LoginForm = () => {


  const history = useHistory()
  const [checked, setChecked] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),

    onSubmit: (values) => {
      login(values).then((res) => {
        if (res.isAuth) {
          history.push('/home')
        }
      })
    },
  });


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
        <Button type={"submit"}>Log in</Button>
      </form>
    </div>
  );
};

export default LoginForm;
