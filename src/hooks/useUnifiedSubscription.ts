/**
 * Unified Subscription Hook for Canvas with Rep^x Integration
 * 
 * This hook extends the existing SubscriptionContext with Rep^x tier mappings
 * and Canvas-specific functionality while maintaining full backend compatibility.
 */

import { useState, useEffect, useMemo } from 'react';
import { useSubscription } from '../contexts/SubscriptionContext';
import {
  getRepxTier,
  getCanvasFeatures,
  canPerformScan,
  getRemainingScans,
  getNextRepxTier,
  formatRepxTierName,
  type RepxTier,
  type BackendTier,
  type CanvasFeatures,
  type UseCanvasSubscriptionReturn
} from '../services/subscriptionService';

/**
 * Track daily scan usage (resets daily)
 */
function useDailyScanUsage() {
  const [scansUsedToday, setScansUsedToday] = useState(0);
  const [lastResetDate, setLastResetDate] = useState<string>('');

  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('canvas-daily-scans');
    const storedDate = localStorage.getItem('canvas-scan-date');

    if (storedDate !== today) {
      // New day, reset usage
      setScansUsedToday(0);
      setLastResetDate(today);
      localStorage.setItem('canvas-daily-scans', '0');
      localStorage.setItem('canvas-scan-date', today);
    } else if (stored) {
      setScansUsedToday(parseInt(stored, 10) || 0);
      setLastResetDate(storedDate || today);
    }
  }, []);

  const incrementScans = () => {
    const newCount = scansUsedToday + 1;
    setScansUsedToday(newCount);
    localStorage.setItem('canvas-daily-scans', newCount.toString());
  };

  return {
    scansUsedToday,
    incrementScans,
    resetDate: lastResetDate
  };
}

/**
 * Main unified subscription hook for Canvas
 */
export function useUnifiedSubscription(): UseCanvasSubscriptionReturn {
  const originalSubscription = useSubscription();
  const { scansUsedToday, incrementScans } = useDailyScanUsage();
  
  // Convert backend tier to Rep^x tier
  const backendTier = (originalSubscription.tier || 'free') as BackendTier;
  const repxTier = getRepxTier(backendTier);
  
  // Get Canvas-specific features for this Rep^x tier
  const canvasFeatures = getCanvasFeatures(repxTier);
  
  // Calculate scan availability
  const canScan = canPerformScan(repxTier, scansUsedToday);
  const remainingScans = getRemainingScans(repxTier, scansUsedToday);
  
  // Utility functions
  const hasFeature = (feature: keyof CanvasFeatures): boolean => {
    return !!canvasFeatures[feature];
  };
  
  const getUpgradeMessage = (): string | null => {
    if (!canvasFeatures.canvasAccess) {
      return `Upgrade to ${formatRepxTierName('repx2')} to access Canvas`;
    }
    
    if (canvasFeatures.scansPerDay !== -1 && scansUsedToday >= canvasFeatures.scansPerDay) {
      const nextTier = getNextRepxTier(repxTier);
      if (nextTier) {
        return `Daily scan limit reached. Upgrade to ${formatRepxTierName(nextTier)} for more scans`;
      }
      return 'Daily scan limit reached. Resets tomorrow';
    }
    
    if (canvasFeatures.scansPerDay !== -1 && scansUsedToday >= canvasFeatures.scansPerDay * 0.8) {
      return `You've used ${scansUsedToday} of ${canvasFeatures.scansPerDay} daily scans`;
    }
    
    return null;
  };
  
  const getNextTier = (): RepxTier | null => {
    return getNextRepxTier(repxTier);
  };
  
  const incrementScanUsage = async (): Promise<void> => {
    try {
      // Increment local daily usage
      incrementScans();
      
      // Also increment the backend usage tracking if needed
      // This maintains compatibility with existing backend tracking
      if (originalSubscription.incrementUsage) {
        await originalSubscription.incrementUsage('canvas_briefs');
      }
    } catch (error) {
      console.error('Error incrementing scan usage:', error);
      // Still increment local usage even if backend fails
      incrementScans();
    }
  };
  
  const refreshSubscription = async (): Promise<void> => {
    if (originalSubscription.refreshSubscription) {
      await originalSubscription.refreshSubscription();
    }
    if (originalSubscription.refreshUsage) {
      await originalSubscription.refreshUsage();
    }
  };

  return {
    // Original subscription data
    originalTier: backendTier,
    originalSubscription: originalSubscription,
    
    // Rep^x integration
    repxTier,
    canvasFeatures,
    
    // Usage tracking
    scansUsedToday,
    canScan,
    remainingScans,
    
    // Utility functions
    hasFeature,
    getUpgradeMessage,
    getNextTier,
    
    // Actions
    loading: originalSubscription.loading,
    refreshSubscription,
    incrementScanUsage,
  };
}

/**
 * Hook for checking specific Canvas features
 */
export function useCanvasFeatureAccess() {
  const subscription = useUnifiedSubscription();
  
  return {
    canAccessCanvas: subscription.canvasFeatures.canvasAccess,
    canPerformScan: subscription.canScan,
    hasAiCoaching: subscription.hasFeature('aiCoaching'),
    hasTerritoryMapping: subscription.hasFeature('territoryMapping'),
    hasCustomAiModels: subscription.hasFeature('customAiModels'),
    remainingScans: subscription.remainingScans,
    upgradeMessage: subscription.getUpgradeMessage(),
    nextTier: subscription.getNextTier(),
    repxTier: subscription.repxTier,
    repxTierName: formatRepxTierName(subscription.repxTier),
  };
}

/**
 * Hook for Canvas upgrade prompts
 */
export function useCanvasUpgradePrompt() {
  const subscription = useUnifiedSubscription();
  
  const shouldShowUpgrade = useMemo(() => {
    const message = subscription.getUpgradeMessage();
    return !!message;
  }, [subscription]);
  
  const upgradePromptData = useMemo(() => {
    if (!shouldShowUpgrade) return null;
    
    const nextTier = subscription.getNextTier();
    const message = subscription.getUpgradeMessage();
    
    return {
      currentTier: subscription.repxTier,
      currentTierName: formatRepxTierName(subscription.repxTier),
      nextTier,
      nextTierName: nextTier ? formatRepxTierName(nextTier) : null,
      message,
      urgency: subscription.canScan ? 'warning' : 'error',
      scansUsed: subscription.scansUsedToday,
      scansLimit: subscription.canvasFeatures.scansPerDay,
    };
  }, [subscription, shouldShowUpgrade]);
  
  return {
    shouldShowUpgrade,
    upgradePromptData,
  };
}

export default useUnifiedSubscription;