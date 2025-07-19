/**
 * Canvas Subscription Service - Rep^x Tier Integration
 * 
 * This service maintains compatibility with the existing osbackend subscription system
 * while providing Rep^x tier naming and Canvas-specific feature mappings.
 * 
 * IMPORTANT: This service does NOT replace the existing SubscriptionContext.js.
 * It extends it with Rep^x tier mappings for Canvas components.
 */

import { useSubscription } from '../contexts/SubscriptionContext';

// Rep^x tier mapping to existing backend tiers
export const REPX_TIER_MAPPING = {
  // Backend tier -> Rep^x tier
  free: 'repx1',
  explorer: 'repx2', 
  professional: 'repx3',
  growth: 'repx4',
  enterprise: 'repx5',
  elite: 'repx5', // Elite maps to repx5 as well
} as const;

// Reverse mapping for backend compatibility
export const BACKEND_TIER_MAPPING = {
  repx1: 'free',
  repx2: 'explorer',
  repx3: 'professional', 
  repx4: 'growth',
  repx5: 'enterprise', // Default to enterprise for repx5
} as const;

// Canvas-specific feature limits per Rep^x tier
export const CANVAS_REPX_LIMITS = {
  repx1: {
    // No Canvas access
    canvasAccess: false,
    scansPerDay: 0,
    aiCoaching: false,
    territoryMapping: false,
    customAiModels: false,
    description: 'No Canvas access'
  },
  repx2: {
    // Basic Canvas (10 scans/day)
    canvasAccess: true,
    scansPerDay: 10,
    aiCoaching: false,
    territoryMapping: false,
    customAiModels: false,
    description: 'Basic Canvas - 10 scans/day'
  },
  repx3: {
    // Full Canvas (25 scans/day) + territory mapping
    canvasAccess: true,
    scansPerDay: 25,
    aiCoaching: false,
    territoryMapping: true,
    customAiModels: false,
    description: 'Full Canvas - 25 scans/day + territory mapping'
  },
  repx4: {
    // Advanced Canvas (50 scans/day) + AI coaching
    canvasAccess: true,
    scansPerDay: 50,
    aiCoaching: true,
    territoryMapping: true,
    customAiModels: false,
    description: 'Advanced Canvas - 50 scans/day + AI coaching + territory mapping'
  },
  repx5: {
    // Unlimited Canvas + custom AI models
    canvasAccess: true,
    scansPerDay: -1, // unlimited
    aiCoaching: true,
    territoryMapping: true,
    customAiModels: true,
    description: 'Unlimited Canvas + custom AI models + all features'
  }
} as const;

export type RepxTier = keyof typeof CANVAS_REPX_LIMITS;
export type BackendTier = keyof typeof REPX_TIER_MAPPING;
export type CanvasFeatures = typeof CANVAS_REPX_LIMITS[RepxTier];

/**
 * Convert backend tier to Rep^x tier
 */
export function getRepxTier(backendTier: BackendTier): RepxTier {
  return REPX_TIER_MAPPING[backendTier] || 'repx1';
}

/**
 * Convert Rep^x tier to backend tier  
 */
export function getBackendTier(repxTier: RepxTier): BackendTier {
  return BACKEND_TIER_MAPPING[repxTier] || 'free';
}

/**
 * Get Canvas features for a Rep^x tier
 */
export function getCanvasFeatures(repxTier: RepxTier): CanvasFeatures {
  return CANVAS_REPX_LIMITS[repxTier];
}

/**
 * Check if user has access to Canvas
 */
export function hasCanvasAccess(repxTier: RepxTier): boolean {
  return CANVAS_REPX_LIMITS[repxTier].canvasAccess;
}

/**
 * Check if user can perform a scan (has remaining scans)
 */
export function canPerformScan(repxTier: RepxTier, scansUsedToday: number = 0): boolean {
  const features = CANVAS_REPX_LIMITS[repxTier];
  
  if (!features.canvasAccess) return false;
  if (features.scansPerDay === -1) return true; // unlimited
  
  return scansUsedToday < features.scansPerDay;
}

/**
 * Get remaining scans for today
 */
export function getRemainingScans(repxTier: RepxTier, scansUsedToday: number = 0): number | 'unlimited' {
  const features = CANVAS_REPX_LIMITS[repxTier];
  
  if (!features.canvasAccess) return 0;
  if (features.scansPerDay === -1) return 'unlimited';
  
  return Math.max(0, features.scansPerDay - scansUsedToday);
}

/**
 * Get the next Rep^x tier for upgrade prompts
 */
export function getNextRepxTier(currentTier: RepxTier): RepxTier | null {
  const tierOrder: RepxTier[] = ['repx1', 'repx2', 'repx3', 'repx4', 'repx5'];
  const currentIndex = tierOrder.indexOf(currentTier);
  
  if (currentIndex === -1 || currentIndex === tierOrder.length - 1) {
    return null; // Invalid tier or already at highest
  }
  
  return tierOrder[currentIndex + 1];
}

/**
 * Format Rep^x tier name for display
 */
export function formatRepxTierName(tier: RepxTier): string {
  const names = {
    repx1: 'Rep^1',
    repx2: 'Rep^2', 
    repx3: 'Rep^3',
    repx4: 'Rep^4',
    repx5: 'Rep^5'
  };
  
  return names[tier] || tier;
}

/**
 * Extended subscription context for Canvas with Rep^x integration
 */
export interface CanvasSubscription {
  // Original subscription data from backend
  originalTier: BackendTier;
  originalSubscription: any;
  
  // Rep^x mapping
  repxTier: RepxTier;
  canvasFeatures: CanvasFeatures;
  
  // Usage tracking
  scansUsedToday: number;
  canScan: boolean;
  remainingScans: number | 'unlimited';
  
  // Utility functions
  hasFeature: (feature: keyof CanvasFeatures) => boolean;
  getUpgradeMessage: () => string | null;
  getNextTier: () => RepxTier | null;
}

// This will be implemented in the hook file
export interface UseCanvasSubscriptionReturn extends CanvasSubscription {
  loading: boolean;
  refreshSubscription: () => Promise<void>;
  incrementScanUsage: () => Promise<void>;
}