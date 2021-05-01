import React, { useState, useEffect, useContext } from "react";
import { SizeContext } from "../../contexts/SizeCotext";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { tableIcons, tablePageSizeoptions } from "../../utils/utils";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import './Sizes.scss';


function Sizes() {
  const classes = useStyles();
  const { sizes, sizeLoading, addSizes, updateSizes } = useContext(SizeContext);
  //   const [size, setsize] = useState(SizeContext);

  const [snackBar, setSnackBar] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [columns, setColumns] = useState([
    { title: "ID", field: "id", editable: "never" },
    { title: "Size ", field: "name" },
    { title: "Date Created", field: "created_at", editable: "never" },
  ]);


  const handleSnackbarOpen = () => {

  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(prevState => ({ ...prevState, open: false }))

  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className="size-container">
      <MaterialTable
        isLoading={sizeLoading}
        icons={tableIcons}
        options={tablePageSizeoptions}
        title="Categories to Choose from"
        columns={columns}
        data={sizes}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              let status = await addSizes({
                name: newData.name,
              });
              setSnackBar({
                open: true,
                message: status.message,
                severity: status.severity
              })
              resolve();
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              let status = await updateSizes(oldData, newData);
              setSnackBar({
                open: true,
                message: status.message,
                severity: status.severity
              })
              resolve();
            }),
        }}
      />

      <Snackbar
        className="snackBar"
        open={snackBar.open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackBar.severity}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({}));

export default Sizes;
