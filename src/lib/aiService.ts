import { HuntingFormData, DrawOddsResult, StrategicOpportunity } from '@/types/hunting';

interface AIConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
}

interface AIDrawAnalysis {
  odds: number;
  confidence: number;
  reasoning: string;
  historicalContext: string;
  recommendations: string[];
  alternativeOptions: Array<{
    state: string;
    unit: string;
    huntType: string;
    odds: number;
    reason: string;
  }>;
}

export class HuntingAIService {
  private apiKey: string;
  private model: string;
  private temperature: number;
  private baseURL = 'https://api.openai.com/v1/chat/completions';

  constructor(config: AIConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'gpt-4';
    this.temperature = config.temperature || 0.7;
  }

  async analyzeDrawOdds(formData: HuntingFormData): Promise<AIDrawAnalysis> {
    const prompt = this.buildDrawOddsPrompt(formData);
    
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are an expert hunting draw odds analyst with deep knowledge of Western US hunting draws. 
                       You analyze draw statistics, point creep trends, and provide accurate predictions.
                       Always provide specific percentages and detailed reasoning.
                       Consider factors like point creep, unit popularity, tag numbers, and historical trends.
                       IMPORTANT: Your response must be a valid JSON object matching the exact format specified in the user's prompt.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: this.temperature
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || response.statusText;
        throw new Error(`OpenAI API Error: ${errorMessage}`);
      }

      const data = await response.json();
      const analysis = JSON.parse(data.choices[0].message.content);
      
      return this.validateAIResponse(analysis);
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw new Error('Failed to analyze draw odds with AI');
    }
  }

  async findStrategicOpportunities(
    targetStates: string[],
    targetSpecies: string[],
    points: number,
    minOdds: number
  ): Promise<StrategicOpportunity[]> {
    const prompt = this.buildStrategyPrompt(targetStates, targetSpecies, points, minOdds);
    
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are a strategic hunting consultant specializing in draw optimization.
                       You help hunters maximize their chances across multiple states and species.
                       Consider point values, draw odds, hunt quality, and timing.
                       Provide specific, actionable recommendations with exact units and hunt codes.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: this.temperature
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const opportunities = JSON.parse(data.choices[0].message.content);
      
      return this.formatOpportunities(opportunities.recommendations);
    } catch (error) {
      console.error('AI Strategy Error:', error);
      throw new Error('Failed to find strategic opportunities with AI');
    }
  }

  async askHuntingQuestion(question: string): Promise<string> {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are a knowledgeable hunting guide and draw specialist.
                       Answer questions about hunting draws, strategies, and regulations.
                       Be specific with units, dates, and statistics when relevant.`
            },
            {
              role: 'user',
              content: question
            }
          ],
          temperature: this.temperature
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Question Error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  private buildDrawOddsPrompt(formData: HuntingFormData): string {
    return `Analyze the draw odds for this hunting application:
      State: ${formData.state}
      Species: ${formData.species}
      Unit: ${formData.unit}
      Hunt Type: ${formData.huntType}
      Residency: ${formData.residency}
      Points: ${formData.points}
      
      You MUST respond with ONLY a valid JSON object in this EXACT format (no other text):
      {
        "odds": <number 0-100>,
        "confidence": <number 0-100>,
        "reasoning": "<detailed explanation>",
        "historicalContext": "<5-year trend analysis>",
        "recommendations": ["<specific advice>", ...],
        "alternativeOptions": [
          {
            "state": "<state>",
            "unit": "<unit>",
            "huntType": "<type>",
            "odds": <number>,
            "reason": "<why this is good>"
          }
        ]
      }`;
  }

  private buildStrategyPrompt(
    states: string[],
    species: string[],
    points: number,
    minOdds: number
  ): string {
    return `Find the best hunting opportunities with these criteria:
      Target States: ${states.join(', ')}
      Target Species: ${species.join(', ')}
      My Points: ${points}
      Minimum Acceptable Odds: ${minOdds}%
      
      You MUST respond with ONLY a valid JSON object in this EXACT format (no other text):
      {
        "recommendations": [
          {
            "state": "<state>",
            "species": "<species>",
            "unit": "<specific unit>",
            "huntType": "<hunt type>",
            "odds": <number>,
            "quality": "<good/high/premium/excellent>",
            "trend": "<improving/stable/declining>",
            "reasoning": "<why this is recommended>",
            "drawStrategy": "<specific application strategy>",
            "backupOptions": ["<alternative units>"],
            "timing": "<best application period>"
          }
        ]
      }
      
      Rank by best overall opportunity considering odds, quality, and point value.`;
  }

  private validateAIResponse(analysis: any): AIDrawAnalysis {
    // Ensure all required fields are present and valid
    return {
      odds: Math.max(0, Math.min(100, Number(analysis.odds) || 0)),
      confidence: Math.max(0, Math.min(100, Number(analysis.confidence) || 70)),
      reasoning: analysis.reasoning || 'Analysis based on current trends',
      historicalContext: analysis.historicalContext || 'Historical data unavailable',
      recommendations: Array.isArray(analysis.recommendations) ? analysis.recommendations : [],
      alternativeOptions: Array.isArray(analysis.alternativeOptions) ? 
        analysis.alternativeOptions.map((opt: any) => ({
          state: opt.state || '',
          unit: opt.unit || '',
          huntType: opt.huntType || '',
          odds: Math.max(0, Math.min(100, Number(opt.odds) || 0)),
          reason: opt.reason || ''
        })) : []
    };
  }

  private formatOpportunities(recommendations: any[]): StrategicOpportunity[] {
    return recommendations.map((rec: any) => ({
      state: rec.state,
      species: rec.species,
      unit: rec.unit,
      huntType: rec.huntType,
      odds: Math.max(0, Math.min(100, Number(rec.odds) || 0)),
      maxOdds: Math.max(0, Math.min(100, Number(rec.odds) || 0)) + 10,
      pointsNeeded: rec.pointsNeeded || 0,
      quality: rec.quality || 'good',
      trend: rec.trend || 'stable',
      success: rec.success || rec.odds || 0,
      avgSize: rec.avgSize || 0,
      difficulty: rec.difficulty || 'Moderate',
      reasoning: rec.reasoning,
      drawStrategy: rec.drawStrategy,
      backupOptions: rec.backupOptions || [],
      timing: rec.timing
    }));
  }
} 