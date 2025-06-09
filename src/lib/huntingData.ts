import type { 
  HuntingData, 
  StrategicOpportunity, 
  PointStrategy,
  StrategyCriteria
} from '@/types/hunting';
import { UtahDataService } from './utahDataService';

// Initialize Utah data service
const utahService = UtahDataService.getInstance();

export const huntingData: HuntingData = {
  states: {
    utah: {
      name: "Utah",
      species: {
        deer: {
          units: utahService.getLegacyUnits("deer"),
          huntTypes: utahService.getLegacyHuntTypes("deer")
        },
        elk: {
          units: utahService.getLegacyUnits("elk"),
          huntTypes: utahService.getLegacyHuntTypes("elk")
        },
        pronghorn: {
          units: utahService.getLegacyUnits("pronghorn"),
          huntTypes: utahService.getLegacyHuntTypes("pronghorn")
        },
        moose: {
          units: utahService.getLegacyUnits("moose"),
          huntTypes: utahService.getLegacyHuntTypes("moose")
        },
        bighorn_sheep: {
          units: utahService.getLegacyUnits("bighorn_sheep"),
          huntTypes: utahService.getLegacyHuntTypes("bighorn_sheep")
        },
        mountain_goat: {
          units: utahService.getLegacyUnits("mountain_goat"),
          huntTypes: utahService.getLegacyHuntTypes("mountain_goat")
        },
        bison: {
          units: utahService.getLegacyUnits("bison"),
          huntTypes: utahService.getLegacyHuntTypes("bison")
        },
        bear: {
          units: utahService.getLegacyUnits("bear"),
          huntTypes: utahService.getLegacyHuntTypes("bear")
        }
      }
    },
    colorado: {
      name: "Colorado",
      species: {
        deer: {
          units: {
            fourmile: { name: "Four Mile", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle", "muzzleloader"]
        },
        elk: {
          units: {
            unit145: { name: "Unit 145", quality: "High", access: "Good" },
            unit109: { name: "Unit 109", quality: "High", access: "Good" },
            unit33: { name: "Unit 33", quality: "High", access: "Good" },
            unit39: { name: "Unit 39", quality: "High", access: "Good" },
            unit40: { name: "Unit 40", quality: "High", access: "Good" },
            unit41: { name: "Unit 41", quality: "High", access: "Good" },
            unit42: { name: "Unit 42", quality: "High", access: "Good" },
            unit44: { name: "Unit 44", quality: "High", access: "Good" },
            unit45: { name: "Unit 45", quality: "High", access: "Good" },
            unit46: { name: "Unit 46", quality: "High", access: "Good" },
            unit47: { name: "Unit 47", quality: "High", access: "Good" },
            unit48: { name: "Unit 48", quality: "High", access: "Good" },
            unit49: { name: "Unit 49", quality: "High", access: "Good" },
            unit50: { name: "Unit 50", quality: "High", access: "Good" },
            unit51: { name: "Unit 51", quality: "High", access: "Good" },
            unit52: { name: "Unit 52", quality: "High", access: "Good" },
            unit54: { name: "Unit 54", quality: "High", access: "Good" },
            unit55: { name: "Unit 55", quality: "High", access: "Good" },
            unit56: { name: "Unit 56", quality: "High", access: "Good" },
            unit57: { name: "Unit 57", quality: "High", access: "Good" },
            unit58: { name: "Unit 58", quality: "High", access: "Good" },
            unit61: { name: "Unit 61", quality: "High", access: "Good" },
            unit66: { name: "Unit 66", quality: "High", access: "Good" },
            unit67: { name: "Unit 67", quality: "High", access: "Good" },
            unit69: { name: "Unit 69", quality: "High", access: "Good" },
            unit70: { name: "Unit 70", quality: "High", access: "Good" },
            unit71: { name: "Unit 71", quality: "High", access: "Good" },
            unit72: { name: "Unit 72", quality: "High", access: "Good" },
            unit73: { name: "Unit 73", quality: "High", access: "Good" },
            unit231: { name: "Unit 231", quality: "High", access: "Good" },
            unit74: { name: "Unit 74", quality: "High", access: "Good" }
          },
          huntTypes: ["archery", "rifle", "muzzleloader"]
        },
        antelope: {
          units: {
            unit5: { name: "Unit 5", quality: "Good", access: "Good" },
            unit6: { name: "Unit 6", quality: "Good", access: "Good" },
            unit7: { name: "Unit 7", quality: "Good", access: "Good" },
            unit8: { name: "Unit 8", quality: "Good", access: "Good" },
            unit9: { name: "Unit 9", quality: "Good", access: "Good" },
            unit10: { name: "Unit 10", quality: "Good", access: "Good" },
            unit17: { name: "Unit 17", quality: "Good", access: "Good" },
            unit18: { name: "Unit 18", quality: "Good", access: "Good" },
            unit19: { name: "Unit 19", quality: "Good", access: "Good" },
            unit20: { name: "Unit 20", quality: "Good", access: "Good" },
            unit29: { name: "Unit 29", quality: "Good", access: "Good" },
            unit30: { name: "Unit 30", quality: "Good", access: "Good" },
            unit31: { name: "Unit 31", quality: "Good", access: "Good" },
            unit32: { name: "Unit 32", quality: "Good", access: "Good" },
            unit33: { name: "Unit 33", quality: "Good", access: "Good" },
            unit104: { name: "Unit 104", quality: "Good", access: "Good" }
          },
          huntTypes: ["archery", "rifle"]
        },
        moose: {
          units: {
            unit104: { name: "Unit 104", quality: "Premium", access: "Difficult" }
          },
          huntTypes: ["rifle"]
        },
        bear: {
          units: {
            unit113: { name: "Unit 113", quality: "Good", access: "Good" },
            unit114: { name: "Unit 114", quality: "Good", access: "Good" },
            unit115: { name: "Unit 115", quality: "Good", access: "Good" },
            unit116: { name: "Unit 116", quality: "Good", access: "Good" },
            unit121: { name: "Unit 121", quality: "Good", access: "Good" },
            unit123: { name: "Unit 123", quality: "Good", access: "Good" }
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
    // Utah - Updated with new unit names
    "utah-elk-beaver-archery-resident": {
      0: 20, 1: 25, 2: 35, 3: 45, 4: 55, 5: 67, 6: 75, 7: 82, 8: 88, 9: 92, 10: 95
    },
    "utah-elk-beaver-rifle-resident": {
      0: 8, 1: 12, 2: 18, 3: 25, 4: 35, 5: 45, 6: 55, 7: 65, 8: 75, 9: 82, 10: 88
    },
    "utah-elk-beaver-muzzleloader-resident": {
      0: 15, 1: 20, 2: 28, 3: 38, 4: 48, 5: 58, 6: 68, 7: 76, 8: 83, 9: 89, 10: 94
    },
    "utah-elk-east-archery-resident": {
      0: 25, 1: 32, 2: 42, 3: 52, 4: 63, 5: 73, 6: 81, 7: 87, 8: 92, 9: 96, 10: 98
    },
    "utah-elk-east-rifle-resident": {
      0: 12, 1: 18, 2: 25, 3: 35, 4: 45, 5: 55, 6: 65, 7: 74, 8: 81, 9: 87, 10: 92
    },
    "utah-elk-north-rifle-resident": {
      0: 35, 1: 45, 2: 55, 3: 65, 4: 75, 5: 82, 6: 88, 7: 92, 8: 95, 9: 97, 10: 99
    },
    "utah-elk-north-archery-resident": {
      0: 45, 1: 55, 2: 65, 3: 74, 4: 82, 5: 88, 6: 93, 7: 96, 8: 98, 9: 99, 10: 99
    },
    "utah-elk-south-archery-resident": {
      0: 30, 1: 38, 2: 46, 3: 55, 4: 64, 5: 72, 6: 79, 7: 85, 8: 90, 9: 94, 10: 97
    },
    "utah-elk-south-rifle-resident": {
      0: 18, 1: 25, 2: 33, 3: 42, 4: 51, 5: 60, 6: 68, 7: 75, 8: 81, 9: 86, 10: 90
    },
    "utah-deer-beaver-archery-resident": {
      0: 45, 1: 55, 2: 65, 3: 75, 4: 82, 5: 89, 6: 93, 7: 96, 8: 98, 9: 99, 10: 99
    },
    "utah-deer-beaver-rifle-resident": {
      0: 25, 1: 35, 2: 45, 3: 55, 4: 65, 5: 74, 6: 82, 7: 88, 8: 93, 9: 96, 10: 98
    },
    "utah-deer-east-rifle-resident": {
      0: 22, 1: 32, 2: 42, 3: 52, 4: 62, 5: 71, 6: 79, 7: 85, 8: 90, 9: 94, 10: 97
    },
    "utah-deer-north-archery-resident": {
      0: 40, 1: 50, 2: 60, 3: 70, 4: 78, 5: 85, 6: 90, 7: 94, 8: 97, 9: 99, 10: 99
    },
    "utah-deer-south-rifle-resident": {
      0: 28, 1: 38, 2: 48, 3: 58, 4: 67, 5: 75, 6: 82, 7: 87, 8: 91, 9: 95, 10: 98
    },
    "utah-antelope-beaver-archery-resident": {
      0: 75, 1: 82, 2: 88, 3: 92, 4: 95, 5: 97, 6: 98, 7: 99, 8: 99, 9: 99, 10: 99
    },
    "utah-antelope-book-muzzleloader-resident": {
      0: 65, 1: 74, 2: 82, 3: 88, 4: 92, 5: 95, 6: 97, 7: 98, 8: 99, 9: 99, 10: 99
    },
    "utah-goat-beaver-any-legal-weapon-resident": {
      0: 1, 1: 2, 2: 3, 3: 5, 4: 7, 5: 10, 6: 12, 7: 15, 8: 18, 9: 22, 10: 25
    },
    "utah-goat-bearsprings-any-legal-weapon-resident": {
      0: 1, 1: 2, 2: 3, 3: 4, 4: 6, 5: 8, 6: 10, 7: 13, 8: 16, 9: 20, 10: 24
    },
    "utah-goat-nebo-any-legal-weapon-resident": {
      0: 1, 1: 1, 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 12, 8: 15, 9: 19, 10: 23
    },
    "utah-bison-antelopeisland-any-legal-weapon-resident": {
      0: 0.5, 1: 1, 2: 1.5, 3: 2, 4: 3, 5: 4, 6: 5, 7: 7, 8: 9, 9: 12, 10: 15
    },

    // Colorado - Updated with new unit names
    "colorado-deer-fourmile-dates-resident": {
      0: 45, 1: 55, 2: 65, 3: 75, 4: 82, 5: 88, 6: 92, 7: 95, 8: 97, 9: 98, 10: 99
    },
    "colorado-elk-unit145-valid-resident": {
      0: 25, 1: 35, 2: 45, 3: 55, 4: 65, 5: 74, 6: 82, 7: 88, 8: 92, 9: 95, 10: 97
    },
    "colorado-elk-unit109-dates-resident": {
      0: 30, 1: 40, 2: 50, 3: 60, 4: 69, 5: 77, 6: 84, 7: 89, 8: 93, 9: 96, 10: 98
    },
    "colorado-elk-unit61-valid-resident": {
      0: 8, 1: 12, 2: 18, 3: 25, 4: 33, 5: 42, 6: 52, 7: 62, 8: 72, 9: 80, 10: 87
    },
    "colorado-elk-unit67-hunt-code-resident": {
      0: 12, 1: 18, 2: 26, 3: 35, 4: 45, 5: 55, 6: 65, 7: 74, 8: 81, 9: 87, 10: 92
    },
    "colorado-antelope-unit10-valid-resident": {
      0: 65, 1: 74, 2: 82, 3: 88, 4: 92, 5: 95, 6: 97, 7: 98, 8: 99, 9: 99, 10: 99
    },
    "colorado-antelope-unit104-hunt-code-resident": {
      0: 55, 1: 65, 2: 74, 3: 82, 4: 88, 5: 92, 6: 95, 7: 97, 8: 98, 9: 99, 10: 99
    },
    "colorado-moose-unit104-valid-resident": {
      0: 1, 1: 2, 2: 3, 3: 5, 4: 7, 5: 10, 6: 13, 7: 16, 8: 20, 9: 24, 10: 28
    },
    "colorado-bear-unit116-dates-resident": {
      0: 70, 1: 78, 2: 84, 3: 89, 4: 93, 5: 96, 6: 98, 7: 99, 8: 99, 9: 99, 10: 99
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
    "utah-elk-beaver-archery": {
      tags: 35, applicants: 143, pointsNeeded: "5-7", trend: "↑ 8%",
      quality: "High", success: "75%", avgSize: "320\"", difficulty: "Moderate"
    },
    "utah-elk-beaver-rifle": {
      tags: 25, applicants: 287, pointsNeeded: "8-10", trend: "↓ 3%",
      quality: "High", success: "85%", avgSize: "340\"", difficulty: "Moderate"
    },
    "utah-elk-beaver-muzzleloader": {
      tags: 15, applicants: 198, pointsNeeded: "6-8", trend: "→ 0%",
      quality: "High", success: "80%", avgSize: "330\"", difficulty: "Moderate"
    },
    "utah-elk-east-archery": {
      tags: 45, applicants: 127, pointsNeeded: "4-6", trend: "↑ 12%",
      quality: "High", success: "70%", avgSize: "315\"", difficulty: "Moderate"
    },
    "utah-elk-east-rifle": {
      tags: 30, applicants: 245, pointsNeeded: "6-8", trend: "↑ 5%",
      quality: "High", success: "88%", avgSize: "325\"", difficulty: "Moderate"
    },
    "utah-elk-north-rifle": {
      tags: 60, applicants: 89, pointsNeeded: "3-5", trend: "↑ 15%",
      quality: "Good", success: "80%", avgSize: "300\"", difficulty: "Easy"
    },
    "utah-elk-north-archery": {
      tags: 40, applicants: 65, pointsNeeded: "2-4", trend: "↑ 18%",
      quality: "Good", success: "75%", avgSize: "290\"", difficulty: "Easy"
    },
    "utah-elk-south-archery": {
      tags: 50, applicants: 112, pointsNeeded: "3-5", trend: "↑ 10%",
      quality: "High", success: "72%", avgSize: "305\"", difficulty: "Moderate"
    },
    "utah-elk-south-rifle": {
      tags: 35, applicants: 178, pointsNeeded: "5-7", trend: "↑ 7%",
      quality: "High", success: "82%", avgSize: "315\"", difficulty: "Moderate"
    },
    "utah-deer-beaver-archery": {
      tags: 120, applicants: 156, pointsNeeded: "2-4", trend: "↑ 5%",
      quality: "Good", success: "65%", avgSize: "190\"", difficulty: "Moderate"
    },
    "utah-deer-beaver-rifle": {
      tags: 80, applicants: 234, pointsNeeded: "4-6", trend: "↑ 3%",
      quality: "Good", success: "78%", avgSize: "185\"", difficulty: "Moderate"
    },
    "utah-deer-east-rifle": {
      tags: 75, applicants: 198, pointsNeeded: "3-5", trend: "↑ 6%",
      quality: "Good", success: "76%", avgSize: "182\"", difficulty: "Moderate"
    },
    "utah-deer-north-archery": {
      tags: 90, applicants: 134, pointsNeeded: "2-4", trend: "↑ 8%",
      quality: "Good", success: "68%", avgSize: "188\"", difficulty: "Moderate"
    },
    "utah-deer-south-rifle": {
      tags: 85, applicants: 167, pointsNeeded: "3-5", trend: "↑ 4%",
      quality: "Good", success: "74%", avgSize: "186\"", difficulty: "Moderate"
    },
    "utah-antelope-beaver-archery": {
      tags: 75, applicants: 98, pointsNeeded: "0-2", trend: "↑ 12%",
      quality: "Good", success: "82%", avgSize: "78\"", difficulty: "Easy"
    },
    "utah-antelope-book-muzzleloader": {
      tags: 45, applicants: 67, pointsNeeded: "0-1", trend: "↑ 15%",
      quality: "Good", success: "85%", avgSize: "80\"", difficulty: "Easy"
    },
    "utah-goat-beaver-any-legal-weapon": {
      tags: 2, applicants: 456, pointsNeeded: "15+", trend: "→ 0%",
      quality: "Premium", success: "95%", avgSize: "N/A", difficulty: "Very Difficult"
    },
    "utah-goat-bearsprings-any-legal-weapon": {
      tags: 1, applicants: 523, pointsNeeded: "18+", trend: "↓ 1%",
      quality: "Premium", success: "98%", avgSize: "N/A", difficulty: "Very Difficult"
    },
    "utah-goat-nebo-any-legal-weapon": {
      tags: 1, applicants: 612, pointsNeeded: "20+", trend: "↓ 2%",
      quality: "Premium", success: "99%", avgSize: "N/A", difficulty: "Very Difficult"
    },
    "utah-bison-antelopeisland-any-legal-weapon": {
      tags: 1, applicants: 1234, pointsNeeded: "25+", trend: "→ 0%",
      quality: "Premium", success: "100%", avgSize: "N/A", difficulty: "Extremely Difficult"
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