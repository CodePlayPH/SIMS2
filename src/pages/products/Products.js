import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";
import './AddProd.scss';

import { tableIcons, tablePageSizeoptions } from "../../utils/utils";

//contexts
import { CategoryContext } from "../../contexts/CategoryContext";
import { ProductContext } from "../../contexts/ProductContext";
import { SizeContext } from "../../contexts/SizeCotext";
import Categories from "../categories/Categories";
import AddProd from "./AddProd";

function Products(props) {
  const { products, productsLoading } = useContext(ProductContext);
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

  useEffect(() => {
    sizes.map((size) => {
      sizeLookup[size.id] = size.name;
    });

    categories.map((category) => {
      categoryLookup[category.id] = category.name;
    });
  }, []);

  const handleAddNow = async (event) => {
    //   event.preventDefault();
    //  let status = await addProduct({
    //    product_name: productName,
    //    product_price: productPrice,
    //    size_id: productSize,
    //    category_id: productCategory,
    //  });

    //  if (status != false) {
    //      alert(status.error)
    //  } else {

    //  }

    alert(productName);
  };

  const [columns, setColumns] = useState([
    { title: "ID", field: "id", editable: "never" },
    { title: "Product Name", field: "name" },
    { title: "Size", field: "size", lookup: sizeLookup },
    { title: "Category", field: "category", lookup: categoryLookup },
    { title: "Price", field: "price" },
    { title: "Date Created", field: "created_at", editable: "never" },
  ]);

  return (
    <>
      <div className="addProd-container">
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
            <AddProd />
          </div>
        </div>
      </div>

      <MaterialTable
        isLoading={productsLoading}
        icons={tableIcons}
        options={tablePageSizeoptions}
        title="Products"
        columns={columns}
        data={products}
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
    </>
  );
}

export default Products;
