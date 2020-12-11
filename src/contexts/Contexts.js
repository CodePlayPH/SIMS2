import React from 'react';
import CategoryContextProvider from './CategoryContext';

import AuthContextProvider from './AuthContext';

import ProductContextProvider from './ProductContext';
import SizeContextProvider from './SizeCotext';


function Contexts(props) {
    return (
        <AuthContextProvider>
            <CategoryContextProvider>
                <SizeContextProvider>
                    <ProductContextProvider>
                        {props.children}
                    </ProductContextProvider>
                </SizeContextProvider>
            </CategoryContextProvider>
        </AuthContextProvider>
    )
}

export default Contexts
