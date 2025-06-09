'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { UtahDataService } from '@/lib/utahDataService';
import { UtahHuntUnit } from '@/types/hunting';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface UtahHuntingMapProps {
  selectedSpecies?: string;
  selectedUnit?: string;
  onUnitSelect?: (unitId: string) => void;
}

// Approximate hunting unit boundaries for Utah (simplified polygons)
// In a real implementation, these would come from GIS data
const huntingUnitBoundaries: Record<string, number[][]> = {
  // Deer Units - General Season
  "1001": [ // Box Elder, West Desert
    [41.9, -113.5], [41.9, -112.8], [41.3, -112.8], [41.3, -113.5]
  ],
  "1002": [ // North Slope, Summit
    [41.0, -111.2], [41.0, -110.5], [40.7, -110.5], [40.7, -111.2]
  ],
  "1003": [ // Cache
    [42.0, -112.0], [42.0, -111.5], [41.5, -111.5], [41.5, -112.0]
  ],
  "1004": [ // Ogden
    [41.5, -112.0], [41.5, -111.5], [41.2, -111.5], [41.2, -112.0]
  ],
  "1005": [ // Salt Lake
    [40.8, -112.0], [40.8, -111.5], [40.5, -111.5], [40.5, -112.0]
  ],

  // Deer Units - Limited Entry
  "1101": [ // Henry Mountains
    [38.2, -111.0], [38.2, -110.5], [37.8, -110.5], [37.8, -111.0]
  ],
  "1102": [ // Paunsaugunt
    [37.8, -112.5], [37.8, -112.0], [37.4, -112.0], [37.4, -112.5]
  ],
  "1103": [ // Wasatch Mountains
    [40.5, -111.5], [40.5, -111.0], [40.0, -111.0], [40.0, -111.5]
  ],

  // Elk Units - General Season
  "2001": [ // Wasatch Mountains
    [40.6, -111.6], [40.6, -111.0], [40.1, -111.0], [40.1, -111.6]
  ],
  "2002": [ // Cache
    [41.8, -112.1], [41.8, -111.4], [41.4, -111.4], [41.4, -112.1]
  ],
  "2003": [ // North Slope, Summit
    [40.9, -111.3], [40.9, -110.4], [40.6, -110.4], [40.6, -111.3]
  ],

  // Elk Units - Limited Entry
  "2101": [ // Beaver
    [38.5, -112.8], [38.5, -112.2], [38.0, -112.2], [38.0, -112.8]
  ],
  "2102": [ // Fishlake
    [38.8, -111.8], [38.8, -111.2], [38.3, -111.2], [38.3, -111.8]
  ],
  "2103": [ // Manti
    [39.5, -111.8], [39.5, -111.2], [39.0, -111.2], [39.0, -111.8]
  ],

  // Pronghorn Units
  "3001": [ // Box Elder
    [41.8, -113.2], [41.8, -112.5], [41.4, -112.5], [41.4, -113.2]
  ],
  "3002": [ // West Desert
    [40.5, -113.8], [40.5, -113.0], [40.0, -113.0], [40.0, -113.8]
  ],

  // Moose Units
  "4001": [ // Wasatch Mountains
    [40.7, -111.7], [40.7, -111.1], [40.2, -111.1], [40.2, -111.7]
  ],
  "4002": [ // North Slope, Summit
    [40.8, -111.4], [40.8, -110.3], [40.5, -110.3], [40.5, -111.4]
  ],

  // Bighorn Sheep Units
  "5001": [ // Zion
    [37.3, -113.1], [37.3, -112.8], [37.0, -112.8], [37.0, -113.1]
  ],
  "5002": [ // Antelope Island
    [41.0, -112.3], [41.0, -112.1], [40.8, -112.1], [40.8, -112.3]
  ],

  // Mountain Goat Units
  "6001": [ // Wasatch Mountains
    [40.8, -111.8], [40.8, -111.2], [40.3, -111.2], [40.3, -111.8]
  ],

  // Bison Units
  "7001": [ // Henry Mountains
    [38.1, -111.1], [38.1, -110.4], [37.7, -110.4], [37.7, -111.1]
  ],
  "7002": [ // Antelope Island
    [41.1, -112.4], [41.1, -112.0], [40.7, -112.0], [40.7, -112.4]
  ],

  // Bear Units (Statewide - showing major regions)
  "8001": [ // Statewide (represented by state outline)
    [42.0, -114.0], [42.0, -109.0], [37.0, -109.0], [37.0, -114.0]
  ],

  // Extended Archery Areas
  "9001": [ // Wasatch Extended Archery
    [40.9, -111.9], [40.9, -111.3], [40.4, -111.3], [40.4, -111.9]
  ],
  "9002": [ // Cache Extended Archery
    [41.9, -112.2], [41.9, -111.3], [41.3, -111.3], [41.3, -112.2]
  ]
};

