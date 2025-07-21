import React from 'react';
import { formatRepXTierName } from '../utils/tierNameUtils';
import './CartierRepXTitle.css';

/**
 * Cartier-inspired RepX title component with elegant superscript styling
 * Transforms "RepX1 Professional Business Line" -> "RepX¹"
 */
const CartierRepXTitle = ({ 
  tierName, 
  className = '', 
  size = 'medium',
  variant = 'default',
  premium = false,
  animated = false,
  ...props 
}) => {
  const { repx, number } = formatRepXTierName(tierName);
  
  const classes = [
    'cartier-repx-title',
    `size-${size}`,
    variant !== 'default' ? `variant-${variant}` : '',
    premium ? 'premium' : '',
    animated ? 'animated' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span 
      className={classes}
      aria-label={`RepX ${number}`}
      {...props}
    >
      <span className="cartier-repx-base">
        {repx}
        <span 
          className="cartier-repx-superscript"
          aria-hidden="true"
        >
          {number}
        </span>
      </span>
    </span>
  );
};

export default CartierRepXTitle;