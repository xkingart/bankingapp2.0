import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "./api";

export const SessionContext = React.createContext({})

export const useSession = () => useContext(SessionContext)

export const SessionProvider = ({ children }) => {

  const [ user, setUser ] = useState(null)

  const reloadUser = useCallback(async () => {
    try {
      const usr = await API.client().getUser()
      setUser(usr)
      return;
    } catch(e) {
      console.error(e)
    }
    setUser(null)
  }, [])

  const login = useCallback(async (credentials) => {
    try {
      await API.client().login(credentials)
      reloadUser()  
    } catch(e) {
      console.error(e)
    }
  }, [reloadUser])

  const logout = useCallback(async () => {
    try {
      await API.client().logout()
      setUser(null)
      reloadUser()
    } catch(e) {
      console.error(e)
    }
  }, [reloadUser])

  const signup = useCallback(async (body) => {
    try {
      await API.client().signup(body)
    } catch(e) {
      console.error(e)
    }
  }, [])

  const session = useMemo(() => ({ user, login, logout, signup }), [user, login, logout, signup])

  useEffect(() => { reloadUser() }, [reloadUser])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export const ProtectedRoute = ({ children, redirect, inverse = false }) => {
  const { user } = useSession();
  if (!user && !inverse) {
    return <Navigate to={redirect || "/"} />;
  }
  if (user && inverse && redirect) {
    return <Navigate to={redirect} />;
  }
  return children;
};