// Color scheme for different species
const speciesColors: Record<string, string> = {
  deer: '#8B4513',      // Brown
  elk: '#228B22',       // Forest Green
  pronghorn: '#DAA520', // Goldenrod
  moose: '#2F4F4F',     // Dark Slate Gray
  bighorn_sheep: '#696969', // Dim Gray
  mountain_goat: '#F5F5DC', // Beige
  bison: '#8B0000',     // Dark Red
  bear: '#000000'       // Black
};

// Season type colors
const seasonTypeColors: Record<string, string> = {
  'general': '#4CAF50',           // Green
  'limited-entry': '#FF9800',    // Orange
  'extended-archery': '#2196F3'  // Blue
};

export default function UtahHuntingMap({ selectedSpecies, selectedUnit, onUnitSelect }: UtahHuntingMapProps) {
  const [units, setUnits] = useState<UtahHuntUnit[]>([]);
  const [filteredUnits, setFilteredUnits] = useState<UtahHuntUnit[]>([]);
  const [mapCenter] = useState<[number, number]>([39.5, -111.5]); // Center of Utah
  const [mapZoom] = useState(7);
  const utahService = UtahDataService.getInstance();

  useEffect(() => {
    // Load all Utah hunting units
    const allUnits = utahService.getUnitsForSpecies('deer')
      .concat(utahService.getUnitsForSpecies('elk'))
      .concat(utahService.getUnitsForSpecies('pronghorn'))
      .concat(utahService.getUnitsForSpecies('moose'))
      .concat(utahService.getUnitsForSpecies('bighorn_sheep'))
      .concat(utahService.getUnitsForSpecies('mountain_goat'))
      .concat(utahService.getUnitsForSpecies('bison'))
      .concat(utahService.getUnitsForSpecies('bear'));

    // Remove duplicates (units that have multiple species)
    const uniqueUnits = allUnits.filter((unit, index, self) => 
      index === self.findIndex(u => u.unitId === unit.unitId)
    );

    setUnits(uniqueUnits);
  }, []);

  useEffect(() => {
    // Filter units based on selected species
    if (selectedSpecies) {
      const speciesUnits = utahService.getUnitsForSpecies(selectedSpecies);
      setFilteredUnits(speciesUnits);
    } else {
      setFilteredUnits(units);
    }
  }, [selectedSpecies, units]);

  const getUnitColor = (unit: UtahHuntUnit): string => {
    if (selectedSpecies) {
      return seasonTypeColors[unit.seasonType] || '#666666';
    }
    // If no species selected, color by primary species
    const primarySpecies = unit.species[0];
    return speciesColors[primarySpecies] || '#666666';
  };

  const getUnitOpacity = (unit: UtahHuntUnit): number => {
    if (selectedUnit && unit.unitId === selectedUnit) {
      return 0.8;
    }
    return 0.4;
  };

  const handleUnitClick = (unitId: string) => {
    if (onUnitSelect) {
      onUnitSelect(unitId);
    }
  };

  const formatSeasonDates = (unit: UtahHuntUnit): string => {
    if (!unit.seasonDates) return 'Season dates not available';
    
    return Object.entries(unit.seasonDates)
      .map(([method, dates]) => `${method}: ${dates.start} to ${dates.end}`)
      .join('\n');
  };

  const getUnitCenter = (unitId: string): [number, number] | null => {
    const boundary = huntingUnitBoundaries[unitId];
    if (!boundary || boundary.length === 0) return null;
    
    const lats = boundary.map(coord => coord[0]);
    const lngs = boundary.map(coord => coord[1]);
    
    const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2;
    const centerLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;
    
    return [centerLat, centerLng];
  };

  return (
    <div className="w-full h-96 relative">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Terrain">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Render hunting unit polygons */}
        {filteredUnits.map((unit) => {
          const boundary = huntingUnitBoundaries[unit.unitId];
          if (!boundary) return null;

          const positions: [number, number][] = boundary.map(coord => [coord[0], coord[1]]);
          
          return (
            <Polygon
              key={unit.unitId}
              positions={positions}
              pathOptions={{
                fillColor: getUnitColor(unit),
                fillOpacity: getUnitOpacity(unit),
                color: selectedUnit === unit.unitId ? '#FF0000' : '#333333',
                weight: selectedUnit === unit.unitId ? 3 : 1,
                opacity: 0.8
              }}
              eventHandlers={{
                click: () => handleUnitClick(unit.unitId)
              }}
            >
              <Popup>
                <div className="p-2 max-w-sm">
                  <h3 className="font-bold text-lg mb-2">{unit.unitName}</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Unit ID:</strong> {unit.unitId}</p>
                    <p><strong>Species:</strong> {unit.species.map(s => utahService.getSpeciesName(s)).join(', ')}</p>
                    <p><strong>Hunt Methods:</strong> {unit.huntMethods.join(', ')}</p>
                    <p><strong>Season Type:</strong> {unit.seasonType}</p>
                    {unit.huntCodes && (
                      <p><strong>Hunt Codes:</strong> {unit.huntCodes.join(', ')}</p>
                    )}
                    {unit.landOwnership && (
                      <p><strong>Land Ownership:</strong> {unit.landOwnership.public}% Public, {unit.landOwnership.private}% Private</p>
                    )}
                    <div className="mt-2">
                      <strong>Season Dates:</strong>
                      <pre className="text-xs mt-1 whitespace-pre-wrap">{formatSeasonDates(unit)}</pre>
                    </div>
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}

        {/* Render unit center markers for better identification */}
        {filteredUnits.map((unit) => {
          const center = getUnitCenter(unit.unitId);
          if (!center) return null;

          return (
            <Marker
              key={`marker-${unit.unitId}`}
              position={center}
              eventHandlers={{
                click: () => handleUnitClick(unit.unitId)
              }}
            >
              <Popup>
                <div className="text-center">
                  <h4 className="font-semibold">{unit.unitName}</h4>
                  <p className="text-sm">Unit {unit.unitId}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg z-[1000] max-w-xs">
        <h4 className="font-semibold mb-2">Legend</h4>
        {selectedSpecies ? (
          <div className="space-y-1">
            <h5 className="font-medium text-sm">Season Types:</h5>
            {Object.entries(seasonTypeColors).map(([type, color]) => (
              <div key={type} className="flex items-center text-xs">
                <div 
                  className="w-4 h-4 mr-2 border border-gray-400"
                  style={{ backgroundColor: color, opacity: 0.6 }}
                ></div>
                <span className="capitalize">{type.replace('-', ' ')}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            <h5 className="font-medium text-sm">Species:</h5>
            {Object.entries(speciesColors).map(([species, color]) => (
              <div key={species} className="flex items-center text-xs">
                <div 
                  className="w-4 h-4 mr-2 border border-gray-400"
                  style={{ backgroundColor: color, opacity: 0.6 }}
                ></div>
                <span className="capitalize">{species.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 