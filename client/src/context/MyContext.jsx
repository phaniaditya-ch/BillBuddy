// context/MyContext.js
import React, { createContext, useState } from 'react';

// Create the context
const MyContext = createContext();

// Create a provider component
const MyContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    theme: 'dark',
    loggedIn: false,
    history: []
  });

  // You can define functions or state that you want to share using this context

  return (
    <MyContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };