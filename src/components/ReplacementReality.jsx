import React from 'react';

const ReplacementReality = () => {
  return (
    <section className="replacement-reality-section">
      <div className="container">
        <div className="content-wrapper">
          <h2 className="section-title">
            Replacement Reality
          </h2>
          <div className="section-content">
            <p className="lead-text">
              The old paradigms are dissolving. What once seemed permanent is now ephemeral. 
              We're not just changing how we work—we're redefining what work means.
            </p>
            <div className="reality-comparison">
              <div className="old-reality">
                <h3>The Old Reality</h3>
                <ul>
                  <li>Manual processes consuming hours</li>
                  <li>Reactive decision-making</li>
                  <li>Siloed information systems</li>
                  <li>Human-only intelligence</li>
                  <li>Linear growth patterns</li>
                </ul>
              </div>
              <div className="transformation-arrow">
                <div className="arrow-container">
                  <div className="arrow-line"></div>
                  <div className="arrow-head"></div>
                </div>
                <span className="transform-text">TRANSFORM</span>
              </div>
              <div className="new-reality">
                <h3>The New Reality</h3>
                <ul>
                  <li>Automated intelligence at scale</li>
                  <li>Predictive, proactive systems</li>
                  <li>Unified, interconnected data</li>
                  <li>Augmented human potential</li>
                  <li>Exponential capability growth</li>
                </ul>
              </div>
            </div>
            <div className="reality-impact">
              <h3>The Impact</h3>
              <p>
                This isn't evolution—it's revolution. Organizations that embrace this replacement reality 
                will become the architects of tomorrow. Those that resist will become artifacts of yesterday.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .replacement-reality-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          position: relative;
          overflow: hidden;
        }

        .replacement-reality-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
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
          text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
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

        .reality-comparison {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          margin: 3rem 0;
          align-items: center;
        }

        .old-reality, .new-reality {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 107, 107, 0.2);
          border-radius: 12px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        .old-reality {
          border-color: rgba(255, 107, 107, 0.3);
        }

        .new-reality {
          border-color: rgba(72, 187, 120, 0.3);
        }

        .old-reality h3, .new-reality h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .old-reality h3 {
          color: #fc8181;
        }

        .new-reality h3 {
          color: #68d391;
        }

        .old-reality ul, .new-reality ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .old-reality li, .new-reality li {
          padding: 0.5rem 0;
          color: #cbd5e0;
          position: relative;
          padding-left: 1.5rem;
        }

        .old-reality li::before {
          content: '×';
          position: absolute;
          left: 0;
          color: #fc8181;
          font-weight: bold;
        }

        .new-reality li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #68d391;
          font-weight: bold;
        }

        .transformation-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .arrow-container {
          position: relative;
          width: 60px;
          height: 4px;
        }

        .arrow-line {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
          position: relative;
        }

        .arrow-head {
          position: absolute;
          right: -5px;
          top: -3px;
          width: 0;
          height: 0;
          border-left: 8px solid #4ecdc4;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }

        .transform-text {
          color: #4ecdc4;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
        }

        .reality-impact {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(78, 205, 196, 0.2);
          border-radius: 12px;
          padding: 2rem;
          margin-top: 3rem;
          backdrop-filter: blur(10px);
        }

        .reality-impact h3 {
          color: #4ecdc4;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .reality-impact p {
          color: #cbd5e0;
          line-height: 1.6;
          margin: 0;
          font-size: 1.1rem;
        }

        @media (max-width: 1024px) {
          .reality-comparison {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .transformation-arrow {
            transform: rotate(90deg);
          }
          
          .arrow-container {
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
          
          .old-reality, .new-reality, .reality-impact {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ReplacementReality;