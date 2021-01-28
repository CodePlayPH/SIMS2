import React from 'react';
import CategoryContextProvider from './CategoryContext';

import AuthContextProvider from './AuthContext';
import DashboardContextProvider from './DashboardContext';
import ProductContextProvider from './ProductContext';
import SizeContextProvider from './SizeCotext';


function Contexts(props) {
    return (
        <AuthContextProvider>
            <CategoryContextProvider>
                <SizeContextProvider>
                    <ProductContextProvider>
                        <DashboardContextProvider>
                            {props.children}
                        </DashboardContextProvider>
                    </ProductContextProvider>
                </SizeContextProvider>
            </CategoryContextProvider>
        </AuthContextProvider>
    )
}

export default Contexts
