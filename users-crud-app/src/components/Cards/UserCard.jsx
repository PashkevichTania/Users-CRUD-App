import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";

const UserCard = (props) => {

  const {card} = props
  return (
    <Grid item key={card.id} xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: '56.25%',
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
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default UserCard;
