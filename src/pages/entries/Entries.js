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

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const [Product, setProduct] = React.useState("");

  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };


  const [Size, setSize] = React.useState("");

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };
  const { fetchCategories } = useContext(CategoryContext);
  const { fetchSizes } = useContext(SizeContext);
  // const { fetchProducts } = useContext(ProductContext);

  // useEffect(() => {
  //   Promise.all([fetchCategories(), fetchSizes()]).then((values) => {
  //     fetchProducts();
  //     console.log("akoa ning categorisss" + fetchCategories());
  //   });
  // }, []);

  //table

  // const { products, productsLoading } = useContext(ProductContext);
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

    // await addProduct({ product_name, product_price, size_id, category_id });
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
    // { title: "Size", field: "size", lookup: sizeLookup },
    // { title: "Category", field: "category", lookup: categoryLookup },
    { title: "Price", field: "price" },
    { title: "Date Created", field: "created_at", editable: "never" },
  ]);

  
  const [mydata, setData] = useState([
    // { id: "", name: "", category: "fish", created_at: "june 1, 2019" }
  ]);
  


  //table

  return (
    <div className="container-fluid entry-main-container">
      <div className="row entry-title-row">
        <h1>Entries</h1>
      </div>



      {/*Table*/}
      <MaterialTable
        // isLoading={productsLoading}
        icons={tableIcons}
        options={tablePageSizeoptions}
        title="Products"
        columns={columns}
        data={mydata}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              console.log("New data: " + newData.name + "; " + newData.price);

             setTimeout(() => {
                // setData([...mydata,newData])
                setData([
                  {
                    id: "123",
                    name: newData.name,
                    price: newData.price,
                    created_at: "Feb 14 20121",

                  }
                ])

                resolve();
             }, 1000)
              // let status = await addProduct({
              //   product_name: newData.name,
              //   product_price: newData.price,
              //   size_id: newData.size,
              //   category_id: newData.category,
              // });

              // if (status !== false) {
               
              // } else {
              //   alert(status.error);
              // }
              
              // resolve();
              // reject();
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
    </div>
  );
}

export default NewEntries;
