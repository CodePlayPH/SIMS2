import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Collapse from '@material-ui/core/Collapse';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import './drawer.scss'
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from '@material-ui/icons/Add';
import HistoryIcon from '@material-ui/icons/History';
import AssessmentIcon from "@material-ui/icons/Assessment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import CPPH_Logo from '../resources/images/CPPH2.png'

import { Link, useHistory } from "react-router-dom";
import { HoverState } from "@devexpress/dx-react-chart";

const drawerWidth = 240;

function MainDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  var history = useHistory();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = React.useState(false);
  //   const [userData, setUserData] = useState(user_name)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const logOut = () => {
    localStorage.removeItem("userData");
    history.replace("/");
  };

  useEffect(() => {
    var path = props.pathName.split("/").pop();
    if (path === "") setSelectedTab(0);
    if (path === "Sizes") setSelectedTab(1);
    if (path === "Categories") setSelectedTab(2);
    if (path === "Products") setSelectedTab(3);
    if (path === "Entries") setSelectedTab(4);
    if (path === "Reports") setSelectedTab(5);


  }, []);

  const drawerIcons = [
    <DashboardIcon />,
    <ListAltIcon />,
    <AssignmentIcon />,
    <CreateIcon />,
    <AssessmentIcon />,
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {/* <Divider /> */}
      <List>
        <ListItem button onClick={handleClick} selected={selectedTab == 4 || selectedTab == 5} >
          <ListItemIcon>
            <InboxIcon className="drawer-icon" />
          </ListItemIcon>
          <ListItemText primary="Sales Entries" />
          {open ? <ExpandLess style={{ color: selectedTab == 4 || selectedTab == 5 ? '#7AE02D' : 'white' }} /> : <ExpandMore style={{ color: selectedTab == 4 || selectedTab == 5 ? '#7AE02D' : 'white' }} />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} to={`/home/Entries`} component={Link} onClick={() => setSelectedTab(4)} selected={selectedTab == 4}>
              <ListItemIcon className="drawer-icon">
                <AddIcon className="drawer-icon" />
              </ListItemIcon>
              <ListItemText primary="New Entry" />
            </ListItem>

            <ListItem button className={classes.nested} to={`/home/Entries`} component={Link} onClick={() => setSelectedTab(5)} selected={selectedTab == 5}>
              <ListItemIcon>
                <HistoryIcon className="drawer-icon" />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItem>
          </List>
        </Collapse>
        {[
          "Dashboard",
          "Product Sizes",
          "Categories",
          "Products",
          // "Entries",
        ].map((text, index) => (
          <>
            <ListItem
              button
              key={text}
              className="DrawerItems"
              component={Link}
              to={text == "Dashboard" ? `/home` : `/home/${text}`}
              onClick={() => setSelectedTab(index)}
              selected={selectedTab == index}
            >
              <ListItemIcon className="drawer-icon">{drawerIcons[index]}</ListItemIcon>
              <ListItemText primary={text} />
              {/* <div style={{ display: 'flex', padding: 5, borderRadius: 40, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', width: 20, height: 20 }}><text style={{ color: 'white', fontSize: 10 }}>1</text></div> */}
            </ListItem>


          </>
        ))}

      </List>

      <div
        style={{
          flex: 1,
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
          width: 20,
          backgroundColor: "red",
        }}
      ></div>
      {/* <div>
        <img src={CPPH_Logo} />
      </div> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className="title">
            Sales Inventory Monitoring System
          </Typography>
          <Button
            // className={classes.logoutBtn}
            className="logoutBtn"
            variant="outlined"
            // color="default"
            onClick={() => logOut()}
            endIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>

        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

MainDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      // backgroundColor: "#57B894"
      backgroundColor: "#F7F7F7"
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#2E3033"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logoutBtn: {
    color: "#569DFC",
    borderColor: "#569DFC",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default MainDrawer;
