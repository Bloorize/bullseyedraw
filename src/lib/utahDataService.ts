import { utahHuntingData } from './utahHuntingData';
import { UtahHuntUnit, HuntUnit } from '@/types/hunting';

export class UtahDataService {
  private static instance: UtahDataService;

  private constructor() {}

  static getInstance(): UtahDataService {
    if (!UtahDataService.instance) {
      UtahDataService.instance = new UtahDataService();
    }
    return UtahDataService.instance;
  }

  // Get all species available in Utah
  getSpecies(): string[] {
    return Object.keys(utahHuntingData.species);
  }

  // Get all available species (alias for compatibility)
  getAvailableSpecies(): string[] {
    return this.getSpecies();
  }

  // Get all units
  getAllUnits(): UtahHuntUnit[] {
    return utahHuntingData.units;
  }

  // Get hunt methods for a specific species
  getHuntMethodsForSpecies(species: string): string[] {
    return this.getHuntMethods(species);
  }

  // Get species display name
  getSpeciesName(species: string): string {
    return utahHuntingData.species[species]?.name || species;
  }

  // Get units for a specific species
  getUnitsForSpecies(species: string): UtahHuntUnit[] {
    return utahHuntingData.units.filter(unit => 
      unit.species.includes(species)
    );
  }

  // Get hunt methods for a species
  getHuntMethods(species: string): string[] {
    return utahHuntingData.species[species]?.methods || [];
  }

  // Get units by hunt method
  getUnitsByMethod(species: string, method: string): UtahHuntUnit[] {
    return this.getUnitsForSpecies(species).filter(unit =>
      unit.huntMethods.includes(method)
    );
  }

  // Get units by season type
  getUnitsBySeasonType(species: string, seasonType: string): UtahHuntUnit[] {
    return this.getUnitsForSpecies(species).filter(unit =>
      unit.seasonType === seasonType
    );
  }

  // Get specific unit by ID
  getUnitById(unitId: string): UtahHuntUnit | undefined {
    return utahHuntingData.units.find(unit => unit.unitId === unitId);
  }

  // Convert Utah unit to legacy format for compatibility
  convertToLegacyUnit(utahUnit: UtahHuntUnit): HuntUnit {
    // Determine quality based on season type and land ownership
    let quality = "Good";
    if (utahUnit.seasonType === "limited-entry") {
      quality = utahUnit.landOwnership?.public && utahUnit.landOwnership.public > 90 ? "Premium" : "High";
    }

    // Determine access based on land ownership
    let access = "Good";
    if (utahUnit.landOwnership?.private && utahUnit.landOwnership.private > 30) {
      access = "Difficult";
    } else if (utahUnit.landOwnership?.private && utahUnit.landOwnership.private > 15) {
      access = "Moderate";
    }

    return {
      name: utahUnit.unitName,
      quality,
      access
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
    unit: UtahHuntUnit;
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
  searchUnits(query: string, species?: string): UtahHuntUnit[] {
    let units = species ? this.getUnitsForSpecies(species) : utahHuntingData.units;
    
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
    extendedArcheryUnits: number;
  } {
    const units = utahHuntingData.units;
    
    return {
      totalUnits: units.length,
      speciesCount: Object.keys(utahHuntingData.species).length,
      generalSeasonUnits: units.filter(u => u.seasonType === 'general').length,
      limitedEntryUnits: units.filter(u => u.seasonType === 'limited-entry').length,
      extendedArcheryUnits: units.filter(u => u.seasonType === 'extended-archery').length
    };
  }

  // Get units with current season status
  getCurrentSeasonStatus(species: string): Array<{
    unit: UtahHuntUnit;
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