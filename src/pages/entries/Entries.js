import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import { tableIcons, tablePageSizeoptions } from "../../utils/utils";
import "./styles.scss";

//contexts
import { CategoryContext } from "../../contexts/CategoryContext";
import { ProductContext } from "../../contexts/ProductContext";
import { SizeContext } from "../../contexts/SizeCotext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function NewEntries() {
  const classes = useStyles();
  const [Category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [Product, setProduct] = React.useState("");

  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };

  const { fetchCategories } = useContext(CategoryContext);
  const { fetchSizes } = useContext(SizeContext);
  const { fetchProducts } = useContext(ProductContext);

  // useEffect(() => {
  //   Promise.all([fetchCategories(), fetchSizes()]).then((values) => {
  //     fetchProducts();
  //     console.log("akoa ning categorisss" + fetchCategories());
  //   });
  // }, []);

  //table

  const { products, productsLoading } = useContext(ProductContext);
  const { sizes } = useContext(SizeContext);
  const { categories } = useContext(CategoryContext);

  const [product_name, setProduct_name] = useState("");
  const [product_price, setProduct_price] = useState("");
  const [size_id, setSize_id] = useState("");
  const [category_id, setCategory_id] = useState("");
  const { addProduct } = useContext(ProductContext);

  const sizeLookup = {};
  const categoryLookup = {};

  const handleAddNow = async (event) => {
    event.preventDefault();
    setProduct_name(columns.name);
    setProduct_price(columns.price);
    setSize_id(columns.size);
    setCategory_id(columns.category);

    await addProduct({ product_name, product_price, size_id, category_id });
  };

  useEffect(() => {
    sizes.map((size) => {
      sizeLookup[size.id] = size.name;
    });

    categories.map((category) => {
      categoryLookup[category.id] = category.name;
    });
  }, []);

  const [columns, setColumns] = useState([
    { title: "ID", field: "id", editable: "never" },
    { title: "Product Name", field: "name" },
    { title: "Size", field: "size", lookup: sizeLookup },
    { title: "Category", field: "category", lookup: categoryLookup },
    { title: "Price", field: "price" },
    { title: "Date Created", field: "created_at", editable: "never" },
  ]);

  //table

  return (
    <div className="container-fluid entry-main-container">
      <div className="row entry-title-row">
        <h1>Entries</h1>
      </div>

      <div className="row entry-number-row">
        <div>
          <label>
            Entry Number:
            <input type="text" disabled name="name" />
          </label>
        </div>
      </div>

      

      <div className="row entry-select-input">
        <div className="col-sm"></div>
        <div className="col-sm">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              className="entry-select"
            >
              Product Name:{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={Product}
              onChange={handleChangeProduct}
              label="Product Name: "
            >
              {products.map((product) => {
                return <MenuItem value={product.size +" - "+ product.name + " - " + product.category}>{product.size +" - "+ product.name + " - " + product.category}</MenuItem>
              })}
              
            </Select>
          </FormControl>
        </div>
        <div className="col-sm">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              className="entry-select"
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={Category}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((category) => {
                return <MenuItem value={category.id}>{category.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        

        <div className="col-sm">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              className="entry-select"
            >
              Size
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={Category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="Frozen Goods1">Frozen Goods1</MenuItem>
              <MenuItem value="Frozen Goods2">Frozen Goods2</MenuItem>
              <MenuItem value="Frozen Goods3">Frozen Goods3</MenuItem>
              <MenuItem value="Frozen Goods4">Frozen Goods4</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-sm">
          QTY Here
        </div>
      </div>

      <div className="row entry-text-area">
        {/* <div className="col"> */}
        <TextareaAutosize
          className="txt-area"
          aria-label="minimum height"
          rowsMin={6}
          placeholder="Minimum 3 rows"
        />
        {/* </div> */}
      </div>

      <div className="container btns-container">
        <div className="col-sm">
          <Button variant="contained" className="btn">
            Cancel
          </Button>
          <Button variant="contained" color="primary" className="btn">
            Add Item/s
          </Button>
        </div>
        {/* <div className="col-sm">
         
        </div> */}
      </div>

      {/*Table*/}
      <MaterialTable
        isLoading={productsLoading}
        icons={tableIcons}
        options={tablePageSizeoptions}
        title="Products"
        columns={columns}
        data={products}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              console.log("New data: " + columns.name + "; " + columns.price);
              reject();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              reject();
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              reject();
            }),
        }}
      />
    </div>
  );
}

export default NewEntries;
