import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const FlavorContext = createContext(null);

export const FlavorProvider = ({ children }) => {
  const [currentFlavorKey, setCurrentFlavorKey] = useState('blackTea');
  const [isSwitching, setIsSwitching] = useState(false);

  const currentProduct = products[currentFlavorKey] || products.blackTea;

  const setFlavor = (flavorKey) => {
    if (flavorKey === currentFlavorKey || isSwitching) return;
    if (!products[flavorKey]) return;

    setIsSwitching(true);
    setCurrentFlavorKey(flavorKey);

    // Coordinate switch window
    setTimeout(() => {
      setIsSwitching(false);
    }, 900);
  };

  const toggleFlavor = () => {
    const nextKey = currentFlavorKey === 'blackTea' ? 'exoticLychee' : 'blackTea';
    setFlavor(nextKey);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-flavor', currentFlavorKey);
    document.body.setAttribute('data-flavor', currentFlavorKey);
  }, [currentFlavorKey]);

  return (
    <FlavorContext.Provider
      value={{
        currentFlavorKey,
        currentProduct,
        setFlavor,
        toggleFlavor,
        isSwitching,
      }}
    >
      {children}
    </FlavorContext.Provider>
  );
};

export const useFlavor = () => {
  const context = useContext(FlavorContext);
  if (!context) {
    throw new Error('useFlavor must be used within a FlavorProvider');
  }
  return context;
};
