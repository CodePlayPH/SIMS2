import React, { useState, useEffect, useContext } from "react";

import CountUp from "react-countup";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { DashboardContext } from "../../../contexts/DashboardContext";
import "../Dashboard.scss";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

function Counter(props) {
  
  const [interval, setInterval] = useState("");
  const { dashboardData, fetchTopEntries } = useContext(DashboardContext);
  const categoryCount = {};
  const sizeLookup = {};

  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  async function handleInterval(event) {
    event.preventDefault();
    // setLoginStat(false);
    // setLoading(true);
    var stat = await fetchTopEntries(interval);
    // setLoginStat(!stat);
    // setLoading(false);

    if(stat) {
      window.location.reload(false);
    }
  }

    

  return (
    <>
      
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Range</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={(val) => setInterval(val.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"daily"}>Today</MenuItem>
          <MenuItem value={"weekly"}>This Week</MenuItem>
          <MenuItem value={"monthly"}>This Month</MenuItem>
        </Select>
        <button onClick={handleInterval}>Go</button>
      </FormControl>
      <div className="row">
        {dashboardData.map((data) => (
          <div className="col">
            <div className="card text-center">
              <div className="card-header">{data.Category_name}</div>
              <div className="card-body">
                <div className="card-logo">{data.card_logo}</div>
                <h5 className="card-title">
                  <CountUp start={0} end={data.Total_quantity} delay={0}>
                    {console.log("Data in counter ",data.name)}
                    {({ countUpRef }) => (
                      
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                </h5>
                <p className="card-text">{data.card_text}</p>
              </div>
              <div className="card-footer text-muted">{data.card_footer}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default Counter;