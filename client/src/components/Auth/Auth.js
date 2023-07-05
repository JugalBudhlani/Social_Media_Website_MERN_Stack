import React, {useState} from 'react'
import { Avatar,Button,Grid,Paper, Typography, Container, TextField } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { signin,signup} from '../../actions/auth'

const initState={firstName:'',lastName:'', email:'', password:'', confirmPassword:''};
const Auth = () => {

  const classes= useStyles();
  const [isSignup, setIsSignUp]= useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState(initState);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleShowPassword =() => {
    setShowPassword((prevShowPassword)=> !prevShowPassword);

  }
  const switchMode =() =>{
    setIsSignUp((prevIsSignUp)=>!prevIsSignUp );
    handleShowPassword(false);

  }

  const handdleSubmit= (e) => {
    e.preventDefault();
    // console.log(formData);

    if (isSignup){
      dispatch(signup(formData,navigate));

    }
    else{
      dispatch(signin(formData,navigate));

    }


  }

  const handleChange =(e) =>{
    setFormData({...formData, [e.target.name]:e.target.value });

  }

  const googleSuccess = async(res) =>{
    const result= res?.profileObj;
    const token =res?.tokenId;

    try {
        dispatch({type:'AUTH', data: {result, token}});
        navigate('/');
      
    } catch (error) {
      console.log(error);
      
    }

  }

  const googleFailure =() =>{
    console.log("Failed to sign in with Google. Please try again.")

  }

  return (
    <Container component="main" maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handdleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                    
                      <Input name="firstName" label='First Name' handleChange={handleChange} autoFocus half />
                      <Input name="lastName" label='Last Name' handleChange={handleChange}  half />
                </>
              )
            }
            <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            {isSignup &&  <Input name="confirmPassword" label="Repeat password" handleChange={handleChange} type="password"/>}
          </Grid>
          <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign in"}
          </Button>
          <GoogleLogin
          clientId="634167060276-kao9scfrv6lvb88haseeop5kmsv6ko9a.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>Google Sign In</Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy='single_host_origin'
          />
          
          <Grid container justifyContent='flex-end' >
            <Grid item >
              <Button onClick={switchMode}>
                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>

            </Grid>

          </Grid>
        </form>
        
      </Paper>
    </Container>
    
  )
}

export default Auth;