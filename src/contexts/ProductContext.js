import React, { createContext, useState } from 'react';
import { AddProducts, FetchProducts, UpdateProduct } from '../api/products';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const [products, setProducts] = useState([])
    const [productsLoading, setProductsLoading] = useState([])

    const fetchProducts = async () => {
        setProductsLoading(true)
        let data = await FetchProducts();
        setProductsLoading(false)
        if (data != null) {
            setProducts(data)
        }
    }

    const addProduct = async(data) => {
        let res = await AddProducts(data);
        if (res != null) {
            return true;
        } else {
            return false;
        }
    }

    
    const updateProduct = async (oldData, newData) => {
        setProductsLoading(true)
        let data = await UpdateProduct(newData);
        setProductsLoading(false)
        if (data != null) {
            var prevState = [...products];
            var index = prevState.indexOf(oldData)
            prevState[index] = newData
            setProducts(prevState)
        } else {
            console.log(data)
            alert("naay mali")
        }
    }




    return (
        <ProductContext.Provider value={{
            products, productsLoading, fetchProducts, addProduct, updateProduct
        }}>
            {props.children}

        </ProductContext.Provider>
    )
}


export default ProductContextProvider;