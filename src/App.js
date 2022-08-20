import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import Auth from "./Auth";
import Guest from "./Guest";
import {
  AppBar,
  Drawer,
  List,
  Toolbar,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  TextField,
} from "@mui/material";
import { LogOut } from "./Supabase";
import Profile from "./Profile";
import Home from "./Home";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [guest, setGuest] = useState(null);
  const [currentPage, setCurrentPage] = useState('home')

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("_v89+g")) {
      setGuest(localStorage.getItem("_v89+g"));
    }
  }, [loggedIn]);

  const HandleProfileClick = () => {
    setCurrentPage('profile');
  }

  const HandleLogoutClick = () => {
    if(guest) return;
    LogOut();
    setLoggedIn(false);
  }

  const HandleHomeClick = () => {
    setCurrentPage('home');
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!loggedIn ? <Auth setLoggedIn={setLoggedIn} /> : <></>}
      {guest !== null ? <Guest guestId={guest} /> : <></>}
      {loggedIn ? (
        <div>
          <AppBar
            position={"fixed"}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar></Toolbar>
          </AppBar>
          <Drawer anchor={"left"} open={true} variant={"permanent"} sx={{width: 240,[`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' }}}>
            <Toolbar />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={HandleHomeClick}>
                  <ListItemText primary={'Home'} />
                </ListItemButton>
              </ListItem>            
            </List>
            <Divider sx={{mt: 'auto'}} flexItem/>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={HandleProfileClick}>
                  <ListItemText primary={'Profile'}/>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={HandleLogoutClick}>
                  <ListItemText primary={'Log Out'}/>
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <div style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 'calc(100vw - 240px)',
            height: 'calc(100vh - 64px)',
            padding: '32px'
          }}>
            {
              currentPage === 'home' ?
              (<Home />) :
              currentPage === 'profile' ?
              (<Profile guest={guest}/>) :
              <></>
            }
          </div>
        </div>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}

export default App;
