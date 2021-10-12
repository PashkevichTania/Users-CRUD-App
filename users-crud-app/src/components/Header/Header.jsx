import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return (
        <AppBar position="relative" sx={{ mb: 10 }} >
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Users CRUD
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;