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
import { CircularProgress } from "@material-ui/core";

function Counter(props) {

  const { onViewMore } = props;

  const [interval, setInterval] = useState("month");
  const { dashboardData, fetchTopEntries, dataLoading } = useContext(DashboardContext);
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

  async function handleInterval(val) {
    // event.preventDefault();
    // setLoginStat(false);
    // setLoading(true);
    var stat = await fetchTopEntries(val);
    setInterval(val)
    // setLoginStat(!stat);
    // setLoading(false);

    // if(stat) {
    //   window.location.reload(false);
    // }
  }

  const options = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ]

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Range</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={interval}
              onChange={(val) => { handleInterval(val.target.value) }}
            >
              <MenuItem value={"day"}>Today</MenuItem>
              <MenuItem value={"week"}>This Week</MenuItem>
              <MenuItem value={"month"}>This Month</MenuItem>
              <MenuItem value={"year"}>This Year</MenuItem>
            </Select>
            {/* <button onClick={handleInterval}>Go</button> */}
          </FormControl>
        </div>
        <div>
          {dashboardData.length > 2 ? <Button onClick={() => { onViewMore() }}>View More</Button> : <div />}
        </div>
      </div>
      {dataLoading ? <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <CircularProgress />
      </div> :
        <div>
          {dashboardData.length == 0 ? <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>

            No Data to be shown
      </div> :
            <div className="row">
              {dashboardData.map((data) => (
                <div className="col">
                  <div className="card text-center">
                    <div className="card-header">{data.Category_name}</div>
                    <div className="card-body">
                      <div className="card-logo">{data.card_logo}</div>
                      <h5 className="card-title">
                        <CountUp start={0} end={data.Total_quantity} delay={0}>
                          {console.log("Data in counter ", data.name)}
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
          }
        </div>
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default Counter;