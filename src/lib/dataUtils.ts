import { huntingData, strategicOpportunities, pointStrategies } from './huntingData';
import type { 
  StrategyCriteria, 
  StrategicOpportunity, 
  HuntStats,
  DrawOddsData,
  HuntUnit,
  Recommendation,
  ChartDataPoint,
  CalculatorFormData
} from '@/types/hunting';

export class DataUtils {
  // Get draw odds for specific hunt
  static getDrawOdds(
    state: string, 
    species: string, 
    unit: string, 
    huntType: string, 
    residency: string, 
    points: number
  ): number | null {
    const key = `${state}-${species}-${unit}-${huntType}-${residency}`;
    const oddsData: DrawOddsData | undefined = huntingData.drawOdds[key];
    
    if (!oddsData) return null;
    
    // Return odds for specific point level, or interpolate
    if (oddsData[points] !== undefined) {
      return oddsData[points];
    }
    
    // Interpolate between point levels
    const lowerPoints = Math.floor(points);
    const upperPoints = Math.ceil(points);
    
    if (oddsData[lowerPoints] !== undefined && oddsData[upperPoints] !== undefined) {
      const ratio = points - lowerPoints;
      return Math.round(oddsData[lowerPoints] + (oddsData[upperPoints] - oddsData[lowerPoints]) * ratio);
    }
    
    return null;
  }

  // Get hunt statistics
  static getHuntStats(state: string, species: string, unit: string, huntType: string): HuntStats | null {
    const key = `${state}-${species}-${unit}-${huntType}`;
    return huntingData.huntStats[key] || null;
  }

  // Get units for state and species
  static getUnits(state: string, species: string): Record<string, HuntUnit> {
    return huntingData.states[state]?.species[species]?.units || {};
  }

  // Get hunt types for species
  static getHuntTypes(state: string, species: string): string[] {
    return huntingData.states[state]?.species[species]?.huntTypes || [];
  }

  // Get application info for state
  static getApplicationInfo(state: string) {
    return huntingData.applicationInfo[state];
  }

  // Find strategic opportunities based on criteria
  static findOpportunities(criteria: StrategyCriteria): StrategicOpportunity[] {
    return strategicOpportunities.filter(opp => {
      if (criteria.states && criteria.states.length > 0 && !criteria.states.includes(opp.state)) return false;
      if (criteria.species && criteria.species.length > 0 && !criteria.species.includes(opp.species)) return false;
      if (criteria.huntTypes && criteria.huntTypes.length > 0 && !criteria.huntTypes.includes(opp.huntType)) return false;
      if (criteria.maxPoints !== undefined && opp.minPoints > criteria.maxPoints) return false;
      if (criteria.minOdds !== undefined && opp.maxOdds < criteria.minOdds) return false;
      return true;
    });
  }

  // Calculate multi-hunt success probability
  static calculateCombinedOdds(hunts: { odds: number }[]): number {
    const failureRate = hunts.reduce((acc, hunt) => {
      return acc * (1 - hunt.odds / 100);
    }, 1);
    
    return Math.round((1 - failureRate) * 100);
  }

  // Format hunt type name for display
  static formatHuntTypeName(huntType: string): string {
    const nameMap: Record<string, string> = {
      'archery': 'Archery',
      'muzzleloader': 'Muzzleloader',
      'rifle': 'Any Weapon/Rifle',
      'rifle-1': 'Rifle Season 1',
      'rifle-2': 'Rifle Season 2', 
      'rifle-3': 'Rifle Season 3',
      'rifle-early': 'Early Rifle',
      'rifle-late': 'Late Rifle'
    };
    return nameMap[huntType] || huntType;
  }

  // Generate chart data for odds by point level
  static generateChartData(
    state: string, 
    species: string, 
    unit: string, 
    huntType: string, 
    residency: string
  ): ChartDataPoint[] {
    const points = [0, 2, 4, 6, 8, 10];
    
    return points.map(pointLevel => {
      const odds = this.getDrawOdds(state, species, unit, huntType, residency, pointLevel);
      return {
        pointLevel: pointLevel === 10 ? '10+' : `${pointLevel}-${pointLevel + 1}`,
        odds: odds || 0
      };
    }).filter(point => point.odds > 0);
  }

