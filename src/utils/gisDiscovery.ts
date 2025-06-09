/**
 * Development utility to discover GIS endpoints from Utah Hunt Planner
 * Updated to handle authentication issues and test alternative sources
 */

export class GISEndpointDiscovery {
  private discoveredEndpoints: Set<string> = new Set();
  private originalFetch: typeof fetch;

  constructor() {
    this.originalFetch = window.fetch.bind(window);
  }

  // Intercept fetch requests to discover GIS endpoints
  startDiscovery(): void {
    console.log('🔍 Starting GIS endpoint discovery...');
    console.log('Navigate around any Utah hunting websites to capture endpoints');
    
    const self = this;
    window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Look for any GIS-related endpoints
      if (url.includes('MapServer') || 
          url.includes('FeatureServer') || 
          url.includes('arcgis') ||
          url.includes('gis') ||
          url.includes('hunting') ||
          url.includes('wildlife')) {
        self.discoveredEndpoints.add(url);
        console.log('📍 Discovered endpoint:', url);
      }
      
      return self.originalFetch.call(this, input, init);
    };
  }

  stopDiscovery(): void {
    window.fetch = this.originalFetch;
    console.log('🛑 Stopped endpoint discovery');
    this.printDiscoveredEndpoints();
  }

  printDiscoveredEndpoints(): void {
    console.log('\n📋 Discovered Endpoints:');
    console.log('================================');
    
    Array.from(this.discoveredEndpoints).forEach((endpoint, index) => {
      console.log(`${index + 1}. ${endpoint}`);
    });
    
    if (this.discoveredEndpoints.size === 0) {
      console.log('No endpoints discovered. This is normal if the sites require authentication.');
      console.log('Consider using static data sources instead.');
    }
    
    console.log('\n🔧 Copy any working endpoints to your UtahGISService dataSources array');
  }

  // Test an endpoint to see what data it returns
  async testEndpoint(baseUrl: string, layerId: string = '0'): Promise<any> {
    const testUrl = `${baseUrl}/${layerId}/query?where=1%3D1&outFields=*&returnGeometry=false&f=json&resultRecordCount=5`;
    
    try {
      console.log(`🧪 Testing endpoint: ${testUrl}`);
      const response = await this.originalFetch(testUrl);
      
      if (response.status === 302 || response.status === 401 || response.status === 403) {
        console.log('🔒 Endpoint requires authentication');
        return { error: 'Authentication required', status: response.status };
      }
      
      const data = await response.json();
      
      console.log('✅ Endpoint response:', data);
      
      if (data.features && data.features.length > 0) {
        console.log('📊 Sample feature attributes:', data.features[0].attributes);
        console.log('🏷️  Available fields:', Object.keys(data.features[0].attributes));
      }
      
      return data;
    } catch (error) {
      console.error('❌ Endpoint test failed:', error);
      return { error: error instanceof Error ? error.message : String(error) };
    }
  }

  // Get metadata about a service
  async getServiceInfo(serviceUrl: string): Promise<any> {
    try {
      const response = await this.originalFetch(`${serviceUrl}?f=json`);
      
      if (response.status === 302 || response.status === 401 || response.status === 403) {
        console.log('🔒 Service requires authentication');
        return { error: 'Authentication required', status: response.status };
      }
      
      const data = await response.json();
      
      console.log('ℹ️  Service info:', data);
      
      if (data.layers) {
        console.log('📑 Available layers:');
        data.layers.forEach((layer: any) => {
          console.log(`  - Layer ${layer.id}: ${layer.name}`);
        });
      }
      
      return data;
    } catch (error) {
      console.error('❌ Failed to get service info:', error);
      return { error: error instanceof Error ? error.message : String(error) };
    }
  }

  // Test alternative data sources
  async testAlternativeSources(): Promise<any[]> {
    const results = [];
    
    // Test Utah open data portal
    try {
      console.log('🔍 Testing Utah Open Data Portal...');
      const response = await this.originalFetch('https://opendata.gis.utah.gov/datasets.json');
      const data = await response.json();
      
      // Look for hunting-related datasets
      const huntingDatasets = data.dataset?.filter((d: any) => 
        d.name?.toLowerCase().includes('hunt') || 
        d.name?.toLowerCase().includes('wildlife') ||
        d.name?.toLowerCase().includes('game')
      ) || [];
      
      console.log('🎯 Found hunting-related datasets:', huntingDatasets.length);
      huntingDatasets.forEach((dataset: any) => {
        console.log(`  - ${dataset.name}: ${dataset.url}`);
      });
      
      results.push({ source: 'Utah Open Data', datasets: huntingDatasets });
    } catch (error) {
      console.log('❌ Utah Open Data test failed:', error);
    }
    
    // Test for static file sources
    const staticSources = [
      'https://wildlife.utah.gov/hunting/maps.html',
      'https://gis.utah.gov/products/sgid/',
    ];
    
        for (const source of staticSources) {
      try {
        console.log(`🔍 Testing static source: ${source}`);
        const response = await this.originalFetch(source, { mode: 'no-cors' });
        results.push({ source, status: 'accessible', note: 'Check manually for downloadable files' });
      } catch (error) {
        results.push({ source, status: 'error', error: error instanceof Error ? error.message : String(error) });
      }
    }
    
    return results;
  }
}

