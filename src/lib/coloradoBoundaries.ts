// Colorado hunting unit boundaries (simplified polygons)
// These are approximate boundaries for demonstration purposes
// In a real implementation, these would come from Colorado Parks & Wildlife GIS data

export const coloradoHuntingUnitBoundaries: Record<string, number[][]> = {
  // Elk Units - Limited Entry
  "E-001": [ // Unit 1 - Poudre Canyon
    [40.8, -105.8], [40.8, -105.3], [40.5, -105.3], [40.5, -105.8]
  ],
  "E-002": [ // Unit 2 - Rabbit Ears
    [40.5, -106.8], [40.5, -106.3], [40.2, -106.3], [40.2, -106.8]
  ],
  "E-010": [ // Unit 10 - Granby
    [40.2, -106.2], [40.2, -105.7], [39.9, -105.7], [39.9, -106.2]
  ],
  "E-061": [ // Unit 61 - Gunnison
    [38.8, -107.2], [38.8, -106.7], [38.5, -106.7], [38.5, -107.2]
  ],
  "E-201": [ // Unit 201 - Uncompahgre
    [38.2, -108.2], [38.2, -107.7], [37.9, -107.7], [37.9, -108.2]
  ],

  // Elk Units - Over-the-Counter (OTC)
  "E-OTC-1": [ // OTC Unit 1 - Northwest
    [40.8, -108.5], [40.8, -107.0], [40.0, -107.0], [40.0, -108.5]
  ],
  "E-OTC-2": [ // OTC Unit 2 - Central
    [39.8, -107.5], [39.8, -106.0], [39.0, -106.0], [39.0, -107.5]
  ],

  // Deer Units - Limited Draw
  "D-003": [ // Unit 3 - Poudre Canyon
    [40.7, -105.9], [40.7, -105.4], [40.4, -105.4], [40.4, -105.9]
  ],
  "D-022": [ // Unit 22 - Kremmling
    [40.1, -106.5], [40.1, -106.0], [39.8, -106.0], [39.8, -106.5]
  ],
  "D-140": [ // Unit 140 - Gunnison Basin
    [38.7, -107.3], [38.7, -106.8], [38.4, -106.8], [38.4, -107.3]
  ],

  // Pronghorn Units
  "A-005": [ // Unit 5 - Pawnee Grasslands
    [40.8, -104.5], [40.8, -104.0], [40.5, -104.0], [40.5, -104.5]
  ],
  "A-018": [ // Unit 18 - Limon
    [39.5, -103.8], [39.5, -103.3], [39.2, -103.3], [39.2, -103.8]
  ],
  "A-104": [ // Unit 104 - North Park
    [40.9, -106.8], [40.9, -106.3], [40.6, -106.3], [40.6, -106.8]
  ],

  // Moose Units (Very Limited)
  "M-001": [ // Unit 1 - North Park
    [40.8, -106.7], [40.8, -106.2], [40.5, -106.2], [40.5, -106.7]
  ],
  "M-061": [ // Unit 61 - Gunnison
    [38.9, -107.1], [38.9, -106.6], [38.6, -106.6], [38.6, -107.1]
  ],

  // Bighorn Sheep Units (Extremely Limited)
  "S-006": [ // Unit 6 - Georgetown
    [39.7, -105.8], [39.7, -105.5], [39.5, -105.5], [39.5, -105.8]
  ],
  "S-136": [ // Unit 136 - Collegiate Peaks
    [39.0, -106.5], [39.0, -106.2], [38.7, -106.2], [38.7, -106.5]
  ],

  // Mountain Goat Units (Extremely Limited)
  "G-002": [ // Unit 2 - Eagles Nest
    [39.6, -106.1], [39.6, -105.8], [39.4, -105.8], [39.4, -106.1]
  ],

  // Bear Units
  "B-001": [ // Unit 1 - Poudre Canyon
    [40.9, -105.7], [40.9, -105.2], [40.6, -105.2], [40.6, -105.7]
  ],
  "B-061": [ // Unit 61 - Gunnison
    [38.6, -107.4], [38.6, -106.9], [38.3, -106.9], [38.3, -107.4]
  ]
}; 