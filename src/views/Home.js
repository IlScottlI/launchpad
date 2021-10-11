import React from 'react';
import NavBar from '../components/NavBar';
import AppDrawer from '../components/AppDrawer';
import WorkspaceLinks from '../components/WorkspaceLinks';
import { navigate, Router } from "@reach/router"
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useIsAuthenticated } from "@azure/msal-react";
import { getUserProfile, getUserphoto } from "../variables/graph";
import {
    getPlantByName,
    postPlant,
    getTeams,
    postTeam,
    getUserByEmail,
    postUser,
    getLinkWorkspace,
    getCategories,
} from "../variables/functions";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../variables/authConfig";
const drawerWidth = 240;

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

export default function Home() {
    const isAuthenticated = useIsAuthenticated();
    const { instance, accounts } = useMsal();
    const [openAppDrawer, setOpenAppDrawer] = React.useState(window.openAppDrawer);
    const [varLoading, setVarLoading] = React.useState(true);
    const [gridPadding, setGridPadding] = React.useState();
    const [teams, setTeams] = React.useState();
    const [categories, setCategories] = React.useState();
    const [userData, setUserData] = React.useState();
    const [userImage, setUserImage] = React.useState();
    const [userPlant, setUserPlant] = React.useState();
    const [userProfile, setUserProfile] = React.useState();
    const [linkWorkspace, setLinkWorkspace] = React.useState();

    React.useEffect(() => {
        window.openAppDrawer = openAppDrawer;
        localStorage.setItem('openAppDrawer', openAppDrawer);
        setGridPadding(openAppDrawer ? 32 : 10);
    }, [openAppDrawer])

    React.useEffect(() => {
        if (userData) {
            fetchData();
            setVarLoading(true);
        }
        async function fetchData() {
            let categories = await getCategories();
            setCategories(categories.data.results);
            let plants = await getPlantByName(userData.officeLocation);
            let userPlant;
            if (plants.data.count) {
                setUserPlant(plants.data.results[0]);
                userPlant = plants.data.results[0];
            } else {
                let plant_json = {
                    "name": userData.officeLocation,
                    "display_name": userData.officeLocation,
                    "default_workspace": null
                }
                let newPlant = await postPlant(plant_json);
                setUserPlant(newPlant.data);
                userPlant = newPlant.data;
            }
            let users = await getUserByEmail(userData.userPrincipalName);
            let teams = await getTeams();
            let team;
            if (teams.data.count) {
                setTeams(teams.data.results);
                team = teams.data.results[0];
            } else {
                let team_json = {
                    "name": "-Select Team-"
                };
                let new_team = await postTeam(team_json);
                team = new_team.data;
            }
            if (users.data.count) {
                setUserProfile(users.data.results[0]);
            } else {
                console.log(team);
                let user_json = {
                    "first_name": userData.givenName,
                    "last_name": userData.surname,
                    "email": userData.userPrincipalName,
                    "user_id": userData.id,
                    "default_workspace": userPlant.default_workspace,
                    "workspace_style": "",
                    "officeLocation": userData.officeLocation,
                    "team": team.id,
                    "plant": userPlant.id,
                    "role": [],
                    "business": [],
                    "module": [],
                    "department": [],
                    "area": []
                }
                let newUser = await postUser(user_json);
                setUserProfile(newUser.data);
            }
        }
    }, [userData]);

    React.useEffect(() => {
        const fetchData = async (id, depth) => {
            let link_workspace = await getLinkWorkspace(id, depth);
            setLinkWorkspace(link_workspace.data);
            setVarLoading(false);
        }
        if (userPlant) {
            let depth = 3;
            fetchData(userPlant.default_workspace, depth);
        }
    }, [userPlant])

    React.useEffect(() => {
        const RequestProfileData = () => {
            instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            }).then(async (response) => {
                await getUserProfile(response.accessToken).then(response => setUserData(response));
                await getUserphoto(response.accessToken).then(result => setUserImage(window.URL.createObjectURL(result)));
            });
        }
        RequestProfileData();
    }, [instance, accounts]);

    const handleDrawerOpen = () => {
        setOpenAppDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenAppDrawer(false);
    };

    const navigateTo = (path) => {
        navigate('/LaunchPad/' + path);
    };

    const size = useWindowSize();

    return <>
        <ThemeProvider theme={window.theme}>
            <NavBar
                drawerWidth={drawerWidth}
                open={openAppDrawer}
                handleDrawerOpen={handleDrawerOpen}
                navigateTo={navigateTo}
                userImage={userImage}
                userData={userData}
                isAuthenticated={isAuthenticated}
                userProfile={userProfile}
                teams={teams}
                size={size}
            />
            <Box sx={{ pl: gridPadding, pr: 2 }} display="grid" direction="row" >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <AppDrawer
                        navigateTo={navigateTo}
                        handleDrawerClose={handleDrawerClose}
                        open={openAppDrawer}
                        size={size}
                    />
                </Grid>
                <Router basepath="/LaunchPad">
                    <WorkspaceLinks
                        path="Workspace"
                        categories={categories}
                        linkWorkspace={linkWorkspace}
                        size={size}
                        setVarLoading={setVarLoading}
                        varLoading={varLoading}
                    />
                </Router>
            </Box>
        </ThemeProvider>
    </>
}

