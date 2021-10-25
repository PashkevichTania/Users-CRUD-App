import React, {useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField, Typography
} from "@mui/material";
import {useGlobalDispatchContext, useGlobalStateContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AvatarPreview, ErrorFormMessage} from "components/StyledComponents/styled";
import {createUser, getAllUsersPaginated} from "services/apiRequests";
import Dropzone from "components/Dropzone/Dropzone";


const CreateForm = () => {

  const {createFormOpened, currentPage} = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const [img, setImg] = useState(null);


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
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

    onSubmit: async (values) => {
      let formData = new FormData();


      /* set input field values to formData */
      for (let value in values) {
        formData.set(value, values[value]);
      }

      /* if there is image file add it as avatar */
      if (img) {
        formData.set('avatar', img.file);
      }

      const response1 = await createUser(formData);
      console.log(response1)
      if (response1.responseStatus.status === 200) {
        const response2 = await getAllUsersPaginated(currentPage);
        dispatch({type: ACTION_TYPES.SET_PAGES, payload: response2.data.totalPages})
        dispatch({type: ACTION_TYPES.SET_USERS, payload: response2.data.docs})
      }
      handleCloseCreateForm()
    },
  });

  const handleCloseCreateForm = () => {
    formik.values.firstName = ''
    formik.values.lastName = ''
    formik.values.email = ''
    formik.values.password = ''
    dispatch({type: ACTION_TYPES.CREATE_FORM_OPENED, payload: false})
    setImg(null)
  }


  return (
    <Dialog open={createFormOpened} onClose={handleCloseCreateForm}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Create new user</DialogTitle>
        <DialogContent>
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
          <Grid container alignItems={"center"} justifyContent={'space-between'}>
            <Grid item xs={12} md={8}>
              <Dropzone setImg={setImg}/>
            </Grid>
            <Grid item xs={12} md={4}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
            >
              <Typography>Avatar preview</Typography>
              {img ? <AvatarPreview src={img.binaryStr} alt="avatar"/> : null}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateForm}>Cancel</Button>
          <Button type={"submit"}>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateForm;
