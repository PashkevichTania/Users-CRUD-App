import React, {useContext} from 'react';
import {
  Container,
  Grid, Pagination,
} from "@mui/material";
import UserCard from "components/Cards/UserCard";
import {GlobalStateContext, useGlobalDispatchContext} from "context/GlobalContext";
import {MainWrapper} from "components/StyledComponents/styled";
import {getAllUsersPaginated} from "services/apiRequests";
import {ACTION_TYPES} from "const";


const Cards = () => {


  const {users, pages} = useContext(GlobalStateContext);
  const dispatch = useGlobalDispatchContext();

  let list;
  if (users.length) {
    list = users.map((card) => (
        <UserCard card={card} key={card.id}/>
    ))
  }

  const pageChangeHandler = async (event, value) => {
    const response = await getAllUsersPaginated(value)
    if (response.responseStatus.status === 200){
      dispatch({type:ACTION_TYPES.SET_USERS, payload: response.data.docs })
    }
  }


  return (
      <main>
        <MainWrapper>
          <Container sx={{py: 8}} maxWidth="lg">
            <Grid container spacing={4}>
              {list}
            </Grid>
          </Container>
          <Pagination count={pages} onChange={pageChangeHandler} color="primary"/>
        </MainWrapper>
      </main>
  );
};

export default Cards;
