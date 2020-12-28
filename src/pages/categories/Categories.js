import React, { useState, useEffect, useContext } from "react";

import { CategoryContext } from "../../contexts/CategoryContext";
import { SizeContext } from "../../contexts/SizeCotext";
import { makeStyles } from "@material-ui/core/styles";
import { ProductContext } from "../../contexts/ProductContext";
import AddCategories from "./AddCategories"

import MaterialTable from "material-table";
import { tableIcons, tablePageSizeoptions } from "../../utils/utils";

function Categories() {
  const classes = useStyles();
  const { sizes } = useContext(SizeContext);
  const { categories, categoryLoading } = useContext(CategoryContext);
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
 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [columns, setColumns] = useState([
    { title: "ID", field: "id", editable: "never" },
    { title: "Category Name", field: "name" },
    { title: "Date Created", field: "created_at", editable: "never" },
  ]);

  return (
    <div className="container">
      
      <div className="addCategories-container">
        <div class="row ">
        <div class="col">
            {" "}
            {/* <AddProd /> */}
          </div>
          <div class="col">
            {" "}
            {/* <AddProd /> */}
          </div>
          <div class="col">
            {" "}
            <AddCategories />
          </div>
        </div>
      </div>

      <MaterialTable
        isLoading={categoryLoading}
        icons={tableIcons}
        options={tablePageSizeoptions}
        title="Products"
        columns={columns}
        data={categories}
        editable={{
          // onRowAdd: (newData) =>
          //   new Promise(async (resolve, reject) => {
            
          //     let status = await addProduct({
          //       product_name: newData.name,
          //       product_price: newData.price,
          //       size_id: newData.size,
          //       category_id: newData.category,
          //     });

          //     if (status != false) {
          //       alert(status);
          //     } else {
          //     }
          //   }),

          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              reject();
              // handleAddNow.bind(this)
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

const useStyles = makeStyles((theme) => ({
  
}));

export default Categories;
