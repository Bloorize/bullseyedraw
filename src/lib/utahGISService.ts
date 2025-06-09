import { UtahHuntingData, UtahHuntUnit, GISDataSource } from '@/types/hunting';

export class UtahGISService {
  private static instance: UtahGISService;
  private cache: UtahHuntingData | null = null;
  private cacheExpiry: number = 24; // hours

  // These endpoints would be discovered by inspecting the Hunt Planner network requests
  private readonly dataSources: GISDataSource[] = [
    {
      endpoint: 'https://dwrapps.utah.gov/arcgis/rest/services/DWR/HuntBoundaries/MapServer',
      layerId: '0', // This would be the actual layer ID for hunt boundaries
      cacheExpiry: 24
    }
  ];

  private constructor() {}

  static getInstance(): UtahGISService {
    if (!UtahGISService.instance) {
      UtahGISService.instance = new UtahGISService();
    }
    return UtahGISService.instance;
  }

  async getUtahHuntingData(): Promise<UtahHuntingData> {
    // Check cache first
    if (this.cache && this.isCacheValid()) {
      return this.cache;
    }

    try {
      const data = await this.fetchFromGIS();
      this.cache = data;
      return data;
    } catch (error) {
      console.error('Failed to fetch Utah hunting data:', error);
      // Return cached data if available, even if expired
      if (this.cache) {
        return this.cache;
      }
      throw error;
    }
  }

  private async fetchFromGIS(): Promise<UtahHuntingData> {
    const units: UtahHuntUnit[] = [];
    
    for (const source of this.dataSources) {
      try {
        const response = await fetch(
          `${source.endpoint}/${source.layerId}/query?where=1%3D1&outFields=*&outSR=4326&f=json`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.features) {
          const parsedUnits = this.parseGISFeatures(data.features);
          units.push(...parsedUnits);
        }
      } catch (error) {
        console.error(`Failed to fetch from ${source.endpoint}:`, error);
      }
    }

    return {
      units,
      lastSync: new Date(),
      dataSource: this.dataSources[0],
      species: this.organizeSpeciesData(units)
    };
  }

  private parseGISFeatures(features: any[]): UtahHuntUnit[] {
    return features.map(feature => {
      const attrs = feature.attributes;
      const geometry = feature.geometry;

      return {
        unitId: attrs.UNIT_ID || attrs.ID || '',
        unitName: attrs.UNIT_NAME || attrs.NAME || '',
        species: this.parseSpecies(attrs.SPECIES || attrs.GAME_SPECIES || ''),
        huntMethods: this.parseHuntMethods(attrs.METHODS || attrs.WEAPON_TYPE || ''),
        seasonType: attrs.SEASON_TYPE || attrs.HUNT_TYPE || 'general',
        boundaries: geometry ? {
          type: geometry.type || 'Polygon',
          coordinates: geometry.coordinates || geometry.rings || []
        } : undefined,
        huntCodes: attrs.HUNT_CODES ? attrs.HUNT_CODES.split(',') : [],
        seasonDates: this.parseSeasonDates(attrs),
        restrictions: attrs.RESTRICTIONS ? attrs.RESTRICTIONS.split(';') : [],
        landOwnership: {
          public: parseFloat(attrs.PUBLIC_PERCENT || '0'),
          private: parseFloat(attrs.PRIVATE_PERCENT || '0'),
          state: parseFloat(attrs.STATE_PERCENT || '0')
        }
      };
    });
  }

  private parseSpecies(speciesString: string): string[] {
    if (!speciesString) return [];
    return speciesString.toLowerCase()
      .split(/[,;|]/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  private parseHuntMethods(methodsString: string): string[] {
    if (!methodsString) return [];
    return methodsString.toLowerCase()
      .split(/[,;|]/)
      .map(m => m.trim())
      .filter(m => m.length > 0);
  }

  private parseSeasonDates(attrs: any): { [method: string]: { start: string; end: string } } {
    const dates: { [method: string]: { start: string; end: string } } = {};
    
    // This would parse various date fields from the GIS attributes
    // The exact field names would depend on the actual GIS schema
    if (attrs.ARCHERY_START && attrs.ARCHERY_END) {
      dates.archery = {
        start: attrs.ARCHERY_START,
        end: attrs.ARCHERY_END
      };
    }
    
    if (attrs.RIFLE_START && attrs.RIFLE_END) {
      dates.rifle = {
        start: attrs.RIFLE_START,
        end: attrs.RIFLE_END
      };
    }
    
    if (attrs.MUZZLE_START && attrs.MUZZLE_END) {
      dates.muzzleloader = {
        start: attrs.MUZZLE_START,
        end: attrs.MUZZLE_END
      };
    }
    
    return dates;
  }

  private organizeSpeciesData(units: UtahHuntUnit[]) {
    const species: { [key: string]: any } = {};
    
    units.forEach(unit => {
      unit.species.forEach(speciesName => {
        if (!species[speciesName]) {
          species[speciesName] = {
            name: speciesName,
            methods: new Set<string>(),
            generalSeasonUnits: [],
            limitedEntryUnits: []
          };
        }
        
        unit.huntMethods.forEach(method => {
          species[speciesName].methods.add(method);
        });
        
        if (unit.seasonType.includes('limited')) {
          species[speciesName].limitedEntryUnits.push(unit.unitId);
        } else {
          species[speciesName].generalSeasonUnits.push(unit.unitId);
        }
      });
    });
    
    // Convert Sets to Arrays
    Object.keys(species).forEach(key => {
      species[key].methods = Array.from(species[key].methods);
    });
    
    return species;
  }

  private isCacheValid(): boolean {
    if (!this.cache) return false;
    const now = new Date();
    const cacheAge = (now.getTime() - this.cache.lastSync.getTime()) / (1000 * 60 * 60);
    return cacheAge < this.cacheExpiry;
  }

  // Method to discover GIS endpoints by inspecting network requests
  static async discoverEndpoints(): Promise<string[]> {
    // This would be used during development to find the actual endpoints
    // by monitoring network requests when using the Hunt Planner
    console.log('To discover endpoints:');
    console.log('1. Open dwrapps.utah.gov/huntboundary in browser');
    console.log('2. Open Developer Tools > Network tab');
    console.log('3. Filter by XHR/Fetch requests');
    console.log('4. Look for requests to MapServer or FeatureServer endpoints');
    console.log('5. Copy the endpoint URLs and update the dataSources array');
    
    return [
      'https://dwrapps.utah.gov/arcgis/rest/services/DWR/HuntBoundaries/MapServer/0',
      // Add more discovered endpoints here
    ];
  }
} 