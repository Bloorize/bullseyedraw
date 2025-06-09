import { UtahHuntUnit } from '@/types/hunting';

// Colorado hunting unit data structure
export interface ColoradoHuntUnit extends UtahHuntUnit {
  // Colorado-specific properties can be added here
  dataAnalysisUnit?: string; // Colorado's DAU system
  gmuNumber?: number; // Game Management Unit number
  quality?: string; // Unit quality rating
  access?: string; // Access difficulty
}

// Colorado hunting data with comprehensive unit information
export const coloradoHuntingData = {
  species: {
    deer: { name: "Mule Deer", methods: ["archery", "rifle", "muzzleloader"] },
    elk: { name: "Elk", methods: ["archery", "rifle", "muzzleloader"] },
    pronghorn: { name: "Pronghorn", methods: ["archery", "rifle"] },
    moose: { name: "Moose", methods: ["rifle"] },
    bighorn_sheep: { name: "Bighorn Sheep", methods: ["rifle"] },
    mountain_goat: { name: "Mountain Goat", methods: ["rifle"] },
    bear: { name: "Black Bear", methods: ["archery", "rifle"] }
  },
  
  units: [
    // Elk Units - High Quality Limited Draw
    {
      unitId: "E-001",
      unitName: "Unit 1 - Poudre Canyon",
      species: ["elk"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "limited-entry",
      gmuNumber: 1,
      huntCodes: ["E-001-O1-R", "E-001-O1-A", "E-001-O1-M"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 85, private: 15, state: 0 },
      quality: "high",
      access: "good"
    },
    {
      unitId: "E-002",
      unitName: "Unit 2 - Rabbit Ears",
      species: ["elk"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "limited-entry",
      gmuNumber: 2,
      huntCodes: ["E-002-O1-R", "E-002-O1-A", "E-002-O1-M"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 78, private: 22, state: 0 },
      quality: "high",
      access: "moderate"
    },
    {
      unitId: "E-010",
      unitName: "Unit 10 - Granby",
      species: ["elk"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "limited-entry",
      gmuNumber: 10,
      huntCodes: ["E-010-O1-R", "E-010-O1-A", "E-010-O1-M"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 92, private: 8, state: 0 },
      quality: "premium",
      access: "good"
    },
    {
      unitId: "E-061",
      unitName: "Unit 61 - Gunnison",
      species: ["elk"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "limited-entry",
      gmuNumber: 61,
      huntCodes: ["E-061-O1-R", "E-061-O1-A", "E-061-O1-M"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 88, private: 12, state: 0 },
      quality: "premium",
      access: "moderate"
    },
    {
      unitId: "E-201",
      unitName: "Unit 201 - Uncompahgre",
      species: ["elk"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "limited-entry",
      gmuNumber: 201,
      huntCodes: ["E-201-O1-R", "E-201-O1-A", "E-201-O1-M"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 75, private: 25, state: 0 },
      quality: "premium",
      access: "difficult"
    },

    // Elk Units - Over-the-Counter (OTC)
    {
      unitId: "E-OTC-1",
      unitName: "OTC Unit 1 - Northwest",
      species: ["elk"],
      huntMethods: ["archery", "rifle"],
      seasonType: "general",
      huntCodes: ["E-OTC-A", "E-OTC-R"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-10-12", end: "2024-11-17" }
      },
      landOwnership: { public: 70, private: 30, state: 0 },
      quality: "good",
      access: "good"
    },
    {
      unitId: "E-OTC-2",
      unitName: "OTC Unit 2 - Central",
      species: ["elk"],
      huntMethods: ["archery", "rifle"],
      seasonType: "general",
      huntCodes: ["E-OTC-A", "E-OTC-R"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-10-12", end: "2024-11-17" }
      },
      landOwnership: { public: 65, private: 35, state: 0 },
      quality: "good",
      access: "moderate"
    },

    // Deer Units - Limited Draw
    {
      unitId: "D-003",
      unitName: "Unit 3 - Poudre Canyon",
      species: ["deer"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "limited-entry",
      gmuNumber: 3,
      huntCodes: ["D-003-O1-R", "D-003-O1-A", "D-003-O1-M"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 82, private: 18, state: 0 },
      quality: "high",
      access: "good"
    },
    {
      unitId: "D-022",
      unitName: "Unit 22 - Kremmling",
      species: ["deer"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "limited-entry",
      gmuNumber: 22,
      huntCodes: ["D-022-O1-R", "D-022-O1-A", "D-022-O1-M"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 88, private: 12, state: 0 },
      quality: "premium",
      access: "moderate"
    },
    {
      unitId: "D-140",
      unitName: "Unit 140 - Gunnison Basin",
      species: ["deer"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "limited-entry",
      gmuNumber: 140,
      huntCodes: ["D-140-O1-R", "D-140-O1-A", "D-140-O1-M"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 85, private: 15, state: 0 },
      quality: "premium",
      access: "good"
    },

    // Pronghorn Units
    {
      unitId: "A-005",
      unitName: "Unit 5 - Pawnee Grasslands",
      species: ["pronghorn"],
      huntMethods: ["archery", "rifle"],
      seasonType: "limited-entry",
      gmuNumber: 5,
      huntCodes: ["A-005-O1-R", "A-005-O1-A"],
      seasonDates: {
        archery: { start: "2024-08-15", end: "2024-08-31" },
        rifle: { start: "2024-10-01", end: "2024-10-07" }
      },
      landOwnership: { public: 45, private: 55, state: 0 },
      quality: "good",
      access: "moderate"
    },
    {
      unitId: "A-018",
      unitName: "Unit 18 - Limon",
      species: ["pronghorn"],
      huntMethods: ["archery", "rifle"],
      seasonType: "limited-entry",
      gmuNumber: 18,
      huntCodes: ["A-018-O1-R", "A-018-O1-A"],
      seasonDates: {
        archery: { start: "2024-08-15", end: "2024-08-31" },
        rifle: { start: "2024-10-01", end: "2024-10-07" }
      },
      landOwnership: { public: 35, private: 65, state: 0 },
      quality: "high",
      access: "difficult"
    },
    {
      unitId: "A-104",
      unitName: "Unit 104 - North Park",
      species: ["pronghorn"],
      huntMethods: ["archery", "rifle"],
      seasonType: "limited-entry",
      gmuNumber: 104,
      huntCodes: ["A-104-O1-R", "A-104-O1-A"],
      seasonDates: {
        archery: { start: "2024-08-15", end: "2024-08-31" },
        rifle: { start: "2024-10-01", end: "2024-10-07" }
      },
      landOwnership: { public: 78, private: 22, state: 0 },
      quality: "premium",
      access: "good"
    },

    // Moose Units (Very Limited)
    {
      unitId: "M-001",
      unitName: "Unit 1 - North Park",
      species: ["moose"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      gmuNumber: 1,
      huntCodes: ["M-001-O1-R"],
      seasonDates: {
        rifle: { start: "2024-10-01", end: "2024-10-31" }
      },
      landOwnership: { public: 85, private: 15, state: 0 },
      quality: "premium",
      access: "moderate"
    },
    {
      unitId: "M-061",
      unitName: "Unit 61 - Gunnison",
      species: ["moose"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      gmuNumber: 61,
      huntCodes: ["M-061-O1-R"],
      seasonDates: {
        rifle: { start: "2024-10-01", end: "2024-10-31" }
      },
      landOwnership: { public: 92, private: 8, state: 0 },
      quality: "premium",
      access: "difficult"
    },

    // Bighorn Sheep Units (Extremely Limited)
    {
      unitId: "S-006",
      unitName: "Unit 6 - Georgetown",
      species: ["bighorn_sheep"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      gmuNumber: 6,
      huntCodes: ["S-006-O1-R"],
      seasonDates: {
        rifle: { start: "2024-09-01", end: "2024-12-31" }
      },
      landOwnership: { public: 95, private: 5, state: 0 },
      quality: "premium",
      access: "very-difficult"
    },
    {
      unitId: "S-136",
      unitName: "Unit 136 - Collegiate Peaks",
      species: ["bighorn_sheep"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      gmuNumber: 136,
      huntCodes: ["S-136-O1-R"],
      seasonDates: {
        rifle: { start: "2024-09-01", end: "2024-12-31" }
      },
      landOwnership: { public: 98, private: 2, state: 0 },
      quality: "premium",
      access: "very-difficult"
    },

    // Mountain Goat Units (Extremely Limited)
    {
      unitId: "G-002",
      unitName: "Unit 2 - Eagles Nest",
      species: ["mountain_goat"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      gmuNumber: 2,
      huntCodes: ["G-002-O1-R"],
      seasonDates: {
        rifle: { start: "2024-09-01", end: "2024-12-31" }
      },
      landOwnership: { public: 100, private: 0, state: 0 },
      quality: "premium",
      access: "very-difficult"
    },

    // Bear Units
    {
      unitId: "B-001",
      unitName: "Unit 1 - Poudre Canyon",
      species: ["bear"],
      huntMethods: ["archery", "rifle"],
      seasonType: "general",
      gmuNumber: 1,
      huntCodes: ["B-001-O1-R", "B-001-O1-A"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-09-01", end: "2024-09-30" }
      },
      landOwnership: { public: 85, private: 15, state: 0 },
      quality: "good",
      access: "good"
    },
    {
      unitId: "B-061",
      unitName: "Unit 61 - Gunnison",
      species: ["bear"],
      huntMethods: ["archery", "rifle"],
      seasonType: "general",
      gmuNumber: 61,
      huntCodes: ["B-061-O1-R", "B-061-O1-A"],
      seasonDates: {
        archery: { start: "2024-09-01", end: "2024-09-30" },
        rifle: { start: "2024-09-01", end: "2024-09-30" }
      },
      landOwnership: { public: 88, private: 12, state: 0 },
      quality: "high",
      access: "moderate"
    }
  ] as ColoradoHuntUnit[]
}; 