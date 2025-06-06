'use client';

import React, { useState, useEffect } from 'react';

interface AISettingsProps {
  onApiKeySet: (apiKey: string) => void;
}

export function AISettings({ onApiKeySet }: AISettingsProps) {
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isKeySet, setIsKeySet] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted flag to true after component mounts
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only access localStorage after component is mounted on client
    if (mounted && typeof window !== 'undefined') {
      try {
        const savedKey = localStorage.getItem('openai_api_key');
        if (savedKey) {
          setApiKey(savedKey);
          setIsKeySet(true);
          onApiKeySet(savedKey);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    }
  }, [mounted, onApiKeySet]);

  const handleSaveKey = () => {
    if (apiKey.trim() && typeof window !== 'undefined') {
      try {
        localStorage.setItem('openai_api_key', apiKey);
        setIsKeySet(true);
        onApiKeySet(apiKey);
        setShowSettings(false);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  };

  const handleClearKey = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('openai_api_key');
        setApiKey('');
        setIsKeySet(false);
        onApiKeySet('');
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  };

  // Don't render dynamic content until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-amber-100 text-amber-800 hover:bg-amber-200"
          disabled
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Enable AI
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isKeySet 
            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {isKeySet ? 'AI Enabled' : 'Enable AI'}
      </button>

      {showSettings && (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border border-stone-200 p-6 z-50">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">AI Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <p className="mt-1 text-xs text-stone-500">
                Your API key is stored locally and never sent to our servers
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>AI Features:</strong>
              </p>
              <ul className="mt-1 text-xs text-blue-700 list-disc list-inside">
                <li>Intelligent draw odds predictions</li>
                <li>Personalized hunting strategies</li>
                <li>Natural language Q&A</li>
                <li>Real-time trend analysis</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveKey}
                disabled={!apiKey.trim()}
                className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                Save API Key
              </button>
              {isKeySet && (
                <button
                  onClick={handleClearKey}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 