import React, { createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config'

export const AuhtContext = createContext(null);

const AuthProvider = ({ children }) => {

    const auth = getAuth(app);

    const createUser = (email , password) => {
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const logIn = (email , password) => {
        return signInWithEmailAndPassword(auth , email , password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        createUser,
        logIn,
        logOut
    }

    return (
        <AuhtContext.Provider value={authInfo}>
            {children}
        </AuhtContext.Provider>
    );
};

export default AuthProvider;