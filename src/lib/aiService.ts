import { HuntingFormData, DrawOddsResult, StrategicOpportunity, Recommendation } from '@/types/hunting';

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
  recommendations: Recommendation[];
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
    try {
      const response = await fetch('/api/analyze-draw-odds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze draw odds');
      }

      const analysis = await response.json();
      return analysis;
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
    try {
      const response = await fetch('/api/strategic-opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetStates,
          targetSpecies,
          points,
          minOdds
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to find strategic opportunities');
      }

      const opportunities = await response.json();
      return opportunities;
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


} 