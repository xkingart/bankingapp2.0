import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "./api";
import { useSession } from "./Session";

export const DataContext = React.createContext({})

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {

  const [ person, setPerson ] = useState(null)
  const [ accounts, setAccounts ] = useState(null)
  const { user } = useSession()

  const reloadPerson = useCallback(async () => {
    try {
            const person = await API.client().getPerson()
            setPerson(person)
            return;
        } catch(e) {
            console.error(e)
        }
        setPerson(null)
    }, [])

    const reloadAccounts = useCallback(async () => {
        try {
            const accounts = await API.client().getAccounts()
            setAccounts(accounts)
            return;
        } catch(e) {
            console.error(e)
        }
        setAccounts(null)
    }, [])

    const patchAccount = useCallback(async (id, data) => {
        try {
            await API.client().patchAccount(id, data)
            reloadAccounts()  
        } catch(e) {
            console.error(e)
        }
    }, [reloadAccounts])

    const postAccount = useCallback(async (data) => {
        try {
            await API.client().postAccount(data)
            reloadAccounts()  
        } catch(e) {
            console.error(e)
        }
    }, [reloadAccounts])


    const Data = useMemo(() => ({ person, accounts, patchAccount, postAccount }), [person, accounts, patchAccount, postAccount])

    useEffect(() => { 
        reloadPerson()
        reloadAccounts()
    }, [reloadAccounts, reloadPerson])

    useEffect(() => {
        if (!user) {
            setAccounts(null)
            setPerson(null)
        } else {
            reloadAccounts()
            reloadPerson()
        }
    }, [user])

    return (
        <DataContext.Provider value={Data}>
        {children}
        </DataContext.Provider>
    )
}

export const ProtectedRoute = ({ children, redirect, inverse = false }) => {
  const { user } = useData();
  if (!user && !inverse) {
    return <Navigate to={redirect || "/"} />;
  }
  if (user && inverse && redirect) {
    return <Navigate to={redirect} />;
  }
  return children;
};