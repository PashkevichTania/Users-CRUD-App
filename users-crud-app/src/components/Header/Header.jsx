import React from 'react';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";

const Header = () => {

  const history = useHistory()

  const clickHandler = () => {
    history.push('/auth')
  }

  return (
      <AppBar position="relative" sx={{mb: 10}}>
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Typography variant="h6" color="inherit" noWrap component={"h1"}>
            Users CRUD
          </Typography>
          <Button onClick={clickHandler} color="inherit" size={"large"}
                  sx={{fontSize: "large", textDecoration: "underline"}}>Auth Page</Button>
        </Toolbar>
      </AppBar>
  );
};

export default Header;