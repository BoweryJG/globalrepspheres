import React, { useState, useEffect } from 'react';

const ClosingWindow = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set a target date 30 days from now for demo purposes
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="closing-window-section">
      <div className="container">
        <div className="content-wrapper">
          <h2 className="section-title">
            The Closing Window
          </h2>
          <div className="section-content">
            <p className="lead-text">
              This opportunity is finite. The window for early adoption is closing rapidly. 
              Those who act now will shape the future. Those who wait will be shaped by it.
            </p>
            
            <div className="urgency-countdown">
              <h3>Time Remaining</h3>
              <div className="countdown-display">
                <div className="time-unit">
                  <span className="time-number">{timeLeft.days}</span>
                  <span className="time-label">Days</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <span className="time-number">{timeLeft.hours}</span>
                  <span className="time-label">Hours</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <span className="time-number">{timeLeft.minutes}</span>
                  <span className="time-label">Minutes</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <span className="time-number">{timeLeft.seconds}</span>
                  <span className="time-label">Seconds</span>
                </div>
              </div>
            </div>

            <div className="scarcity-factors">
              <h3>Why This Window Is Closing</h3>
              <div className="factors-grid">
                <div className="factor-item">
                  <div className="factor-icon">🎯</div>
                  <h4>Early Adopter Advantage</h4>
                  <p>First movers gain exponential advantages while competition remains minimal</p>
                </div>
                <div className="factor-item">
                  <div className="factor-icon">📈</div>
                  <h4>Market Saturation</h4>
                  <p>As adoption increases, the competitive advantage decreases exponentially</p>
                </div>
                <div className="factor-item">
                  <div className="factor-icon">🔒</div>
                  <h4>Limited Capacity</h4>
                  <p>Our elite program has strict limits to maintain quality and exclusivity</p>
                </div>
                <div className="factor-item">
                  <div className="factor-icon">⚡</div>
                  <h4>Rapid Evolution</h4>
                  <p>The landscape is changing daily—delays mean missing critical opportunities</p>
                </div>
              </div>
            </div>

            <div className="action-zone">
              <h3>The Moment of Decision</h3>
              <p className="decision-text">
                You have all the information. You understand the potential. The only question that remains is: 
                <strong> Will you be among the architects of the future, or will you watch from the sidelines?</strong>
              </p>
              
              <div className="cta-buttons">
                <button className="primary-cta">
                  <span className="cta-text">Secure Your Position</span>
                  <span className="cta-subtitle">Join the Elite</span>
                </button>
                <button className="secondary-cta">
                  <span className="cta-text">Learn More</span>
                  <span className="cta-subtitle">Explore Options</span>
                </button>
              </div>
              
              <div className="social-proof">
                <div className="proof-item">
                  <span className="proof-number">2,847</span>
                  <span className="proof-label">Elite Members</span>
                </div>
                <div className="proof-item">
                  <span className="proof-number">$2.3B</span>
                  <span className="proof-label">Revenue Generated</span>
                </div>
                <div className="proof-item">
                  <span className="proof-number">943%</span>
                  <span className="proof-label">Average ROI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .closing-window-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          position: relative;
          overflow: hidden;
        }

        .closing-window-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(251, 191, 36, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
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
          text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
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

        .urgency-countdown {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 3rem;
          backdrop-filter: blur(10px);
        }

        .urgency-countdown h3 {
          color: #fbbf24;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .countdown-display {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .time-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 8px;
          padding: 1rem;
          min-width: 80px;
        }

        .time-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fbbf24;
          line-height: 1;
        }

        .time-label {
          font-size: 0.9rem;
          color: #cbd5e0;
          margin-top: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .time-separator {
          font-size: 2rem;
          color: #fbbf24;
          font-weight: 700;
        }

        .scarcity-factors {
          margin-bottom: 3rem;
        }

        .scarcity-factors h3 {
          color: #fbbf24;
          font-size: 2rem;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .factors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .factor-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(251, 191, 36, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .factor-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
        }

        .factor-item h4 {
          color: #fbbf24;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .factor-item p {
          color: #cbd5e0;
          line-height: 1.5;
          margin: 0;
          font-size: 0.9rem;
        }

        .action-zone {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 12px;
          padding: 3rem;
          backdrop-filter: blur(10px);
        }

        .action-zone h3 {
          color: #fbbf24;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .decision-text {
          font-size: 1.2rem;
          color: #e2e8f0;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .decision-text strong {
          color: #fbbf24;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .primary-cta, .secondary-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 2rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 180px;
        }

        .primary-cta {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: #000;
        }

        .secondary-cta {
          background: transparent;
          border: 2px solid #fbbf24;
          color: #fbbf24;
        }

        .primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(251, 191, 36, 0.3);
        }

        .secondary-cta:hover {
          background: rgba(251, 191, 36, 0.1);
          transform: translateY(-2px);
        }

        .cta-text {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .cta-subtitle {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .social-proof {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .proof-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .proof-number {
          font-size: 2rem;
          font-weight: 700;
          color: #fbbf24;
          line-height: 1;
        }

        .proof-label {
          font-size: 0.9rem;
          color: #cbd5e0;
          margin-top: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
          }
          
          .lead-text {
            font-size: 1.2rem;
          }
          
          .countdown-display {
            gap: 0.5rem;
          }
          
          .time-unit {
            min-width: 60px;
            padding: 0.75rem;
          }
          
          .time-number {
            font-size: 1.8rem;
          }
          
          .factors-grid {
            grid-template-columns: 1fr;
          }
          
          .container {
            padding: 0 1rem;
          }
          
          .action-zone {
            padding: 2rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .social-proof {
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ClosingWindow;