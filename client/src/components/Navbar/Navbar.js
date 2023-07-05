import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Link, Toolbar, Typography } from '@material-ui/core'
// import Link from 'react-router-dom';
import useStyles from './styles';
import decode from 'jwt-decode';
import memories from '../../images/memories.png';
import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'
import { useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';

const Navbar = () => {

    const classes= useStyles();
    // const user=null;
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({type:'LOGOUT'});
        navigate('/');
        setUser(null);
    };

    useEffect(()=>{
        const token= user?.token;

        if(token){
            const decodedToken = decode(token);
    
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));

    },[location]);
    
    
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <Link href='/' className={classes.brandContainer}>
            {/* <Typography className={classes.heading} href='/' variant="h2" align="center"><Link className={classes.heading} href="/" underline="none">Memories</Link></Typography> */}
            <img src={memoriesText} alt='icon' height="45px"/>
            <img src={memoriesLogo} className={classes.image} alt="icon" height="40" />
        </Link>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                    {/* <Avatar className={classes.purple} >J</Avatar>
                    <Typography className={classes.userName} variant='h6'>Jugal</Typography> */}
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>

            ) : (
                <Button href='/auth' variant='contained' color='primary'>Sign In</Button>

            )}

        </Toolbar>
    </AppBar>
  )
}

export default Navbar