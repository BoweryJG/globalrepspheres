/**
 * Unified Pricing Modal with Rep^x Tiers
 * 
 * This component displays Rep^x tier information while maintaining 
 * compatibility with the existing backend pricing system.
 */

import React from 'react';
import {
  CANVAS_REPX_LIMITS,
  formatRepxTierName,
  type RepxTier
} from '../services/subscriptionService';
import { UNIFIED_PRICING_TIERS } from '../../unified-pricing-config';

interface UnifiedPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlightTier?: RepxTier;
  currentTier?: RepxTier;
}

const repxTierOrder: RepxTier[] = ['repx1', 'repx2', 'repx3', 'repx4', 'repx5'];

// Map Rep^x tiers to backend pricing tiers
const repxToPricingTier = {
  repx1: null, // Free tier
  repx2: 'explorer',
  repx3: 'professional', 
  repx4: 'growth',
  repx5: 'enterprise'
} as const;

export function UnifiedPricingModal({ 
  isOpen, 
  onClose, 
  highlightTier,
  currentTier 
}: UnifiedPricingModalProps) {
  if (!isOpen) return null;

  const handleUpgrade = (repxTier: RepxTier) => {
    const pricingTier = repxToPricingTier[repxTier];
    if (pricingTier) {
      // Redirect to pricing section with tier highlighted
      window.location.href = `/#pricing?tier=${pricingTier}`;
    }
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '1200px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        border: '1px solid rgba(0, 255, 198, 0.2)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            color: '#00ffc6',
            fontSize: '2rem',
            fontWeight: 'bold',
            margin: 0,
            fontFamily: "'Space Grotesk', Arial, sans-serif"
          }}>
            Rep^x Canvas Tiers
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ccc',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* Tier Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {repxTierOrder.map((repxTier) => {
            const canvasFeatures = CANVAS_REPX_LIMITS[repxTier];
            const pricingTier = repxToPricingTier[repxTier];
            const pricingData = pricingTier ? UNIFIED_PRICING_TIERS[pricingTier] : null;
            const isHighlighted = highlightTier === repxTier;
            const isCurrent = currentTier === repxTier;
            
            return (
              <div
                key={repxTier}
                style={{
                  border: `2px solid ${
                    isHighlighted ? '#00ffc6' : 
                    isCurrent ? '#ffc107' :
                    canvasFeatures.canvasAccess ? 'rgba(0, 255, 198, 0.3)' : 'rgba(255, 0, 110, 0.3)'
                  }`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  backgroundColor: `${
                    isHighlighted ? 'rgba(0, 255, 198, 0.1)' :
                    isCurrent ? 'rgba(255, 193, 7, 0.1)' :
                    canvasFeatures.canvasAccess ? 'rgba(0, 255, 198, 0.05)' : 'rgba(255, 0, 110, 0.05)'
                  }`,
                  position: 'relative'
                }}
              >
                {isCurrent && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#ffc107',
                    color: '#0a0a0a',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    CURRENT
                  </div>
                )}

                {/* Tier Name */}
                <h3 style={{
                  color: canvasFeatures.canvasAccess ? '#00ffc6' : '#ff006e',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  margin: '0 0 0.5rem 0',
                  textAlign: 'center'
                }}>
                  {formatRepxTierName(repxTier)}
                </h3>

                {/* Price */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: '1rem'
                }}>
                  {pricingData ? (
                    <>
                      <div style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 'bold' }}>
                        ${pricingData.price.monthly}
                      </div>
                      <div style={{ color: '#888', fontSize: '0.9rem' }}>
                        per month
                      </div>
                    </>
                  ) : (
                    <div style={{ color: '#888', fontSize: '1.2rem' }}>
                      Free
                    </div>
                  )}
                </div>

                {/* Canvas Features */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '1rem'
                }}>
                  <h4 style={{
                    color: '#ccc',
                    fontSize: '0.9rem',
                    margin: '0 0 0.75rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Canvas Features
                  </h4>
                  
                  <div style={{ color: '#888', fontSize: '0.85rem', lineHeight: '1.4' }}>
                    {!canvasFeatures.canvasAccess ? (
                      <div style={{ color: '#ff006e' }}>❌ No Canvas Access</div>
                    ) : (
                      <>
                        <div style={{ color: '#00ffc6', marginBottom: '0.5rem' }}>
                          ✅ Canvas Access
                        </div>
                        <div>
                          📊 Scans: {canvasFeatures.scansPerDay === -1 ? 'Unlimited' : `${canvasFeatures.scansPerDay}/day`}
                        </div>
                        <div>
                          🧠 AI Coaching: {canvasFeatures.aiCoaching ? '✅' : '❌'}
                        </div>
                        <div>
                          🗺️ Territory Mapping: {canvasFeatures.territoryMapping ? '✅' : '❌'}
                        </div>
                        <div>
                          🤖 Custom AI Models: {canvasFeatures.customAiModels ? '✅' : '❌'}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                {repxTier !== currentTier && canvasFeatures.canvasAccess && (
                  <button
                    onClick={() => handleUpgrade(repxTier)}
                    style={{
                      width: '100%',
                      marginTop: '1rem',
                      padding: '0.75rem',
                      backgroundColor: isHighlighted ? '#00ffc6' : 'rgba(0, 255, 198, 0.2)',
                      color: isHighlighted ? '#0a0a0a' : '#00ffc6',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#00ffc6';
                      e.currentTarget.style.color = '#0a0a0a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isHighlighted ? '#00ffc6' : 'rgba(0, 255, 198, 0.2)';
                      e.currentTarget.style.color = isHighlighted ? '#0a0a0a' : '#00ffc6';
                    }}
                  >
                    {repxTier === 'repx1' || (currentTier && repxTierOrder.indexOf(repxTier) < repxTierOrder.indexOf(currentTier)) 
                      ? 'Downgrade' 
                      : 'Upgrade'
                    }
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#888',
          fontSize: '0.9rem'
        }}>
          All Rep^x tiers include full access to other GlobalRepSpheres modules based on subscription level.
        </div>
      </div>
    </div>
  );
}

export default UnifiedPricingModal;