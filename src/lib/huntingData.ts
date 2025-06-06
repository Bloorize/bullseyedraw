import type { 
  HuntingData, 
  StrategicOpportunity, 
  PointStrategy,
  StrategyCriteria
} from '@/types/hunting';

export const huntingData: HuntingData = {
  states: {
    utah: {
      name: "Utah",
      species: {
        elk: {
          units: {
            cache: { name: "Cache", quality: "High", access: "Good" },
            northslope: { name: "North Slope", quality: "Premium", access: "Difficult" },
            wasatch: { name: "Wasatch Mountains", quality: "High", access: "Good" },
            manti: { name: "Manti", quality: "Good", access: "Good" },
            plateau: { name: "Plateau", quality: "Good", access: "Good" },
            bookcliffs: { name: "Book Cliffs", quality: "Premium", access: "Moderate" },
            henrymtns: { name: "Henry Mountains", quality: "Premium", access: "Difficult" },
            lasal: { name: "La Sal", quality: "High", access: "Moderate" }
          },
          huntTypes: ["archery", "muzzleloader", "rifle"]
        },
        deer: {
          units: {
            cache: { name: "Cache", quality: "Good", access: "Good" },
            wasatch: { name: "Wasatch Mountains", quality: "High", access: "Good" },
            plateau: { name: "Plateau", quality: "Excellent", access: "Good" },
            bookcliffs: { name: "Book Cliffs", quality: "Premium", access: "Moderate" },
            vernon: { name: "Vernon", quality: "Good", access: "Good" },
            henrymtns: { name: "Henry Mountains", quality: "Premium", access: "Difficult" },
            pauns: { name: "Pauns", quality: "Premium", access: "Moderate" },
            pinkneedle: { name: "Pine Needle", quality: "High", access: "Good" }
          },
          huntTypes: ["archery", "muzzleloader", "rifle"]
        },
        moose: {
          units: {
            northslope: { name: "North Slope", quality: "Premium", access: "Difficult" },
            wasatch: { name: "Wasatch Mountains", quality: "High", access: "Moderate" },
            boulder: { name: "Boulder/Kaiparowits", quality: "High", access: "Difficult" }
          },
          huntTypes: ["rifle"]
        },
        sheep: {
          units: {
            wasatch: { name: "Wasatch Mountains", quality: "Premium", access: "Difficult" },
            zion: { name: "Zion", quality: "Premium", access: "Very Difficult" },
            bookcliffs: { name: "Book Cliffs", quality: "Premium", access: "Difficult" }
          },
          huntTypes: ["rifle"]
        },
        goat: {
          units: {
            wasatch: { name: "Wasatch Mountains", quality: "Premium", access: "Very Difficult" },
            tushar: { name: "Tushar Mountains", quality: "High", access: "Difficult" }
          },
          huntTypes: ["rifle", "archery"]
        },
        antelope: {
          units: {
            parker: { name: "Parker Mountain", quality: "Good", access: "Good" },
            southwest: { name: "Southwest Desert", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        bear: {
          units: {
            wasatch: { name: "Wasatch Mountains", quality: "Good", access: "Good" },
            lasal: { name: "La Sal", quality: "High", access: "Moderate" },
            boulder: { name: "Boulder", quality: "High", access: "Difficult" }
          },
          huntTypes: ["archery", "rifle"]
        }
      }
    },
    colorado: {
      name: "Colorado",
      species: {
        elk: {
          units: {
            unit2: { name: "Unit 2", quality: "Premium", access: "Difficult" },
            unit10: { name: "Unit 10", quality: "Premium", access: "Moderate" },
            unit61: { name: "Unit 61", quality: "Premium", access: "Difficult" },
            unit76: { name: "Unit 76", quality: "High", access: "Good" },
            unit201: { name: "Unit 201", quality: "Good", access: "Good" },
            unit67: { name: "Unit 67", quality: "Premium", access: "Moderate" },
            unit214: { name: "Unit 214", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "muzzleloader", "rifle-1", "rifle-2", "rifle-3"]
        },
        deer: {
          units: {
            unit22: { name: "Unit 22", quality: "Premium", access: "Moderate" },
            unit76: { name: "Unit 76", quality: "High", access: "Good" },
            unit140: { name: "Unit 140", quality: "High", access: "Good" },
            unit214: { name: "Unit 214", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "muzzleloader", "rifle-2", "rifle-3"]
        },
        moose: {
          units: {
            unit4: { name: "Unit 4", quality: "Premium", access: "Difficult" },
            unit17: { name: "Unit 17", quality: "Premium", access: "Very Difficult" }
          },
          huntTypes: ["rifle"]
        },
        sheep: {
          units: {
            unit5: { name: "Unit 5", quality: "Premium", access: "Very Difficult" },
            unit136: { name: "Unit 136", quality: "Premium", access: "Difficult" }
          },
          huntTypes: ["rifle"]
        },
        goat: {
          units: {
            unit2: { name: "Unit 2", quality: "Premium", access: "Very Difficult" },
            unit14: { name: "Unit 14", quality: "Premium", access: "Difficult" }
          },
          huntTypes: ["rifle"]
        },
        antelope: {
          units: {
            unit8: { name: "Unit 8", quality: "High", access: "Good" },
            unit140: { name: "Unit 140", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        bear: {
          units: {
            unit76: { name: "Unit 76", quality: "Good", access: "Good" },
            unit214: { name: "Unit 214", quality: "High", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        }
      }
    },
    wyoming: {
      name: "Wyoming",
      species: {
        elk: {
          units: {
            area7: { name: "Area 7", quality: "Premium", access: "Moderate" },
            area16: { name: "Area 16", quality: "Premium", access: "Difficult" },
            area100: { name: "Area 100 (General)", quality: "Good", access: "Good" },
            area6: { name: "Area 6", quality: "Premium", access: "Moderate" },
            area18: { name: "Area 18", quality: "High", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        deer: {
          units: {
            area128: { name: "Area 128", quality: "Premium", access: "Moderate" },
            area142: { name: "Area 142", quality: "High", access: "Good" },
            area150: { name: "Area 150", quality: "High", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        antelope: {
          units: {
            area23: { name: "Area 23", quality: "High", access: "Good" },
            area75: { name: "Area 75", quality: "Good", access: "Good" },
            area19: { name: "Area 19", quality: "Good", access: "Good" },
            area59: { name: "Area 59", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        moose: {
          units: {
            area2: { name: "Area 2", quality: "Premium", access: "Difficult" },
            area38: { name: "Area 38", quality: "Premium", access: "Very Difficult" }
          },
          huntTypes: ["rifle"]
        },
        sheep: {
          units: {
            area5: { name: "Area 5", quality: "Premium", access: "Very Difficult" },
            area15: { name: "Area 15", quality: "Premium", access: "Difficult" }
          },
          huntTypes: ["rifle"]
        },
        goat: {
          units: {
            area3: { name: "Area 3", quality: "Premium", access: "Very Difficult" }
          },
          huntTypes: ["rifle"]
        },
        bear: {
          units: {
            area7: { name: "Area 7", quality: "Good", access: "Good" },
            area18: { name: "Area 18", quality: "High", access: "Moderate" }
          },
          huntTypes: ["archery", "rifle"]
        }
      }
    },
    montana: {
      name: "Montana",
      species: {
        elk: {
          units: {
            hd380: { name: "HD 380", quality: "Premium", access: "Difficult" },
            hd417: { name: "HD 417", quality: "High", access: "Moderate" },
            hd570: { name: "HD 570", quality: "Good", access: "Good" },
            hd270: { name: "HD 270", quality: "Premium", access: "Moderate" },
            hd100: { name: "HD 100", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        deer: {
          units: {
            hd270: { name: "HD 270", quality: "Premium", access: "Moderate" },
            hd404: { name: "HD 404", quality: "High", access: "Good" },
            hd570: { name: "HD 570", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        moose: {
          units: {
            hd110: { name: "HD 110", quality: "Premium", access: "Very Difficult" },
            hd150: { name: "HD 150", quality: "Premium", access: "Difficult" }
          },
          huntTypes: ["rifle"]
        },
        sheep: {
          units: {
            hd500: { name: "HD 500", quality: "Premium", access: "Very Difficult" },
            hd680: { name: "HD 680", quality: "Premium", access: "Difficult" }
          },
          huntTypes: ["rifle"]
        },
        goat: {
          units: {
            hd140: { name: "HD 140", quality: "Premium", access: "Very Difficult" }
          },
          huntTypes: ["rifle"]
        },
        antelope: {
          units: {
            hd700: { name: "HD 700", quality: "High", access: "Good" },
            hd704: { name: "HD 704", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        bear: {
          units: {
            hd270: { name: "HD 270", quality: "Good", access: "Good" },
            hd380: { name: "HD 380", quality: "High", access: "Moderate" }
          },
          huntTypes: ["archery", "rifle"]
        }
      }
    },
    idaho: {
      name: "Idaho",
      species: {
        elk: {
          units: {
            unit10: { name: "Unit 10", quality: "Premium", access: "Difficult" },
            unit15: { name: "Unit 15", quality: "High", access: "Moderate" },
            unit29: { name: "Unit 29", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        deer: {
          units: {
            unit10: { name: "Unit 10", quality: "High", access: "Moderate" },
            unit19: { name: "Unit 19", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        moose: {
          units: {
            unit1: { name: "Unit 1", quality: "Premium", access: "Difficult" }
          },
          huntTypes: ["rifle"]
        },
        bear: {
          units: {
            unit10: { name: "Unit 10", quality: "High", access: "Good" },
            unit29: { name: "Unit 29", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        }
      }
    },
    arizona: {
      name: "Arizona",
      species: {
        elk: {
          units: {
            unit9: { name: "Unit 9", quality: "Premium", access: "Moderate" },
            unit22n: { name: "Unit 22 North", quality: "Premium", access: "Difficult" },
            unit23: { name: "Unit 23", quality: "High", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        deer: {
          units: {
            unit22s: { name: "Unit 22 South", quality: "Premium", access: "Moderate" },
            unit36c: { name: "Unit 36C", quality: "High", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        sheep: {
          units: {
            unit15b: { name: "Unit 15B", quality: "Premium", access: "Very Difficult" }
          },
          huntTypes: ["rifle"]
        },
        antelope: {
          units: {
            unit18a: { name: "Unit 18A", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        bear: {
          units: {
            unit9: { name: "Unit 9", quality: "Good", access: "Good" },
            unit23: { name: "Unit 23", quality: "High", access: "Moderate" }
          },
          huntTypes: ["archery", "rifle"]
        }
      }
    },
    nevada: {
      name: "Nevada",
      species: {
        elk: {
          units: {
            unit222: { name: "Unit 222", quality: "Premium", access: "Difficult" },
            unit242: { name: "Unit 242", quality: "High", access: "Moderate" }
          },
          huntTypes: ["archery", "rifle"]
        },
        deer: {
          units: {
            unit221: { name: "Unit 221", quality: "High", access: "Good" },
            unit271: { name: "Unit 271", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        sheep: {
          units: {
            unit262: { name: "Unit 262", quality: "Premium", access: "Very Difficult" }
          },
          huntTypes: ["rifle"]
        },
        antelope: {
          units: {
            unit033: { name: "Unit 033", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        }
      }
    }
  },

  // Comprehensive draw odds data for demo
  drawOdds: {
    // Utah
    "utah-elk-cache-archery-resident": {
      0: 20, 1: 25, 2: 35, 3: 45, 4: 55, 5: 67, 6: 75, 7: 82, 8: 88, 9: 92, 10: 95
    },
    "utah-elk-cache-rifle-resident": {
      0: 8, 1: 12, 2: 18, 3: 25, 4: 35, 5: 45, 6: 55, 7: 65, 8: 75, 9: 82, 10: 88
    },
    "utah-elk-cache-muzzleloader-resident": {
      0: 15, 1: 20, 2: 28, 3: 38, 4: 48, 5: 58, 6: 68, 7: 76, 8: 83, 9: 89, 10: 94
    },
    "utah-elk-wasatch-archery-resident": {
      0: 25, 1: 32, 2: 42, 3: 52, 4: 63, 5: 73, 6: 81, 7: 87, 8: 92, 9: 96, 10: 98
    },
    "utah-elk-wasatch-rifle-resident": {
      0: 12, 1: 18, 2: 25, 3: 35, 4: 45, 5: 55, 6: 65, 7: 74, 8: 81, 9: 87, 10: 92
    },
    "utah-elk-manti-rifle-resident": {
      0: 35, 1: 45, 2: 55, 3: 65, 4: 75, 5: 82, 6: 88, 7: 92, 8: 95, 9: 97, 10: 99
    },
    "utah-elk-manti-archery-resident": {
      0: 45, 1: 55, 2: 65, 3: 74, 4: 82, 5: 88, 6: 93, 7: 96, 8: 98, 9: 99, 10: 99
    },
    "utah-deer-plateau-archery-resident": {
      0: 45, 1: 55, 2: 65, 3: 75, 4: 82, 5: 89, 6: 93, 7: 96, 8: 98, 9: 99, 10: 99
    },
    "utah-deer-plateau-rifle-resident": {
      0: 25, 1: 35, 2: 45, 3: 55, 4: 65, 5: 74, 6: 82, 7: 88, 8: 93, 9: 96, 10: 98
    },
    "utah-deer-bookcliffs-rifle-resident": {
      0: 5, 1: 8, 2: 12, 3: 18, 4: 25, 5: 34, 6: 44, 7: 55, 8: 66, 9: 76, 10: 84
    },
    "utah-moose-northslope-rifle-resident": {
      0: 1, 1: 2, 2: 3, 3: 5, 4: 7, 5: 10, 6: 12, 7: 15, 8: 18, 9: 22, 10: 25
    },
    "utah-antelope-parker-rifle-resident": {
      0: 75, 1: 82, 2: 88, 3: 92, 4: 95, 5: 97, 6: 98, 7: 99, 8: 99, 9: 99, 10: 99
    },

    // Colorado
    "colorado-elk-unit2-rifle-1-resident": {
      0: 2, 1: 3, 2: 5, 3: 8, 4: 12, 5: 16, 6: 22, 7: 28, 8: 35, 9: 42, 10: 50
    },
    "colorado-elk-unit61-archery-resident": {
      0: 8, 1: 12, 2: 18, 3: 25, 4: 33, 5: 42, 6: 52, 7: 62, 8: 72, 9: 80, 10: 87
    },
    "colorado-elk-unit201-rifle-2-resident": {
      0: 35, 1: 45, 2: 55, 3: 65, 4: 75, 5: 82, 6: 88, 7: 92, 8: 95, 9: 97, 10: 99
    },
    "colorado-elk-unit76-rifle-3-resident": {
      0: 55, 1: 65, 2: 74, 3: 82, 4: 88, 5: 92, 6: 95, 7: 97, 8: 98, 9: 99, 10: 99
    },
    "colorado-deer-unit22-rifle-2-resident": {
      0: 8, 1: 12, 2: 18, 3: 26, 4: 35, 5: 45, 6: 56, 7: 67, 8: 76, 9: 84, 10: 90
    },

    // Wyoming  
    "wyoming-elk-area7-rifle-resident": {
      0: 5, 1: 8, 2: 12, 3: 18, 4: 25, 5: 33, 6: 42, 7: 52, 8: 62, 9: 72, 10: 80
    },
    "wyoming-elk-area6-rifle-resident": {
      0: 3, 1: 5, 2: 8, 3: 12, 4: 18, 5: 25, 6: 33, 7: 42, 8: 52, 9: 62, 10: 72
    },
    "wyoming-antelope-area23-rifle-resident": {
      0: 65, 1: 75, 2: 82, 3: 88, 4: 92, 5: 95, 6: 97, 7: 98, 8: 99, 9: 99, 10: 99
    },
    "wyoming-antelope-area19-rifle-resident": {
      0: 85, 1: 90, 2: 94, 3: 96, 4: 98, 5: 99, 6: 99, 7: 99, 8: 99, 9: 99, 10: 99
    },
    "wyoming-deer-area128-rifle-resident": {
      0: 12, 1: 18, 2: 26, 3: 35, 4: 45, 5: 56, 6: 66, 7: 75, 8: 82, 9: 88, 10: 93
    },

    // Montana
    "montana-elk-hd380-rifle-resident": {
      0: 8, 1: 12, 2: 18, 3: 25, 4: 34, 5: 44, 6: 55, 7: 66, 8: 76, 9: 84, 10: 90
    },
    "montana-elk-hd100-rifle-resident": {
      0: 65, 1: 74, 2: 82, 3: 88, 4: 92, 5: 95, 6: 97, 7: 98, 8: 99, 9: 99, 10: 99
    },
    "montana-deer-hd270-rifle-resident": {
      0: 15, 1: 22, 2: 30, 3: 40, 4: 50, 5: 60, 6: 70, 7: 78, 8: 85, 9: 91, 10: 95
    },

    // Add non-resident odds (typically 10-20% lower)
    "utah-elk-cache-archery-nonresident": {
      0: 15, 1: 20, 2: 28, 3: 36, 4: 44, 5: 53, 6: 62, 7: 70, 8: 77, 9: 83, 10: 88
    },
    "colorado-elk-unit201-rifle-2-nonresident": {
      0: 25, 1: 32, 2: 40, 3: 48, 4: 56, 5: 64, 6: 71, 7: 77, 8: 82, 9: 86, 10: 90
    },
    "wyoming-antelope-area23-rifle-nonresident": {
      0: 45, 1: 55, 2: 64, 3: 72, 4: 78, 5: 83, 6: 87, 7: 90, 8: 92, 9: 94, 10: 96
    }
  },

  // Comprehensive hunt statistics
  huntStats: {
    "utah-elk-cache-archery": {
      tags: 35, applicants: 143, pointsNeeded: "5-7", trend: "↑ 8%",
      quality: "High", success: "75%", avgSize: "320\"", difficulty: "Moderate"
    },
    "utah-elk-cache-rifle": {
      tags: 25, applicants: 287, pointsNeeded: "8-10", trend: "↓ 3%",
      quality: "High", success: "85%", avgSize: "340\"", difficulty: "Moderate"
    },
    "utah-elk-cache-muzzleloader": {
      tags: 15, applicants: 198, pointsNeeded: "6-8", trend: "→ 0%",
      quality: "High", success: "80%", avgSize: "330\"", difficulty: "Moderate"
    },
    "utah-elk-wasatch-archery": {
      tags: 45, applicants: 127, pointsNeeded: "4-6", trend: "↑ 12%",
      quality: "High", success: "70%", avgSize: "315\"", difficulty: "Moderate"
    },
    "utah-elk-wasatch-rifle": {
      tags: 30, applicants: 245, pointsNeeded: "6-8", trend: "↑ 5%",
      quality: "High", success: "88%", avgSize: "325\"", difficulty: "Moderate"
    },
    "utah-elk-manti-rifle": {
      tags: 60, applicants: 89, pointsNeeded: "3-5", trend: "↑ 15%",
      quality: "Good", success: "80%", avgSize: "300\"", difficulty: "Easy"
    },
    "utah-elk-manti-archery": {
      tags: 40, applicants: 65, pointsNeeded: "2-4", trend: "↑ 18%",
      quality: "Good", success: "75%", avgSize: "290\"", difficulty: "Easy"
    },
    "utah-deer-plateau-archery": {
      tags: 120, applicants: 156, pointsNeeded: "2-4", trend: "↑ 5%",
      quality: "Excellent", success: "65%", avgSize: "190\"", difficulty: "Moderate"
    },
    "utah-deer-plateau-rifle": {
      tags: 80, applicants: 234, pointsNeeded: "4-6", trend: "↑ 3%",
      quality: "Excellent", success: "78%", avgSize: "185\"", difficulty: "Moderate"
    },
    "utah-deer-bookcliffs-rifle": {
      tags: 12, applicants: 456, pointsNeeded: "12-15", trend: "↓ 2%",
      quality: "Premium", success: "90%", avgSize: "210\"", difficulty: "Moderate"
    },
    "utah-moose-northslope-rifle": {
      tags: 5, applicants: 523, pointsNeeded: "20+", trend: "↓ 2%",
      quality: "Premium", success: "95%", avgSize: "200\"", difficulty: "Difficult"
    },
    "utah-antelope-parker-rifle": {
      tags: 75, applicants: 98, pointsNeeded: "0-2", trend: "↑ 12%",
      quality: "Good", success: "82%", avgSize: "78\"", difficulty: "Easy"
    },
    
    "colorado-elk-unit2-rifle-1": {
      tags: 8, applicants: 890, pointsNeeded: "15+", trend: "→ 0%",
      quality: "Premium", success: "90%", avgSize: "360\"", difficulty: "Difficult"
    },
    "colorado-elk-unit61-archery": {
      tags: 25, applicants: 324, pointsNeeded: "8-12", trend: "↑ 3%",
      quality: "Premium", success: "75%", avgSize: "350\"", difficulty: "Difficult"
    },
    "colorado-elk-unit201-rifle-2": {
      tags: 40, applicants: 78, pointsNeeded: "3-5", trend: "↑ 8%",
      quality: "Good", success: "82%", avgSize: "310\"", difficulty: "Moderate"
    },
    "colorado-elk-unit76-rifle-3": {
      tags: 55, applicants: 89, pointsNeeded: "2-4", trend: "↑ 15%",
      quality: "High", success: "85%", avgSize: "295\"", difficulty: "Easy"
    },
    "colorado-deer-unit22-rifle-2": {
      tags: 15, applicants: 267, pointsNeeded: "8-12", trend: "↑ 2%",
      quality: "Premium", success: "88%", avgSize: "195\"", difficulty: "Moderate"
    },

    "wyoming-elk-area7-rifle": {
      tags: 15, applicants: 445, pointsNeeded: "10-14", trend: "↑ 7%",
      quality: "Premium", success: "88%", avgSize: "355\"", difficulty: "Moderate"
    },
    "wyoming-elk-area6-rifle": {
      tags: 10, applicants: 567, pointsNeeded: "12-16", trend: "↑ 4%",
      quality: "Premium", success: "92%", avgSize: "365\"", difficulty: "Difficult"
    },
    "wyoming-antelope-area23-rifle": {
      tags: 45, applicants: 67, pointsNeeded: "0-2", trend: "↑ 10%",
      quality: "High", success: "85%", avgSize: "82\"", difficulty: "Easy"
    },
    "wyoming-antelope-area19-rifle": {
      tags: 35, applicants: 42, pointsNeeded: "0-1", trend: "↑ 15%",
      quality: "Excellent", success: "90%", avgSize: "85\"", difficulty: "Easy"
    },
    "wyoming-deer-area128-rifle": {
      tags: 25, applicants: 187, pointsNeeded: "6-10", trend: "↑ 5%",
      quality: "Premium", success: "85%", avgSize: "188\"", difficulty: "Moderate"
    },

    "montana-elk-hd380-rifle": {
      tags: 20, applicants: 234, pointsNeeded: "8-12", trend: "↑ 6%",
      quality: "Premium", success: "86%", avgSize: "345\"", difficulty: "Difficult"
    },
    "montana-elk-hd100-rifle": {
      tags: 85, applicants: 134, pointsNeeded: "2-4", trend: "↑ 12%",
      quality: "Good", success: "78%", avgSize: "285\"", difficulty: "Easy"
    },
    "montana-deer-hd270-rifle": {
      tags: 30, applicants: 156, pointsNeeded: "5-8", trend: "↑ 8%",
      quality: "Premium", success: "82%", avgSize: "180\"", difficulty: "Moderate"
    }
  },

  applicationInfo: {
    utah: {
      deadline: "March 2nd",
      resultsDate: "May 15th",
      drawDate: "May 10th",
      huntSeasons: {
        archery: "August 15 - September 15",
        muzzleloader: "September 20 - September 28",
        rifle: "October 5 - October 13"
      }
    },
    colorado: {
      deadline: "April 2nd",
      resultsDate: "July 1st",
      drawDate: "June 15th",
      huntSeasons: {
        archery: "August 25 - September 23",
        "rifle-1": "October 12 - October 16",
        "rifle-2": "October 19 - October 23",
        "rifle-3": "October 26 - October 30"
      }
    },
    wyoming: {
      deadline: "January 31st",
      resultsDate: "March 25th",
      drawDate: "March 20th",
      huntSeasons: {
        archery: "September 1 - September 30",
        rifle: "September 15 - November 15"
      }
    },
    montana: {
      deadline: "March 15th",
      resultsDate: "July 15th",
      drawDate: "July 10th",
      huntSeasons: {
        archery: "September 1 - October 15",
        rifle: "October 20 - November 26"
      }
    },
    idaho: {
      deadline: "December 5th",
      resultsDate: "April 15th",
      drawDate: "April 10th",
      huntSeasons: {
        archery: "August 30 - September 30",
        rifle: "October 10 - October 24"
      }
    },
    arizona: {
      deadline: "February 10th",
      resultsDate: "June 15th",
      drawDate: "June 10th",
      huntSeasons: {
        archery: "August 23 - September 13",
        rifle: "November 3 - November 11"
      }
    },
    nevada: {
      deadline: "March 15th",
      resultsDate: "June 20th",
      drawDate: "June 15th",
      huntSeasons: {
        archery: "August 15 - September 15",
        rifle: "October 7 - October 15"
      }
    }
  }
};

// Enhanced strategic opportunities with more options
export const strategicOpportunities: StrategicOpportunity[] = [
  {
    state: "utah",
    species: "elk",
    unit: "manti",
    huntType: "rifle",
    odds: 75,
    maxOdds: 82,
    minPoints: 3,
    pointsNeeded: 3,
    quality: "Good",
    trend: "↑",
    success: 80,
    avgSize: 300,
    difficulty: "Easy"
  },
  {
    state: "utah",
    species: "deer",
    unit: "plateau",
    huntType: "archery",
    odds: 82,
    maxOdds: 89,
    minPoints: 2,
    pointsNeeded: 2,
    quality: "Excellent",
    trend: "↑",
    success: 65,
    avgSize: 190,
    difficulty: "Moderate"
  },
  {
    state: "wyoming",
    species: "antelope",
    unit: "area23",
    huntType: "rifle",
    odds: 88,
    maxOdds: 95,
    minPoints: 0,
    pointsNeeded: 0,
    quality: "High",
    trend: "↑",
    success: 85,
    avgSize: 82,
    difficulty: "Easy"
  },
  {
    state: "wyoming",
    species: "antelope",
    unit: "area19",
    huntType: "rifle",
    odds: 94,
    maxOdds: 99,
    minPoints: 0,
    pointsNeeded: 0,
    quality: "Excellent",
    trend: "↑",
    success: 90,
    avgSize: 85,
    difficulty: "Easy"
  },
  {
    state: "colorado",
    species: "elk",
    unit: "unit201",
    huntType: "rifle-2",
    odds: 65,
    maxOdds: 75,
    minPoints: 3,
    pointsNeeded: 3,
    quality: "Good",
    trend: "↑",
    success: 82,
    avgSize: 310,
    difficulty: "Moderate"
  },
  {
    state: "montana",
    species: "elk",
    unit: "hd100",
    huntType: "rifle",
    odds: 74,
    maxOdds: 82,
    minPoints: 2,
    pointsNeeded: 2,
    quality: "Good",
    trend: "↑",
    success: 78,
    avgSize: 285,
    difficulty: "Easy"
  },
  {
    state: "utah",
    species: "elk",
    unit: "wasatch",
    huntType: "archery",
    odds: 63,
    maxOdds: 73,
    minPoints: 4,
    pointsNeeded: 4,
    quality: "High",
    trend: "↑",
    success: 70,
    avgSize: 315,
    difficulty: "Moderate"
  },
  {
    state: "colorado",
    species: "elk",
    unit: "unit61",
    huntType: "archery",
    odds: 33,
    maxOdds: 42,
    minPoints: 8,
    pointsNeeded: 8,
    quality: "Premium",
    trend: "↑",
    success: 75,
    avgSize: 350,
    difficulty: "Difficult"
  },
  {
    state: "wyoming",
    species: "elk",
    unit: "area7",
    huntType: "rifle",
    odds: 25,
    maxOdds: 33,
    minPoints: 10,
    pointsNeeded: 10,
    quality: "Premium",
    trend: "↑",
    success: 88,
    avgSize: 355,
    difficulty: "Moderate"
  },
  {
    state: "utah",
    species: "antelope",
    unit: "parker",
    huntType: "rifle",
    odds: 88,
    maxOdds: 95,
    minPoints: 0,
    pointsNeeded: 0,
    quality: "Good",
    trend: "↑",
    success: 82,
    avgSize: 78,
    difficulty: "Easy"
  }
];

export const pointStrategies: Record<string, PointStrategy> = {
  conservative: {
    name: "Conservative Point Builder",
    description: "Focus on building points with occasional high-odds applications",
    riskLevel: "low",
    recommendedPoints: "5-10",
    targetOdds: "70%+",
    huntQuality: ["Good", "High"]
  },
  balanced: {
    name: "Balanced Hunter",
    description: "Mix of point building and hunting opportunities",
    riskLevel: "medium",
    recommendedPoints: "3-7",
    targetOdds: "40%+",
    huntQuality: ["Good", "High", "Premium"]
  },
  aggressive: {
    name: "Aggressive Hunter",
    description: "Apply for premium units with lower odds",
    riskLevel: "high",
    recommendedPoints: "8-15",
    targetOdds: "15%+",
    huntQuality: ["Premium", "Excellent"]
  },
  "points-builder": {
    name: "Opportunistic Hunter",
    description: "Focus on highest odds available",
    riskLevel: "low",
    recommendedPoints: "0-3",
    targetOdds: "60%+",
    huntQuality: ["Good"]
  }
};

// Export the function that the hook expects
export function generateDrawOdds(
  state: string,
  species: string,
  unit: string,
  huntType: string,
  residency: 'resident' | 'nonresident',
  points: number
): { odds: number; stats: any } | null {
  // Look up the pre-generated odds
  const key = `${state}-${species}-${unit}-${huntType}-${residency}`;
  const drawOddsData = huntingData.drawOdds[key];
  
  if (!drawOddsData || !(points in drawOddsData)) {
    // Fallback calculation if not found
    let baseOdds = 50;
    
    // Adjust based on species difficulty
    const speciesDifficulty: Record<string, number> = {
      'elk': 0.7,
      'deer': 1.2,
      'moose': 0.5,
      'sheep': 0.3,
      'goat': 0.4,
      'antelope': 1.5,
      'bear': 1.3
    };
    
    baseOdds *= speciesDifficulty[species] || 1;
    
    // Adjust based on hunt type
    const huntTypeModifier: Record<string, number> = {
      'archery': 1.3,
      'muzzleloader': 1.1,
      'rifle': 0.9,
      'rifle-1': 0.85,
      'rifle-2': 0.9,
      'rifle-3': 0.95
    };
    
    baseOdds *= huntTypeModifier[huntType] || 1;
    
    // Adjust based on points
    baseOdds += points * 8;
    
    // Adjust for non-residents
    if (residency === 'nonresident') {
      baseOdds *= 0.7;
    }
    
    // Cap at 99%
    const finalOdds = Math.min(Math.round(baseOdds), 99);
    
    return {
      odds: finalOdds,
      stats: {
        applicants: Math.floor(Math.random() * 5000) + 1000,
        tags: Math.floor(Math.random() * 200) + 50,
        successRate: finalOdds,
        avgPoints: Math.max(0, points - 2 + Math.random() * 4),
        harvest: Math.floor(Math.random() * 100) + 20
      }
    };
  }
  
  // Get the odds from pre-generated data
  const odds = drawOddsData[points];
  
  // Get stats if available
  const statsKey = `${state}-${species}-${unit}-${huntType}`;
  const stats = huntingData.huntStats[statsKey] || {
    applicants: Math.floor(Math.random() * 5000) + 1000,
    tags: Math.floor(Math.random() * 200) + 50,
    successRate: odds,
    avgPoints: Math.max(0, points - 2 + Math.random() * 4),
    harvest: Math.floor(Math.random() * 100) + 20
  };
  
  return {
    odds,
    stats
  };
} 