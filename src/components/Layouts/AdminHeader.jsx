import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
//import barterLogo from "../../assets/BXI_LOGO.png";
import Cookies from 'js-cookie';
import { red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect ,useState} from "react";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    background: '#FAFBFC',
    border: '1px solid #445FD2',
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '70ch',
      },
    },
  }));

const pages = ['Home', 'About', 'Marketplace','Contact Us'];

const AdminHeader = () =>{
 
  const name = Cookies.get('name');
  const navigate = useNavigate();
  const logout = ()=>{
    console.log("logging out");
    Cookies.remove('name');
    navigate('/login');
  }
  useEffect(()=>{
  },[])
  
    return (
        <Box className = "main-box">
            <AppBar position="static" sx= {{backgroundColor: "#FDFDFD",color:"#6B7A99",boxShadow:0,borderBottom:'2px solid #F0F0F0'}} >
            <Container maxWidth="fluid">
                <Toolbar disableGutters>
                <Box sx={{ width: "100px" }}>
                  {/* <img
                    // barterLogo
                    alt="img"
                    style={{ height: "auto", width: "50px" }}
                  /> */}
                </Box>
                <h4 style={{ marginRight: '10px'}}>Welcome {name}</h4>                
                <Typography sx = {{mr: 5,fontFamily: 'Poppins',fontWeight: 700,color: '#6B7A99',textDecoration: 'none',fontSize: '16px'}}>
                    Admin Panel
                </Typography>
               
                  <button style={{ fontSize: '12px', padding: '5px 10px' }} onClick={logout}>LogOut</button>
                </Toolbar>
            </Container>
            </AppBar>
        </Box>
      );
}
export default AdminHeader;