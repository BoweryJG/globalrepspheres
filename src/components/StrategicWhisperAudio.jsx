import React, { useState, useRef, useEffect } from 'react';
import './StrategicWhisperAudio.css';

// Audio samples configuration
const audioSamples = {
  openingHooks: [
    {
      id: 'hook1',
      title: 'Cold Call Crusher',
      text: "Listen kid, while they're still cold calling, you're already in their inbox with perfect timing.",
      duration: '0:04',
      category: 'opening'
    },
    {
      id: 'hook2',
      title: 'The Speed Advantage',
      text: "They're typing one email. You just sent 1,000. That's the difference between us and them.",
      duration: '0:05',
      category: 'opening'
    },
    {
      id: 'hook3',
      title: 'Data Domination',
      text: "See that spike in their prescribing data? That's your opening. Strike now.",
      duration: '0:04',
      category: 'opening'
    }
  ],
  objectionHandlers: [
    {
      id: 'objection1',
      title: 'Doctor Pushback',
      text: "Doctor's pushing back? Here's your move: 'I understand your concerns. Let me show you the patient outcomes.'",
      duration: '0:06',
      category: 'objection'
    },
    {
      id: 'objection2',
      title: 'Price Resistance',
      text: "Price objection? Flip it. 'What's the cost of not having the best treatment option for your patients?'",
      duration: '0:05',
      category: 'objection'
    },
    {
      id: 'objection3',
      title: 'Time Constraint',
      text: "No time? Perfect. 'I'll send you a 2-minute video summary. Watch it between patients.'",
      duration: '0:05',
      category: 'objection'
    }
  ],
  closingLines: [
    {
      id: 'close1',
      title: 'The Assumptive Close',
      text: "Time to close. Say this exactly: 'I'll have the samples delivered Tuesday. Morning or afternoon?'",
      duration: '0:05',
      category: 'closing'
    },
    {
      id: 'close2',
      title: 'The Partnership Close',
      text: "Look them in the eye: 'Let's start with your top 10 patients. We'll track the outcomes together.'",
      duration: '0:05',
      category: 'closing'
    },
    {
      id: 'close3',
      title: 'The Urgency Close',
      text: "Create urgency: 'The program pricing ends Friday. Let's lock in your savings now.'",
      duration: '0:04',
      category: 'closing'
    }
  ],
  motivational: [
    {
      id: 'motivate1',
      title: 'Empire Builder',
      text: "You're not a rep. You're an empire builder. Every call is a brick in your fortress.",
      duration: '0:04',
      category: 'motivational'
    },
    {
      id: 'motivate2',
      title: 'Winner\'s Mindset',
      text: "Winners don't wait for opportunities. They create them. Now get out there and dominate.",
      duration: '0:04',
      category: 'motivational'
    },
    {
      id: 'motivate3',
      title: 'The 75x Difference',
      text: "While they're making one call, you're closing 75 deals. That's not unfair. That's evolution.",
      duration: '0:05',
      category: 'motivational'
    }
  ],
  dataInsights: [
    {
      id: 'data1',
      title: 'Prescribing Pattern Alert',
      text: "Their prescribing pattern shows vulnerability here. They switched formularies last month. Strike now.",
      duration: '0:05',
      category: 'data'
    },
    {
      id: 'data2',
      title: 'Timing Intelligence',
      text: "Best contact window: Tuesdays, 2-4 PM. Their schedule shows a gap. That's your moment.",
      duration: '0:05',
      category: 'data'
    },
    {
      id: 'data3',
      title: 'Competitor Weakness',
      text: "Your competitor just had a recall. Their customers are looking for alternatives. Move fast.",
      duration: '0:05',
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

  const handlePlaySample = (sampleId) => {
    if (playingSample === sampleId) {
      // Stop playing
      setPlayingSample(null);
      setAudioProgress(0);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      // Start playing
      setPlayingSample(sampleId);
      setAudioProgress(0);
      
      // Simulate audio playback (in real implementation, use actual audio files)
      const sample = allSamples.find(s => s.id === sampleId);
      if (sample) {
        const duration = parseInt(sample.duration.split(':')[1]) * 1000;
        
        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setAudioProgress((progress / duration) * 100);
          
          if (progress >= duration) {
            clearInterval(interval);
            setPlayingSample(null);
            setAudioProgress(0);
          }
        }, 10);
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
      <audio ref={audioRef} />
    </div>
  );
};

export default StrategicWhisperAudio;