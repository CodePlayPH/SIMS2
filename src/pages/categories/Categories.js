import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';


function Categories() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}

      <div class="row ">
        <div class="col-md-auto">
          {" "}
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<PostAddIcon />}
            onClick={handleOpen}
          >
            New Product
          </Button>
        </div>
        <div class="col-md-auto">
          {" "}
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<PostAddIcon />}
            onClick={handleOpen}
          >
            New Category
          </Button>
        </div>
        <div class="col-md-auto">
          {" "}
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<PostAddIcon />}
            onClick={handleOpen}
          >
            New Sizing
          </Button>
        </div>
      </div>

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
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
    fontSize: "medium"
  },
}));

export default Categories;
