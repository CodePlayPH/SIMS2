import React, { useContext, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ProductContext } from '../../context/ProductsContext';
import MaterialTable from 'material-table';
import { tableIcons, tablePageSizeoptions } from '../../utils/utils';
import { EntryContext } from '../../context/Entries';

function NewEntry() {
    const { products, productsLoading } = useContext(ProductContext)
    const { localEntries, saveLocalEntry, removeLocalEntry, getLocalEntries } = useContext(EntryContext)

    const [qtyDialogOpen, setQtyDialogOpen] = React.useState(false);
    const [qty, setQty] = React.useState()
    const [autoCompleteValue, setAutoCompleteValue] = React.useState('')
    const [autoCompleteKey, setAutoCompleteKey] = React.useState(Date.now())

    const [selectedIndex, setSelectedIndex] = React.useState([])

    const [productsData, setProductsData] = React.useState([])

    const [columns, setColumns] = React.useState([])

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
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setQty(parseInt(e.target.value))
        }
    }

    const closeDialog = () => {
        setAutoCompleteValue('')
        setAutoCompleteKey(Date.now())
        setQtyDialogOpen(false)
        setQty()

    }

    const classes = useStyles();
    return (
        <div>
            <div style={{display:'flex',alignItems:'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Autocomplete
                    key={autoCompleteKey}
                    options={productsData}
                    getOptionLabel={(option) => `${option.id} ${option.name} (${option.category}, ${option.size})`}
                    style={{ width: 300 }}
                    autoHighlight
                    clearOnBlur
                    // value={autoCompleteValue}
                    inputValue={autoCompleteValue}
                    margin="normal"
                    className={classes.entrySelection}
                    onChange={(event, newValue) => {
                        if (newValue != null) {
                            setQtyDialogOpen(true)
                            console.log(qtyDialogOpen)
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

                <Button variant="contained" color="primary"  size="large" disabled={localEntries.length == 0}>
                    Submit Entries
                </Button>
            </div>

            <MaterialTable
                // isLoading={productsLoading}
                icons={tableIcons}
                options={tablePageSizeoptions}
                title="Entries"
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


            {/* Input Quantity Dialog */}
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
                        value={qty}
                        onChange={handleQtyChange}
                        type="tel"
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
    )
}

const useStyles = makeStyles((theme) => ({
    entrySelection: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default NewEntry

// import MaterialTable from "material-table";
// import React, { useContext, useEffect, useState } from "react";
 
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";

// import { tableIcons, tablePageSizeoptions } from "../../utils/utils";
// import "./styles.scss";

// import moment from 'moment';

// //contexts
// import { CategoryContext } from "../../contexts/CategoryContext";
// import { ProductContext } from "../../contexts/ProductContext";
// import { SizeContext } from "../../contexts/SizeCotext";

// var CurrentDate = moment();
// var myDate = new Date(CurrentDate);
 


// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: "100%",
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// function NewEntries() {
//   const classes = useStyles();
//   const [Category, setCategory] = React.useState("");

//   const handleChangeCategory = (event) => {
//     setCategory(event.target.value);
//   };

//   const [Product, setProduct] = React.useState("");

//   const handleChangeProduct = (event) => {
//     setProduct(event.target.value);
//   };


//   const [Size, setSize] = React.useState("");

//   const handleChangeSize = (event) => {
//     setSize(event.target.value);
//   };
//   const { fetchCategories } = useContext(CategoryContext);
//   const { fetchSizes } = useContext(SizeContext);
 
//   const { sizes } = useContext(SizeContext);
//   const { categories } = useContext(CategoryContext);

//   const [product_name, setProduct_name] = useState("");
//   const [product_price, setProduct_price] = useState("");
//   const [size_id, setSize_id] = useState("");
//   const [category_id, setCategory_id] = useState("");
//   const { addProduct } = useContext(ProductContext);

//   const sizeLookup = {};
//   const categoryLookup = {};
//   const productnameLookup = {};

//   const handleAddNow = async (event) => {
//     event.preventDefault();
//     setProduct_name(columns.name);
//     setProduct_price(columns.price);
//     setSize_id(columns.size);
//     setCategory_id(columns.category);

//     // await addProduct({ product_name, product_price, size_id, category_id });
//   };

//   useEffect(() => {
//     sizes.map((size) => {
//       sizeLookup[size.id] = size.name;
//     });

//     categories.map((category) => {
//       categoryLookup[category.id] = category.name;
//     });
//   }, []);

//   const [columns, setColumns] = useState([
//     // { title: "ID", field: "id", editable: "never" },
//     { title: "Product Name", field: "name", lookup: sizeLookup},
//     // { title: "Size", field: "size", lookup: sizeLookup },
//     { title: "Category", field: "category", lookup: categoryLookup },
//     { title: "Price", field: "price" },
//     { title: "Date Created", field: "created_at", editable: "never" },
//   ]);


//   const [mydata, setData] = useState([

//   ]);

//   const handleSave = () => {

//   //   data: {
//   //     data: mydata
//   // }

//     // mydata.map(function(item, i){

//     //   let status = await addProduct({
//     //     product_id: item.product_id,
//     //     size_id: item.size_id,
//     //     category_id: item.category_id,
//     //     user_id: item.user_id,
//     //     qty: item.qty
//     //   });

//       // console.log(item.name);
//     // })

//   };



//   //table

//   return (
//     <div className="container-fluid entry-main-container">
//       <div className="row entry-title-row">
//         <h1>Entries</h1>
//       </div>



//       {/*Table*/}
//       <MaterialTable
//         // isLoading={productsLoading}
//         icons={tableIcons}
//         options={tablePageSizeoptions}
//         title="Products"
//         columns={columns}
//         data={mydata}
//         editable={{
//           onRowAdd: (newData) =>
//             new Promise(async (resolve, reject) => {
//               console.log("New data: " + newData.name + "; " + newData.price);
//               setTimeout(() => {
//                 setData([...mydata,
//                   {
//                     id: "123",
//                     name: newData.name,
//                     price: newData.price,
//                     created_at: moment(myDate).format("MMMM DD YYYY, HH:mm:ss"),
//                   }
//                 ])
//                 console.log();
//                 resolve();
//               }, 1000)

//             }),
//           onRowUpdate: (newData, oldData) =>
//             new Promise(async (resolve, reject) => {
//               reject();
//             }),
//           onRowDelete: (oldData) =>
//             new Promise(async (resolve, reject) => {
//               reject();
//             }),
//         }}
//       />

//       <div className="container btns-container">
//         <div className="col-sm">
//           <Button variant="contained" className="btn">
//             Cancel
//           </Button>
//           <Button variant="contained" color="primary" className="btn"  onClick={handleSave}>
//             Add Item/s
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewEntries;
