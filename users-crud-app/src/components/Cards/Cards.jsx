import React, {useContext} from 'react';
import {
    Container,
    Grid,
} from "@mui/material";
import {GlobalStateContext} from "context/GlobalContext";
import UserCard from "components/Cards/UserCard";



const Cards = () => {


    const stateContext = useContext(GlobalStateContext);
    let list;
    if (stateContext.length){
        list =  stateContext.map((card) => (
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
