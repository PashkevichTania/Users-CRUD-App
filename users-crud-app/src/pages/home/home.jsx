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
import {getImages} from "services/imagesAPI";



export default function Home() {

  const dispatch = useGlobalDispatchContext();

  const useQueryMultiple = () => {
    const res1 = useQuery('getImages', () =>
        getImages());
    const res2 = useQuery('getUsers', () =>
        getAllUsersPaginated(1));
    return [res1, res2];
  }


  const [
    { isLoading: isLoadingImages, error: errorImages, data: dataImages},
    { isLoading: isLoadingUsers, error: errorUsers, data: dataUsers}
  ] = useQueryMultiple()


  if (isLoadingUsers) return 'Loading...'

  if (errorUsers) return 'An error has occurred: ' + errorUsers.message

  if (dataUsers) {
    dispatch({type: ACTION_TYPES.SET_PAGES, payload: dataUsers.data.totalPages})
    dispatch({type: ACTION_TYPES.SET_USERS, payload: dataUsers.data.docs})
  }

  if (errorImages){
    console.log(errorImages)
  }
  if (dataImages) {
    dispatch({type: ACTION_TYPES.SET_IMAGES, payload: dataImages.results})
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
