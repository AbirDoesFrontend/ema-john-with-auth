import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import app from '../../firebase/firebase.config'

export const AuhtContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

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

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth , currentUser => {
        setUser(currentUser)
      })
    
      return () => {
        unsubscribe()
      }
    }, [])
    

    const authInfo = {
        user,
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