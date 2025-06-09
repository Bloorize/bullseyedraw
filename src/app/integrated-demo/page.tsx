'use client';

import React from 'react';
import IntegratedHuntingCalculator from '@/components/IntegratedHuntingCalculator';

export default function IntegratedDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Integrated Calculator Demo</h1>
              <p className="mt-2 text-gray-600">
                Experience the new integrated hunting calculator with interactive map selection
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ← Back to Main
              </a>
              <a
                href="/map"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                🗺️ Full Map View
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature Highlights */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 New Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🗺️</div>
              <h3 className="font-medium text-gray-900 mb-1">Interactive Map</h3>
              <p className="text-sm text-gray-600">Click on hunting units directly on the map to select them</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-medium text-gray-900 mb-1">Real-time Sync</h3>
              <p className="text-sm text-gray-600">Map and form selections stay perfectly synchronized</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-medium text-gray-900 mb-1">Unit Details</h3>
              <p className="text-sm text-gray-600">See detailed unit information as you make selections</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">📋 How to Use</h2>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>Step 1:</strong> Select a state (Utah 🗺️ or Colorado 🗺️ have interactive maps)</p>
            <p><strong>Step 2:</strong> Click "🗺️ Show Map" to enable interactive map selection</p>
            <p><strong>Step 3:</strong> Choose a species to filter the map, or browse all units</p>
            <p><strong>Step 4:</strong> Click on any hunting unit on the map to select it</p>
            <p><strong>Step 5:</strong> Watch the form auto-fill with your selection and see unit details</p>
            <p><strong>Step 6:</strong> Complete the remaining fields and calculate draw odds</p>
          </div>
        </div>

        {/* Integrated Calculator */}
        <IntegratedHuntingCalculator 
          onCalculationComplete={(result) => {
            console.log('Calculation completed:', result);
          }}
        />

        {/* Additional Info */}
        <div className="mt-8 bg-gray-50 rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Map Navigation</h3>
              <ul className="space-y-1">
                <li>• Use the layer control to switch between street, satellite, and terrain views</li>
                <li>• Zoom in/out with mouse wheel or map controls</li>
                <li>• Click and drag to pan around the map</li>
                <li>• Units are color-coded by species or season type</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Selection Features</h3>
              <ul className="space-y-1">
                <li>• Selected units are highlighted with red borders</li>
                <li>• Form fields auto-populate when you click map units</li>
                <li>• Unit details panel shows comprehensive information</li>
                <li>• Both dropdown and map selections stay synchronized</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 