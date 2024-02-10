import React, { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAuth, updateToken, updateUser } from "../reducers/userReducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userselect = useSelector((s) => s.user);

  const user = userselect.user;
  const token = userselect.token;

  const login = (userData) => {
    dispatch(updateUser(userData.user));
    dispatch(updateToken(userData.token));
    dispatch(updateAuth(isAuthenticated));
  };

  const logout = () => {
    dispatch(updateUser({}));
    dispatch(updateToken({ value: "" }));
    dispatch(updateAuth());
  };

  const isAuthenticated = !!token;

  const value = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
