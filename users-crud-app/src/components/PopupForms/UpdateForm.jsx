import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useGlobalDispatchContext, useGlobalStateContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ErrorFormMessage} from "components/StyledComponents/styled";
import {getAllUsersPaginated, updateUser} from "services/apiRequests";

const UpdateForm = () => {

  const {updateFormOpened, currentUser, currentPage} = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
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
      const response1 = await updateUser(currentUser._id, values);
      if (response1.responseStatus.status === 200) {
        const response2 = await getAllUsersPaginated(currentPage);
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
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
                <ErrorFormMessage>{formik.errors.email}</ErrorFormMessage>
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