import { useState, createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const UserContext = createContext();

const initialState = {
  userData: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  loginStatus: false,
};
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setUser = (userdata) => {
    localStorage.setItem('user', JSON.stringify(userdata));
    return dispatch({
      type: 'SET_USER',
      payload: {
        userData: userdata,
        loginStatus: true,
      },
    });
  };
  const removeUser = () => {
    localStorage.removeItem('user');
    return dispatch({
      type: 'SET_USER',
      payload: {
        userData: {},
        loginStatus: false,
      },
    });
  };
  const setToken = (token) => {
    localStorage.setItem('token', token);
    return dispatch({
      type: 'SET_TOKEN',
      payload: {
        token: token,
      },
    });
  };
  const removeToken = () => {
    localStorage.removeItem('token');
    return dispatch({
      type: 'SET_TOKEN',
      payload: {
        token: null,
      },
    });
  };
  const isLoggedIn = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');
    if (token && user) {
      setUser(user);
      setToken(token);
    }
    return state.loginStatus;
    return true;
  };
  function adminRoles() {
    let user = JSON.parse(localStorage.getItem('user'));
    let role = user?.role;
    switch (role) {
      case 'admin':
        return 1;
        break;
      case 'subAdmin':
        return 2;
        break;
      case 'editor':
        return 3;
        break;
      case 'blogger':
        return 4;
        break;
      case 'viewer':
        return 5;
        break;
      default:
        return 5;
        break;
    }
  }

  // Api
  return (
    <UserContext.Provider
      value={{
        ...state,
        setUser,
        setToken,
        removeToken,
        removeUser,
        isLoggedIn,
        adminRoles,
      }}>
      {children}
    </UserContext.Provider>
  );
};

//Global custom hook
const useGlobalContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider, useGlobalContext };
