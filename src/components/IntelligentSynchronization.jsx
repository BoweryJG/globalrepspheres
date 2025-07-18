import React from 'react';

const IntelligentSynchronization = () => {
  return (
    <section className="intelligent-synchronization-section">
      <div className="container">
        <div className="content-wrapper">
          <h2 className="section-title">
            Intelligent Synchronization
          </h2>
          <div className="section-content">
            <p className="lead-text">
              When artificial intelligence meets human intuition, magic happens. 
              This isn't about replacing human intelligence—it's about amplifying it beyond imagination.
            </p>
            <div className="synchronization-grid">
              <div className="sync-item">
                <div className="sync-icon">🧠</div>
                <h3>Neural Enhancement</h3>
                <p>AI systems that learn from your patterns, anticipate your needs, and evolve with your thinking.</p>
              </div>
              <div className="sync-item">
                <div className="sync-icon">⚡</div>
                <h3>Quantum Processing</h3>
                <p>Instantaneous data analysis and decision-making that operates at the speed of thought.</p>
              </div>
              <div className="sync-item">
                <div className="sync-icon">🔗</div>
                <h3>Seamless Integration</h3>
                <p>All your systems, data, and processes unified into a single, intelligent ecosystem.</p>
              </div>
              <div className="sync-item">
                <div className="sync-icon">🎯</div>
                <h3>Precision Targeting</h3>
                <p>Every action, every decision, every outcome optimized for maximum impact and efficiency.</p>
              </div>
            </div>
            <div className="synchronization-flow">
              <h3>The Synchronization Process</h3>
              <div className="flow-steps">
                <div className="flow-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Data Ingestion</h4>
                    <p>Comprehensive data collection from all your business touchpoints</p>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>AI Analysis</h4>
                    <p>Advanced pattern recognition and predictive modeling</p>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Intelligent Action</h4>
                    <p>Automated execution and continuous optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .intelligent-synchronization-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 0;
          background: linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%);
          position: relative;
          overflow: hidden;
        }

        .intelligent-synchronization-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(78, 205, 196, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .content-wrapper {
          text-align: center;
        }

        .section-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2rem;
          text-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
          letter-spacing: -0.02em;
        }

        .lead-text {
          font-size: 1.5rem;
          color: #e2e8f0;
          margin-bottom: 3rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .synchronization-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .sync-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(78, 205, 196, 0.2);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .sync-item:hover {
          transform: translateY(-5px);
          border-color: rgba(78, 205, 196, 0.5);
          box-shadow: 0 10px 30px rgba(78, 205, 196, 0.2);
        }

        .sync-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .sync-item h3 {
          color: #4ecdc4;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .sync-item p {
          color: #cbd5e0;
          line-height: 1.6;
          margin: 0;
        }

        .synchronization-flow {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(78, 205, 196, 0.2);
          border-radius: 12px;
          padding: 3rem;
          backdrop-filter: blur(10px);
        }

        .synchronization-flow h3 {
          color: #4ecdc4;
          font-size: 2rem;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .flow-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .flow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 200px;
        }

        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4ecdc4, #44a08d);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .step-content h4 {
          color: #4ecdc4;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .step-content p {
          color: #cbd5e0;
          line-height: 1.4;
          margin: 0;
          font-size: 0.9rem;
        }

        .flow-arrow {
          color: #4ecdc4;
          font-size: 2rem;
          font-weight: bold;
        }

        @media (max-width: 1024px) {
          .flow-steps {
            flex-direction: column;
            gap: 1rem;
          }
          
          .flow-arrow {
            transform: rotate(90deg);
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
          }
          
          .lead-text {
            font-size: 1.2rem;
          }
          
          .synchronization-grid {
            grid-template-columns: 1fr;
          }
          
          .container {
            padding: 0 1rem;
          }
          
          .synchronization-flow {
            padding: 2rem;
          }
          
          .sync-item {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default IntelligentSynchronization;