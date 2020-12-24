import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";


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

  const sizeLookup = {};
  const categoryLookup = {};

      useEffect(() => {
        sizes.map(size => {
            sizeLookup[size.id] = size.name
        })

        categories.map(category => {
            categoryLookup[category.id] = category.name
        })

    }, [])

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
      <div className="container">
        <div class="row ">
          <div class="col-md-auto">
            {" "}
            <AddProd />
          </div>
          <div class="col-md-auto">
            {" "}
            <Categories />
          </div>
          <div class="col-md-auto">
            {" "}
            <Categories />
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
