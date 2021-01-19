import React, { useState, useEffect, useContext } from "react";

import { CategoryContext } from "../../contexts/CategoryContext";
import { SizeContext } from "../../contexts/SizeCotext";
import { makeStyles } from "@material-ui/core/styles";
import { ProductContext } from "../../contexts/ProductContext";
import MaterialTable from "material-table";
import { tableIcons, tablePageSizeoptions } from "../../utils/utils";

function Categories() {
  const classes = useStyles();
  const { sizes } = useContext(SizeContext);
  const { categories, categoryLoading } = useContext(CategoryContext);
  const { addCategories, updateCategory, deleteCategory } = useContext(CategoryContext);
  const categoryLookup = {};

  const [category, setCategory] = useState(CategoryContext);

  const [columns, setColumns] = useState([
    { title: "ID", field: "id", editable: "never" },
    { title: "Category Name", field: "name" },
    { title: "Date Created", field: "created_at", editable: "never" },
  ]);

  return (
    <div className="container">
      <MaterialTable
        isLoading={categoryLoading}
        icons={tableIcons}
        options={tablePageSizeoptions}
        title="Categories to Choose from"
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
              await updateCategory({
                category_id: oldData.id,
                category_name: oldData.name
              }, 
              {
                category_id: newData.id,
                category_name: newData.name
              })
              resolve();
            }),

          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...categories];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setCategory([...dataDelete]);

                resolve();
            }, 1000);

              await deleteCategory({
                category_id: oldData.id
              })
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
