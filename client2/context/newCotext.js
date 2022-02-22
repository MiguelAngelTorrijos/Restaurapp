import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  const storeToken = (token) => {
    setToken(token);
  };

  const storeUser = (user) => {
    setUser(user);
  };

  const storeRestaurant = (restaurant) => {
    setRestaurant(restaurant);
  };

  const storeFav = (favourites) => {
    setUser((user.favourites = favourites));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        storeToken,
        user,
        storeUser,
        logout,
        storeFav,
        restaurant,
        storeRestaurant,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
