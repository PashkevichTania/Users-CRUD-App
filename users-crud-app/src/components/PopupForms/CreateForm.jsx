import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel, MenuItem, Select,
  TextField
} from "@mui/material";
import {useGlobalDispatchContext, useGlobalStateContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AvatarThumb, ErrorFormMessage} from "components/StyledComponents/styled";
import {createUser, getAllUsersPaginated} from "services/apiRequests";

const CreateForm = () => {

  const {createFormOpened, images, currentPage} = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      avatar: 'https://png.pngtree.com/png-clipart/20210310/original/pngtree-default-male-avatar-png-image_5939655.jpg'
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
      lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      const response1 = await createUser(values);
      if (response1.responseStatus.status === 200){
        const response2 = await getAllUsersPaginated(currentPage);
        dispatch({type: ACTION_TYPES.SET_PAGES, payload: response2.data.totalPages})
        dispatch({type: ACTION_TYPES.SET_USERS, payload: response2.data.docs})
      }
      handleCloseCreateForm()
    },
  });

  const handleCloseCreateForm = () => {
    dispatch({type: ACTION_TYPES.CREATE_FORM_OPENED, payload: false})
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
            {images ? (
                <FormControl fullWidth>
                  <InputLabel id="select-avatar">Avatar</InputLabel>
                  <Select
                      autoWidth
                      labelId="select-avatar"
                      id="avatar"
                      name="avatar"
                      label="avatar"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.avatar}
                  >
                    {images.map( (image) =>
                        <MenuItem value={image.urls.regular} key={image.id}>
                          <AvatarThumb src={image.urls.thumb} alt="avatar"/>
                        </MenuItem>
                    )}
                  </Select>
                </FormControl>
            ) : null}
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