// Usage instructions for browser console
export const discoveryInstructions = `
// Updated instructions for Utah hunting data discovery

const discovery = new GISEndpointDiscovery();

// Start intercepting requests
discovery.startDiscovery();

// Try these approaches:
// 1. Navigate to https://wildlife.utah.gov/hunting/maps.html
// 2. Click on individual species hunt maps (Buck deer, Bull elk, etc.)
// 3. Look for any interactive maps or downloadable files

// Test alternative data sources
await discovery.testAlternativeSources();

// When done exploring, stop discovery
discovery.stopDiscovery();

// Test any discovered endpoints
// await discovery.testEndpoint('DISCOVERED_URL', '0');
`;

// Updated potential endpoints (including alternatives)
export const potentialEndpoints = [
  'https://dwrapps.utah.gov/arcgis/rest/services/DWR/HuntBoundaries/MapServer',
  'https://dwrapps.utah.gov/arcgis/rest/services/DWR/BigGame/MapServer',
  'https://dwrapps.utah.gov/arcgis/rest/services/DWR/WildlifeData/MapServer',
  'https://gis.utah.gov/arcgis/rest/services/DWR/HuntBoundaries/MapServer',
  'https://opendata.gis.utah.gov/datasets/utah::utah-hunting-units',
  'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services', // Utah state services
];

// Alternative data sources to explore
export const alternativeDataSources = [
  {
    name: 'Utah DWR Hunt Maps',
    url: 'https://wildlife.utah.gov/hunting/maps.html',
    type: 'Static maps and tables',
    description: 'Official hunt unit maps and tables for each species'
  },
  {
    name: 'Utah SGID',
    url: 'https://gis.utah.gov/products/sgid/',
    type: 'GIS data portal',
    description: 'State geographic information database'
  },
  {
    name: 'GPS File Depot',
    url: 'https://www.gpsfiledepot.com/maps/view/540',
    type: 'Third-party GIS files',
    description: 'Utah hunting unit boundaries for GPS devices'
  }
];

// Field mapping for common GIS attribute names
export const fieldMappings = {
  unitId: ['UNIT_ID', 'ID', 'HUNT_UNIT', 'UNIT_CODE', 'UNIT_NUM'],
  unitName: ['UNIT_NAME', 'NAME', 'HUNT_NAME', 'UNIT_DESC', 'UNIT_DESCRIPTION'],
  species: ['SPECIES', 'GAME_SPECIES', 'ANIMAL', 'GAME_TYPE', 'HUNT_SPECIES'],
  huntType: ['HUNT_TYPE', 'SEASON_TYPE', 'TYPE', 'CATEGORY', 'HUNT_CATEGORY'],
  methods: ['METHODS', 'WEAPON_TYPE', 'WEAPONS', 'HUNT_METHOD', 'WEAPON'],
  seasonStart: ['START_DATE', 'SEASON_START', 'OPEN_DATE', 'HUNT_START'],
  seasonEnd: ['END_DATE', 'SEASON_END', 'CLOSE_DATE', 'HUNT_END'],
}; 