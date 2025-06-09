'use client';

import React, { useState, useCallback, useEffect, Suspense } from 'react';
import type { FormEvent } from 'react';
import dynamic from 'next/dynamic';
import { useHuntingCalculator } from '@/hooks/useHuntingCalculator';
import { huntingData } from '@/lib/huntingData';
import { UtahDataService } from '@/lib/utahDataService';
import { ColoradoDataService } from '@/lib/coloradoDataService';

// Dynamically import the map component to avoid SSR issues
const UtahHuntingMap = dynamic(() => import('@/components/UtahHuntingMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600 text-sm">Loading map...</p>
      </div>
    </div>
  )
});

interface IntegratedHuntingCalculatorProps {
  onCalculationComplete?: (result: any) => void;
}

export default function IntegratedHuntingCalculator({ onCalculationComplete }: IntegratedHuntingCalculatorProps) {
  const {
    calculatorForm,
    calculationResult,
    isCalculating,
    error,
    availableUnits,
    availableHuntTypes,
    calculateDrawOdds,
    updateCalculatorForm,
  } = useHuntingCalculator();

  const [showMap, setShowMap] = useState(false);
  const [mapSelectedUnit, setMapSelectedUnit] = useState<string>('');
  const [selectedUnitDetails, setSelectedUnitDetails] = useState<any>(null);

  const utahService = UtahDataService.getInstance();
  const coloradoService = ColoradoDataService.getInstance();

  // Handle map unit selection
  const handleMapUnitSelect = useCallback((unitId: string) => {
    setMapSelectedUnit(unitId);
    
    // Get unit details based on state
    let unitDetails = null;
    if (calculatorForm.state === 'utah') {
      unitDetails = utahService.getUnitById(unitId);
    } else if (calculatorForm.state === 'colorado') {
      unitDetails = coloradoService.getUnitById(unitId);
    }
    
    setSelectedUnitDetails(unitDetails);
    
    // Auto-fill form if unit is found
    if (unitDetails) {
      updateCalculatorForm('unit', unitId);
      
      // Auto-select species if unit only has one species
      if (unitDetails.species.length === 1) {
        updateCalculatorForm('species', unitDetails.species[0]);
      }
      
      // Auto-select hunt type if unit only has one method
      if (unitDetails.huntMethods.length === 1) {
        updateCalculatorForm('huntType', unitDetails.huntMethods[0]);
      }
    }
  }, [calculatorForm.state, updateCalculatorForm]);

  // Sync form selection with map
  useEffect(() => {
    if (calculatorForm.unit && calculatorForm.unit !== mapSelectedUnit) {
      setMapSelectedUnit(calculatorForm.unit);
    }
  }, [calculatorForm.unit]);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateDrawOdds();
    if (onCalculationComplete) {
      onCalculationComplete(calculationResult);
    }
  };

  // Get available states that support mapping
  const getMappableStates = () => {
    return ['utah', 'colorado'];
  };

  const isMappableState = getMappableStates().includes(calculatorForm.state);

  // Format quality badge
  const formatQualityBadge = (quality: string) => {
    const baseClasses = 'inline-block px-2 py-1 rounded-full text-xs font-semibold';
    const qualityClasses = {
      'good': 'bg-green-100 text-green-800',
      'high': 'bg-blue-100 text-blue-800',
      'premium': 'bg-purple-100 text-purple-800',
      'excellent': 'bg-yellow-100 text-yellow-800'
    };
    const className = `${baseClasses} ${qualityClasses[quality.toLowerCase() as keyof typeof qualityClasses] || 'bg-gray-100 text-gray-800'}`;
    return <span className={className}>{quality}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-red-50 border-red-200 text-red-800">
          <span className="text-xl">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Main Calculator Form */}
      <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-stone-800 pb-4 border-b-2 border-amber-600">
            Draw Odds Calculator
          </h2>
          {isMappableState && (
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showMap 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showMap ? '📋 Hide Map' : '🗺️ Show Map'}
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Controls */}
            <div className="space-y-4">
              {/* State Selection */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  State
                </label>
                <select
                  value={calculatorForm.state}
                  onChange={(e) => {
                    updateCalculatorForm('state', e.target.value);
                    setMapSelectedUnit('');
                    setSelectedUnitDetails(null);
                  }}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                >
                  <option value="">Select State</option>
                  {Object.entries(huntingData.states).map(([key, state]) => (
                    <option key={key} value={key}>
                      {state.name} {getMappableStates().includes(key) ? '🗺️' : ''}
                    </option>
                  ))}
                </select>
                {calculatorForm.state && isMappableState && (
                  <p className="text-xs text-blue-600 mt-1">
                    ✨ Interactive map available - click "Show Map" to select units visually
                  </p>
                )}
              </div>

              {/* Species Selection */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Species
                </label>
                <select
                  value={calculatorForm.species}
                  onChange={(e) => updateCalculatorForm('species', e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                  disabled={!calculatorForm.state}
                >
                  <option value="">Select Species</option>
                  {calculatorForm.state && Object.keys(huntingData.states[calculatorForm.state]?.species || {}).map((speciesName: string) => (
                    <option key={speciesName} value={speciesName}>
                      {speciesName.charAt(0).toUpperCase() + speciesName.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Unit Selection */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Unit {mapSelectedUnit && <span className="text-blue-600">(Selected from map: {mapSelectedUnit})</span>}
                </label>
                <select
                  value={calculatorForm.unit}
                  onChange={(e) => {
                    updateCalculatorForm('unit', e.target.value);
                    setMapSelectedUnit(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                  disabled={!calculatorForm.species}
                >
                  <option value="">Select Unit</option>
                  {availableUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit.toUpperCase()}
                    </option>
                  ))}
                </select>
                {isMappableState && !showMap && calculatorForm.species && (
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Tip: Enable map view to select units by clicking on the map
                  </p>
                )}
              </div>

              {/* Hunt Type Selection */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Hunt Type
                </label>
                <select
                  value={calculatorForm.huntType}
                  onChange={(e) => updateCalculatorForm('huntType', e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                  disabled={!calculatorForm.unit}
                >
                  <option value="">Select Hunt Type</option>
                  {availableHuntTypes.map((huntType: string) => (
                    <option key={huntType} value={huntType}>
                      {huntType.charAt(0).toUpperCase() + huntType.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Residency and Points */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Residency
                  </label>
                  <select
                    value={calculatorForm.residency}
                    onChange={(e) => updateCalculatorForm('residency', e.target.value as 'resident' | 'nonresident')}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="resident">Resident</option>
                    <option value="nonresident">Non-Resident</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Preference Points
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={calculatorForm.points}
                    onChange={(e) => updateCalculatorForm('points', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Map or Unit Details */}
            <div className="space-y-4">
              {showMap && isMappableState ? (
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">
                    Interactive Unit Selection
                  </h3>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <Suspense fallback={
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <p className="text-gray-600 text-sm">Loading interactive map...</p>
                        </div>
                      </div>
                    }>
                      <UtahHuntingMap
                        selectedState={calculatorForm.state}
                        selectedSpecies={calculatorForm.species}
                        selectedUnit={mapSelectedUnit}
                        onUnitSelect={handleMapUnitSelect}
                      />
                    </Suspense>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Click on hunting units in the map to select them. The form will auto-update with your selection.
                  </p>
                </div>
              ) : selectedUnitDetails ? (
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">
                    Selected Unit Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <h4 className="font-medium text-stone-900">{selectedUnitDetails.unitName}</h4>
                      <p className="text-sm text-gray-600">Unit ID: {selectedUnitDetails.unitId}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Species:</span>
                        <p className="font-medium">
                          {selectedUnitDetails.species.map((s: string) => 
                            calculatorForm.state === 'utah' 
                              ? utahService.getSpeciesName(s)
                              : coloradoService.getSpeciesName(s)
                          ).join(', ')}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Season Type:</span>
                        <p className="font-medium capitalize">{selectedUnitDetails.seasonType.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Hunt Methods:</span>
                        <p className="font-medium">{selectedUnitDetails.huntMethods.join(', ')}</p>
                      </div>
                      {selectedUnitDetails.quality && (
                        <div>
                          <span className="text-gray-600">Quality:</span>
                          <div className="mt-1">{formatQualityBadge(selectedUnitDetails.quality)}</div>
                        </div>
                      )}
                    </div>

                    {selectedUnitDetails.landOwnership && (
                      <div className="text-sm">
                        <span className="text-gray-600">Land Ownership:</span>
                        <p className="font-medium">
                          {selectedUnitDetails.landOwnership.public}% Public, {selectedUnitDetails.landOwnership.private}% Private
                        </p>
                      </div>
                    )}

                    {selectedUnitDetails.huntCodes && (
                      <div className="text-sm">
                        <span className="text-gray-600">Hunt Codes:</span>
                        <p className="font-medium text-xs">{selectedUnitDetails.huntCodes.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎯</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Hunting Unit</h3>
                    <p className="text-sm text-gray-600 max-w-sm">
                      {isMappableState 
                        ? "Choose a unit from the dropdown above or enable the interactive map to select visually"
                        : "Choose a unit from the dropdown above to see details"
                      }
                    </p>
                    {isMappableState && (
                      <button
                        type="button"
                        onClick={() => setShowMap(true)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        🗺️ Enable Interactive Map
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {isCalculating ? 'Calculating...' : 'Calculate Draw Odds'}
          </button>
        </form>
      </div>

      {/* Results Display */}
      {calculationResult.odds > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6">
          <h3 className="text-xl font-bold text-stone-800 mb-4">Draw Odds Results</h3>
          
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-amber-600 mb-2">
              {calculationResult.odds}%
            </div>
            <p className="text-stone-600">
              Chance of drawing with {calculatorForm.points} points
            </p>
            {calculationResult.confidence && (
              <p className="text-sm text-stone-500 mt-1">
                AI Confidence: {calculationResult.confidence}%
              </p>
            )}
          </div>

          {calculationResult.recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold text-stone-800 mb-2">Recommendations:</h4>
              <div className="space-y-2">
                {calculationResult.recommendations.map((rec, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-lg ${
                      rec.type === 'success' ? 'bg-green-50 text-green-800' :
                      rec.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                      rec.type === 'danger' ? 'bg-red-50 text-red-800' :
                      'bg-blue-50 text-blue-800'
                    }`}
                  >
                    <div className="font-medium mb-1">{rec.title}</div>
                    <div>{rec.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 