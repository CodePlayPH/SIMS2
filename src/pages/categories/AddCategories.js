import React, { useState, useEffect, useContext } from "react";

import { CategoryContext } from "../../contexts/CategoryContext";
import { SizeContext } from "../../contexts/SizeCotext";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import PostAddIcon from "@material-ui/icons/PostAdd";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { ProductContext } from "../../contexts/ProductContext";

function AddCategories() {
  const classes = useStyles();
  const { sizes } = useContext(SizeContext);
  const { categories } = useContext(CategoryContext);
  const { addProduct } = useContext(ProductContext);

  const sizeLookup = {};
  const categoryLookup = {};

  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [categoryOpt, setCategoryOpt] = useState([{ lookup: categoryLookup }]);

  // const handleProductNameChange = (event) => {
  //   setProductName(event.target.value);
  //   console.log(event.target.value);
  // };

  // const handleProductCategoryChange = (event) => {
  //   setProductCategory(event.target.value);
  //   console.log(event.target.value);
  // };

  // const handleProductSizeChange = (event) => {
  //   setProductSize(event.target.value);
  //   console.log(event.target.value);
  // };

  // const handleProductPriceChange = (event) => {
  //   setProductPrice(event.target.value);
  //   console.log(event.target.value);
  // };

 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className="container">
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
            <form className={classes.form_prod} noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                id="filled-basic"
                label="Product Name"
                variant="filled"
              />
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                className={classes.textField}
                id="filled-basic"
                label=""
                variant="filled"
                // value={productPrice}
                // onChange={handleProductPriceChange}
              />
            </form>
            <div className="container">
              <div className="row">
                <div className="col-md-auto">
                  <Button variant="outlined">Default</Button>
                </div>
                <div className="col-md-auto">
                  <Button variant="contained" color="primary" >
                    Add Product
                  </Button>
                </div>
              </div>
            </div>
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
    width: "100%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
    fontSize: "medium",
  },
  form_prod: {
    margin: theme.spacing(1),
  },
  textField: {
    marginRight: "5px",
    marginLeft: "5px",
    marginTop: "2px",
  },
  formControl: {
    marginRight: "5px",
    marginLeft: "5px",
    marginTop: "2px",

    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default AddCategories;
