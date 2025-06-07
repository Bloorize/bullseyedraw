'use client';

import React, { useState, useCallback, useEffect } from 'react';
import type { FormEvent } from 'react';
import Image from 'next/image';
import { useHuntingCalculator } from '@/hooks/useHuntingCalculator';
import { DataUtils } from '@/lib/dataUtils';
import { huntingData } from '@/lib/huntingData';
import { AIChat } from '@/components/AIChat';
import type { State, Species, HuntStats } from '@/types/hunting';

export default function HuntingCalculator() {
  const {
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
  } = useHuntingCalculator();

  const [activeTab, setActiveTab] = useState<'calculator' | 'strategy'>('calculator');

  const handleCalculatorSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateDrawOdds();
  };

  const handleStrategySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    findStrategicOpportunities();
  };

  const formatQualityBadge = (quality: string) => {
    const baseClasses = 'inline-block px-3 py-1 rounded-full text-xs font-semibold';
    const qualityClasses = {
      'good': 'bg-green-100 text-green-800',
      'high': 'bg-blue-100 text-blue-800',
      'premium': 'bg-purple-100 text-purple-800',
      'excellent': 'bg-yellow-100 text-yellow-800'
    };
    const className = `${baseClasses} ${qualityClasses[quality.toLowerCase() as keyof typeof qualityClasses] || 'bg-gray-100 text-gray-800'}`;
    return <span className={className}>{quality}</span>;
  };

  const formatTrend = (trend: string) => {
    const isUp = trend.includes('↑');
    const isDown = trend.includes('↓');
    const className = isUp ? 'text-green-600' : isDown ? 'text-red-600' : 'text-gray-600';
    return <span className={className}>{trend}</span>;
  };

  // Add useEffect to handle state changes
  useEffect(() => {
    // Reset dependent fields when state changes
    if (calculatorForm.state === '') {
      updateCalculatorForm('species', '');
      updateCalculatorForm('unit', '');
      updateCalculatorForm('huntType', '');
    }
  }, [calculatorForm.state]);

  useEffect(() => {
    // Reset dependent fields when species changes
    if (calculatorForm.species === '') {
      updateCalculatorForm('unit', '');
      updateCalculatorForm('huntType', '');
    }
  }, [calculatorForm.species]);

  useEffect(() => {
    // Reset hunt type when unit changes
    if (calculatorForm.unit === '') {
      updateCalculatorForm('huntType', '');
    }
  }, [calculatorForm.unit]);

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Logo */}
        <section className="hunting-hero-bg rounded-2xl p-8 mb-8 relative">
          {/* Logo positioned in top-left corner */}
          <div className="absolute top-6 left-6 z-10">
            <Image
              src="/logo.png"
              alt="BullseyeDraw Logo"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          
          {/* Navigation buttons in top-right corner */}
          <div className="absolute top-6 right-6 z-10">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'calculator' 
                    ? 'bg-white text-green-700 shadow-md' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Calculator
              </button>
              <button
                onClick={() => setActiveTab('strategy')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'strategy' 
                    ? 'bg-white text-green-700 shadow-md' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Strategy
              </button>
            </div>
          </div>

          <div className="bg-white/95 rounded-xl p-8 max-w-2xl mt-16">
          <h2
  className="text-4xl font-bold text-stone-800 mb-4 indent-35">
  BullseyeDraw Calculator
</h2>

            <p className="text-lg text-stone-600">
              {useAI ? (
                <>
<span className="inline-flex items-center gap-1 text-green-600 font-semibold ml-30">                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    AI-Powered Analysis Active
                  </span>
                  <br />
                  <br></br>
                  Get intelligent predictions and personalized hunting strategies powered by advanced AI.
                </>
              ) : (
                'Make informed decisions about hunting applications. Calculate draw odds, compare opportunities, and build winning strategies to maximize your chances of drawing premium tags.'
              )}
            </p>
          </div>
        </section>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg border bg-red-50 border-red-200 text-red-800 mb-8">
            <span className="text-xl">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Tab Navigation for Mobile */}
        <div className="md:hidden mb-8">
          <div className="flex bg-stone-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-stone-600'
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'strategy'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-stone-600'
              }`}
            >
              Strategy
            </button>
          </div>
        </div>

        {/* Calculator Form */}
        {activeTab === 'calculator' && (
          <section className="bg-white rounded-xl shadow-lg border border-stone-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 pb-4 border-b-2 border-amber-600">
              Draw Odds Calculator
            </h2>
            <form onSubmit={handleCalculatorSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* State Selection */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    State
                  </label>
                  <select
                    value={calculatorForm.state}
                    onChange={(e) => updateCalculatorForm('state', e.target.value)}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  >
                    <option value="">Select State</option>
                    {Object.entries(huntingData.states).map(([key, state]) => (
                      <option key={key} value={key}>{state.name}</option>
                    ))}
                  </select>
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
                    Unit
                  </label>
                  <select
                    value={calculatorForm.unit}
                    onChange={(e) => updateCalculatorForm('unit', e.target.value)}
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

                {/* Residency */}
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

                {/* Points */}
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

              <button
                type="submit"
                disabled={isCalculating}
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Draw Odds'}
              </button>
            </form>

            {/* Results Display */}
            {calculationResult.odds > 0 && (
              <div className="mt-8 p-6 bg-stone-50 rounded-lg">
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

                {calculationResult.reasoning && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">AI Analysis</h4>
                    <p className="text-blue-800">{calculationResult.reasoning}</p>
                  </div>
                )}

                {calculationResult.historicalContext && (
                  <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-2">Historical Context</h4>
                    <p className="text-amber-800">{calculationResult.historicalContext}</p>
                  </div>
                )}

                {calculationResult.stats && Object.keys(calculationResult.stats).length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stone-800">
                        {calculationResult.stats.applicants || 0}
                      </div>
                      <p className="text-sm text-stone-600">Applicants</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stone-800">
                        {calculationResult.stats.tags || 0}
                      </div>
                      <p className="text-sm text-stone-600">Tags</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stone-800">
                        {calculationResult.stats.success || '0%'}
                      </div>
                      <p className="text-sm text-stone-600">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stone-800">
                        {calculationResult.stats.pointsNeeded || '0'}
                      </div>
                      <p className="text-sm text-stone-600">Avg Points</p>
                    </div>
                  </div>
                )}

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

                {calculationResult.alternativeOptions && calculationResult.alternativeOptions.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-stone-800 mb-3">Alternative Options:</h4>
                    <div className="space-y-2">
                      {calculationResult.alternativeOptions.map((option, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-lg border border-stone-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-stone-800">
                                {option.state} - Unit {option.unit} ({option.huntType})
                              </p>
                              <p className="text-sm text-stone-600">{option.reason}</p>
                            </div>
                            <span className="text-lg font-bold text-amber-600">{option.odds}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Strategy Form */}
        {activeTab === 'strategy' && (
          <section className="bg-white rounded-xl shadow-lg border border-stone-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 pb-4 border-b-2 border-amber-600">
              Strategic Opportunity Finder
            </h2>
            <form onSubmit={handleStrategySubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Target States */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Target States
                  </label>
                  <div className="space-y-2">
                    {Object.entries(huntingData.states).map(([key, state]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          value={key}
                          checked={strategyForm.targetStates.includes(key)}
                          onChange={(e) => {
                            const newStates = e.target.checked
                              ? [...strategyForm.targetStates, key]
                              : strategyForm.targetStates.filter(s => s !== key);
                            updateStrategyForm('targetStates', newStates);
                          }}
                          className="mr-2 text-amber-600 focus:ring-amber-500"
                        />
                        {state.name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Target Species */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Target Species
                  </label>
                  <div className="space-y-2">
                    {['elk', 'deer', 'moose', 'sheep', 'goat', 'antelope', 'bear'].map((species) => (
                      <label key={species} className="flex items-center">
                        <input
                          type="checkbox"
                          value={species}
                          checked={strategyForm.targetSpecies.includes(species)}
                          onChange={(e) => {
                            const newSpecies = e.target.checked
                              ? [...strategyForm.targetSpecies, species]
                              : strategyForm.targetSpecies.filter(s => s !== species);
                            updateStrategyForm('targetSpecies', newSpecies);
                          }}
                          className="mr-2 text-amber-600 focus:ring-amber-500"
                        />
                        {species.charAt(0).toUpperCase() + species.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* My Points */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    My Points
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={strategyForm.myPoints}
                    onChange={(e) => updateStrategyForm('myPoints', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                {/* Minimum Odds */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Minimum Draw Odds (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={strategyForm.minOdds}
                    onChange={(e) => updateStrategyForm('minOdds', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isCalculating || strategyForm.targetStates.length === 0 || strategyForm.targetSpecies.length === 0}
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {isCalculating ? 'Finding Opportunities...' : 'Find Strategic Opportunities'}
              </button>
            </form>

            {/* Strategic Opportunities Results */}
            {strategicOpportunities.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4">
                  Top {strategicOpportunities.length} Opportunities
                </h3>
                <div className="space-y-4">
                  {strategicOpportunities.map((opp, idx) => (
                    <div key={idx} className="p-4 border border-stone-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-stone-800">
                            {huntingData.states[opp.state]?.name || opp.state} - {opp.species?.charAt(0).toUpperCase() + opp.species?.slice(1) || 'Unknown Species'}
                          </h4>
                          <p className="text-sm text-stone-600">
                            Unit: {opp.unit?.toUpperCase() || 'N/A'} | Hunt Type: {opp.huntType?.charAt(0).toUpperCase() + opp.huntType?.slice(1).replace('-', ' ') || 'N/A'}
                          </p>
                          {opp.reasoning && (
                            <p className="text-sm text-stone-500 mt-1">{opp.reasoning}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-amber-600">
                            {opp.odds}%
                          </div>
                          <p className="text-sm text-stone-600">Draw Odds</p>
                        </div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        {formatQualityBadge(opp.quality)}
                        {formatTrend(opp.trend)}
                      </div>
                      {opp.drawStrategy && (
                        <p className="text-sm text-stone-700 mt-2">
                          <strong>Strategy:</strong> {opp.drawStrategy}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>
            &copy; 2024 BullseyeDraw. Data for educational purposes only. 
            Always verify current regulations and draw odds with official sources.
          </p>
        </div>
      </footer>

      {/* AI Chat */}
      <AIChat aiService={aiService} />
    </div>
  );
}