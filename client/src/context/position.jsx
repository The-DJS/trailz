import React, { createContext, useContext } from 'react';

const PositionContext = createContext();

const PositionProvider = ({ children }) => (
  <PositionContext.Provider value={{}}>{children}</PositionContext.Provider>
);

const useGlobalContext = () => useContext(PositionContext);

export { PositionProvider, useGlobalContext };
