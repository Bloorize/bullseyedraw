import { coloradoHuntingData, ColoradoHuntUnit } from './coloradoHuntingData';
import { HuntUnit } from '@/types/hunting';

export class ColoradoDataService {
  private static instance: ColoradoDataService;
  private huntingData: ColoradoHuntUnit[];

  private constructor() {
    this.huntingData = coloradoHuntingData.units;
  }

  static getInstance(): ColoradoDataService {
    if (!ColoradoDataService.instance) {
      ColoradoDataService.instance = new ColoradoDataService();
    }
    return ColoradoDataService.instance;
  }

  // Get all species available in Colorado
  getSpecies(): string[] {
    return Object.keys(coloradoHuntingData.species);
  }

  // Get all available species (alias for compatibility)
  getAvailableSpecies(): string[] {
    return this.getSpecies();
  }

  // Get all units
  getAllUnits(): ColoradoHuntUnit[] {
    return this.huntingData;
  }

  // Get species display name
  getSpeciesName(species: string): string {
    return (coloradoHuntingData.species as any)[species]?.name || species;
  }

  // Get units for a specific species
  getUnitsForSpecies(species: string): ColoradoHuntUnit[] {
    return this.huntingData.filter(unit => unit.species.includes(species));
  }

  // Get hunt methods for a species
  getHuntMethods(species: string): string[] {
    return (coloradoHuntingData.species as any)[species]?.methods || [];
  }

  // Get hunt methods for a specific species
  getHuntMethodsForSpecies(species: string): string[] {
    return this.getHuntMethods(species);
  }

  // Get units by hunt method
  getUnitsByMethod(species: string, method: string): ColoradoHuntUnit[] {
    return this.getUnitsForSpecies(species).filter(unit =>
      unit.huntMethods.includes(method)
    );
  }

  // Get units by season type
  getUnitsBySeasonType(species: string, seasonType: string): ColoradoHuntUnit[] {
    return this.getUnitsForSpecies(species).filter(unit =>
      unit.seasonType === seasonType
    );
  }

  // Get specific unit by ID
  getUnitById(unitId: string): ColoradoHuntUnit | undefined {
    return this.huntingData.find(unit => unit.unitId === unitId);
  }

  // Convert Colorado unit to legacy format for compatibility
  convertToLegacyUnit(coloradoUnit: ColoradoHuntUnit): HuntUnit {
    return {
      name: coloradoUnit.unitName,
      quality: coloradoUnit.quality || "Good",
      access: coloradoUnit.access || "Good"
    };
  }

  // Get units in legacy format for existing calculator
  getLegacyUnits(species: string): Record<string, HuntUnit> {
    const units = this.getUnitsForSpecies(species);
    const legacyUnits: Record<string, HuntUnit> = {};

    units.forEach(unit => {
      legacyUnits[unit.unitId] = this.convertToLegacyUnit(unit);
    });

    return legacyUnits;
  }

  // Get hunt types (methods) for legacy compatibility
  getLegacyHuntTypes(species: string): string[] {
    return this.getHuntMethods(species);
  }

  // Get season information for a unit and method
  getSeasonInfo(unitId: string, method: string): { start: string; end: string } | null {
    const unit = this.getUnitById(unitId);
    if (!unit || !unit.seasonDates) return null;

    return unit.seasonDates[method] || null;
  }

  // Get detailed unit information
  getUnitDetails(unitId: string): {
    unit: ColoradoHuntUnit;
    seasonInfo: string;
    landInfo: string;
    huntCodes: string;
  } | null {
    const unit = this.getUnitById(unitId);
    if (!unit) return null;

    // Format season information
    const seasons = Object.entries(unit.seasonDates || {})
      .map(([method, dates]) => `${method}: ${dates.start} to ${dates.end}`)
      .join(', ');

    // Format land ownership
    const landInfo = unit.landOwnership 
      ? `Public: ${unit.landOwnership.public}%, Private: ${unit.landOwnership.private}%, State: ${unit.landOwnership.state}%`
      : 'Land ownership data not available';

    // Format hunt codes
    const huntCodes = unit.huntCodes?.join(', ') || 'N/A';

    return {
      unit,
      seasonInfo: seasons,
      landInfo,
      huntCodes
    };
  }

  // Search units by name
  searchUnits(query: string, species?: string): ColoradoHuntUnit[] {
    let units = species ? this.getUnitsForSpecies(species) : this.huntingData;
    
    return units.filter(unit =>
      unit.unitName.toLowerCase().includes(query.toLowerCase()) ||
      unit.unitId.includes(query)
    );
  }

  // Get statistics
  getStats(): {
    totalUnits: number;
    speciesCount: number;
    generalSeasonUnits: number;
    limitedEntryUnits: number;
    otcUnits: number;
  } {
    const units = this.huntingData;
    
    return {
      totalUnits: units.length,
      speciesCount: Object.keys(coloradoHuntingData.species).length,
      generalSeasonUnits: units.filter(u => u.seasonType === 'general').length,
      limitedEntryUnits: units.filter(u => u.seasonType === 'limited-entry').length,
      otcUnits: units.filter(u => u.unitId.includes('OTC')).length
    };
  }

  // Get units with current season status
  getCurrentSeasonStatus(species: string): Array<{
    unit: ColoradoHuntUnit;
    status: 'open' | 'closed' | 'upcoming';
    daysUntil?: number;
  }> {
    const units = this.getUnitsForSpecies(species);
    const now = new Date();
    
    return units.map(unit => {
      let status: 'open' | 'closed' | 'upcoming' = 'closed';
      let daysUntil: number | undefined;

      // Check each season for current status
      for (const [method, dates] of Object.entries(unit.seasonDates || {})) {
        const start = new Date(dates.start);
        const end = new Date(dates.end);

        if (now >= start && now <= end) {
          status = 'open';
          break;
        } else if (now < start) {
          const days = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          if (!daysUntil || days < daysUntil) {
            daysUntil = days;
            status = 'upcoming';
          }
        }
      }

      return { unit, status, daysUntil };
    });
  }
} 