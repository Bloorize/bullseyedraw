export interface HuntUnit {
  name: string;
  quality: 'Good' | 'High' | 'Premium' | 'Excellent';
  access: 'Easy' | 'Good' | 'Moderate' | 'Difficult' | 'Very Difficult';
}

export interface SpeciesData {
  units: Record<string, HuntUnit>;
  huntTypes: string[];
}

export interface StateData {
  name: string;
  species: Record<string, SpeciesData>;
}

export interface DrawOddsData {
  [pointLevel: number]: number;
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

export interface StrategicOpportunity {
  id: number;
  state: string;
  species: string;
  unit: string;
  huntType: string;
  drawType: string;
  minPoints: number;
  maxOdds: number;
  tags: number;
  quality: string;
  strategy: string;
  description: string;
}

export interface PointStrategy {
  name: string;
  description: string;
  minOdds: number;
  pointBuilding: boolean;
  riskTolerance: 'Low' | 'Medium' | 'High';
}

export interface HuntingData {
  states: Record<string, StateData>;
  drawOdds: Record<string, DrawOddsData>;
  huntStats: Record<string, HuntStats>;
  applicationInfo: Record<string, ApplicationInfo>;
}

export interface CalculatorFormData {
  species: string;
  state: string;
  unit: string;
  season: string;
  points: number;
  residency: 'resident' | 'nonresident';
}

export interface StrategyFormData {
  targetSpecies: string[];
  targetStates: string[];
  huntTypes: string[];
  myPoints: number;
  minOdds: number;
  strategy: 'conservative' | 'balanced' | 'aggressive' | 'points-builder';
}

export interface CalculationResult {
  odds: number;
  stats: HuntStats;
  formData: CalculatorFormData;
  recommendations: Recommendation[];
  chartData: ChartDataPoint[];
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

export interface StrategyCriteria {
  states?: string[];
  species?: string[];
  huntTypes?: string[];
  maxPoints?: number;
  minOdds?: number;
} 