import React, {useContext} from 'react';
import {
    Container,
    Grid,
} from "@mui/material";
import UserCard from "components/Cards/UserCard";
import {GlobalStateContext} from "context/GlobalContext";



const Cards = () => {


    const { users } = useContext(GlobalStateContext);

    let list;
    if (users.length){
        list =  users.map((card) => (
          <UserCard card={card} key={card.id} />
        ))
    }


    return (
        <div>
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {list}
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default Cards;
