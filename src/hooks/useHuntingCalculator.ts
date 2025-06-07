'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { huntingData, generateDrawOdds } from '@/lib/huntingData';
import { DataUtils } from '@/lib/dataUtils';
import { HuntingAIService } from '@/lib/aiService';
import type { 
  CalculatorForm, 
  StrategyForm, 
  CalculationResult, 
  StrategicOpportunity,
  HuntingFormData,
  DrawOddsResult
} from '@/types/hunting';

// Environment variable will be accessed in useEffect

const DEFAULT_CALCULATOR_FORM: CalculatorForm = {
  state: '',
  species: '',
  unit: '',
  huntType: '',
  residency: 'resident',
  points: 0
};

const DEFAULT_STRATEGY_FORM: StrategyForm = {
  targetSpecies: [],
  targetStates: [],
  myPoints: 0,
  strategy: 'balanced',
  minOdds: 0,
  maxPoints: 0
};

export function useHuntingCalculator() {
  const [aiService, setAiService] = useState<HuntingAIService | null>(null);
  const [useAI, setUseAI] = useState(false);
  
  // Auto-initialize AI service with environment variable
  useEffect(() => {
    const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
    
    console.log('useEffect - AI initialization check:', {
      hasKey: !!OPENAI_API_KEY,
      startsWithSk: OPENAI_API_KEY.startsWith('sk-'),
      keyLength: OPENAI_API_KEY.length,
      nodeEnv: process.env.NODE_ENV,
      allEnvVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_'))
    });
    
    if (OPENAI_API_KEY && OPENAI_API_KEY.length > 20) {
      console.log('Initializing AI service...');
      setAiService(new HuntingAIService({ apiKey: OPENAI_API_KEY.trim() }));
      setUseAI(true);
    } else {
      console.log('AI service not initialized - invalid or missing API key');
    }
  }, []);

  const [calculatorForm, setCalculatorForm] = useState<CalculatorForm>({
    state: '',
    species: '',
    unit: '',
    huntType: '',
    residency: 'resident',
    points: 0,
  });

  const [strategyForm, setStrategyForm] = useState<StrategyForm>({
    targetStates: [],
    targetSpecies: [],
    myPoints: 0,
    minOdds: 20,
    strategy: 'balanced',
    maxPoints: 0
  });

  const [calculationResult, setCalculationResult] = useState<CalculationResult>({
    odds: 0,
    stats: {},
    recommendations: [],
  });

  const [strategicOpportunities, setStrategicOpportunities] = useState<StrategicOpportunity[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get available units based on state and species
  const availableUnits = useMemo(() => {
    if (!calculatorForm.state || !calculatorForm.species) return [];
    
    const stateData = huntingData.states[calculatorForm.state];
    if (!stateData) return [];
    
    const speciesData = stateData.species[calculatorForm.species];
    if (!speciesData) return [];
    
    return Object.keys(speciesData.units);
  }, [calculatorForm.state, calculatorForm.species]);

  // Get available hunt types based on state, species, and unit
  const availableHuntTypes = useMemo(() => {
    if (!calculatorForm.state || !calculatorForm.species || !calculatorForm.unit) return [];
    
    const stateData = huntingData.states[calculatorForm.state];
    if (!stateData) return [];
    
    const speciesData = stateData.species[calculatorForm.species];
    if (!speciesData) return [];
    
    return speciesData.huntTypes;
  }, [calculatorForm.state, calculatorForm.species, calculatorForm.unit]);

  const calculateDrawOdds = useCallback(async () => {
    setIsCalculating(true);
    setError(null);

    try {
      if (useAI && aiService) {
        // Use AI for calculation
        const formData: HuntingFormData = {
          state: calculatorForm.state,
          species: calculatorForm.species,
          unit: calculatorForm.unit,
          huntType: calculatorForm.huntType,
          residency: calculatorForm.residency,
          points: calculatorForm.points
        };

        const aiAnalysis = await aiService.analyzeDrawOdds(formData);
        
        setCalculationResult({
          odds: aiAnalysis.odds,
          confidence: aiAnalysis.confidence,
          reasoning: aiAnalysis.reasoning,
          historicalContext: aiAnalysis.historicalContext,
          stats: {
            tags: Math.floor(Math.random() * 200) + 50,
            applicants: Math.floor(Math.random() * 5000) + 1000,
            pointsNeeded: `${calculatorForm.points}-${calculatorForm.points + 2}`,
            trend: '↑',
            quality: 'High',
            success: `${aiAnalysis.odds}%`,
            avgSize: `${Math.floor(Math.random() * 50) + 250}"`,
            difficulty: ['Easy', 'Moderate', 'Hard'][Math.floor(Math.random() * 3)]
          },
          recommendations: aiAnalysis.recommendations,
          alternativeOptions: aiAnalysis.alternativeOptions
        });
      } else {
        // Use existing dummy data calculation
        const odds = generateDrawOdds(
          calculatorForm.state,
          calculatorForm.species,
          calculatorForm.unit,
          calculatorForm.huntType,
          calculatorForm.residency,
          calculatorForm.points
        );

        if (odds) {
          setCalculationResult({
            odds: odds.odds,
            stats: {
              tags: odds.stats.tags || 0,
              applicants: odds.stats.applicants || 0,
              pointsNeeded: odds.stats.pointsNeeded || '0',
              trend: odds.stats.trend || '↑',
              quality: odds.stats.quality || 'Good',
              success: odds.stats.success || '0%',
              avgSize: odds.stats.avgSize || '0"',
              difficulty: odds.stats.difficulty || 'Moderate'
            },
            recommendations: [
              {
                type: odds.odds >= 80 ? 'success' :
                      odds.odds >= 50 ? 'info' :
                      odds.odds >= 25 ? 'warning' : 'danger',
                title: odds.odds >= 80 ? 'Excellent Draw Odds' :
                       odds.odds >= 50 ? 'Good Draw Odds' :
                       odds.odds >= 25 ? 'Moderate Draw Odds' : 'Low Draw Odds',
                text: odds.odds >= 80 ? 'You have very high chances of drawing this tag!' :
                      odds.odds >= 50 ? 'You have decent chances of drawing this tag.' :
                      odds.odds >= 25 ? 'This is a competitive hunt. Consider backup options.' :
                      'This is a very competitive hunt. Consider building more points.'
              },
              {
                type: 'info',
                title: 'Points Analysis',
                text: `Typical successful applicants have ${odds.stats.pointsNeeded || '3-5'} points.`
              }
            ]
          });
        } else {
          throw new Error('No historical data available for this hunt combination');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate draw odds');
      setCalculationResult({ odds: 0, stats: {}, recommendations: [] });
    } finally {
      setIsCalculating(false);
    }
  }, [calculatorForm, aiService, useAI]);

  const findStrategicOpportunities = useCallback(async () => {
    setIsCalculating(true);
    setError(null);

    try {
      if (useAI && aiService) {
        // Use AI for strategic opportunities
        const opportunities = await aiService.findStrategicOpportunities(
          strategyForm.targetStates,
          strategyForm.targetSpecies,
          strategyForm.myPoints,
          strategyForm.minOdds
        );
        
        setStrategicOpportunities(opportunities);
      } else {
        // Use existing logic
        const opportunities: StrategicOpportunity[] = [];
        
        strategyForm.targetStates.forEach(state => {
          strategyForm.targetSpecies.forEach(species => {
            const stateData = huntingData.states[state];
            if (!stateData?.species[species]) return;
            
            const speciesData = stateData.species[species];
            Object.entries(speciesData.units).forEach(([unit, unitData]) => {
              speciesData.huntTypes.forEach(huntType => {
                const drawOdds = generateDrawOdds(
                  state,
                  species,
                  unit,
                  huntType,
                  'resident',
                  strategyForm.myPoints
                );
                
                if (drawOdds && drawOdds.odds >= strategyForm.minOdds) {
                  opportunities.push({
                    state,
                    species,
                    unit,
                    huntType,
                    odds: drawOdds.odds,
                    maxOdds: drawOdds.odds + 10,
                    minPoints: strategyForm.myPoints,
                    pointsNeeded: strategyForm.myPoints,
                    quality: unitData.quality,
                    trend: '↑',
                    success: drawOdds.stats.success || 0,
                    avgSize: Math.floor(Math.random() * 50) + 250,
                    difficulty: ['Easy', 'Moderate', 'Hard'][Math.floor(Math.random() * 3)]
                  });
                }
              });
            });
          });
        });
        
        // Sort by odds descending
        opportunities.sort((a, b) => b.odds - a.odds);
        setStrategicOpportunities(opportunities.slice(0, 10));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find opportunities');
      setStrategicOpportunities([]);
    } finally {
      setIsCalculating(false);
    }
  }, [strategyForm, aiService, useAI]);

  const updateCalculatorForm = useCallback(<K extends keyof CalculatorForm>(
    field: K,
    value: CalculatorForm[K]
  ) => {
    setCalculatorForm(prev => {
      const updated = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === 'state') {
        updated.species = '';
        updated.unit = '';
        updated.huntType = '';
      } else if (field === 'species') {
        updated.unit = '';
        updated.huntType = '';
      } else if (field === 'unit') {
        updated.huntType = '';
      }
      
      return updated;
    });
  }, []);

  const updateStrategyForm = useCallback(<K extends keyof StrategyForm>(
    field: K,
    value: StrategyForm[K]
  ) => {
    setStrategyForm(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    calculatorForm,
    strategyForm,
    calculationResult,
    strategicOpportunities,
    isCalculating,
    error,
    availableUnits,
    availableHuntTypes,
    calculateDrawOdds,
    findStrategicOpportunities,
    updateCalculatorForm,
    updateStrategyForm,
    aiService,
    useAI
  };
} 