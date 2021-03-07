import React from 'react';
import CategoryContextProvider from './CategoryContext';

import AuthContextProvider from './AuthContext';
import DashboardContextProvider from './DashboardContext';
import ProductContextProvider from './ProductContext';
import SizeContextProvider from './SizeCotext';
import EntryContextProvider from './EntriesContext';


function Contexts(props) {
    return (
        <AuthContextProvider>
            <CategoryContextProvider>
                <SizeContextProvider>
                    <ProductContextProvider>
                        <DashboardContextProvider>
                            <EntryContextProvider>
                                {props.children}
                            </EntryContextProvider>
                        </DashboardContextProvider>
                    </ProductContextProvider>
                </SizeContextProvider>
            </CategoryContextProvider>
        </AuthContextProvider>
    )
}
    
export default Contexts
