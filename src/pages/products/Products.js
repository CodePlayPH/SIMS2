import MaterialTable from 'material-table'
import React, { useContext, useEffect, useState } from 'react'

import { tableIcons, tablePageSizeoptions } from '../../utils/utils'

//contexts
import { CategoryContext } from '../../contexts/CategoryContext'
import { ProductContext } from '../../contexts/ProductContext'
import { SizeContext } from '../../contexts/SizeCotext'

function Products(props) {

    const { products, productsLoading } = useContext(ProductContext)
    const { sizes } = useContext(SizeContext)
    const { categories } = useContext(CategoryContext)

    const [product_name, setProduct_name] = useState("");
    const [product_price, setProduct_price] = useState("");
    const [size_id, setSize_id] = useState("");
    const [category_id, setCategory_id] = useState("");
    const {addProduct} = useContext(ProductContext);

    const sizeLookup = {}
    const categoryLookup = {}

    const handleAddNow = async (event) => {
        event.preventDefault();
        await addProduct({ product_name: columns.name, product_price: columns.price, size_id: columns.size, category_id: columns.category })
        
    }


    useEffect(() => {
        sizes.map(size => {
            sizeLookup[size.id] = size.name
        })

        categories.map(category => {
            categoryLookup[category.id] = category.name
        })

    }, [])


    const [columns, setColumns] = useState([
        { title: 'ID', field: 'id', editable: 'never' },
        { title: 'Product Name', field: 'name' },
        { title: 'Size', field: 'size', lookup: sizeLookup},
        { title: 'Category', field: 'category',lookup: categoryLookup },
        { title: 'Price', field: 'price' },
        { title: 'Date Created', field: 'created_at', editable: 'never' },
    ])

    return (
        <MaterialTable
            isLoading={productsLoading}
            icons={tableIcons}
            options={tablePageSizeoptions}
            title="Products"
            columns={columns}
            data={products}
            editable={{
                onRowAdd: newData =>
                    new Promise(async (resolve, reject) => {
                        console.log("New data: "+newData.name)
                        // handleAddNow.bind(this)
                        reject()
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        reject()
                        // handleAddNow.bind(this)
                    }),
                onRowDelete: (oldData) =>
                    new Promise(async (resolve, reject) => {
                        reject()
                    })
            }}
        />
    )
}

export default Products