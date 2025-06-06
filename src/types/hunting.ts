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

export interface HuntingData {
  states: Record<string, State>;
  drawOdds: Record<string, DrawOdds>;
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
  recommendations: string[];
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
  recommendations: string[];
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