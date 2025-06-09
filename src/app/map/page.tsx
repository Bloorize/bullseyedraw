'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { UtahDataService } from '@/lib/utahDataService';

// Dynamically import the map component to avoid SSR issues with Leaflet
const UtahHuntingMap = dynamic(() => import('@/components/UtahHuntingMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading interactive map...</p>
      </div>
    </div>
  )
});

export default function MapPage() {
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [unitDetails, setUnitDetails] = useState<any>(null);
  
  const utahService = UtahDataService.getInstance();
  const species = utahService.getAvailableSpecies();

  const handleSpeciesChange = (speciesValue: string) => {
    setSelectedSpecies(speciesValue);
    setSelectedUnit('');
    setUnitDetails(null);
  };

  const handleUnitSelect = (unitId: string) => {
    setSelectedUnit(unitId);
    const unit = utahService.getUnitById(unitId);
    setUnitDetails(unit);
  };

  const clearSelection = () => {
    setSelectedSpecies('');
    setSelectedUnit('');
    setUnitDetails(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Utah Hunting Units Map</h1>
              <p className="mt-2 text-gray-600">
                Interactive map showing hunting unit boundaries, species, and season information
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ← Back to Calculator
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Map Controls</h3>
                
                {/* Species Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Filter by Species
                  </label>
                  <select
                    value={selectedSpecies}
                    onChange={(e) => handleSpeciesChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Species</option>
                    {species.map((species) => (
                      <option key={species} value={species}>
                        {utahService.getSpeciesName(species)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Selection */}
                {(selectedSpecies || selectedUnit) && (
                  <button
                    onClick={clearSelection}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Clear Selection
                  </button>
                )}
              </div>

              {/* Map Statistics */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Map Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Units:</span>
                    <span className="font-medium">
                      {selectedSpecies 
                        ? utahService.getUnitsForSpecies(selectedSpecies).length
                        : utahService.getAllUnits().length
                      }
                    </span>
                  </div>
                  {selectedSpecies && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Species:</span>
                        <span className="font-medium">{utahService.getSpeciesName(selectedSpecies)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hunt Methods:</span>
                        <span className="font-medium">
                          {utahService.getHuntMethodsForSpecies(selectedSpecies).length}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Instructions */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">How to Use</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Click on any hunting unit to see details</li>
                  <li>• Use the species filter to show specific animals</li>
                  <li>• Switch between map layers (satellite, terrain)</li>
                  <li>• Zoom and pan to explore different regions</li>
                  <li>• View season dates and hunt codes in popups</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Map and Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Interactive Map */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Interactive Hunting Units Map</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Click on hunting units to view detailed information. Use the layer control to switch map views.
                </p>
              </div>
              
              <Suspense fallback={
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              }>
                <UtahHuntingMap
                  selectedSpecies={selectedSpecies}
                  selectedUnit={selectedUnit}
                  onUnitSelect={handleUnitSelect}
                />
              </Suspense>
            </div>

            {/* Unit Details Panel */}
            {unitDetails && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Unit Details</h3>
                  <button
                    onClick={() => {
                      setSelectedUnit('');
                      setUnitDetails(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-gray-600">Unit Name:</dt>
                        <dd className="font-medium">{unitDetails.unitName}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-600">Unit ID:</dt>
                        <dd className="font-medium">{unitDetails.unitId}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-600">Species:</dt>
                        <dd className="font-medium">
                          {unitDetails.species.map((s: string) => utahService.getSpeciesName(s)).join(', ')}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-gray-600">Hunt Methods:</dt>
                        <dd className="font-medium">{unitDetails.huntMethods.join(', ')}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-600">Season Type:</dt>
                        <dd className="font-medium capitalize">{unitDetails.seasonType.replace('-', ' ')}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Additional Details */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Additional Details</h4>
                    <dl className="space-y-2 text-sm">
                      {unitDetails.huntCodes && (
                        <div>
                          <dt className="text-gray-600">Hunt Codes:</dt>
                          <dd className="font-medium">{unitDetails.huntCodes.join(', ')}</dd>
                        </div>
                      )}
                      {unitDetails.landOwnership && (
                        <div>
                          <dt className="text-gray-600">Land Ownership:</dt>
                          <dd className="font-medium">
                            {unitDetails.landOwnership.public}% Public, {unitDetails.landOwnership.private}% Private
                            {unitDetails.landOwnership.state && `, ${unitDetails.landOwnership.state}% State`}
                          </dd>
                        </div>
                      )}
                      {unitDetails.quality && (
                        <div>
                          <dt className="text-gray-600">Unit Quality:</dt>
                          <dd className="font-medium capitalize">{unitDetails.quality}</dd>
                        </div>
                      )}
                      {unitDetails.access && (
                        <div>
                          <dt className="text-gray-600">Access:</dt>
                          <dd className="font-medium capitalize">{unitDetails.access}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>

                {/* Season Dates */}
                {unitDetails.seasonDates && (
                  <div className="mt-6 border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-3">2024 Season Dates</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(unitDetails.seasonDates).map(([method, dates]: [string, any]) => (
                        <div key={method} className="bg-gray-50 rounded-lg p-3">
                          <h5 className="font-medium text-gray-900 capitalize mb-1">{method}</h5>
                          <p className="text-sm text-gray-600">
                            {dates.start} to {dates.end}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 