import React, { createContext, useState } from 'react';
// import { CategoryContext } from '../contexts/';
import { FetchCategories, AddCategory, UpdateCategory } from '../api/categories';

export const CategoryContext = createContext();

const CategoryCotextProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoadig] = useState(true);

    const fetchCategories = async () => {
        setCategoryLoadig(true)
        let data = await FetchCategories();
        setCategoryLoadig(false)
        if (data != null) {
            setCategories(data)
        }
    }


    const addCategories = async (newData) => {
        setCategoryLoadig(true)
        let data = await AddCategory(newData);
        setCategoryLoadig(false)
        if (data != null) {
            data.name = newData['name']
            console.log(data)
            setCategories([...categories, data])
        } else {
            alert('Something went wrong, make sure added category is not in dumplicated in your list.')
        }
    }


    const updateCategory = async (oldData, newData) => {
        setCategoryLoadig(true)
        let data = await UpdateCategory(newData);
        setCategoryLoadig(false)
        if (data != null) {
            var prevState = [...categories];
            var index = prevState.indexOf(oldData)
            prevState[index] = newData
            setCategories(prevState)
        } else {
            alert("An error occured during the action.");
        }
    }


    const addCategoryData = async (data) => {
        setCategories(data)
    }


    return(
        <CategoryContext.Provider value={{
            categories, fetchCategories, addCategories, updateCategory,
            categoryLoading
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}


export default CategoryCotextProvider