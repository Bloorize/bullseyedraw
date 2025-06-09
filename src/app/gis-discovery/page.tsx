'use client';

import React, { useState } from 'react';
import { GISEndpointDiscovery, potentialEndpoints, discoveryInstructions, alternativeDataSources } from '@/utils/gisDiscovery';

export default function GISDiscoveryPage() {
  const [discoveredEndpoints, setDiscoveredEndpoints] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discovery, setDiscovery] = useState<GISEndpointDiscovery | null>(null);

  const startDiscovery = () => {
    const newDiscovery = new GISEndpointDiscovery();
    newDiscovery.startDiscovery();
    setDiscovery(newDiscovery);
    setIsDiscovering(true);
  };

  const stopDiscovery = () => {
    if (discovery) {
      discovery.stopDiscovery();
      setIsDiscovering(false);
    }
  };

  const testEndpoint = async (baseUrl: string, layerId: string = '0') => {
    if (!discovery) return;
    
    try {
      const result = await discovery.testEndpoint(baseUrl, layerId);
      setTestResults(prev => [...prev, { baseUrl, layerId, result, timestamp: new Date() }]);
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  const testAlternativeSources = async () => {
    if (!discovery) return;
    
    try {
      const results = await discovery.testAlternativeSources();
      console.log('Alternative sources test results:', results);
      setTestResults(prev => [...prev, { 
        baseUrl: 'Alternative Sources', 
        layerId: 'N/A', 
        result: { alternativeSources: results }, 
        timestamp: new Date() 
      }]);
    } catch (error) {
      console.error('Alternative sources test failed:', error);
    }
  };

  const getServiceInfo = async (serviceUrl: string) => {
    if (!discovery) return;
    
    try {
      const info = await discovery.getServiceInfo(serviceUrl);
      console.log('Service info:', info);
    } catch (error) {
      console.error('Service info failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Utah GIS Endpoint Discovery
          </h1>
          
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              🔍 Discovery Instructions
            </h2>
            <ol className="list-decimal list-inside text-blue-800 space-y-1">
              <li>Click "Start Discovery" below</li>
              <li>Try the "Test Alternative Sources" button to check for publicly available data</li>
              <li>Open <a href="https://wildlife.utah.gov/hunting/maps.html" target="_blank" rel="noopener noreferrer" className="underline">Utah DWR Hunt Maps</a> in a new tab</li>
              <li>Navigate around and click on species-specific hunt maps</li>
              <li>Come back here and click "Stop Discovery" to see results</li>
            </ol>
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> The Utah Hunt Planner requires authentication. We're testing alternative public data sources instead.
              </p>
            </div>
          </div>

          {/* Discovery Controls */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={startDiscovery}
              disabled={isDiscovering}
              className={`px-4 py-2 rounded-lg font-medium ${
                isDiscovering 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isDiscovering ? '🔍 Discovering...' : 'Start Discovery'}
            </button>
            
            <button
              onClick={stopDiscovery}
              disabled={!isDiscovering}
              className={`px-4 py-2 rounded-lg font-medium ${
                !isDiscovering 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Stop Discovery
            </button>
            
            <button
              onClick={testAlternativeSources}
              disabled={!discovery}
              className="px-4 py-2 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-300"
            >
              Test Alternative Sources
            </button>
          </div>

          {/* Status */}
          {isDiscovering && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                🔍 Discovery is active! Navigate around the Hunt Planner to capture endpoints.
                Check your browser console for real-time discoveries.
              </p>
            </div>
          )}

          {/* Alternative Data Sources */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📊 Alternative Data Sources
            </h2>
            <div className="grid gap-4 mb-6">
              {alternativeDataSources.map((source, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{source.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                      <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {source.type}
                      </span>
                    </div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Visit
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Known Endpoints */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🧪 Test Potential Endpoints
            </h2>
            <div className="grid gap-4">
              {potentialEndpoints.map((endpoint, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {endpoint}
                    </code>
                    <div className="flex gap-2">
                      <button
                        onClick={() => testEndpoint(endpoint, '0')}
                        disabled={!discovery}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
                      >
                        Test Layer 0
                      </button>
                      <button
                        onClick={() => getServiceInfo(endpoint)}
                        disabled={!discovery}
                        className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-300"
                      >
                        Get Info
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📊 Test Results
              </h2>
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">
                        {result.baseUrl}/{result.layerId}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {result.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    {result.result ? (
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <p className="text-green-800 font-medium mb-2">✅ Success!</p>
                        {result.result.features && result.result.features.length > 0 && (
                          <div>
                            <p className="text-sm text-green-700 mb-1">
                              Found {result.result.features.length} features
                            </p>
                            <details className="text-sm">
                              <summary className="cursor-pointer text-green-700 hover:text-green-900">
                                View sample attributes
                              </summary>
                              <pre className="mt-2 bg-white p-2 rounded border text-xs overflow-auto">
                                {JSON.stringify(result.result.features[0]?.attributes, null, 2)}
                              </pre>
                            </details>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded p-3">
                        <p className="text-red-800">❌ Failed to fetch data</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Browser Console Instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              💻 Alternative: Browser Console Method
            </h2>
            <p className="text-gray-700 mb-3">
              If you prefer to run discovery directly in the browser console:
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto">
              {discoveryInstructions}
            </pre>
          </div>

          {/* Back to Main App */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <a 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              ← Back to Hunting Calculator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 