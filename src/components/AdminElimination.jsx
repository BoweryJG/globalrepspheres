import React from 'react';

const AdminElimination = () => {
  return (
    <section className="admin-elimination-section">
      <div className="container">
        <div className="content-wrapper">
          <h2 className="section-title">
            Administrative Elimination
          </h2>
          <div className="section-content">
            <p className="lead-text">
              The death of bureaucracy begins now. Every manual process, every redundant task, 
              every administrative burden—eliminated through intelligent automation.
            </p>
            <div className="elimination-showcase">
              <div className="before-after">
                <div className="before-panel">
                  <h3>Before: Administrative Chaos</h3>
                  <div className="chaos-items">
                    <div className="chaos-item">
                      <span className="chaos-icon">📊</span>
                      <span>Manual report generation</span>
                      <span className="time-waste">8 hours/week</span>
                    </div>
                    <div className="chaos-item">
                      <span className="chaos-icon">📧</span>
                      <span>Email management</span>
                      <span className="time-waste">12 hours/week</span>
                    </div>
                    <div className="chaos-item">
                      <span className="chaos-icon">📋</span>
                      <span>Data entry & updates</span>
                      <span className="time-waste">6 hours/week</span>
                    </div>
                    <div className="chaos-item">
                      <span className="chaos-icon">🔄</span>
                      <span>Status tracking</span>
                      <span className="time-waste">4 hours/week</span>
                    </div>
                  </div>
                  <div className="total-waste">
                    <strong>Total: 30 hours/week WASTED</strong>
                  </div>
                </div>
                <div className="transformation-zone">
                  <div className="elimination-beam"></div>
                  <span className="eliminate-text">ELIMINATE</span>
                </div>
                <div className="after-panel">
                  <h3>After: Pure Productivity</h3>
                  <div className="productivity-items">
                    <div className="productivity-item">
                      <span className="productivity-icon">🤖</span>
                      <span>AI-generated insights</span>
                      <span className="time-saved">Instant</span>
                    </div>
                    <div className="productivity-item">
                      <span className="productivity-icon">⚡</span>
                      <span>Automated workflows</span>
                      <span className="time-saved">24/7</span>
                    </div>
                    <div className="productivity-item">
                      <span className="productivity-icon">🎯</span>
                      <span>Intelligent prioritization</span>
                      <span className="time-saved">Real-time</span>
                    </div>
                    <div className="productivity-item">
                      <span className="productivity-icon">🚀</span>
                      <span>Strategic focus</span>
                      <span className="time-saved">30 hours/week</span>
                    </div>
                  </div>
                  <div className="total-gain">
                    <strong>Result: 30 hours/week for STRATEGY</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="elimination-benefits">
              <h3>The Liberation</h3>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">🎯</div>
                  <h4>Strategic Focus</h4>
                  <p>Redirect energy from administrative tasks to high-impact strategic initiatives</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📈</div>
                  <h4>Exponential Growth</h4>
                  <p>Eliminate bottlenecks and unlock unprecedented scaling potential</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🧠</div>
                  <h4>Cognitive Liberation</h4>
                  <p>Free your mind from mundane tasks to focus on creative problem-solving</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">⚡</div>
                  <h4>Instant Execution</h4>
                  <p>Transform ideas into action without administrative friction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .admin-elimination-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 0;
          background: linear-gradient(135deg, #16213e 0%, #0f3460 50%, #1a1a2e 100%);
          position: relative;
          overflow: hidden;
        }

        .admin-elimination-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(255, 69, 58, 0.1) 0%, transparent 70%);
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
          text-shadow: 0 0 20px rgba(255, 69, 58, 0.5);
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

        .elimination-showcase {
          margin-bottom: 4rem;
        }

        .before-after {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          align-items: center;
          margin-bottom: 3rem;
        }

        .before-panel, .after-panel {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        .before-panel {
          border: 1px solid rgba(255, 69, 58, 0.3);
        }

        .after-panel {
          border: 1px solid rgba(52, 211, 153, 0.3);
        }

        .before-panel h3 {
          color: #ff453a;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .after-panel h3 {
          color: #34d399;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .chaos-items, .productivity-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chaos-item, .productivity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .chaos-icon, .productivity-icon {
          font-size: 1.5rem;
          width: 2rem;
          text-align: center;
        }

        .chaos-item span:nth-child(2), .productivity-item span:nth-child(2) {
          flex: 1;
          text-align: left;
          color: #cbd5e0;
        }

        .time-waste {
          color: #ff453a;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .time-saved {
          color: #34d399;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .total-waste {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(255, 69, 58, 0.1);
          border-radius: 8px;
          color: #ff453a;
        }

        .total-gain {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(52, 211, 153, 0.1);
          border-radius: 8px;
          color: #34d399;
        }

        .transformation-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .elimination-beam {
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #ff453a, #fbbf24, #34d399);
          border-radius: 2px;
          position: relative;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .eliminate-text {
          color: #fbbf24;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
        }

        .elimination-benefits {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(251, 191, 36, 0.2);
          border-radius: 12px;
          padding: 3rem;
          backdrop-filter: blur(10px);
        }

        .elimination-benefits h3 {
          color: #fbbf24;
          font-size: 2rem;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .benefit-item {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(251, 191, 36, 0.1);
        }

        .benefit-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
        }

        .benefit-item h4 {
          color: #fbbf24;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .benefit-item p {
          color: #cbd5e0;
          line-height: 1.5;
          margin: 0;
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .before-after {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .transformation-zone {
            order: 2;
          }
          
          .elimination-beam {
            transform: rotate(90deg);
            width: 40px;
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
          }
          
          .lead-text {
            font-size: 1.2rem;
          }
          
          .container {
            padding: 0 1rem;
          }
          
          .before-panel, .after-panel, .elimination-benefits {
            padding: 1.5rem;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default AdminElimination;