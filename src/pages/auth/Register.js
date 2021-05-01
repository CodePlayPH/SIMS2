import React, { useState, useContext, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AuthContext } from "../../contexts/AuthContext";
import "./auth.scss"
import { BorderColor } from "@material-ui/icons";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


function Register() {
  const classes = useStyles();
  var history = useHistory();

   const { registerUser } = useContext(AuthContext)

  const [fullname, setFullname] = useState("");
  const [accountType, setAccountType] = useState("");
  const [position, setPosition] = useState("");
  const [Dept, setDept] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Snackbar*****
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
   // Snackbar*****

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  async function handleRegister(event) {
    event.preventDefault();
    var stat = await registerUser({
      full_name: fullname ,
      position: position,
      access_type: accountType
    });

    if (stat === false) {
      history.replace("/");
    }else {
      handleClick()
      setErrorMsg("Error: "+stat.message)
      alert("Error: " + stat.message)
    }
  }

  const [ accountTypeState, setAccountTypeState ] = useState([
    {
      value: "1",
      label: "Admin"
    },
    {
      value: "2",
      label: "Staff"
    }
  ])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register for an Account
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleRegister}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="filled"
                required={true}
                // helperText="This is required"
               
                fullWidth
                id="firstName"
                label={"First Name"}
                value={fullname}
                onChange={(val) => setFullname(val.target.value)}
                autoFocus
              />
            </Grid>
           
            
            <Grid item xs={12}>
              <TextField
                variant="filled"
                className={classes.formControl}
                id="formControl"
                // helperText="This is required"
                required={true}
                fullWidth
                name="position"
                label="Position"
                type="text"
                id="position"
                onChange={(val) => setPosition(val.target.value)}
                value={position}
              />
            </Grid>

            <FormControl variant="filled" className={classes.formControl}>
             
             <InputLabel htmlFor="outlined-age-native-simple">Account Type to register</InputLabel>
             <Select
               native
               required
               value={accountType}
               label="Account Type to register"
               inputProps={{
                 name: "accountType",
                 id: "outlined-age-native-simple",
               }}

               onChange={(val) => setAccountType(val.target.value)}
             >
               <option aria-label="None" value="" />
               {
                 accountTypeState.map(accType => (
                   <option value={accType.value}>{accType.label}</option>
                 )) 
               }
             </Select>
           </FormControl>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            id="btn-submit"
            color="primary"
            className={classes.submit}
            onClick={handleRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/junex" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Registration Failed. {errorMsg}
          </Alert>
        </Snackbar>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#57B894"
  },
  formControl: {
    margin: theme.spacing(0.4),
    minWidth: "98%",
    marginTop: "12px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default Register;
