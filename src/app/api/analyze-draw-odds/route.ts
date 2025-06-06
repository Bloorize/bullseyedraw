import { NextRequest, NextResponse } from 'next/server';
import { HuntingFormData } from '@/types/hunting';

export async function POST(request: NextRequest) {
  try {
    const formData: HuntingFormData = await request.json();
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey || !apiKey.startsWith('sk-')) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const prompt = `Analyze the draw odds for this hunting application:
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
        "recommendations": [
          {
            "type": "success|warning|danger|info",
            "title": "<recommendation title>",
            "text": "<detailed recommendation>"
          }
        ],
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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
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
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || response.statusText;
      return NextResponse.json(
        { error: `OpenAI API Error: ${errorMessage}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);
    
    // Validate and format the response
    const validatedAnalysis = {
      odds: Math.max(0, Math.min(100, Number(analysis.odds) || 0)),
      confidence: Math.max(0, Math.min(100, Number(analysis.confidence) || 70)),
      reasoning: analysis.reasoning || 'Analysis based on current trends',
      historicalContext: analysis.historicalContext || 'Historical data unavailable',
      recommendations: Array.isArray(analysis.recommendations) ? 
        analysis.recommendations.map((rec: any) => ({
          type: rec.type || 'info',
          title: rec.title || 'AI Recommendation',
          text: rec.text || (typeof rec === 'string' ? rec : 'No recommendation text')
        })) : [],
      alternativeOptions: Array.isArray(analysis.alternativeOptions) ? 
        analysis.alternativeOptions.map((opt: any) => ({
          state: opt.state || '',
          unit: opt.unit || '',
          huntType: opt.huntType || '',
          odds: Math.max(0, Math.min(100, Number(opt.odds) || 0)),
          reason: opt.reason || ''
        })) : []
    };

    return NextResponse.json(validatedAnalysis);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze draw odds' },
      { status: 500 }
    );
  }
} 