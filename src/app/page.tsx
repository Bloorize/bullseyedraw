'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useHuntingCalculator } from '@/hooks/useHuntingCalculator';
import { DataUtils } from '@/lib/dataUtils';
import { huntingData } from '@/lib/huntingData';

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
  } = useHuntingCalculator();

  const [activeTab, setActiveTab] = useState<'calculator' | 'strategy'>('calculator');

  const handleCalculatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateDrawOdds();
  };

  const handleStrategySubmit = (e: React.FormEvent) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
      {/* Minimal Header with Navigation Only */}
      <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-lg font-bold text-stone-800">
              BullseyeDraw
            </div>
            <nav className="flex space-x-6">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'calculator' ? 'text-amber-700 font-bold' : 'text-stone-700 hover:text-amber-600'
                }`}
              >
                Calculator
              </button>
              <button
                onClick={() => setActiveTab('strategy')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'strategy' ? 'text-amber-700 font-bold' : 'text-stone-700 hover:text-amber-600'
                }`}
              >
                Strategy Finder
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Logo - Replacing Welcome Section */}
        <section className="relative rounded-2xl shadow-xl mb-8 overflow-hidden">
          {/* Hunting-themed background */}
          <div className="absolute inset-0 hunting-hero-bg opacity-90"></div>
          
          {/* Content overlay */}
          <div className="relative z-10 bg-gradient-to-b from-transparent to-white/30 p-12">
            <div className="text-center">
              {/* Logo and Branding */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-200/30 rounded-full blur-2xl"></div>
                  <Image
                    src="/logo.png"
                    alt="BullseyeDraw Logo"
                    width={150}
                    height={150}
                    className="relative rounded-2xl shadow-2xl border-4 border-white/50 bg-white/90"
                    priority
                  />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-stone-800 drop-shadow-lg">
                BullseyeDraw
              </h1>
              <p className="text-lg md:text-xl text-stone-700 font-light max-w-2xl mx-auto drop-shadow">
                Your Strategic Partner for Hunting Draw Success
              </p>
            </div>
          </div>
        </section>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg border bg-red-50 border-red-200 text-red-800 mb-8">
            <span className="text-xl">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Calculator Section */}
        {activeTab === 'calculator' && (
          <section className="bg-white rounded-xl shadow-lg border border-stone-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 pb-4 border-b-2 border-amber-600">
              Draw Odds Calculator
            </h2>

            <form onSubmit={handleCalculatorSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Species */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Species</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors"
                    value={calculatorForm.species || ''}
                    onChange={(e) => updateCalculatorForm('species', e.target.value)}
                    required
                  >
                    <option value="">Select Species</option>
                    <option value="elk">Elk</option>
                    <option value="deer">Deer</option>
                    <option value="moose">Moose</option>
                    <option value="sheep">Bighorn Sheep</option>
                    <option value="goat">Mountain Goat</option>
                    <option value="antelope">Antelope</option>
                    <option value="bear">Bear</option>
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">State</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors"
                    value={calculatorForm.state || ''}
                    onChange={(e) => updateCalculatorForm('state', e.target.value)}
                    required
                  >
                    <option value="">Select State</option>
                    {Object.entries(huntingData.states).map(([key, state]) => (
                      <option key={key} value={key}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Hunt Unit</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                    value={calculatorForm.unit || ''}
                    onChange={(e) => updateCalculatorForm('unit', e.target.value)}
                    disabled={Object.keys(availableUnits).length === 0}
                    required
                  >
                    <option value="">
                      {Object.keys(availableUnits).length === 0 ? 'Select State & Species First' : 'Select Unit'}
                    </option>
                    {Object.entries(availableUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name} ({unit.quality} Quality)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hunt Type */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Hunt Type</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                    value={calculatorForm.season || ''}
                    onChange={(e) => updateCalculatorForm('season', e.target.value)}
                    disabled={availableHuntTypes.length === 0}
                    required
                  >
                    <option value="">
                      {availableHuntTypes.length === 0 ? 'Select State & Species First' : 'Select Hunt Type'}
                    </option>
                    {availableHuntTypes.map((huntType) => (
                      <option key={huntType} value={huntType}>
                        {DataUtils.formatHuntTypeName(huntType)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Points */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Preference Points</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors"
                    value={calculatorForm.points || ''}
                    onChange={(e) => updateCalculatorForm('points', parseInt(e.target.value) || 0)}
                    min="0"
                    max="30"
                    required
                  />
                </div>

                {/* Residency */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Residency Status</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors"
                    value={calculatorForm.residency || 'resident'}
                    onChange={(e) => updateCalculatorForm('residency', e.target.value as 'resident' | 'nonresident')}
                    required
                  >
                    <option value="resident">Resident</option>
                    <option value="nonresident">Non-Resident</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-b from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculating...' : 'Calculate Draw Odds'}
              </button>
            </form>
          </section>
        )}

        {/* Strategy Section */}
        {activeTab === 'strategy' && (
          <section className="bg-white rounded-xl shadow-lg border border-stone-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 pb-4 border-b-2 border-amber-600">
              Strategic Opportunity Finder
            </h2>
            <p className="text-stone-600 mb-6">
              Find the best hunting opportunities based on your preferences and point levels across multiple states.
            </p>

            <form onSubmit={handleStrategySubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Target Species */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Target Species</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors h-24"
                    multiple
                    value={strategyForm.targetSpecies || []}
                    onChange={(e) => updateStrategyForm('targetSpecies', Array.from(e.target.selectedOptions).map(opt => opt.value))}
                  >
                    <option value="elk">Elk</option>
                    <option value="deer">Deer</option>
                    <option value="moose">Moose</option>
                    <option value="sheep">Bighorn Sheep</option>
                    <option value="goat">Mountain Goat</option>
                    <option value="antelope">Antelope</option>
                    <option value="bear">Bear</option>
                  </select>
                  <small className="text-stone-500 text-xs mt-1 block">Hold Ctrl/Cmd to select multiple</small>
                </div>

                {/* Target States */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Target States</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors h-24"
                    multiple
                    value={strategyForm.targetStates || []}
                    onChange={(e) => updateStrategyForm('targetStates', Array.from(e.target.selectedOptions).map(opt => opt.value))}
                  >
                    {Object.entries(huntingData.states).map(([key, state]) => (
                      <option key={key} value={key}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <small className="text-stone-500 text-xs mt-1 block">Hold Ctrl/Cmd to select multiple</small>
                </div>

                {/* Hunt Types */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Preferred Hunt Types</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors h-24"
                    multiple
                    value={strategyForm.huntTypes || []}
                    onChange={(e) => updateStrategyForm('huntTypes', Array.from(e.target.selectedOptions).map(opt => opt.value))}
                  >
                    <option value="archery">Archery</option>
                    <option value="muzzleloader">Muzzleloader</option>
                    <option value="rifle">Rifle</option>
                    <option value="rifle-1">Early Rifle</option>
                    <option value="rifle-2">Late Rifle</option>
                  </select>
                  <small className="text-stone-500 text-xs mt-1 block">Hold Ctrl/Cmd to select multiple</small>
                </div>

                {/* Point Level */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Your Point Levels</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors"
                    value={strategyForm.myPoints || ''}
                    onChange={(e) => updateStrategyForm('myPoints', parseInt(e.target.value) || 0)}
                    min="0"
                    max="30"
                    placeholder="Enter your current points"
                  />
                  <small className="text-stone-500 text-xs mt-1 block">Enter your current point level</small>
                </div>

                {/* Minimum Odds */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">
                    Minimum Draw Odds: {strategyForm.minOdds || 30}%
                  </label>
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="100"
                    value={strategyForm.minOdds || 30}
                    onChange={(e) => updateStrategyForm('minOdds', parseInt(e.target.value))}
                  />
                </div>

                {/* Strategy Type */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Strategy Type</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg bg-stone-50 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors"
                    value={strategyForm.strategy || 'balanced'}
                    onChange={(e) => updateStrategyForm('strategy', e.target.value as any)}
                  >
                    <option value="balanced">Balanced (Mix of odds)</option>
                    <option value="conservative">Conservative (High odds only)</option>
                    <option value="aggressive">Aggressive (Include long shots)</option>
                    <option value="points-builder">Points Builder (Build points)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-b from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isCalculating}
              >
                {isCalculating ? 'Searching...' : 'Find Best Opportunities'}
              </button>
            </form>
          </section>
        )}

        {/* Results Section */}
        {calculationResult && (
          <section className="bg-white rounded-xl shadow-lg border border-stone-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 pb-4 border-b-2 border-amber-600">
              Draw Probability Results
            </h2>

            <div className="flex items-center gap-3 p-4 rounded-lg border bg-blue-50 border-blue-200 text-blue-800 mb-6">
              <span className="text-xl">ℹ️</span>
              <span>These calculations are based on historical draw data and should be used as estimates only. Actual results may vary.</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Odds Display */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-r from-stone-50 to-amber-50 p-8 rounded-xl text-center border-2 border-stone-200">
                  <div className="text-6xl font-bold text-green-700 mb-2">
                    {calculationResult.odds}%
                  </div>
                  <div className="text-lg text-stone-600 font-medium">
                    Chance of Drawing This Tag
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-50 p-6 rounded-lg text-center border border-stone-200">
                    <div className="text-3xl font-bold text-amber-700 mb-2">{calculationResult.stats.tags}</div>
                    <div className="text-sm text-stone-600 uppercase tracking-wider">Total Tags</div>
                  </div>
                  <div className="bg-stone-50 p-6 rounded-lg text-center border border-stone-200">
                    <div className="text-3xl font-bold text-amber-700 mb-2">{calculationResult.stats.applicants}</div>
                    <div className="text-sm text-stone-600 uppercase tracking-wider">Total Applicants</div>
                  </div>
                  <div className="bg-stone-50 p-6 rounded-lg text-center border border-stone-200">
                    <div className="text-3xl font-bold text-amber-700 mb-2">{calculationResult.stats.pointsNeeded}</div>
                    <div className="text-sm text-stone-600 uppercase tracking-wider">Points Typically Needed</div>
                  </div>
                  <div className="bg-stone-50 p-6 rounded-lg text-center border border-stone-200">
                    <div className="text-3xl font-bold text-amber-700 mb-2">{formatTrend(calculationResult.stats.trend)}</div>
                    <div className="text-sm text-stone-600 uppercase tracking-wider">Odds Trend</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            {calculationResult.chartData.length > 0 && (
              <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 mb-8">
                <h3 className="text-xl font-bold text-center text-stone-800 mb-6">
                  Historical Draw Odds by Point Level
                </h3>
                <div className="flex items-end justify-around h-48 px-4">
                  {calculationResult.chartData.map((point, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-gradient-to-t from-amber-700 to-amber-500 rounded-t relative transition-all duration-300 hover:from-amber-800 hover:to-amber-600 w-12 min-h-2"
                        style={{ height: `${Math.max(point.odds, 5)}%` }}
                      >
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 font-bold text-stone-800 text-sm">
                          {point.odds}%
                        </span>
                      </div>
                      <span className="text-xs text-stone-600 mt-2 whitespace-nowrap">
                        {point.pointLevel} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {calculationResult.recommendations.length > 0 && (
              <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-amber-600">
                <h3 className="text-xl font-bold text-stone-800 mb-4">Strategic Recommendations</h3>
                <div className="space-y-4">
                  {calculationResult.recommendations.map((rec, index) => {
                    const alertClasses = {
                      'info': 'bg-blue-50 border-blue-200 text-blue-800',
                      'success': 'bg-green-50 border-green-200 text-green-800',
                      'warning': 'bg-yellow-50 border-yellow-200 text-yellow-800',
                      'danger': 'bg-red-50 border-red-200 text-red-800'
                    };
                    return (
                      <div key={index} className={`flex items-center gap-3 p-4 rounded-lg border ${alertClasses[rec.type]}`}>
                        <div>
                          <div className="font-bold">{rec.title}</div>
                          <div>{rec.text}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Strategic Opportunities Results */}
        {strategicOpportunities.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg border border-stone-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 pb-4 border-b-2 border-amber-600">
              Recommended Hunting Strategy
            </h2>

            <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-amber-600 mb-6">
              <h4 className="font-bold text-lg text-stone-800 mb-2">
                {DataUtils.getStrategyInfo(strategyForm.strategy || 'balanced').name}
              </h4>
              <p className="text-stone-600 mb-4">
                {DataUtils.getStrategyInfo(strategyForm.strategy || 'balanced').description}
              </p>
              <div className="text-stone-700">
                <strong>Found {strategicOpportunities.length} opportunities</strong> with an average draw odds of{' '}
                <strong>
                  {Math.round(strategicOpportunities.reduce((sum, opp) => sum + opp.maxOdds, 0) / strategicOpportunities.length)}%
                </strong>
                {strategyForm.myPoints ? ` for hunters with ${strategyForm.myPoints} preference points.` : '.'}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <strong>Strategy Tip:</strong>{' '}
                {DataUtils.getStrategyTip(
                  strategyForm.strategy || 'balanced',
                  Math.round(strategicOpportunities.reduce((sum, opp) => sum + opp.maxOdds, 0) / strategicOpportunities.length),
                  strategicOpportunities.length
                )}
              </div>
            </div>

            <div className="space-y-4">
              {strategicOpportunities.map((opp, index) => (
                <div key={opp.id} className="bg-white rounded-xl shadow-xl border border-stone-200 hover:shadow-2xl transition-shadow duration-300 p-6 cursor-pointer hover:border-amber-600 hover:translate-x-1 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="bg-amber-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">{index + 1}</div>
                    
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div>
                        <div className="text-xs text-stone-500 uppercase tracking-wide">State</div>
                        <div className="font-bold text-stone-800">
                          {huntingData.states[opp.state]?.name || opp.state}
                          {index === 0 && (
                            <span className="ml-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                              BEST ODDS
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-stone-500 uppercase tracking-wide">Species</div>
                        <div className="font-bold text-stone-800 capitalize">{opp.species}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-stone-500 uppercase tracking-wide">Unit</div>
                        <div className="font-bold text-stone-800">
                          {huntingData.states[opp.state]?.species[opp.species]?.units[opp.unit]?.name || opp.unit}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-stone-500 uppercase tracking-wide">Hunt Type</div>
                        <div className="font-bold text-stone-800">
                          {DataUtils.formatHuntTypeName(opp.huntType)}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-stone-500 uppercase tracking-wide">Min Points</div>
                        <div className="font-bold text-stone-800">{opp.minPoints}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-stone-500 uppercase tracking-wide">Quality</div>
                        <div>{formatQualityBadge(opp.quality)}</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-700">{opp.maxOdds}%</div>
                      <div className="text-xs text-stone-500 uppercase tracking-wide">Draw Odds</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Multi-Year Planning Section */}
        <section className="bg-white rounded-xl shadow-lg border border-stone-200 p-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6 pb-4 border-b-2 border-amber-600">
            Multi-Year Strategy Planner
          </h2>
          <p className="text-stone-600 mb-6">
            Plan your hunting applications across multiple years to optimize your long-term success.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-xl border border-stone-200 hover:shadow-2xl transition-shadow duration-300 p-6 text-center hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold text-stone-800 mb-4">Point Accumulation Tracker</h3>
              <p className="text-stone-600 mb-6">
                Track your preference points across different states and species to plan when to apply for premium hunts.
              </p>
              <button 
                className="bg-stone-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-stone-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => alert('Point Tracker feature coming soon! This will help you track your preference points across all states and species.')}
              >
                Open Tracker
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-xl border border-stone-200 hover:shadow-2xl transition-shadow duration-300 p-6 text-center hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold text-stone-800 mb-4">Application Timeline</h3>
              <p className="text-stone-600 mb-6">
                View application deadlines and plan your hunting calendar across multiple states.
              </p>
              <button 
                className="bg-stone-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-stone-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => alert('Application Timeline feature coming soon! This will show all application deadlines and hunt seasons in a calendar view.')}
              >
                View Timeline
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-xl border border-stone-200 hover:shadow-2xl transition-shadow duration-300 p-6 text-center hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold text-stone-800 mb-4">Success Probability Calculator</h3>
              <p className="text-stone-600 mb-6">
                Calculate your chances of drawing at least one tag when applying for multiple hunts.
              </p>
              <button 
                className="bg-stone-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-stone-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => alert('Multi-Hunt Probability Calculator coming soon! This will calculate your odds of drawing at least one tag when applying for multiple hunts.')}
              >
                Calculate
              </button>
            </div>
          </div>
        </section>
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
    </div>
  );
}
