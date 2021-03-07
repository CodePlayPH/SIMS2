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
import { EntryContext } from "../../contexts/EntriesContext";
import { Autocomplete } from "@material-ui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { AuthContext } from "../../contexts/AuthContext";


function NewEntries() {
  const classes = useStyles();
  const { user } = useContext(AuthContext)
  const { products, productsLoading } = useContext(ProductContext)
  const { localEntries, saveLocalEntry, removeLocalEntry, getLocalEntries, addEntries, entriesLoading } = useContext(EntryContext)

  const [qtyDialogOpen, setQtyDialogOpen] = React.useState(false);
  const [qty, setQty] = React.useState()
  const [Category, setCategory] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState([])
  const [productsData, setProductsData] = React.useState([])
  const [columns, setColumns] = React.useState([]);
  const [autoCompleteValue, setAutoCompleteValue] = React.useState()
  const [autoCompleteKey, setAutoCompleteKey] = React.useState(Date.now())

  useEffect(() => {
    const productsDataHolder = []
    products.map((data, index) => {
      // console.log(data);
      productsDataHolder.push({
        id: data['id'],
        name: data['name'],
        size: data['Size_name'],
        category: data['Category_name'],
        size_id: data['size'],
        category_id: data['category']
      });

    });
    setProductsData(productsDataHolder);

    setColumns([
      { title: "Product Name", field: "name", },
      { title: "Category", field: "category", },
      { title: "Size", field: 'size', },
      { title: "Quantity", field: "qty" }
      // { title: "Date Created", field: "created_at", editable: "never" },
    ]);

    console.log('test')
    getLocalEntries()

  }, [products])

  const handleAddEntry = () => {
    const productData = productsData[selectedIndex]
    productData['qty'] = qty
    saveLocalEntry(productData)
    closeDialog()
  }

  const handleQtyChange = (e) => {
    // const re = /^[0-9\b]+$/;
    // if (e.target.value === '' || re.test(e.target.value)) {
    // }
    console.log(e.target.value);
    if (e.target.value == "-") {
      setQty(parseInt(qty));
    } else {
      setQty(Math.abs(e.target.value));

    }
  }

  const closeDialog = () => {
    setAutoCompleteValue('')
    setAutoCompleteKey(Date.now())
    setQtyDialogOpen(false)
    setQty()

  }

  const submitEntries = async () => {
    const entriesData = [];
    const user = JSON.parse(localStorage.getItem("userData"));
    localEntries.map((val) => {
      var obj = {}
      obj = val
      obj.product_id = val.id
      obj.user_id = user.id
      entriesData.push(obj)
    })
    await addEntries(entriesData)
  }





  //table

  return (
    <div className="container-fluid entry-main-container">
      <div className="row entry-title-row">
        <h1>Entries</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Autocomplete
          key={autoCompleteKey}
          options={productsData}
          getOptionLabel={(option) => `${option.id} ${option.name} (${option.category}, ${option.size})`}
          style={{ width: 300 }}
          autoHighlight
          clearOnBlur
          value={autoCompleteValue}
          inputValue={autoCompleteValue}
          margin="normal"
          className={classes.entrySelection}
          onClose={console.log('test')}
          onChange={(event, newValue) => {
            if (newValue != null) {
              setQtyDialogOpen(true)
              // console.log(qtyDialogOpen)
              let index = productsData.findIndex(productData => productData.id === newValue.id);
              setAutoCompleteValue(`${newValue.id} ${newValue.name} (${newValue.category}, ${newValue.size})`)
              setSelectedIndex(index)
            }
          }}
          renderInput={(params) => <TextField
            {...params}
            label="Select Product"
            variant="outlined"
            onChange={(event) => {
              setAutoCompleteValue(event.target.value)
            }}
          />}
        />

        <Button variant="contained" color="primary" size="large" disabled={localEntries.length == 0} onClick={() => submitEntries()}>
          Submit Entries
        </Button>
      </div>


      {/*Table*/}
      <MaterialTable
        // isLoading={productsLoading}\
        isLoading={entriesLoading}
        icons={tableIcons}
        options={tablePageSizeoptions}
        title="Products"
        columns={columns}
        data={localEntries}
        editable={{
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              removeLocalEntry(oldData)
              resolve()
            })
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

      <Dialog open={qtyDialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Quantity</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
                        Enter Quantity.
                    </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            min="0"
            type="number"
            value={qty}
            onChange={handleQtyChange}
            label="Quantity"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
                    </Button>
          <Button onClick={handleAddEntry} color="primary" disabled={qty ? false : true}>
            Add
                    </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



const useStyles = makeStyles((theme) => ({
  entrySelection: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default NewEntries;
