export interface Unit {
  name: string;
  quality: string;
  access: string;
}

export interface Species {
  units: Record<string, Unit>;
  huntTypes: string[];
}

export interface State {
  name: string;
  species: Record<string, Species>;
}

export interface DrawOdds {
  [key: number]: number;
}

export interface HuntStats {
  tags: number;
  applicants: number;
  pointsNeeded: string;
  trend: string;
  quality: string;
  success: string;
  avgSize: string;
  difficulty: string;
}

export interface ApplicationInfo {
  deadline: string;
  resultsDate: string;
  drawDate: string;
  huntSeasons: Record<string, string>;
}

export interface PointStrategy {
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  recommendedPoints: string;
  targetOdds: string;
  huntQuality: string[];
}

export interface HuntingData {
  states: Record<string, State>;
  drawOdds: Record<string, DrawOddsData>;
  huntStats: Record<string, HuntStats>;
  applicationInfo: Record<string, ApplicationInfo>;
}

export interface CalculatorForm {
  state: string;
  species: string;
  unit: string;
  huntType: string;
  residency: 'resident' | 'nonresident';
  points: number;
}

export interface StrategyForm {
  targetSpecies: string[];
  targetStates: string[];
  myPoints: number;
  strategy: 'conservative' | 'balanced' | 'aggressive' | 'points-builder';
  minOdds: number;
  maxPoints: number;
}

export interface CalculationResult {
  odds: number;
  stats: HuntStats | Record<string, any>;
  recommendations: Recommendation[];
  confidence?: number;
  reasoning?: string;
  historicalContext?: string;
  alternativeOptions?: Array<{
    state: string;
    unit: string;
    huntType: string;
    odds: number;
    reason: string;
  }>;
}

export interface HuntingFormData {
  state: string;
  species: string;
  unit: string;
  huntType: string;
  residency: 'resident' | 'nonresident';
  points: number;
}

export interface DrawOddsResult {
  odds: number;
  confidence?: number;
  reasoning?: string;
  historicalContext?: string;
  recommendations: Recommendation[];
  alternativeOptions?: Array<{
    state: string;
    unit: string;
    huntType: string;
    odds: number;
    reason: string;
  }>;
}

export interface StrategicOpportunity {
  state: string;
  species: string;
  unit: string;
  huntType: string;
  odds: number;
  maxOdds: number;
  minPoints: number;
  pointsNeeded: number;
  quality: string;
  trend: string;
  success: number;
  avgSize: number;
  difficulty: string;
  reasoning?: string;
  drawStrategy?: string;
  backupOptions?: string[];
  timing?: string;
}

export interface CalculatorFormData {
  state: string;
  species: string;
  unit: string;
  season: string;
  residency: 'resident' | 'nonresident';
  points: number;
}

export interface StrategyCriteria {
  states?: string[];
  species?: string[];
  huntTypes?: string[];
  maxPoints?: number;
  minOdds?: number;
}

export interface DrawOddsData {
  [points: number]: number;
}

export interface HuntUnit {
  name: string;
  quality: string;
  access: string;
}

export interface Recommendation {
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  text: string;
}

export interface ChartDataPoint {
  pointLevel: string;
  odds: number;
}

// New interfaces for Utah GIS integration
export interface UtahHuntUnit {
  unitId: string;
  unitName: string;
  species: string[];
  huntMethods: string[]; // archery, rifle, muzzleloader, etc.
  seasonType: string; // general, limited-entry, extended-archery, etc.
  boundaries?: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][];
  };
  huntCodes?: string[];
  seasonDates?: {
    [method: string]: {
      start: string;
      end: string;
    };
  };
  restrictions?: string[];
  landOwnership?: {
    public: number;
    private: number;
    state: number;
  };
}

export interface GISDataSource {
  endpoint: string;
  layerId: string;
  lastUpdated?: Date;
  cacheExpiry?: number; // hours
}

export interface UtahHuntingData {
  units: UtahHuntUnit[];
  lastSync: Date;
  dataSource: GISDataSource;
  species: {
    [key: string]: {
      name: string;
      methods: string[];
      generalSeasonUnits: string[];
      limitedEntryUnits: string[];
    };
  };
} 