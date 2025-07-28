import React, { useState, useRef, useEffect } from 'react';
import './StrategicWhisperAudio.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://osbackend-zl1h.onrender.com';

// Audio samples configuration
const audioSamples = {
  openingHooks: [
    {
      id: 'hook1',
      title: 'Revenue Discovery',
      text: "Did you know 73% of medical practices are losing revenue they don't even know about?",
      duration: '0:04',
      category: 'opening'
    },
    {
      id: 'hook2',
      title: '10x Efficiency',
      text: "What if I told you there's a way to 10x your practice efficiency in just 30 days?",
      duration: '0:04',
      category: 'opening'
    },
    {
      id: 'hook3',
      title: 'Not Average',
      text: "The average medical device rep is using tools from 2015. You're not average.",
      duration: '0:04',
      category: 'opening'
    }
  ],
  objectionHandlers: [
    {
      id: 'objection1',
      title: 'Implementation Concerns',
      text: "I understand your concern about implementation time. That's why we handle everything in 48 hours.",
      duration: '0:05',
      category: 'objection'
    },
    {
      id: 'objection2',
      title: 'ROI Response',
      text: "ROI concerns are valid. Our average client sees 300% return in the first quarter.",
      duration: '0:04',
      category: 'objection'
    },
    {
      id: 'objection3',
      title: 'Integration Solution',
      text: "Integration complexity? Our AI handles 95% automatically. Your team just benefits.",
      duration: '0:04',
      category: 'objection'
    }
  ],
  closingLines: [
    {
      id: 'close1',
      title: 'Decision Maker',
      text: "The decision you make today determines your competitive advantage tomorrow. Let's start.",
      duration: '0:05',
      category: 'closing'
    },
    {
      id: 'close2',
      title: 'Revenue Recovery',
      text: "Every minute without RepSpheres is revenue left on the table. Shall we fix that now?",
      duration: '0:04',
      category: 'closing'
    },
    {
      id: 'close3',
      title: 'Leader or Follower',
      text: "Your competitors are already using AI. The question is: leader or follower?",
      duration: '0:04',
      category: 'closing'
    }
  ],
  motivational: [
    {
      id: 'motivate1',
      title: 'Champion\'s Choice',
      text: "Champions don't wait for perfect conditions. They create them. Make the call.",
      duration: '0:04',
      category: 'motivational'
    },
    {
      id: 'motivate2',
      title: 'Future Self',
      text: "Your future self will thank you for the courage you show today. Trust the process.",
      duration: '0:04',
      category: 'motivational'
    },
    {
      id: 'motivate3',
      title: 'Excellence',
      text: "Excellence isn't an accident. It's a choice you make every single day. Choose wisely.",
      duration: '0:04',
      category: 'motivational'
    }
  ],
  dataInsights: [
    {
      id: 'data1',
      title: 'Market Growth',
      text: "Market analysis shows 47% growth in AI-powered medical sales. Position yourself accordingly.",
      duration: '0:05',
      category: 'data'
    },
    {
      id: 'data2',
      title: 'Performance Metrics',
      text: "Top performers using RepSpheres close 3.7 times more deals. The data doesn't lie.",
      duration: '0:04',
      category: 'data'
    },
    {
      id: 'data3',
      title: 'Neural Sync',
      text: "Neural synchronization increases team performance by 85%. That's not theory, it's fact.",
      duration: '0:04',
      category: 'data'
    }
  ]
};

