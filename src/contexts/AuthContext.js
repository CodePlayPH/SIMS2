import React, { createContext, useState } from 'react';
import { UserLogin, UserRegister } from '../api/auth';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user,setUser] = useState([])

    
    const loginUser = async(data) => {
        let res = await UserLogin(data);

        // return ani niya is TRUE kung !null or ...
        // ... walay error na detect from UserLogin sa auth.js
        if (res != null) {
            setUser(res)
            localStorage.setItem('userData', JSON.stringify(res));

            return true;
        }
        // return FALSE if null or naay error sa UserLogin sa ...
        // ... auth.js
        else {
            return false;
        }
    }
    

    const registerUser = async(data) => {
        let res = await UserRegister(data);

        // return TRUE if res from UserRegister's data sa auth.js ...
        // ... kay !null
        if (res != null) {
            return true;
        } else {
            console.log(data)
            return false;
        }
    }

    const setUserData = async(data) => {
        setUser(data)

        return user;
    }

    return (
        <AuthContext.Provider value={{
            // mga data na pwede ma access sa mga iwrap ...
            // ... ani na AuthContextProvider.
            user, setUserData, loginUser, registerUser
        }}>

            {/* magrepresent sa mga naka wrap via props */}
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;