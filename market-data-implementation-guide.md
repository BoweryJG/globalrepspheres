# Market Data App: Public/Protected Content Implementation Guide

## Overview
Transform the Market Data Intelligence app to implement a freemium model with public teaser content and tier-based access control.

## Current State Analysis

### App Location
- **Repository**: `/Users/jasonsmacbookpro2022/Market Data - RepSpheres`
- **Production URL**: `https://marketdata.repspheres.com`
- **Tech Stack**: React + TypeScript, Vite, Material-UI, Supabase

### Existing Authentication
✅ **Already Has**:
- Supabase authentication integration
- Basic AuthContext with signIn/signUp/signOut
- Cross-domain auth via main RepSpheres platform

❌ **Missing**:
- Subscription tier awareness
- Data access restrictions
- Usage tracking and limits

## Implementation Plan

### Phase 1: Shared Authentication Module

#### 1.1 Create Shared Package (Recommended)
```bash
# Create shared auth package
mkdir ../shared-auth
cd ../shared-auth
npm init -y
```

**Package Structure**:
```
shared-auth/
├── src/
│   ├── contexts/
│   │   ├── AuthContext.ts
│   │   └── SubscriptionContext.ts
│   ├── utils/
│   │   ├── crossDomainAuth.ts
│   │   └── tierUtils.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

#### 1.2 Alternative: Copy Context Files
Copy from main app to Market Data app:
- `src/contexts/SubscriptionContext.js` → `src/contexts/SubscriptionContext.tsx`
- Update AuthContext to include subscription data
- Add tier utility functions

### Phase 2: Backend API Updates

#### 2.1 Add Tier Validation Endpoints
**New API Endpoints** (in `/osbackend`):
```javascript
// GET /api/market-data/procedures?tier=professional&limit=50
// GET /api/market-data/teaser?limit=20
// POST /api/usage/track-procedure-view
```

#### 2.2 Database Changes
**Add to Supabase**:
```sql
-- Add tier-based access control
ALTER TABLE procedures ADD COLUMN tier_required VARCHAR(20) DEFAULT 'free';
ALTER TABLE procedures ADD COLUMN is_premium BOOLEAN DEFAULT false;

-- Usage tracking
CREATE TABLE procedure_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  procedure_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Phase 3: Market Data App Frontend Updates

#### 3.1 Update Services Layer

**File**: `src/services/comprehensiveDataService.ts`
```typescript
interface DataServiceConfig {
  userTier: string;
  isAuthenticated: boolean;
  maxProcedures: number;
}

class ComprehensiveDataService {
  async getMarketData(config: DataServiceConfig): Promise<MarketData> {
    if (!config.isAuthenticated) {
      return this.getTeaserData();
    }
    
    return this.getTieredData(config);
  }
  
  private async getTeaserData(): Promise<MarketData> {
    // Return top 50 procedures with limited data
    const { data } = await supabase
      .from('procedures')
      .select('name, category, basic_info')
      .eq('is_public_teaser', true)
      .limit(50);
    
    return { procedures: data, isTeaser: true };
  }
  
  private async getTieredData(config: DataServiceConfig): Promise<MarketData> {
    // Return data based on subscription tier
    const limit = config.maxProcedures === -1 ? 1000 : config.maxProcedures;
    
    const { data } = await supabase
      .from('procedures')
      .select('*')
      .limit(limit);
    
    return { procedures: data, isTeaser: false };
  }
}
```

#### 3.2 Update AuthContext

**File**: `src/context/AuthContext.tsx`
```typescript
interface AuthContextType {
  user: User | null;
  subscription: SubscriptionData | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAccess: (feature: string) => boolean;
  incrementUsage: (feature: string) => Promise<void>;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  
  const checkAccess = (feature: string): boolean => {
    if (!subscription) return false;
    return subscription.limits[feature] === -1 || 
           subscription.usage[feature] < subscription.limits[feature];
  };
  
  // ... rest of implementation
};
```

#### 3.3 Create Teaser Mode Components

**File**: `src/components/TeaserMode/TeaserDataTable.tsx`
```typescript
interface TeaserDataTableProps {
  procedures: Procedure[];
  onUpgradeClick: () => void;
}

export const TeaserDataTable: React.FC<TeaserDataTableProps> = ({
  procedures,
  onUpgradeClick
}) => {
  return (
    <Card>
      <CardHeader 
        title="Top Market Procedures" 
        action={
          <Button 
            variant="contained" 
            color="primary"
            onClick={onUpgradeClick}
          >
            Unlock Full Data
          </Button>
        }
      />
      <Table>
        {procedures.map((procedure) => (
          <TableRow key={procedure.id}>
            <TableCell>{procedure.name}</TableCell>
            <TableCell>{procedure.category}</TableCell>
            <TableCell>
              <Box sx={{ filter: 'blur(4px)' }}>
                ${procedure.price}
              </Box>
            </TableCell>
            <TableCell>
              <Chip label="Premium" color="warning" />
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <CardActions>
        <Button fullWidth variant="outlined" onClick={onUpgradeClick}>
          Sign Up to See Full Market Intelligence
        </Button>
      </CardActions>
    </Card>
  );
};
```

