import React, {useState} from "react";
import Cards from "components/Cards/Cards";
import {useGlobalDispatchContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";
import {MainWrapper} from "components/StyledComponents/styled";
import CreateForm from "components/PopupForms/CreateForm";
import {Button} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UpdateForm from "components/PopupForms/UpdateForm";
import {useQueryMultiple} from "hooks/useQueryMultiple";


export default function Home() {

  const dispatch = useGlobalDispatchContext();
  const [error, setError] = useState(null)

  const [
    {error: errorImages, data: dataImages},
    {isLoading: isLoadingUsers, error: errorUsers, data: dataUsers}
  ] = useQueryMultiple()

  if (isLoadingUsers) return (<MainWrapper>{'Loading...'}</MainWrapper>)

  if (errorUsers) return (
    <MainWrapper> {'An error has occurred: ' + errorUsers.message}</MainWrapper>)

  if (dataUsers) {
    console.log('dataUsers,', dataUsers)
    if (dataUsers.responseStatus.status === 404) {
      setError(dataUsers.responseStatus)
    } else {
      dispatch({type: ACTION_TYPES.SET_PAGES, payload: dataUsers.data.totalPages})
      dispatch({type: ACTION_TYPES.SET_USERS, payload: dataUsers.data.docs})
    }
  }

  if (errorImages) {
    console.log(errorImages)
  }
  if (dataImages) {
    dispatch({type: ACTION_TYPES.SET_IMAGES, payload: dataImages.results})
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
      {error ? error.message : <Cards/>}
      <CreateForm/>
      <UpdateForm/>
    </MainWrapper>
  );
}
