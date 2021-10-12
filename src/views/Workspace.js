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
import { Router, Redirect, Link } from "@reach/router";
import Button from '@mui/material/Button';
import { styled, emphasize } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { getTags, getLinksByTagId, getLinkWorkspacesByTag, getCategories } from './../variables/functions';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Links from './../views/workspace/Links';
import CategoryLinks from './../views/workspace/CategoryLinks';
import Container from '@mui/material/Container';
import { Category } from '@mui/icons-material';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = React.useState({
        width: undefined,
        height: undefined,
    });
    React.useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}


export default function Workspace(props) {
    const { categoryPage, path ,subPage} = props;
    const [value, setValue] = React.useState();
    const [tags, setTags] = React.useState();
    const [links, setLinks] = React.useState([]);
    const [bottomNavLinks, setBottomNavLinks] = React.useState(JSON.parse(localStorage.getItem('bottomNavLinks')));
    const [uniqueCategories, setUniqueCategories] = React.useState(JSON.parse(localStorage.getItem('uniqueCategories')));
    const [linkWorkspace, setLinkWorkspace] = React.useState(JSON.parse(localStorage.getItem('linkWorkspace')));
    const [subLinkWorkspace, setSubLinkWorkspace] = React.useState(JSON.parse(localStorage.getItem('subLinkWorkspace')));
    const [subLinkWorkspaces, setSubLinkWorkspaces] = React.useState(JSON.parse(localStorage.getItem('subLinkWorkspaces')));
    const [anchorEl, setAnchorEl] = React.useState();
    const [categories, setCategories] = React.useState(JSON.parse(localStorage.getItem('categories')));
    const [categoryLinks, setCategoryLinks] = React.useState([]);
    const size = useWindowSize();

    const returnCategory = (id) => {
        const findCategory = (category) => {
            return category.id === id;
        }
        return categories.filter(findCategory)[0].name;
    }

    React.useEffect(()=>{
        if(tags){
            const fetchData = async () => {
                let id = tags.find(x => x.tag === 'subPage').id;
                let subLinkWorkspaces = await getLinkWorkspacesByTag(id, 1);
                setSubLinkWorkspaces(subLinkWorkspaces.data.results);
                localStorage.setItem('subLinkWorkspaces', JSON.stringify(subLinkWorkspaces.data.results));
            }
            fetchData();
        }
    },[ tags]);

    React.useEffect(()=>{
        if (subLinkWorkspaces && subPage) {
            if(Array.isArray(subLinkWorkspaces)){
                subLinkWorkspaces.forEach(element => {
                    if(element.name === subPage ){
                        setSubLinkWorkspace(element);
                    }
                });
            }
        }
    },[subPage, subLinkWorkspaces])

    React.useEffect(()=>{
        if (subLinkWorkspace) {
            setLinks(subLinkWorkspace.link);
        }
    },[subLinkWorkspace])

    React.useEffect(() => {
        const fetchData = async () => {
            let temp = await getTags();
            setTags(temp.data.results);
            let categories = await getCategories();
            setCategories(categories.data.results);
            localStorage.setItem('categories', JSON.stringify(categories.data.results));
        }
        fetchData();
    }, []);

    React.useEffect(() => {
        if (categoryPage) {
            if (categories) {
                if (linkWorkspace) {
                    try {
                        console.log(linkWorkspace.id);
                        setCategoryLinks(returnCategoryLinks(categoryPage));
                    } catch (error) {
                        setCategoryLinks([]);
                    }
                    
                }
            }
        }
    }, [categoryPage, categories, linkWorkspace, path]);

    React.useEffect(() => {
        const fetchData = async () => {
            let id = tags.find(x => x.tag === 'bottomNav').id;
            let depth = 2;
            let temp = await getLinksByTagId(id, depth);
            setBottomNavLinks(temp.data.results);
            localStorage.setItem('bottomNavLinks', JSON.stringify(temp.data.results));
            id = tags.find(x => x.tag === 'noAuth').id;
            let linkworkspaces = await getLinkWorkspacesByTag(id, 1);
            let linkWorkspace = linkworkspaces.data.results[0];
            setLinkWorkspace(linkWorkspace);
            localStorage.setItem('linkWorkspace', JSON.stringify(linkWorkspace));
        }
        if (tags) {
            fetchData();
        }
    }, [tags]);

    React.useEffect(() => {
        if (linkWorkspace) {
            let arr = [];
            try {
                if (linkWorkspace.link) {
                    linkWorkspace.link.forEach(link => {
                        link.category.forEach(category => {
                            arr.push(returnCategory(category));
                        });
                    });
                    let uniqueSet = new Set(arr);
                    let backToArray = [...uniqueSet];
                    setUniqueCategories(backToArray);
                    localStorage.setItem('uniqueCategories', JSON.stringify(backToArray));
                }
            } catch (error) {
                arr = [];
            }
        }
    }, [linkWorkspace]);

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
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const returnCategoryLinks = (category) => {
        const id = categories.find(x => x.name === category).id;
        const findCategory = (link) => {
            return link.category.includes(id);
        }
        return linkWorkspace.link.filter(findCategory);
    };

    return (
        <Box> 
            <AppBar position="static" sx={{ backgroundColor: 'white' }} elevation={0}>
                <Toolbar> <Stack direction="row" spacing={1}>
                    <Typography variant="p" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                        {linkWorkspace ? <Link to="/Workspace" style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: '#343a40' }}> {linkWorkspace.name} </Link> : <></>}
                    </Typography>
                    {
                        uniqueCategories ? uniqueCategories.map((category) => {
                            return <Link key={category} to={'/Workspace/' + category} style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>{category}</Link>
                        }) : <></>
                    }

                    <Breadcrumbs separator=" ">
                        <small style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: 'rgba(0,0,0,0.5)', cursor: 'pointer' }}
                            onClick={handleClick}
                        >
                            More... ▼
                        </small>
                        <i style={{ display: 'inline-block', content: '' }}></i>
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
                        >{
                            subLinkWorkspaces ?  subLinkWorkspaces.map((sub)=>{
                                console.log(sub)
                                return  <MenuItem key={sub.id} ><Link onClick={handleClose} to={'/Workspace/sub/'+sub.name} style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>{sub.name}</Link></MenuItem>
                            })  : <></>
                        }
                           
                        </Menu>
                    </Breadcrumbs>
                </Stack>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" >
                <Router basepath="/Workspace">
                    <CategoryLinks uniqueCategories={uniqueCategories} size={size} path="/" linkWorkspace={linkWorkspace}/>
                    <Links links={categoryLinks} size={size} path="/:pageCategory" />
                    <Links links={links} size={size} path="/sub/:pageCategory" />
                </Router>
            </Container>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation sx={{ paddingTop: 2 }}>
                    <Breadcrumbs separator=" | ">
                        {
                            bottomNavLinks ?
                                bottomNavLinks.map((link) => {
                                    return <div key={link.id}>
                                        <a
                                            href={link.path}
                                            target={link.target}
                                            style={{ paddingLeft: '.5rem', paddingRight: '.5rem', textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}
                                        >
                                            {link.name}
                                        </a>
                                    </div>
                                })
                                : <></>}
                    </Breadcrumbs>
                </BottomNavigation>
            </Paper>
        </Box>

    );
}