const StrategicWhisperAudio = () => {
  const [activeCategory, setActiveCategory] = useState('opening');
  const [playingSample, setPlayingSample] = useState(null);
  const [hoveredSample, setHoveredSample] = useState(null);
  const [volume, setVolume] = useState(0.8);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const audioRef = useRef(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioUrls, setAudioUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const progressIntervalRef = useRef(null);

  // Fetch audio URLs from backend on mount
  useEffect(() => {
    const fetchAudioUrls = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/whisper-audio/samples`);
        const data = await response.json();
        
        // Build URL map
        const urlMap = {};
        Object.entries(data).forEach(([category, samples]) => {
          samples.forEach(sample => {
            if (sample.url) {
              urlMap[sample.id] = sample.url;
            }
          });
        });
        
        setAudioUrls(urlMap);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching audio URLs:', error);
        setLoading(false);
      }
    };
    
    fetchAudioUrls();
  }, []);

  // Combine all samples for easy access
  const allSamples = [
    ...audioSamples.openingHooks,
    ...audioSamples.objectionHandlers,
    ...audioSamples.closingLines,
    ...audioSamples.motivational,
    ...audioSamples.dataInsights
  ];

  const getCategorySamples = () => {
    switch(activeCategory) {
      case 'opening': return audioSamples.openingHooks;
      case 'objection': return audioSamples.objectionHandlers;
      case 'closing': return audioSamples.closingLines;
      case 'motivational': return audioSamples.motivational;
      case 'data': return audioSamples.dataInsights;
      default: return audioSamples.openingHooks;
    }
  };

  const handlePlaySample = async (sampleId) => {
    if (playingSample === sampleId) {
      // Stop playing
      setPlayingSample(null);
      setAudioProgress(0);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    } else {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      // Start playing new sample
      setPlayingSample(sampleId);
      setAudioProgress(0);
      
      // Check if we have a URL for this sample
      const audioUrl = audioUrls[sampleId];
      
      if (audioUrl && audioRef.current) {
        // Play real audio
        audioRef.current.src = audioUrl;
        audioRef.current.volume = volume;
        
        try {
          await audioRef.current.play();
          
          // Update progress
          progressIntervalRef.current = setInterval(() => {
            if (audioRef.current && audioRef.current.duration) {
              const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
              setAudioProgress(progress);
            }
          }, 100);
        } catch (error) {
          console.error('Error playing audio:', error);
          setPlayingSample(null);
        }
      } else if (!audioUrl) {
        // If no URL, try to generate it
        try {
          const categoryMap = {
            'hook1': 'openingHooks', 'hook2': 'openingHooks', 'hook3': 'openingHooks',
            'objection1': 'objectionHandlers', 'objection2': 'objectionHandlers', 'objection3': 'objectionHandlers',
            'close1': 'closingLines', 'close2': 'closingLines', 'close3': 'closingLines',
            'motivate1': 'motivational', 'motivate2': 'motivational', 'motivate3': 'motivational',
            'data1': 'dataInsights', 'data2': 'dataInsights', 'data3': 'dataInsights'
          };
          
          const category = categoryMap[sampleId];
          
          const response = await fetch(`${BACKEND_URL}/api/whisper-audio/generate-single`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category, sampleId })
          });
          
          if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            // Update URLs and play
            setAudioUrls(prev => ({ ...prev, [sampleId]: url }));
            
            if (audioRef.current) {
              audioRef.current.src = url;
              audioRef.current.volume = volume;
              await audioRef.current.play();
              
              // Update progress
              progressIntervalRef.current = setInterval(() => {
                if (audioRef.current && audioRef.current.duration) {
                  const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                  setAudioProgress(progress);
                }
              }, 100);
            }
          }
        } catch (error) {
          console.error('Error generating audio:', error);
          setPlayingSample(null);
        }
      }
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = e.target.value;
    }
  };

  const handleDownload = (sampleId) => {
    // In real implementation, trigger download
    console.log(`Downloading sample: ${sampleId}`);
  };

  const handleShare = (sampleId) => {
    // In real implementation, open share dialog
    console.log(`Sharing sample: ${sampleId}`);
  };

  return (
    <div className="strategic-whisper-audio">
      <div className="whisper-header">
        <h2 className="type-display">Harvey's Strategic Whispers</h2>
        <p className="type-body whisper-subtitle">
          Championship coaching in your ear. Click to hear the difference.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        <button 
          className={`category-tab ${activeCategory === 'opening' ? 'active' : ''}`}
          onClick={() => setActiveCategory('opening')}
        >
          <span className="tab-icon">🎯</span>
          <span className="tab-label">Opening Hooks</span>
        </button>
        <button 
          className={`category-tab ${activeCategory === 'objection' ? 'active' : ''}`}
          onClick={() => setActiveCategory('objection')}
        >
          <span className="tab-icon">🛡️</span>
          <span className="tab-label">Objection Handlers</span>
        </button>
        <button 
          className={`category-tab ${activeCategory === 'closing' ? 'active' : ''}`}
          onClick={() => setActiveCategory('closing')}
        >
          <span className="tab-icon">🎪</span>
          <span className="tab-label">Closing Lines</span>
        </button>
        <button 
          className={`category-tab ${activeCategory === 'motivational' ? 'active' : ''}`}
          onClick={() => setActiveCategory('motivational')}
        >
          <span className="tab-icon">⚡</span>
          <span className="tab-label">Motivational</span>
        </button>
        <button 
          className={`category-tab ${activeCategory === 'data' ? 'active' : ''}`}
          onClick={() => setActiveCategory('data')}
        >
          <span className="tab-icon">📊</span>
          <span className="tab-label">Data Insights</span>
        </button>
      </div>

      {/* Audio Samples Grid */}
      <div className="audio-samples-grid">
        {getCategorySamples().map(sample => (
          <div 
            key={sample.id} 
            className={`audio-sample-card ${playingSample === sample.id ? 'playing' : ''} ${hoveredSample === sample.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredSample(sample.id)}
            onMouseLeave={() => setHoveredSample(null)}
          >
            <div className="sample-header">
              <h3 className="sample-title type-h4">{sample.title}</h3>
              <span className="sample-duration">{sample.duration}</span>
            </div>

            <div className="sample-waveform">
              {/* Animated waveform visualization */}
              <div className="waveform-bars">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="waveform-bar"
                    style={{
                      animationDelay: `${i * 0.05}s`,
                      height: `${20 + Math.random() * 60}%`
                    }}
                  />
                ))}
              </div>
              {playingSample === sample.id && (
                <div className="progress-bar" style={{ width: `${audioProgress}%` }} />
              )}
            </div>

            {showSubtitles && (
              <p className={`sample-text ${playingSample === sample.id ? 'typing' : ''}`}>
                {sample.text}
              </p>
            )}

            <div className="sample-controls">
              <button 
                className="play-button"
                onClick={() => handlePlaySample(sample.id)}
              >
                {playingSample === sample.id ? (
                  <span className="control-icon">⏸️</span>
                ) : (
                  <span className="control-icon">▶️</span>
                )}
              </button>

              <div className="sample-actions">
                <button 
                  className="action-button"
                  onClick={() => handleDownload(sample.id)}
                  title="Download as ringtone"
                >
                  <span className="action-icon">💾</span>
                </button>
                <button 
                  className="action-button"
                  onClick={() => handleShare(sample.id)}
                  title="Share whisper"
                >
                  <span className="action-icon">🔗</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audio Controls */}
      <div className="audio-controls">
        <div className="volume-control">
          <span className="control-label">🔊</span>
          <div className="volume-slider-container">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <div className="volume-jewel" style={{ left: `${volume * 100}%` }} />
          </div>
          <span className="volume-value">{Math.round(volume * 100)}%</span>
        </div>

        <div className="subtitle-toggle">
          <label className="toggle-label">
            <input 
              type="checkbox" 
              checked={showSubtitles}
              onChange={(e) => setShowSubtitles(e.target.checked)}
              className="toggle-input"
            />
            <span className="toggle-switch" />
            <span className="toggle-text">Subtitles</span>
          </label>
        </div>
      </div>

      {/* Hidden audio element for actual playback */}
      <audio 
        ref={audioRef} 
        onEnded={() => {
          setPlayingSample(null);
          setAudioProgress(0);
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
        }}
      />
      
      {/* Loading overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
          <p className="type-body">Loading audio samples...</p>
        </div>
      )}
    </div>
  );
};

export default StrategicWhisperAudio;