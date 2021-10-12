import React, {useContext} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useGlobalDispatchContext, useGlobalStateContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";

const CreateForm = () => {

  const {createFormOpened} = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext();

  const handleCloseCreateForm = ()=>{
    dispatch({type:ACTION_TYPES.CREATE_FORM_OPENED, payload: false})
  }

  return (
      <Dialog open={createFormOpened} onClose={handleCloseCreateForm}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateForm}>Cancel</Button>
          <Button onClick={handleCloseCreateForm}>Subscribe</Button>
        </DialogActions>
      </Dialog>
  );
};

export default CreateForm;