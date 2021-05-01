import React, { createContext, useState } from 'react';
import { AddSize, FetchSizes, UpdateSize } from '../api/sizes';

export const SizeContext = createContext();



function SizeContextProvider(props) {
    const [sizes, setSize] = useState([])
    const [sizeLoading, setSizeLoading] = useState(true)


    const fetchSizes = async () => {
        setSizeLoading(true)
        let data = await FetchSizes();
        setSizeLoading(false)
        if (data != null) {
            setSize(data)
        }
    }

    const addSizes = async (newData) => {
        setSizeLoading(true)
        let data = await AddSize(newData);
        setSizeLoading(false)
        if (data != null) {
            data.name = newData['name']
            console.log(data)
            setSize([...sizes, data])
            return {message:'Add Success!', severity:'success'}
        } else {
            return {message:'Add Failed!', severity:'error'}
        }
    }

    const updateSizes = async (oldData, newData) => {
        setSizeLoading(true)
        let data = await UpdateSize(newData);
        setSizeLoading(false)
        if (data != null) {
            var prevState = [...sizes];
            var index = prevState.indexOf(oldData)
            prevState[index] = newData
            console.log(prevState)
            setSize(prevState)
            return {message:'Update Success!', severity:'success'}
        } else {
            return {message:'Update Failed!', severity:'error'}
        }
    }



    return (
        <SizeContext.Provider value={{
            sizes, fetchSizes, addSizes,
            sizeLoading, updateSizes
        }}>
            {props.children}
        </SizeContext.Provider>
    )
}

export default SizeContextProvider