  // Generate strategic recommendations
  static generateRecommendations(
    odds: number, 
    stats: HuntStats, 
    formData: CalculatorFormData
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Analyze odds and provide strategic advice
    if (odds >= 80) {
      recommendations.push({
        type: 'success',
        title: 'Excellent Draw Odds',
        text: 'You have very high chances of drawing this tag. This is a great application choice!'
      });
    } else if (odds >= 50) {
      recommendations.push({
        type: 'warning',
        title: 'Good Draw Odds',
        text: 'You have decent chances of drawing. Consider this as part of a balanced strategy.'
      });
    } else if (odds >= 25) {
      recommendations.push({
        type: 'warning',
        title: 'Moderate Draw Odds',
        text: 'This is a competitive hunt. Consider building more points or look for backup options.'
      });
    } else {
      recommendations.push({
        type: 'danger',
        title: 'Low Draw Odds',
        text: 'This is a very competitive hunt. Consider this only if you\'re playing the long game.'
      });
    }

    // Point-specific recommendations
    const points = formData.points;
    const typicalPoints = parseInt(stats.pointsNeeded.split('-')[0]) || 5;
    
    if (points < typicalPoints - 2) {
      recommendations.push({
        type: 'warning',
        title: 'Build More Points',
        text: `Consider building points for 2-3 more years. Typical successful applicants have ${stats.pointsNeeded} points.`
      });
    } else if (points >= typicalPoints + 3) {
      recommendations.push({
        type: 'success',
        title: 'Great Point Level',
        text: 'You have more points than typical successful applicants. Great time to apply!'
      });
    }

    // Alternative suggestions
    recommendations.push(...this.getAlternativeRecommendations(formData));

    return recommendations;
  }

  // Get alternative recommendations
  private static getAlternativeRecommendations(formData: CalculatorFormData): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Suggest archery if they selected rifle
    if (formData.season === 'rifle') {
      const archeryOdds = this.getDrawOdds(
        formData.state, 
        formData.species, 
        formData.unit, 
        'archery', 
        formData.residency, 
        formData.points
      );
      
      if (archeryOdds && archeryOdds > 20) {
        recommendations.push({
          type: 'info',
          title: 'Consider Archery Season',
          text: `Archery season for this unit has ${archeryOdds}% draw odds, which may offer better chances.`
        });
      }
    }

    // Suggest similar units with better odds
    if (formData.state === 'utah' && formData.species === 'elk') {
      const alternatives = [
        { unit: 'manti', name: 'Manti' },
        { unit: 'plateau', name: 'Plateau' }
      ].filter(alt => alt.unit !== formData.unit);

      alternatives.forEach(alt => {
        const altOdds = this.getDrawOdds(
          formData.state, 
          formData.species, 
          alt.unit, 
          formData.season,
          formData.residency, 
          formData.points
        );
        
        if (altOdds && altOdds > 60) {
          recommendations.push({
            type: 'info',
            title: `Consider ${alt.name} Unit`,
            text: `The ${alt.name} unit has ${altOdds}% draw odds for similar hunting quality.`
          });
        }
      });
    }

    return recommendations;
  }

  // Apply strategy-specific filtering
  static applyStrategyFiltering(
    opportunities: StrategicOpportunity[], 
    strategyType: string, 
    criteria: StrategyCriteria
  ): StrategicOpportunity[] {
    switch (strategyType) {
      case 'conservative':
        return opportunities.filter(opp => opp.maxOdds >= 70);
      
      case 'aggressive':
        return opportunities.filter(opp => opp.quality === 'Premium' || opp.maxOdds <= 50);
      
      case 'points-builder':
        return opportunities.filter(opp => opp.minPoints <= (criteria.maxPoints || 0) + 1);
      
      case 'balanced':
      default:
        return opportunities.filter(opp => opp.maxOdds >= 30);
    }
  }

  // Get strategy info
  static getStrategyInfo(strategyType: string) {
    return pointStrategies[strategyType] || pointStrategies.balanced;
  }

  // Generate strategy tip
  static getStrategyTip(strategyType: string, avgOdds: number, totalOpportunities: number): string {
    switch (strategyType) {
      case 'conservative':
        return 'Focus on the highest odds opportunities to maximize your chances of hunting this year.';
      
      case 'aggressive':
        return 'These premium hunts require patience, but offer world-class hunting experiences.';
      
      case 'points-builder':
        return 'Build points strategically while applying for some huntable opportunities.';
      
      case 'balanced':
      default:
        if (avgOdds >= 60) {
          return 'Excellent mix of opportunities! Consider applying for multiple hunts.';
        } else if (avgOdds >= 40) {
          return 'Good balance of risk and reward. Mix high and moderate odds applications.';
        } else {
          return 'Consider including some higher odds backup options in your strategy.';
        }
    }
  }

  // Validate form data
  static validateDrawForm(data: Partial<CalculatorFormData>): { isValid: boolean; error?: string } {
    const required = ['species', 'state', 'unit', 'season', 'residency'];
    
    for (const field of required) {
      if (!data[field as keyof CalculatorFormData]) {
        return {
          isValid: false,
          error: `Please select a ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`
        };
      }
    }
    
    if (!data.points || data.points < 0) {
      return {
        isValid: false,
        error: 'Please enter a valid number of preference points.'
      };
    }
    
    return { isValid: true };
  }
} 