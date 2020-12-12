import React, { createContext, useState } from 'react';
import { AddProducts, FetchProducts } from '../api/products';

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
        // setProductsLoading(true)
        let res = await AddProducts(data);
        // setProductsLoading(false)
        if (res != null) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <ProductContext.Provider value={{
            products, productsLoading, fetchProducts, addProduct
        }}>
            {props.children}

        </ProductContext.Provider>
    )
}


export default ProductContextProvider;