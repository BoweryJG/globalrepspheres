// Mock for wavesurfer.js
export default {
  create: jest.fn().mockReturnValue({
    load: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
    destroy: jest.fn(),
    on: jest.fn(),
    un: jest.fn(),
    getCurrentTime: jest.fn().mockReturnValue(0),
    getDuration: jest.fn().mockReturnValue(0),
    setVolume: jest.fn(),
    setPlaybackRate: jest.fn(),
    seekTo: jest.fn(),
    isPlaying: jest.fn().mockReturnValue(false),
  }),
};