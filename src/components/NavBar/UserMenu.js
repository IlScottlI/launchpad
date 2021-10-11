import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { useMsal } from "@azure/msal-react";

export default function UserMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { userImage, userData, isAuthenticated } = props;
    const { instance } = useMsal();
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
          });
      }

    return (
        <>
            {isAuthenticated && (
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        { userImage ? <Avatar alt={userImage} src={userImage} sx={{ width: 30, height: 30 }}/> : <AccountCircle />}
                        <Typography variant="subtitle2" sx={{paddingLeft:'10px'}} component="small">
                            {userData ? userData.givenName + " " + userData.surname : <></>}
                        </Typography>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                         onClose={handleClose}
                        sx={{marginTop:'-10px', marginLeft:'50px'}}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            )}
        </>
    );
}
