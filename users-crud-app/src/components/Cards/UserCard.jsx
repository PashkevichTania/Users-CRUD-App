import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {deleteUser} from "services/apiRequests";
import {useGlobalDispatchContext} from "context/GlobalContext";
import {ACTION_TYPES} from "const";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserCard = (props) => {

  const dispatch = useGlobalDispatchContext();
  const {card} = props;


  const deleteHandler = ()=> {
    deleteUser(card.id)
    dispatch({type: ACTION_TYPES.DELETE_USER, payload: card.id})
  }


  return (
    <Grid item key={card.id}>
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
        <CardActions sx={{display: "flex", justifyContent: "space-evenly"}}>
          <Button size="small" endIcon={<EditIcon/>} >Edit</Button>
          <Button size="small" color={"error"} onClick={deleteHandler} endIcon={<DeleteIcon />} > Delete </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default UserCard;
