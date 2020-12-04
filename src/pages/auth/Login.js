import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FishPic from "../../resources/images/login_fish.svg";
import { useHistory } from "react-router-dom";
import { UserLogin } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const classes = useStyles();
  var history = useHistory();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginStat, setLoginStat] = useState(false);

  const [ prevData, setPrevData ] = useState([]);

  const { loginUser, setUserData } = useContext(AuthContext);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginStat(false);
    setLoading(true);
    var stat = await loginUser(code);
    setLoginStat(!stat);
    setLoading(false);

    if (stat) {
      history.replace("/home");
    }
  }

  function handleGoToRegister() {
    history.replace("/access_register");
  }

  useEffect(() => {
    if (code == "") {
      setLoginStat(false);

      setPrevData(localStorage.getItem("userData"));
      if (prevData) {
        setUserData(prevData);
        // history.replace("/home");
    
       
      }
      // else {
      //   <button onClick={() => history.replace("/")}>
      //   Login to continue
      // </button>
      // }
    }
    
  }, [code]);

  
 

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              type="password"
              fullWidth
              id={loginStat ? "outlined-error-helper-text" : ""}
              label="User Code"
              name="code"
              autoFocus
              onChange={(val) => setCode(val.target.value)}
              helperText={loginStat ? "Login Failed" : ""}
              value={code}
            />
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/access_register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage:
      "url(https://images.pexels.com/photos/5727919/pexels-photo-5727919.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default Login;
