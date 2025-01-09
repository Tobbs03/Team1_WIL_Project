import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  adminToken: null,
  userToken: null,
  adminAuthenticate: () => {},
  adminLogout: () => {},
  userAuthenticate: () => {},
  userLogout: () => {},
});

function AuthContextProvider({ children }) {
  const [adminAuthToken, setAdminAuthToken] = useState(null);
  const [userAuthToken, setUserAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUpdatedProfile, setUpdatedProfile] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const login = () => {
    //  login logic here
    setIsLoggedIn(true);
  };

  const logout = () => {
    //  logout logic here
    setIsLoggedIn(false);
  };

  useEffect(() => {
    (adminAuthToken === null || userAuthToken === null) && getOldToken();
  }, [adminAuthToken, userAuthToken]);

  const getOldToken = async () => {
    let adminOldToken = localStorage.getItem("adminToken");
    if (adminOldToken && !adminAuthToken) {
      setAdminAuthToken(adminOldToken);
    }

    let userOldToken = localStorage.getItem("userToken");
    if (userOldToken && !userAuthToken) {
      setUserAuthToken(userOldToken);
      setIsLoggedIn(true);
    }
  };

  async function adminAuthenticate(token) {
    localStorage.setItem("adminToken", JSON.stringify(token));
    setAdminAuthToken(JSON.stringify(token));
  }

  async function userAuthenticate(token) {
    localStorage.setItem("userToken", JSON.stringify(token));
    setUserAuthToken(JSON.stringify(token));
  }

  async function userProfileUpdate() {
    setUpdatedProfile(!isUpdatedProfile);
  }

  async function headerSetter(val) {
    setShowHeader(val);
  }

  async function adminLogout() {
    localStorage.removeItem("adminToken");
    setAdminAuthToken(null);
  }

  async function userLogout() {
    localStorage.removeItem("userToken");
    setUserAuthToken(null);
  }

  const value = {
    adminToken: adminAuthToken,
    userToken: userAuthToken,
    adminAuthenticate: adminAuthenticate,
    adminLogout: adminLogout,
    userAuthenticate: userAuthenticate,
    isUpdatedProfile: isUpdatedProfile,
    userProfileUpdate: userProfileUpdate,
    showHeader: showHeader,
    setShowHeader: setShowHeader,
    headerSetter: headerSetter,
    userLogout: userLogout,
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
  };
   
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
