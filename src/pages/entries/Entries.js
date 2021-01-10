import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";

import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


import { tableIcons, tablePageSizeoptions } from "../../utils/utils";

//contexts
import { CategoryContext } from "../../contexts/CategoryContext";
import { ProductContext } from "../../contexts/ProductContext";
import { SizeContext } from "../../contexts/SizeCotext";

const useStyles = makeStyles((theme) => ({

    formlayout: {
        marginLeft: 200,
    },

    selectlabel: {
        marginBottom: theme.spacing(10),
    }, root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },

}));


function NewEntries() {

    const [Category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const [Product, setProduct] = React.useState('');

    const handleChangeProduct = (event) => {
        setProduct(event.target.value);
    };


    const { fetchCategories } = useContext(CategoryContext)
    const { fetchSizes } = useContext(SizeContext)
    const { fetchProducts } = useContext(ProductContext)

    useEffect(() => {
        Promise.all([fetchCategories(), fetchSizes()]).then((values) => {
            fetchProducts()
            console.log("akoa ning categorisss"+fetchCategories());
        });
    }, [])
 

    //table

    const { products, productsLoading } = useContext(ProductContext);
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

        await addProduct({ product_name, product_price, size_id, category_id });
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


    //table

    return (
        <div style={{ flex: 50 }}>
            <h1>Dashboard</h1>


            <div style={{ marginTop: 50, marginLeft: 50 }}>

                <div style={{ marginTop: 10, marginBottom: 30 }}>
                    <label>
                        Entry Number:
                            <input type="text" name="name" />
                    </label>
                </div>

                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label" className={useStyles.selectlabel}>Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={Category}
                        onChange={handleChange}
                        label="Category"
                    >
                        <MenuItem value="Frozen Goods1">Frozen Goods1</MenuItem>
                        <MenuItem value="Frozen Goods2">Frozen Goods2</MenuItem>
                        <MenuItem value="Frozen Goods3">Frozen Goods3</MenuItem>
                        <MenuItem value="Frozen Goods4">Frozen Goods4</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" style={{ marginLeft: 100 }}>
                    <InputLabel id="demo-simple-select-outlined-label" className={useStyles.selectlabel}>Product Name: </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={Product}
                        onChange={handleChangeProduct}
                        label="Product Name: "
                    >
                        <MenuItem value="Frozen Goods1">Frozen Goods1</MenuItem>
                        <MenuItem value="Frozen Goods2">Frozen Goods2</MenuItem>
                        <MenuItem value="Frozen Goods3">Frozen Goods3</MenuItem>
                        <MenuItem value="Frozen Goods4">Frozen Goods4</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" style={{ marginLeft: 100 }}>
                    <InputLabel id="demo-simple-select-outlined-label" className={useStyles.selectlabel}>Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={Category}
                        onChange={handleChange}
                        label="Category"
                    >
                        <MenuItem value="Frozen Goods1">Frozen Goods1</MenuItem>
                        <MenuItem value="Frozen Goods2">Frozen Goods2</MenuItem>
                        <MenuItem value="Frozen Goods3">Frozen Goods3</MenuItem>
                        <MenuItem value="Frozen Goods4">Frozen Goods4</MenuItem>
                    </Select>
                </FormControl>




            </div>

            <TextareaAutosize style={{ marginTop: 40, marginLeft: 50, width: '50%', }} aria-label="minimum height" rowsMin={6} placeholder="Minimum 3 rows" />

            <div style={{ marginTop: 50, marginLeft: 50, display: 'flex' }}>

                <Button style={{ margin: 10 }} variant="contained">Cancel</Button>

                <Button style={{ margin: 10 }} variant="contained" color="primary">
                    Add Item/s
                </Button>
            </div>


{/*Table*/}
            <MaterialTable
                isLoading={productsLoading}
                icons={tableIcons}
                options={tablePageSizeoptions}
                title="Products"
                columns={columns}
                data={products}

                editable={{
                    onRowAdd: (newData) =>

                        new Promise(async (resolve, reject) => {


                            console.log("New data: " + columns.name + "; " + columns.price);

                            // await addProduct({
                            //   product_name,
                            //   product_price,
                            //   size_id,
                            //   category_id,
                            // });
                            reject();
                        }),
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
    )
}

export default NewEntries