#### 3.4 Create Access Control Hook

**File**: `src/hooks/useAccessControl.ts`
```typescript
export const useAccessControl = () => {
  const { subscription, incrementUsage } = useAuth();
  
  const checkFeatureAccess = (feature: string): AccessResult => {
    if (!subscription) {
      return { hasAccess: false, reason: 'authentication_required' };
    }
    
    const limit = subscription.limits[feature];
    const usage = subscription.usage[feature];
    
    if (limit === -1) return { hasAccess: true };
    if (usage >= limit) return { hasAccess: false, reason: 'limit_exceeded' };
    
    return { hasAccess: true };
  };
  
  const trackUsage = async (feature: string) => {
    await incrementUsage(feature);
  };
  
  return { checkFeatureAccess, trackUsage };
};
```

### Phase 4: UI Implementation

#### 4.1 Update Main Dashboard

**File**: `src/components/ActionableSalesDashboard.tsx`
```typescript
export const ActionableSalesDashboard: React.FC = () => {
  const { user, subscription } = useAuth();
  const { checkFeatureAccess } = useAccessControl();
  const [data, setData] = useState<MarketData | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      const config = {
        userTier: subscription?.tier || 'free',
        isAuthenticated: !!user,
        maxProcedures: subscription?.limits.market_procedures || 20
      };
      
      const marketData = await dataService.getMarketData(config);
      setData(marketData);
    };
    
    loadData();
  }, [user, subscription]);
  
  if (!user) {
    return <TeaserMode data={data} />;
  }
  
  return <FullDashboard data={data} />;
};
```

#### 4.2 Add Upgrade Prompts

**File**: `src/components/UpgradePrompt.tsx`
```typescript
export const UpgradePrompt: React.FC<{
  feature: string;
  onUpgrade: () => void;
}> = ({ feature, onUpgrade }) => {
  const { subscription } = useAuth();
  const usage = subscription?.usage[feature] || 0;
  const limit = subscription?.limits[feature] || 0;
  const percentage = (usage / limit) * 100;
  
  if (percentage < 80) return null;
  
  return (
    <Alert 
      severity={percentage >= 100 ? "error" : "warning"}
      action={
        <Button color="inherit" onClick={onUpgrade}>
          Upgrade Now
        </Button>
      }
    >
      {percentage >= 100 
        ? `You've reached your ${feature} limit. Upgrade to continue.`
        : `${limit - usage} ${feature} remaining this month.`
      }
    </Alert>
  );
};
```

### Phase 5: Deployment Checklist

#### 5.1 Environment Variables
```bash
# Market Data app .env
VITE_SUPABASE_URL=https://cbopynuvhcymbumjnvay.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_BACKEND_URL=https://osbackend-zl1h.onrender.com
VITE_MAIN_DOMAIN=https://repspheres.com
```

#### 5.2 Supabase Configuration
Ensure consistent Supabase setup across all apps:
```javascript
const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    storageKey: 'repspheres-auth',
    cookieOptions: {
      domain: '.repspheres.com',
      sameSite: 'lax',
      secure: true
    }
  }
});
```

#### 5.3 Testing Strategy
1. **Public Access**: Verify teaser content shows for non-authenticated users
2. **Authentication Flow**: Test login redirects and cross-domain auth
3. **Tier Enforcement**: Verify data limits based on subscription tier
4. **Upgrade Flow**: Test upgrade prompts and Stripe integration
5. **Usage Tracking**: Confirm usage increments correctly

## Implementation Priority

1. **High Priority**: Teaser mode and authentication integration
2. **Medium Priority**: Tier-based data filtering
3. **Low Priority**: Advanced upgrade prompts and analytics

## Estimated Timeline
- **Phase 1-2**: 2-3 days (Backend + Shared module)
- **Phase 3-4**: 3-4 days (Frontend implementation)
- **Phase 5**: 1 day (Testing and deployment)
- **Total**: ~1 week

This implementation will transform the Market Data app into a powerful freemium acquisition tool while maintaining the premium value for paying subscribers.