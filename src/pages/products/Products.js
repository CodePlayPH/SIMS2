import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";


import { tableIcons, tablePageSizeoptions } from "../../utils/utils";

//contexts
import { CategoryContext } from "../../contexts/CategoryContext";
import { ProductContext } from "../../contexts/ProductContext";
import { SizeContext } from "../../contexts/SizeCotext";
import Categories from "../categories/Categories";

function Products(props) {
  const { products, productsLoading } = useContext(ProductContext);
  const { sizes } = useContext(SizeContext);
  const { categories } = useContext(CategoryContext);

  const { addProduct } = useContext(ProductContext);
  const [product_name, setProduct_name] = useState("");
  const [product_price, setProduct_price] = useState("");
  const [product_size, setProduct_size] = useState("");
  const [category_id, setCategory_id] = useState("");

  const sizeLookup = {};
  const categoryLookup = {};

  const handleAddNow = async (event) => {
    await addProduct({
      product_name: product_name,
      product_price: product_price,
      product_size: product_size,
      category_id: category_id,
    });
    // if (response) {
    //   alert("Success")
    // }else {
    //   alert("Error")
    // }
    console.log(
      "Gikan sa Product.js gikuha ang mga data: " +
        product_name +
        " " +
        product_price +
        " " +
        product_size +
        " " +
        category_id
    );
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

  return (
    <>
      <div>
        <Categories />
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
          //     setProduct_name(newData.name);
          //     setProduct_price(newData.price);
          //     setProduct_size(newData.size);
          //     setCategory_id(newData.category);

          //     handleAddNow();
          //     reject();
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
