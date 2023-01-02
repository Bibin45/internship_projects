import { Snackbar } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert'
import { setAlert } from '../redux/slice/Api';
export default function Alert() {
   
    const {alert}=useSelector((state)=>state.api)
    const dispatch=useDispatch()
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatch(setAlert({open:false}));
    };
  return (
   <Snackbar open={alert.open} autoHideDuration={5000} onClose={handleClose}>
    <MuiAlert onClose={handleClose} elevation={10} variant='filled' severity={alert.type}>{alert.message}</MuiAlert>
   </Snackbar>
  )
}
