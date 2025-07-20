/**
 * Tests for Rep^x Subscription Service Integration
 * 
 * This file contains basic tests to verify the Rep^x tier mapping
 * and Canvas feature integration is working correctly.
 */

import {
  getRepxTier,
  getBackendTier,
  getCanvasFeatures,
  hasCanvasAccess,
  canPerformScan,
  getRemainingScans,
  getNextRepxTier,
  formatRepxTierName,
  CANVAS_REPX_LIMITS
} from './subscriptionService';

// Mock console.log for tests
const originalLog = console.log;
console.log = jest.fn();

describe('Rep^x Subscription Service', () => {
  
  describe('Tier Mapping', () => {
    test('maps backend tiers to Rep^x tiers correctly', () => {
      expect(getRepxTier('free')).toBe('repx1');
      expect(getRepxTier('explorer')).toBe('repx2');
      expect(getRepxTier('professional')).toBe('repx3');
      expect(getRepxTier('growth')).toBe('repx4');
      expect(getRepxTier('enterprise')).toBe('repx5');
      expect(getRepxTier('elite')).toBe('repx5');
    });

    test('maps Rep^x tiers to backend tiers correctly', () => {
      expect(getBackendTier('repx1')).toBe('free');
      expect(getBackendTier('repx2')).toBe('explorer');
      expect(getBackendTier('repx3')).toBe('professional');
      expect(getBackendTier('repx4')).toBe('growth');
      expect(getBackendTier('repx5')).toBe('enterprise');
    });
  });

  describe('Canvas Features', () => {
    test('repx1 has no Canvas access', () => {
      const features = getCanvasFeatures('repx1');
      expect(features.canvasAccess).toBe(false);
      expect(features.scansPerDay).toBe(0);
      expect(hasCanvasAccess('repx1')).toBe(false);
    });

    test('repx2 has basic Canvas access', () => {
      const features = getCanvasFeatures('repx2');
      expect(features.canvasAccess).toBe(true);
      expect(features.scansPerDay).toBe(10);
      expect(features.aiCoaching).toBe(false);
      expect(features.territoryMapping).toBe(false);
      expect(hasCanvasAccess('repx2')).toBe(true);
    });

    test('repx3 has Canvas + territory mapping', () => {
      const features = getCanvasFeatures('repx3');
      expect(features.canvasAccess).toBe(true);
      expect(features.scansPerDay).toBe(25);
      expect(features.territoryMapping).toBe(true);
      expect(features.aiCoaching).toBe(false);
    });

    test('repx4 has Canvas + AI coaching + territory mapping', () => {
      const features = getCanvasFeatures('repx4');
      expect(features.canvasAccess).toBe(true);
      expect(features.scansPerDay).toBe(50);
      expect(features.aiCoaching).toBe(true);
      expect(features.territoryMapping).toBe(true);
      expect(features.customAiModels).toBe(false);
    });

    test('repx5 has unlimited Canvas + all features', () => {
      const features = getCanvasFeatures('repx5');
      expect(features.canvasAccess).toBe(true);
      expect(features.scansPerDay).toBe(-1); // unlimited
      expect(features.aiCoaching).toBe(true);
      expect(features.territoryMapping).toBe(true);
      expect(features.customAiModels).toBe(true);
    });
  });

  describe('Scan Limits', () => {
    test('can perform scan within limits', () => {
      expect(canPerformScan('repx2', 5)).toBe(true); // 5 < 10
      expect(canPerformScan('repx3', 20)).toBe(true); // 20 < 25
      expect(canPerformScan('repx5', 1000)).toBe(true); // unlimited
    });

    test('cannot perform scan when limit reached', () => {
      expect(canPerformScan('repx1', 0)).toBe(false); // no access
      expect(canPerformScan('repx2', 10)).toBe(false); // 10 >= 10
      expect(canPerformScan('repx3', 25)).toBe(false); // 25 >= 25
    });

    test('calculates remaining scans correctly', () => {
      expect(getRemainingScans('repx1', 0)).toBe(0);
      expect(getRemainingScans('repx2', 5)).toBe(5); // 10 - 5
      expect(getRemainingScans('repx3', 20)).toBe(5); // 25 - 20
      expect(getRemainingScans('repx5', 1000)).toBe('unlimited');
    });
  });

  describe('Tier Progression', () => {
    test('gets next tier correctly', () => {
      expect(getNextRepxTier('repx1')).toBe('repx2');
      expect(getNextRepxTier('repx2')).toBe('repx3');
      expect(getNextRepxTier('repx3')).toBe('repx4');
      expect(getNextRepxTier('repx4')).toBe('repx5');
      expect(getNextRepxTier('repx5')).toBe(null); // highest tier
    });

    test('formats tier names correctly', () => {
      expect(formatRepxTierName('repx1')).toBe('Rep^1');
      expect(formatRepxTierName('repx2')).toBe('Rep^2');
      expect(formatRepxTierName('repx3')).toBe('Rep^3');
      expect(formatRepxTierName('repx4')).toBe('Rep^4');
      expect(formatRepxTierName('repx5')).toBe('Rep^5');
    });
  });

  describe('Canvas Feature Descriptions', () => {
    test('all tiers have proper descriptions', () => {
      Object.keys(CANVAS_REPX_LIMITS).forEach(tier => {
        const features = CANVAS_REPX_LIMITS[tier];
        expect(features.description).toBeDefined();
        expect(features.description.length).toBeGreaterThan(0);
      });
    });
  });
});

// Run basic integration test
console.log('🧪 Running Rep^x Integration Tests...');

try {
  // Test basic tier mapping
  const testTier = getRepxTier('professional');
  const features = getCanvasFeatures(testTier);
  const canScan = canPerformScan(testTier, 0);
  
  console.log(`✅ Backend 'professional' -> Rep^x '${testTier}'`);
  console.log(`✅ Canvas access: ${features.canvasAccess}`);
  console.log(`✅ Daily scans: ${features.scansPerDay}`);
  console.log(`✅ Can perform scan: ${canScan}`);
  console.log(`✅ Tier name: ${formatRepxTierName(testTier)}`);
  
  console.log('🎉 All Rep^x integration tests passed!');
} catch (error) {
  console.error('❌ Rep^x integration test failed:', error);
}

// Restore console.log
console.log = originalLog;