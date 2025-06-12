import React, { useState } from 'react'
import { performAIScan } from '../../lib/ai'
import { TargetSightIcon, DoctorTargetIcon, ProductScanIcon, TacticalBriefIcon } from './Icons'
import CanvasHeader from '../CanvasHeader/CanvasHeader'
import './Canvas.css'
import '../CanvasHeader/CanvasHeader.css'

function Canvas() {
  const [doctor, setDoctor] = useState('')
  const [product, setProduct] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [scanStage, setScanStage] = useState('')

  const handleScan = async () => {
    if (!doctor || !product) return
    
    setIsScanning(true)
    setScanResult(null)
    setScanStage('Analyzing Doctor Profile...')
    
    setTimeout(() => setScanStage('Analyzing Product Match...'), 1000)
    setTimeout(() => setScanStage('Generating Sales Strategy...'), 2000)
    
    try {
      const result = await performAIScan(doctor, product)
      setScanResult(result)
    } catch (error) {
      console.error('Scan failed:', error)
    } finally {
      setIsScanning(false)
      setScanStage('')
    }
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
          disabled={!doctor || !product || isScanning}
          className={`scan-btn ${isScanning ? 'scanning' : ''}`}
        >
          {isScanning ? 'SCANNING...' : 'LAUNCH SCAN'}
        </button>
      </div>

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