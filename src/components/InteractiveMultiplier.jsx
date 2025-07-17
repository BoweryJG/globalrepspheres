import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const InteractiveMultiplier = () => {
  const [baseMetrics, setBaseMetrics] = useState({
    callsPerDay: 50,
    conversionRate: 2,
    avgDealSize: 10000
  });
  
  const [enhancedMetrics, setEnhancedMetrics] = useState({
    touchpointsPerDay: 250,
    conversionRate: 8,
    avgDealSize: 12000
  });

  const [multiplier, setMultiplier] = useState(1);
  const multiplierRef = useRef(null);
  const resultsRef = useRef(null);

  // Calculate results
  const baseResults = {
    dailyDeals: (baseMetrics.callsPerDay * baseMetrics.conversionRate / 100),
    monthlyRevenue: (baseMetrics.callsPerDay * baseMetrics.conversionRate / 100) * baseMetrics.avgDealSize * 22,
    annualRevenue: (baseMetrics.callsPerDay * baseMetrics.conversionRate / 100) * baseMetrics.avgDealSize * 22 * 12
  };

  const enhancedResults = {
    dailyDeals: (enhancedMetrics.touchpointsPerDay * enhancedMetrics.conversionRate / 100),
    monthlyRevenue: (enhancedMetrics.touchpointsPerDay * enhancedMetrics.conversionRate / 100) * enhancedMetrics.avgDealSize * 22,
    annualRevenue: (enhancedMetrics.touchpointsPerDay * enhancedMetrics.conversionRate / 100) * enhancedMetrics.avgDealSize * 22 * 12
  };

  const actualMultiplier = enhancedResults.dailyDeals / baseResults.dailyDeals;

  useEffect(() => {
    setMultiplier(actualMultiplier);
    
    // Animate multiplier change
    if (multiplierRef.current) {
      gsap.fromTo(multiplierRef.current,
        { scale: 1 },
        { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1 }
      );
    }
  }, [actualMultiplier]);

  const handleSliderChange = (metric, category, value) => {
    if (category === 'base') {
      setBaseMetrics(prev => ({ ...prev, [metric]: value }));
    } else {
      setEnhancedMetrics(prev => ({ ...prev, [metric]: value }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return num.toFixed(1);
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.95))',
      borderRadius: '20px',
      padding: '3rem',
      border: '2px solid rgba(59, 130, 246, 0.3)',
      boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)',
      marginBottom: '3rem'
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h3 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          color: '#3b82f6',
          marginBottom: '1rem',
          fontWeight: '800'
        }}>
          🧮 Interactive Performance Calculator
        </h3>
        <p style={{
          color: '#cccccc',
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Adjust the sliders based on your current metrics and see how intelligence enhancement could transform your results.
        </p>
      </div>

      {/* Real-time Multiplier Display */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.1))',
        borderRadius: '15px',
        border: '2px solid rgba(59, 130, 246, 0.4)'
      }}>
        <div style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          fontWeight: '900',
          color: '#00ff88',
          textShadow: '0 0 30px rgba(0, 255, 136, 0.6)',
          fontFamily: 'monospace',
          lineHeight: '1'
        }}>
          <span ref={multiplierRef}>
            {formatNumber(multiplier)}X
          </span>
        </div>
        <div style={{
          color: '#ffffff',
          fontSize: '1.2rem',
          fontWeight: '600',
          marginTop: '0.5rem'
        }}>
          Real-Time Performance Multiplier
        </div>
      </div>

      {/* Calculator Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '3rem',
        alignItems: 'start',
        marginBottom: '3rem'
      }}>
        
        {/* Traditional Approach */}
        <div style={{
          background: 'rgba(255, 68, 68, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          border: '2px solid rgba(255, 68, 68, 0.3)'
        }}>
          <h4 style={{
            color: '#ff4444',
            fontSize: '1.3rem',
            marginBottom: '2rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>
            Traditional Approach
          </h4>

          {/* Calls Per Day Slider */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              color: '#cccccc',
              fontSize: '0.9rem',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Calls per day: {baseMetrics.callsPerDay}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={baseMetrics.callsPerDay}
              onChange={(e) => handleSliderChange('callsPerDay', 'base', parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: 'linear-gradient(to right, #ff4444, #ff6666)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Conversion Rate Slider */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              color: '#cccccc',
              fontSize: '0.9rem',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Conversion rate: {baseMetrics.conversionRate}%
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={baseMetrics.conversionRate}
              onChange={(e) => handleSliderChange('conversionRate', 'base', parseFloat(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: 'linear-gradient(to right, #ff4444, #ff6666)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Average Deal Size */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              color: '#cccccc',
              fontSize: '0.9rem',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Avg deal size: {formatCurrency(baseMetrics.avgDealSize)}
            </label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={baseMetrics.avgDealSize}
              onChange={(e) => handleSliderChange('avgDealSize', 'base', parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: 'linear-gradient(to right, #ff4444, #ff6666)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Results */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#ff4444', fontSize: '1.5rem', fontWeight: '700' }}>
              {formatNumber(baseResults.dailyDeals)} deals/day
            </div>
            <div style={{ color: '#cccccc', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              {formatCurrency(baseResults.monthlyRevenue)}/month
            </div>
          </div>
        </div>

        {/* VS Divider */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '2rem 0'
        }}>
          <div style={{
            fontSize: '2rem',
            color: '#ffd700',
            fontWeight: '900'
          }}>
            VS
          </div>
          <div style={{
            writing: 'vertical-lr',
            color: '#cccccc',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            Adjust both sides to see your potential
          </div>
        </div>

        {/* Intelligence-Enhanced Approach */}
        <div style={{
          background: 'rgba(0, 255, 136, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          border: '2px solid rgba(0, 255, 136, 0.3)'
        }}>
          <h4 style={{
            color: '#00ff88',
            fontSize: '1.3rem',
            marginBottom: '2rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>
            Intelligence-Enhanced
          </h4>

          {/* Touchpoints Per Day Slider */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              color: '#cccccc',
              fontSize: '0.9rem',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Touchpoints per day: {enhancedMetrics.touchpointsPerDay}
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="25"
              value={enhancedMetrics.touchpointsPerDay}
              onChange={(e) => handleSliderChange('touchpointsPerDay', 'enhanced', parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: 'linear-gradient(to right, #00ff88, #00dd77)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Enhanced Conversion Rate Slider */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              color: '#cccccc',
              fontSize: '0.9rem',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Conversion rate: {enhancedMetrics.conversionRate}%
            </label>
            <input
              type="range"
              min="3"
              max="25"
              step="0.5"
              value={enhancedMetrics.conversionRate}
              onChange={(e) => handleSliderChange('conversionRate', 'enhanced', parseFloat(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: 'linear-gradient(to right, #00ff88, #00dd77)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Enhanced Deal Size */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              color: '#cccccc',
              fontSize: '0.9rem',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Avg deal size: {formatCurrency(enhancedMetrics.avgDealSize)}
            </label>
            <input
              type="range"
              min="5000"
              max="100000"
              step="1000"
              value={enhancedMetrics.avgDealSize}
              onChange={(e) => handleSliderChange('avgDealSize', 'enhanced', parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: 'linear-gradient(to right, #00ff88, #00dd77)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Enhanced Results */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#00ff88', fontSize: '1.5rem', fontWeight: '700' }}>
              {formatNumber(enhancedResults.dailyDeals)} deals/day
            </div>
            <div style={{ color: '#cccccc', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              {formatCurrency(enhancedResults.monthlyRevenue)}/month
            </div>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div 
        ref={resultsRef}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1))',
          padding: '2rem',
          borderRadius: '15px',
          border: '2px solid rgba(255, 215, 0, 0.4)',
          textAlign: 'center'
        }}
      >
        <h4 style={{
          color: '#ffd700',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          fontWeight: '800'
        }}>
          📊 Your Custom Performance Impact
        </h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <div>
            <div style={{ color: '#ffd700', fontSize: '1.2rem', fontWeight: '700' }}>
              Daily Deals
            </div>
            <div style={{ color: '#ffffff', fontSize: '1rem' }}>
              +{formatNumber(enhancedResults.dailyDeals - baseResults.dailyDeals)} more per day
            </div>
          </div>
          
          <div>
            <div style={{ color: '#ffd700', fontSize: '1.2rem', fontWeight: '700' }}>
              Monthly Revenue
            </div>
            <div style={{ color: '#ffffff', fontSize: '1rem' }}>
              +{formatCurrency(enhancedResults.monthlyRevenue - baseResults.monthlyRevenue)}
            </div>
          </div>
          
          <div>
            <div style={{ color: '#ffd700', fontSize: '1.2rem', fontWeight: '700' }}>
              Annual Impact
            </div>
            <div style={{ color: '#ffffff', fontSize: '1rem' }}>
              +{formatCurrency(enhancedResults.annualRevenue - baseResults.annualRevenue)}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '10px',
          fontSize: '0.9rem',
          color: '#cccccc'
        }}>
          💡 These calculations are based on your input parameters. Actual results will vary based on individual performance, market conditions, and implementation effectiveness.
        </div>
      </div>
    </div>
  );
};

export default InteractiveMultiplier;