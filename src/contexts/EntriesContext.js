import React, { createContext, useEffect, useState } from 'react';
import { AddEntries } from '../api/entries';

export const EntryContext = createContext();

const EntryContextProvider = (props) => {
    const [localEntries, setLocalEntries] = useState([])
    const [entriesLoading, setEntriesLoading] = useState(false)

    useEffect(() => {
        // localStorage.setItem('localEntries', JSON.stringify(localEntries));

    }, [localEntries])

    const getLocalEntries = async () => {
        var localEntry = JSON.parse(localStorage.getItem('localEntries'));
        console.log(localEntry)
        if (localEntry != null) {
            setLocalEntries(localEntry)
        }
    }

    const addEntries = async (data) => {
        setEntriesLoading(true)
        let res = await AddEntries(data)
        setEntriesLoading(false)
        localStorage.removeItem('localEntries')
        setLocalEntries([])
    }

    const saveLocalEntry = async (data) => {

        let index = localEntries.findIndex(localEntry => localEntry.id === data['id']);
        console.log(index);
        if (index != -1) {
            var localEntriesHolder = localEntries.map(item =>
                item.id === data.id
                    ? { ...item, qty: parseInt(item.qty) + parseInt(data.qty) }
                    : item
            )
            setLocalEntries(localEntriesHolder)
            localStorage.setItem('localEntries', JSON.stringify(localEntriesHolder));

        } else {
            var localEntriesHolder = [...localEntries, data]
            setLocalEntries(localEntriesHolder)
            localStorage.setItem('localEntries', JSON.stringify(localEntriesHolder));


        }



        // localStorage.setItem('userData', JSON.stringify(data));

    }

    const removeLocalEntry = async (data) => {
        var localEntriesHolder = localEntries.filter(entry => entry.id !== data['id'])
        setLocalEntries(localEntriesHolder)
        console.log('deleted');
        if (localEntries.length == 0) {
            localStorage.removeItem('localEntries')
        } {
            localStorage.setItem('localEntries', JSON.stringify(localEntriesHolder));

        }
    }

    const getSavedEntries = async () => {

    }


    return (
        <EntryContext.Provider value={{
            localEntries, saveLocalEntry, removeLocalEntry, getLocalEntries, addEntries, entriesLoading
        }}>
            {props.children}

        </EntryContext.Provider>
    )
}


export default EntryContextProvider;