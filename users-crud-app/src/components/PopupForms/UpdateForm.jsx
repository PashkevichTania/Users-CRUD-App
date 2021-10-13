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
import {AvatarThumb} from "components/StyledComponents/styled";
import {getAllUsersPaginated, updateUser} from "services/apiRequests";

const UpdateForm = () => {

  const {updateFormOpened, images, currentUser} = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext();


  const formik = useFormik({
    initialValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      avatar: currentUser.avatar
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
      const response1 = await updateUser(currentUser.id, values);
      if (response1.responseStatus === 200){
        const response2 = await getAllUsersPaginated(1);
        dispatch({type: ACTION_TYPES.SET_PAGES, payload: response2.data.totalPages})
        dispatch({type: ACTION_TYPES.SET_USERS, payload: response2.data.docs})
      }
      handleCloseCreateForm()
    },
  });

  const handleCloseCreateForm = () => {
    dispatch({type: ACTION_TYPES.UPDATE_FORM_OPENED, payload: false})
  }

  return (
      <Dialog open={updateFormOpened} onClose={handleCloseCreateForm}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Update user</DialogTitle>
          <DialogContent>
            <TextField
                margin="dense"
                id="firstName"
                name="firstName"
                label="First name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={currentUser.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
            ) : null}
            <TextField
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={currentUser.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
            ) : null}
            <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                defaultValue={currentUser.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
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
                      defaultValue={currentUser.avatar}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.avatar}
                  >
                    <MenuItem value={currentUser.avatar}>
                      <AvatarThumb src={currentUser.avatar} alt="avatar"/>
                    </MenuItem>
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
            <Button type={"submit"}>Update</Button>
          </DialogActions>
        </form>
      </Dialog>
  );
};

export default UpdateForm;