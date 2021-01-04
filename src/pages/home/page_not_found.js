import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import notFoundImage from '../../resources/images/404.svg'
import './page_not_found.scss'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function Page_not_found() {
    const classes = useStyles();
    var history = useHistory();
    
    return (
      <div className="container ForOForContainer">
        <div className="row">
          <img src={notFoundImage} className="notFound_img" />
        </div>

        <div className="row">
          <div  className={classes.roots}>
            <Button variant="contained" color="primary" onClick={() => history.replace("/")}>Go Back to  Login</Button>
          </div>
        </div>
      </div>
    );
}

const useStyles = makeStyles((theme) => ({
    roots: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

export default Page_not_found
