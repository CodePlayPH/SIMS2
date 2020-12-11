import React, { useContext, useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { tableIcons, tablePageSizeoptions } from '../../utils/utils';

import { CategoryContext } from '../../contexts/CategoryContext'
import { ProductContext } from '../../contexts/ProductContext'
import { SizeContext } from '../../contexts/SizeCotext'


function Products(props) {

    const { products, productsLoading } = useContext(ProductContext)
    const { sizes } = useContext(SizeContext)
    const { categories } = useContext(CategoryContext)

    const sizeLookup = {}
    const categoryLookup = {}

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
        { title: 'Product Names', field: 'name' },
        { title: 'Sizes', field: 'size', lookup: sizeLookup},
        { title: 'Categories', field: 'category',lookup: categoryLookup },
        { title: 'Prices', field: 'price' },
        { title: 'Created On', field: 'created_at', editable: 'never' },
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
                        console.log(newData)
                        reject()
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        reject()
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
