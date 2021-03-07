import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { AppBar, Box, CircularProgress, LinearProgress, makeStyles, Tab, Tabs, Typography, useTheme } from "@material-ui/core";
import Counter from "./graphical-representations/counter";
import { BarGraphs, LineGraphs } from "./graphical-representations/graphs";
import { DashboardContext } from "../../contexts/DashboardContext";
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import TopEntries from "./graphical-representations/TopEntries";


function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

   const { salesData, saleslabel, } = useContext(DashboardContext)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (event, newValue) => {
    setValue(newValue);
  };

  const viewMore = () => {
    setValue(1)
  }

  const goBack = () => {
    setValue(0)
  }

  return (

    <div className="Main-Container">
      <div className={classes.root}>

        <SwipeableViews
      style={{ backgroundColor: '#FAFAFA' }}

          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <div className="container top-section">

              <Counter onViewMore={viewMore} />

            </div>

            <div className="container graph-section">
              <div className="row">
                <div className="col-sm">
                  <BarGraphs />
                </div>
                <div className="col-sm">
                  <LineGraphs />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} >
            <TopEntries onGoBack={goBack} />
          </TabPanel>
        </SwipeableViews>
      </div>




    </div>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
export default Dashboard;
