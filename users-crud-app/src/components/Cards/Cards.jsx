import React, {useContext} from 'react';
import {
    Container,
    Grid, Pagination,
} from "@mui/material";
import UserCard from "components/Cards/UserCard";
import {GlobalStateContext} from "context/GlobalContext";



const Cards = () => {


    const { users, pages } = useContext(GlobalStateContext);

    let list;
    if (users.length){
        list =  users.map((card) => (
          <UserCard card={card} key={card.id} />
        ))
    }

    const pageChangeHandler = (event, value) => {
      console.log(value)
    }


    return (
        <div>
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {list}
                    </Grid>
                </Container>
                <Pagination count={pages} onChange={pageChangeHandler} color="primary" />
            </main>
        </div>
    );
};

export default Cards;
