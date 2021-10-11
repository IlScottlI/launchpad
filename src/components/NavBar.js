import MuiAppBar from '@mui/material/AppBar';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import logo from './../images/bannerlogo.png';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import UserMenu from './NavBar/UserMenu';

export default function NavBar(props) {

    const {
        drawerWidth,
        open,
        handleDrawerOpen,
        navigateTo,
        userImage,
        userData,
        isAuthenticated,
    } = props;



    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));
    


    return (<>
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Avatar alt="LaunchPad" src={logo} />
                <Typography variant="h6" component="div" sx={{ ml: 1, flexGrow: 1 }}>
                    LaunchPad
                </Typography>
                <UserMenu navigateTo={navigateTo} userImage={userImage} userData={userData} isAuthenticated={isAuthenticated}/>
            </Toolbar>
        </AppBar>
        </>
    );
}