import React, {useState} from "react";
import Cards from "components/Cards/Cards";
import {useGlobalDispatchContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";
import {MainWrapper} from "components/StyledComponents/styled";
import CreateForm from "components/PopupForms/CreateForm";
import {Button} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UpdateForm from "components/PopupForms/UpdateForm";
import {useQuery} from "react-query";
import {getAllUsersPaginated} from "services/apiRequests";


export default function Home() {

  const dispatch = useGlobalDispatchContext();

  const
    {isLoading: isLoadingUsers, error: errorUsers, data: dataUsers}
      = useQuery('getUsers',() => getAllUsersPaginated(1),{ refetchOnWindowFocus: false });

  if (isLoadingUsers) return (
      <MainWrapper> {'Loading...'}</MainWrapper>)

  if (errorUsers) return (
    <MainWrapper> {'An error has occurred: ' + errorUsers.message}</MainWrapper>)

  if (dataUsers) {
    console.log('dataUsers,', dataUsers)
    if (dataUsers.responseStatus.status === 200) {
      dispatch({type: ACTION_TYPES.SET_PAGES, payload: dataUsers.data.totalPages})
      dispatch({type: ACTION_TYPES.SET_USERS, payload: dataUsers.data.docs})
    } else {
      return (<MainWrapper> {dataUsers.responseStatus.message}</MainWrapper>)
    }
  }


  const handleOpenCreateForm = () => {
    dispatch({type: ACTION_TYPES.CREATE_FORM_OPENED, payload: true})
  }


  return (
    <MainWrapper>
      <Button variant="outlined"
              endIcon={<AddCircleOutlineIcon/>}
              color={"secondary"}
              onClick={handleOpenCreateForm}>
        Create new user
      </Button>
      <Cards/>
      <CreateForm/>
      <UpdateForm/>
    </MainWrapper>
  );
}
