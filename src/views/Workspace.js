import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Link } from "@reach/router";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
export default function ButtonAppBar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function LinkTab(props) {
        return (
            <Tab
                component="a"
                onClick={(event) => {
                    event.preventDefault();
                }}
                {...props}
            />
        );
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white' }} >
                <Toolbar> <Stack direction="row" spacing={1}>
                    <Typography variant="p" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                        <Link to="/Workspace" style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: '#343a40' }}> Tabler Station | Workspace </Link>
                    </Typography>
                    <Link to="/Workspace/Safety" style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>Safety</Link>
                    <Link to="/Workspace/Quality" style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>Quality</Link>
                    <Link to="/Workspace/Production" style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>Production</Link>
                    <Link to="/Workspace/Site" style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>Site</Link>
                    <div>
                        <span  style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: 'rgba(0,0,0,0.5)', cursor:'pointer' }}
                            onClick={handleClick}
                        >
                            Business Workspace
                        </span>
                        <i style={{display:'inline-block',content:''}}></i>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Beauty Making</MenuItem>
                            <MenuItem onClick={handleClose}>Beauty Packing</MenuItem>
                            <MenuItem onClick={handleClose}>HDW Packing</MenuItem>
                        </Menu>
                    </div>
                </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}