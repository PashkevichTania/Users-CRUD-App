import React from "react";
import Header from "components/Header/Header";
import Cards from "components/Cards/Cards";
import {getAllUsersPaginated} from "services/apiRequests";
import {useQuery} from "react-query";
import {useGlobalDispatchContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";
import {MainWrapper} from "components/StyledComponents/styled";
import CreateForm from "components/PopupForm/CreateForm";
import {Button} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function Home() {

  const dispatch = useGlobalDispatchContext();

  const {isLoading, error, data} = useQuery('getUsers', () =>
      getAllUsersPaginated(1)
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  if (data) {
    dispatch({type: ACTION_TYPES.SET_PAGES, payload: data.data.totalPages})
    dispatch({type: ACTION_TYPES.SET_USERS, payload: data.data.docs})
  }

  const handleOpenCreateForm = ()=>{
    dispatch({type:ACTION_TYPES.CREATE_FORM_OPENED, payload: true})
  }


  return (
      <div>
        <MainWrapper>
          <Header />
          <Button variant="outlined"
                  endIcon={<AddCircleOutlineIcon />}
                  color={"secondary"}
                  onClick={handleOpenCreateForm}>
            Create new user
          </Button>
          <Cards />
          <CreateForm />
        </MainWrapper>
      </div>
  );
}
