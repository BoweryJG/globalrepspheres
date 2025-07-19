import React, { useState } from 'react'
import { performAIScan } from '../../lib/ai'
import { TargetSightIcon, DoctorTargetIcon, ProductScanIcon, TacticalBriefIcon } from './Icons'
import CanvasHeader from '../CanvasHeader/CanvasHeader'
import { useCanvasFeatureAccess, useCanvasUpgradePrompt } from '../../hooks/useUnifiedSubscription'
import useUnifiedSubscription from '../../hooks/useUnifiedSubscription'
import './Canvas.css'
import '../CanvasHeader/CanvasHeader.css'

function Canvas() {
  const [doctor, setDoctor] = useState('')
  const [product, setProduct] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [scanStage, setScanStage] = useState('')
  
  // Rep^x tier integration
  const {
    canAccessCanvas,
    canPerformScan,
    hasAiCoaching,
    hasTerritoryMapping,
    hasCustomAiModels,
    remainingScans,
    upgradeMessage,
    nextTier,
    repxTier,
    repxTierName,
  } = useCanvasFeatureAccess()
  
  const { shouldShowUpgrade, upgradePromptData } = useCanvasUpgradePrompt()
  const { incrementScanUsage } = useUnifiedSubscription()

  const handleScan = async () => {
    if (!doctor || !product) return
    
    // Check Canvas access and scan permissions
    if (!canAccessCanvas) {
      alert(`Canvas access requires ${repxTierName} tier or higher. Please upgrade to continue.`)
      return
    }
    
    if (!canPerformScan) {
      alert(upgradeMessage || 'Daily scan limit reached. Please upgrade or try again tomorrow.')
      return
    }
    
    setIsScanning(true)
    setScanResult(null)
    setScanStage('Analyzing Doctor Profile...')
    
    setTimeout(() => setScanStage('Analyzing Product Match...'), 1000)
    setTimeout(() => setScanStage('Generating Sales Strategy...'), 2000)
    
    try {
      const result = await performAIScan(doctor, product)
      setScanResult(result)
      
      // Increment scan usage after successful scan
      await incrementScanUsage()
    } catch (error) {
      console.error('Scan failed:', error)
    } finally {
      setIsScanning(false)
      setScanStage('')
    }
  }

  // Early return if no Canvas access
  if (!canAccessCanvas) {
    return (
      <div className="canvas-app">
        <CanvasHeader height="300px">
          <header className="header">
            <div className="header-icon">
              <TargetSightIcon className="w-12 h-12 text-electric-blue" />
            </div>
            <h1><span className="canvas-glow">CANVAS</span></h1>
            <p style={{ 
              color: '#888', 
              fontSize: '0.9rem', 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              marginTop: '0.5rem'
            }}>INTERSTELLAR SALES INTELLIGENCE MODULE</p>
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              border: '1px solid rgba(255, 0, 110, 0.3)',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 0, 110, 0.1)'
            }}>
              <p style={{ color: '#ff006e', fontSize: '1.1rem', fontWeight: 'bold' }}>
                Canvas Access Required
              </p>
              <p style={{ color: '#ccc', marginTop: '0.5rem' }}>
                Upgrade to {repxTierName === 'Rep^1' ? 'Rep^2' : repxTierName} or higher to access Canvas features.
              </p>
            </div>
          </header>
        </CanvasHeader>
      </div>
    )
  }

  return (
    <div className="canvas-app">
      {/* Enhanced Canvas Header */}
      <CanvasHeader height="300px">
        <header className="header">
          <div className="header-icon">
            <TargetSightIcon className="w-12 h-12 text-electric-blue" />
          </div>
          <h1><span className="canvas-glow">CANVAS</span></h1>
          <p style={{ 
            color: '#888', 
            fontSize: '0.9rem', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase',
            marginTop: '0.5rem'
          }}>INTERSTELLAR SALES INTELLIGENCE MODULE</p>
          
          {/* Rep^x Tier and Usage Display */}
          <div style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            fontSize: '0.8rem',
            color: '#00ffc6'
          }}>
            <div>
              <strong>{repxTierName}</strong> TIER
            </div>
            <div>
              SCANS: {typeof remainingScans === 'number' ? remainingScans : '∞'} REMAINING
            </div>
            {hasAiCoaching && (
              <div>AI COACHING ENABLED</div>
            )}
            {hasTerritoryMapping && (
              <div>TERRITORY MAPPING</div>
            )}
          </div>
        </header>
      </CanvasHeader>

      {/* Scan Form */}
      <div className="scan-form">
        <div className="input-group">
          <div className="input-with-icon">
            <DoctorTargetIcon className="input-icon" />
            <input
              type="text"
              placeholder="Doctor Name"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              disabled={isScanning}
            />
          </div>
          <div className="input-with-icon">
            <ProductScanIcon className="input-icon" />
            <input
              type="text"
              placeholder="Product Name"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              disabled={isScanning}
            />
          </div>
        </div>
        <button 
          onClick={handleScan}
          disabled={!doctor || !product || isScanning || !canPerformScan}
          className={`scan-btn ${isScanning ? 'scanning' : ''} ${!canPerformScan ? 'disabled' : ''}`}
        >
          {isScanning ? 'SCANNING...' : !canPerformScan ? 'SCAN LIMIT REACHED' : 'LAUNCH SCAN'}
        </button>
      </div>

      {/* Rep^x Upgrade Prompt */}
      {shouldShowUpgrade && upgradePromptData && (
        <div style={{
          margin: '2rem auto',
          maxWidth: '600px',
          padding: '1.5rem',
          border: `1px solid ${upgradePromptData.urgency === 'error' ? 'rgba(255, 0, 110, 0.3)' : 'rgba(255, 193, 7, 0.3)'}`,
          borderRadius: '12px',
          backgroundColor: `${upgradePromptData.urgency === 'error' ? 'rgba(255, 0, 110, 0.1)' : 'rgba(255, 193, 7, 0.1)'}`,
          textAlign: 'center'
        }}>
          <h3 style={{ 
            color: upgradePromptData.urgency === 'error' ? '#ff006e' : '#ffc107',
            margin: '0 0 1rem 0',
            fontSize: '1.2rem'
          }}>
            {upgradePromptData.urgency === 'error' ? '🚀 Upgrade Required' : '⚡ Usage Alert'}
          </h3>
          <p style={{ color: '#ccc', margin: '0 0 1rem 0' }}>
            {upgradePromptData.message}
          </p>
          {upgradePromptData.scansLimit !== -1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              margin: '1rem 0',
              fontSize: '0.9rem',
              color: '#888'
            }}>
              <span>Daily Usage:</span>
              <div style={{
                width: '200px',
                height: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min((upgradePromptData.scansUsed / upgradePromptData.scansLimit) * 100, 100)}%`,
                  height: '100%',
                  backgroundColor: upgradePromptData.urgency === 'error' ? '#ff006e' : '#ffc107',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span>{upgradePromptData.scansUsed} / {upgradePromptData.scansLimit}</span>
            </div>
          )}
          {upgradePromptData.nextTier && (
            <button 
              onClick={() => window.location.href = '/#pricing'}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#00ffc6',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Upgrade to {upgradePromptData.nextTierName}
            </button>
          )}
        </div>
      )}

      {/* Iconic Gauge */}
      <div className="gauge-container">
        <div className={`gauge ${isScanning ? 'spinning' : ''} ${(scanResult?.score || 0) >= 80 ? 'high-value' : ''}`}>
          <div className="gauge-frame">
            <div 
              className="gauge-needle" 
              style={{ 
                transform: `translate(-50%, -100%) rotate(${-135 + ((scanResult?.score || 0) / 100) * 270}deg)`,
                transition: isScanning ? 'none' : 'transform 2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
            <div className="gauge-center" />
          </div>
        </div>
        
        {!isScanning && scanResult && (
          <div className="gauge-display">
            <div className={`score ${scanResult.score >= 80 ? 'high-value' : ''}`}>
              {scanResult.score}%
            </div>
            <div className="label">TARGET ALIGNMENT</div>
          </div>
        )}
      </div>

      {/* Scanning Status */}
      {isScanning && (
        <div className="status">
          <p className="scanning-text">{scanStage}</p>
        </div>
      )}

      {/* Insights */}
      {scanResult && !isScanning && (
        <div className="insights-section">
          <div className="insights-grid">
            {scanResult.insights.map((insight, index) => (
              <div key={index} className="insight-card">
                <p>{insight}</p>
              </div>
            ))}
          </div>
          
          {/* Sales Brief */}
          <div className="sales-brief">
            <h3>
              <TacticalBriefIcon className="inline w-5 h-5 mr-2" />
              TACTICAL SALES BRIEF
            </h3>
            <p>{scanResult.salesBrief}</p>
          </div>

          {/* Action Bar */}
          <div className="action-bar">
            <button className="action-btn primary">Export PDF</button>
            <button className="action-btn">Save to CRM</button>
            <button className="action-btn">Send via SMS</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Canvas