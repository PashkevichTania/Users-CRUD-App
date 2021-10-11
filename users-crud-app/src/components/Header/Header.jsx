import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Users CRUD
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;