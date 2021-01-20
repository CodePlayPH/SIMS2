import React, { createContext, useState } from 'react';
import { FetchCategories, AddCategory, UpdateCategory, DeleteCategory } from '../api/categories';

export const CategoryContext = createContext();

const CategoryCotextProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(true);

    const fetchCategories = async () => {
        setCategoryLoading(true)
        let data = await FetchCategories();
        setCategoryLoading(false)
        if (data != null) {
            setCategories(data)
        }
    }


    const addCategories = async (newData) => {
        setCategoryLoading(true)
        let data = await AddCategory(newData);
        setCategoryLoading(false)
        if (data != null) {
            data.name = newData['name']
            console.log(data)
            setCategories([...categories, data])
        } else {
            alert('Something went wrong, make sure added category is not in dumplicated in your list.')
        }
    }


    const updateCategory = async (oldData, newData) => {
        setCategoryLoading(true)
        let data = await UpdateCategory(newData);
        setCategoryLoading(false)
        if (data != null) {
            var prevState = [...categories];
            var index = prevState.indexOf(oldData)
            prevState[index] = newData
            setCategories(prevState)
        } else {
            alert("An error occured during the action.");
        }
    }

    const deleteCategory = async(data) => {
        setCategoryLoading(true)
        let itemData = await DeleteCategory(data)
        setCategoryLoading(false)
        if (itemData != null) {
            itemData = data['id'] 
        } else {
            alert("An error occured during the action.");
        }
    }


    const addCategoryData = async (data) => {
        setCategories(data)
    }


    return(
        <CategoryContext.Provider value={{
            categories, fetchCategories, addCategories, updateCategory, deleteCategory,
            categoryLoading
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}


export default CategoryCotextProvider