import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { targetStates, targetSpecies, points, minOdds } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey || apiKey.length < 20) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const validStates = ['utah', 'colorado', 'wyoming', 'montana', 'idaho', 'arizona', 'nevada'];
    const validSpecies = ['elk', 'deer', 'moose', 'sheep', 'goat', 'antelope', 'bear'];
    
    const prompt = `Find the best hunting opportunities with these criteria:
      Target States: ${targetStates.join(', ')}
      Target Species: ${targetSpecies.join(', ')}
      My Points: ${points}
      Minimum Acceptable Odds: ${minOdds}%
      
      IMPORTANT: Only use these valid state codes: ${validStates.join(', ')}
      IMPORTANT: Only use these valid species: ${validSpecies.join(', ')}
      
      You MUST respond with ONLY a valid JSON object in this EXACT format (no other text):
      {
        "recommendations": [
          {
            "state": "<state code from valid list>",
            "species": "<species from valid list>",
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
    const opportunities = JSON.parse(data.choices[0].message.content);
    
    // Format opportunities for the frontend
    const formattedOpportunities = opportunities.recommendations.map((rec: any) => ({
      state: rec.state,
      species: rec.species,
      unit: rec.unit,
      huntType: rec.huntType,
      odds: Math.max(0, Math.min(100, Number(rec.odds) || 0)),
      maxOdds: Math.max(0, Math.min(100, Number(rec.odds) || 0)) + 10,
      minPoints: rec.minPoints || rec.pointsNeeded || 0,
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

    return NextResponse.json(formattedOpportunities);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to find strategic opportunities' },
      { status: 500 }
    );
  }
} 