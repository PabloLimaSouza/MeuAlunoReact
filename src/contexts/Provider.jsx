import React from 'react';
import Context from './StoreContext';
import useStorage from '../utils/useStorage'

const StoreProvider = ({ children }) => {
  const [token, setToken] = useStorage('token');
  const [userLogged, setUserLogged] = useStorage('userLogged');

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        userLogged,
        setUserLogged,
      }}
    >
      {children}
    </Context.Provider>
  )
}


export default StoreProvider;