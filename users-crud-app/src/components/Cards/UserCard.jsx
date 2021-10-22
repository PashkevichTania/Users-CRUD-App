import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {deleteUser, getAllUsersPaginated} from "services/apiRequests";
import {useGlobalDispatchContext, useGlobalStateContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserCard = (props) => {

  const {currentPage, pages, users} = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const {card} = props;


  const deleteHandler = async () => {
    const response1 = await deleteUser(card._id);
    if (response1.responseStatus.status === 200){
      if (currentPage===pages && users.length === 1){
        const response2 = await getAllUsersPaginated(currentPage-1);
        dispatch({type: ACTION_TYPES.SET_CURRENT_PAGE, payload: currentPage-1})
        dispatch({type: ACTION_TYPES.SET_PAGES, payload: response2.data.totalPages})
        dispatch({type: ACTION_TYPES.SET_USERS, payload: response2.data.docs})
      }else{
        const response2 = await getAllUsersPaginated(currentPage);
        dispatch({type: ACTION_TYPES.SET_PAGES, payload: response2.data.totalPages})
        dispatch({type: ACTION_TYPES.SET_USERS, payload: response2.data.docs})
      }

    }
  }

  const updateHandler = () => {
    dispatch({type: ACTION_TYPES.SET_CURRENT_USER, payload: card})
    dispatch({type: ACTION_TYPES.UPDATE_FORM_OPENED, payload: true})
  }

  return (
    <Grid item key={card._id}>
      <Card
        sx={{ height: '500px', width: '300px', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16:9
            //pt: '56.25%',
            height: '300px'
          }}
          image={card.avatar}
          alt="avatar"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Name: {card.firstName} {card.lastName}
          </Typography>
          <Typography>
            Email: {card.email}
          </Typography>
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "space-evenly"}} >
          <Button size="small" endIcon={<EditIcon/>}   onClick={updateHandler} > Edit </Button>
          <Button size="small" color={"error"} onClick={deleteHandler} endIcon={<DeleteIcon />} > Delete </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default UserCard;
