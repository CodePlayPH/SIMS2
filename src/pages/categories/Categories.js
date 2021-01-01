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
  const { addCategories, updateCategory } = useContext(CategoryContext);
  const categoryLookup = {};

  const [category, setCategory] = useState(CategoryContext);

  const [columns, setColumns] = useState([
    { title: "ID", field: "id", editable: "never" },
    { title: "Category Name", field: "name" },
    { title: "Date Created", field: "created_at", editable: "never" },
  ]);

  return (
    <div className="container">
      
      {/* <div className="addCategories-container">
        <div class="row ">
        <div class="col"> */}
            {" "}
            {/* <AddProd /> */}
          {/* </div>
          <div class="col"> */}
            {" "}
            {/* <AddProd /> */}
          {/* </div> */}
          {/* <div class="col"> */}
            {" "}
            {/* <AddCategories /> */}
          {/* </div>
        </div>
      </div> */}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

      <MaterialTable
        isLoading={categoryLoading}
        icons={tableIcons}
        options={tablePageSizeoptions}
        title="Available Categories"
        columns={columns}
        data={categories}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
            
              let status = await addCategories({
                name: newData.name,
              });

              if (status != false) {
               
              } else {
                alert(status.error);
              }
              resolve();

            }),

          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              setTimeout(() => {
                // const dataUpdate = [...categories];
                // const index = oldData.tableData.id;
                // dataUpdate[index] = newData.name;
                // setColumns([...dataUpdate]);

                resolve();
            }, 1000);

            await updateCategory({
              category_name: newData.name
            })

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
