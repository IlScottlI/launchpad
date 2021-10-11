import logo from './../images/bannerlogo.png';
import './../styles/App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../variables/authConfig";
function SignIn() {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
      if (loginType === "popup") {
          instance.loginPopup(loginRequest).catch(e => {
              console.log(e);
          });
      } else if (loginType === "redirect") {
          instance.loginRedirect(loginRequest).catch(e => {
              console.log(e);
          });
      }
  }
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={window.theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src={logo} className="App-logo" alt="logo" />
              <Typography component="h1" variant="h5" sx={{marginTop:'15px'}}>
                LaunchPad
              </Typography>
              <Box noValidate sx={{ mt: 1 }} >
                
              
                <Button variant='contained' to="/" onClick={()=>handleLogin('popup')} sx={{marginTop:'20px'}}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                  
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default SignIn;
