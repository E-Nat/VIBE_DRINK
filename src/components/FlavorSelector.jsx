import React from 'react';
import { useFlavor } from '../context/FlavorContext';
import { productList } from '../data/products';
import { FlavorCard } from './FlavorCard';
import './FlavorSelector.css';

export const FlavorSelector = ({ layout = 'vertical' }) => {
  const { currentFlavorKey, setFlavor } = useFlavor();

  return (
    <div className={`flavor-selector-container layout-${layout}`}>
      <div className="flavor-selector-heading">
        <span className="flavor-selector-sub">COLLECTION</span>
        <span className="flavor-selector-title">Select Expression</span>
      </div>

      <div className="flavor-selector-grid">
        {productList.map((prod) => (
          <FlavorCard
            key={prod.id}
            product={prod}
            isActive={currentFlavorKey === prod.id}
            onSelect={() => setFlavor(prod.id)}
          />
        ))}
      </div>
    </div>
  );
};
