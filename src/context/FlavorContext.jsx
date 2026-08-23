import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';
import { soundEngine } from '../utils/audio';

const FlavorContext = createContext(null);

export const FlavorProvider = ({ children }) => {
  const [currentFlavorKey, setCurrentFlavorKey] = useState('blackTea');
  const [isSwitching, setIsSwitching] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCinematicLens, setIsCinematicLens] = useState(false);
  const [engravingText, setEngravingText] = useState('VIBE NOCTURNE');
  const [cartItems, setCartItems] = useState([
    {
      id: 'blackTea',
      name: 'VIBE Black Tea',
      flavor: 'BLACK TEA',
      price: 145,
      qty: 1,
      image: '/vibe-black-tea.png',
      engraving: 'VIBE NOCTURNE',
      giftBox: true,
    },
  ]);

  const currentProduct = products[currentFlavorKey] || products.blackTea;

  const setFlavor = (flavorKey) => {
    if (flavorKey === currentFlavorKey || isSwitching) return;
    if (!products[flavorKey]) return;

    setIsSwitching(true);
    setCurrentFlavorKey(flavorKey);

    // Audio triggers
    if (isAudioActive) {
      soundEngine.playWhoosh(flavorKey === 'blackTea' ? 'down' : 'up');
      soundEngine.playChime(flavorKey === 'blackTea' ? 440 : 659.25, 'sine', 1.4);
      soundEngine.updateAmbientFlavor(flavorKey);
    }

    setTimeout(() => {
      setIsSwitching(false);
    }, 900);
  };

  const toggleFlavor = () => {
    const nextKey = currentFlavorKey === 'blackTea' ? 'exoticLychee' : 'blackTea';
    setFlavor(nextKey);
  };

  const toggleAudio = () => {
    const nextState = !isAudioActive;
    setIsAudioActive(nextState);
    soundEngine.setMuted(!nextState);
    if (nextState) {
      soundEngine.updateAmbientFlavor(currentFlavorKey);
    }
  };

  const toggleCinematicLens = () => {
    setIsCinematicLens((prev) => !prev);
  };

  const addToCart = (productKey, customEngraving = '', giftBox = true) => {
    const prod = products[productKey] || currentProduct;
    soundEngine.playChime(880, 'sine', 0.8);
    soundEngine.playClick(1000);

    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.id === prod.id && i.engraving === (customEngraving || engravingText)
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: prod.id,
          name: prod.name,
          flavor: prod.flavor,
          price: 145,
          qty: 1,
          image: prod.image,
          engraving: customEngraving || engravingText,
          giftBox: giftBox,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    soundEngine.playClick(600);
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.qty + delta;
            return nextQty > 0 ? { ...item, qty: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeCartItem = (id) => {
    soundEngine.playClick(400);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
        isAudioActive,
        toggleAudio,
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addToCart,
        updateCartQty,
        removeCartItem,
        isCinematicLens,
        toggleCinematicLens,
        engravingText,
        setEngravingText,
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
