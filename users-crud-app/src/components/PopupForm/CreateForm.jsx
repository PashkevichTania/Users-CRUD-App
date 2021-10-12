import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useGlobalDispatchContext, useGlobalStateContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";
import {getImages} from "services/imagesAPI";

const CreateForm = () => {

  const {createFormOpened} = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext();

  const handleCloseCreateForm = () => {
    dispatch({type: ACTION_TYPES.CREATE_FORM_OPENED, payload: false})
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    await getImages()
    console.log(event)
    console.log(event.target.email.value)
  }

  return (
      <Dialog open={createFormOpened} onClose={handleCloseCreateForm}>
        <form onSubmit={handleFormSubmit}>
          <DialogTitle>Create new user</DialogTitle>
          <DialogContent>
            <TextField
                required
                margin="dense"
                name="firstName"
                label="First name"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                name="lastName"
                label="Last name"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                required
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.+.[a-zA-Z]{2,4}$"
                margin="dense"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
            />
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