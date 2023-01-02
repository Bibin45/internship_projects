import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
import  Signin from './Signin'
import  Signup from './Signup'
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.js/Config';
import { setUser } from '../redux/slice/Bitcoin';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../redux/slice/Api';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:400,
    borderRadius:10, 
    fontFamily:"Montserrat",
  },
}));

export default function Login() {
  const classes = useStyles();
  const [open, setOpen] =useState(false);
  const dispatch=useDispatch()
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const googleProvider=new GoogleAuthProvider()
  const signInWithGoogle=()=>{
    signInWithPopup(auth,googleProvider).then(res=>{
      dispatch(setUser(res))
      dispatch(setAlert({open:true,message:`Welcome ${res.user.displayName}`,type:'info'}))
      handleClose()
    })
  }
  return (
    <div>
      <button type="button" className='btn btn-warning marl col-12 text-white font' onClick={handleOpen}>
        Login
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position='static' className='bg-dark font text-white '>
                <Tabs
                value={value}
                onChange={handleChange}
                variant='fullWidth'
                style={{borderRadius:10}}
                >
                  <Tab label='Login'/>
                  <Tab label='Sign Up'/>
                </Tabs>
                {value ===0 && <Signin handleClose={handleClose}/>}
                {value ===1 && <Signup handleClose={handleClose}/>}
                </AppBar>
              <Box className='text-center bg-dark text-white font'>
                <span>OR</span>
                <GoogleButton
                  style={{width:'100%',outline:'none'}}
                  onClick={signInWithGoogle}
                />
              </Box>
              
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
