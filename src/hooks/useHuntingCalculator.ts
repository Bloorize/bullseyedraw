import { useState, useCallback, useMemo } from 'react';
import { DataUtils } from '@/lib/dataUtils';
import type { 
  CalculatorFormData, 
  CalculationResult, 
  StrategyFormData,
  StrategicOpportunity,
  StrategyCriteria 
} from '@/types/hunting';

export const useHuntingCalculator = () => {
  const [calculatorForm, setCalculatorForm] = useState<Partial<CalculatorFormData>>({
    species: '',
    state: '',
    unit: '',
    season: '',
    points: 5,
    residency: 'resident'
  });

  const [strategyForm, setStrategyForm] = useState<Partial<StrategyFormData>>({
    targetSpecies: [],
    targetStates: [],
    huntTypes: [],
    myPoints: 5,
    minOdds: 30,
    strategy: 'balanced'
  });

  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [strategicOpportunities, setStrategicOpportunities] = useState<StrategicOpportunity[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate draw odds
  const calculateDrawOdds = useCallback(async () => {
    setIsCalculating(true);
    setError(null);

    try {
      // Validate form data
      const validation = DataUtils.validateDrawForm(calculatorForm);
      if (!validation.isValid) {
        setError(validation.error || 'Please fill in all required fields');
        return;
      }

      const formData = calculatorForm as CalculatorFormData;

      // Get draw odds
      const odds = DataUtils.getDrawOdds(
        formData.state,
        formData.species,
        formData.unit,
        formData.season,
        formData.residency,
        formData.points
      );

      // Get hunt statistics
      const stats = DataUtils.getHuntStats(
        formData.state,
        formData.species,
        formData.unit,
        formData.season
      );

      if (odds === null || !stats) {
        setError('No historical data available for this hunt combination. Please try a different selection.');
        return;
      }

      // Generate recommendations
      const recommendations = DataUtils.generateRecommendations(odds, stats, formData);

      // Generate chart data
      const chartData = DataUtils.generateChartData(
        formData.state,
        formData.species,
        formData.unit,
        formData.season,
        formData.residency
      );

      setCalculationResult({
        odds,
        stats,
        formData,
        recommendations,
        chartData
      });

    } catch (err) {
      setError('An error occurred while calculating draw odds. Please try again.');
      console.error('Calculation error:', err);
    } finally {
      setIsCalculating(false);
    }
  }, [calculatorForm]);

  // Find strategic opportunities
  const findStrategicOpportunities = useCallback(async () => {
    setIsCalculating(true);
    setError(null);

    try {
      const criteria: StrategyCriteria = {
        states: strategyForm.targetStates || [],
        species: strategyForm.targetSpecies || [],
        huntTypes: strategyForm.huntTypes || [],
        maxPoints: strategyForm.myPoints || 0,
        minOdds: strategyForm.minOdds || 0
      };

      const strategyType = strategyForm.strategy || 'balanced';

      // Find base opportunities
      let opportunities = DataUtils.findOpportunities(criteria);

      // Apply strategy-specific filtering
      opportunities = DataUtils.applyStrategyFiltering(opportunities, strategyType, criteria);

      // Sort by odds (descending) and limit to top 8
      opportunities.sort((a, b) => b.maxOdds - a.maxOdds);
      opportunities = opportunities.slice(0, 8);

      setStrategicOpportunities(opportunities);

    } catch (err) {
      setError('An error occurred while finding opportunities. Please try again.');
      console.error('Strategy search error:', err);
    } finally {
      setIsCalculating(false);
    }
  }, [strategyForm]);

  // Update calculator form field
  const updateCalculatorForm = useCallback((field: keyof CalculatorFormData, value: any) => {
    setCalculatorForm(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear dependent fields when parent fields change
    if (field === 'state' || field === 'species') {
      setCalculatorForm(prev => ({
        ...prev,
        unit: '',
        season: ''
      }));
    }
  }, []);

  // Update strategy form field
  const updateStrategyForm = useCallback((field: keyof StrategyFormData, value: any) => {
    setStrategyForm(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Get available units for current state/species
  const availableUnits = useMemo(() => {
    if (!calculatorForm.state || !calculatorForm.species) return {};
    return DataUtils.getUnits(calculatorForm.state, calculatorForm.species);
  }, [calculatorForm.state, calculatorForm.species]);

  // Get available hunt types for current state/species
  const availableHuntTypes = useMemo(() => {
    if (!calculatorForm.state || !calculatorForm.species) return [];
    return DataUtils.getHuntTypes(calculatorForm.state, calculatorForm.species);
  }, [calculatorForm.state, calculatorForm.species]);

  // Clear results
  const clearResults = useCallback(() => {
    setCalculationResult(null);
    setStrategicOpportunities([]);
    setError(null);
  }, []);

  // Reset forms
  const resetCalculatorForm = useCallback(() => {
    setCalculatorForm({
      species: '',
      state: '',
      unit: '',
      season: '',
      points: 5,
      residency: 'resident'
    });
    setCalculationResult(null);
    setError(null);
  }, []);

  const resetStrategyForm = useCallback(() => {
    setStrategyForm({
      targetSpecies: [],
      targetStates: [],
      huntTypes: [],
      myPoints: 5,
      minOdds: 30,
      strategy: 'balanced'
    });
    setStrategicOpportunities([]);
    setError(null);
  }, []);

  return {
    // State
    calculatorForm,
    strategyForm,
    calculationResult,
    strategicOpportunities,
    isCalculating,
    error,
    availableUnits,
    availableHuntTypes,

    // Actions
    calculateDrawOdds,
    findStrategicOpportunities,
    updateCalculatorForm,
    updateStrategyForm,
    clearResults,
    resetCalculatorForm,
    resetStrategyForm
  };
}; 