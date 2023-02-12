import "./App.css";
import Resetpass from "./Resetpass";
import { Router, Route, Link, Routes } from "react-router-dom";
import Home from "./Home";
import ResetAuth from "./Forgot_password";
import { date } from "yup/lib/locale";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import IconButton from "@mui/material/IconButton";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Register from "./Register";
import Login from "./Login";
import Checkmail from "./Checkmail";
import Forgot_password from "./Forgot_password";
import { Button } from "@mui/material";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <AppBar position="static">
        <Toolbar  disableGutters>
          <Typography variant="h6" color="inherit" component="div" className='toolbar' >
          <a className='toolbar' href="/dashboard">Dashboard</a>  
          </Typography>
          <Typography variant="h6" color="inherit" component="div" className='toolbar'>
          <a className='toolbar'href="/login">Login</a>  
          </Typography>
          <Menu>
            <MenuItem color="white"> login</MenuItem>
            <MenuItem color="white"> login</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>

  

  

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<Forgot_password />} />
        <Route path="/resetpassword" element={<Resetpass />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkmail" element={<Checkmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
