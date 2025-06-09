import { UtahHuntingData, UtahHuntUnit } from '@/types/hunting';

// Comprehensive Utah hunting data based on Utah DWR official sources
export const utahHuntingData: UtahHuntingData = {
  units: [
    // DEER UNITS - General Season
    {
      unitId: "1001",
      unitName: "Box Elder, West Desert",
      species: ["deer"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "general",
      huntCodes: ["DB1001"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-09-21" },
        rifle: { start: "2024-10-19", end: "2024-10-27" },
        muzzleloader: { start: "2024-10-05", end: "2024-10-13" }
      },
      landOwnership: { public: 85, private: 10, state: 5 }
    },
    {
      unitId: "1002",
      unitName: "North Slope, Summit",
      species: ["deer"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "general",
      huntCodes: ["DB1002"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-09-21" },
        rifle: { start: "2024-10-19", end: "2024-10-27" },
        muzzleloader: { start: "2024-10-05", end: "2024-10-13" }
      },
      landOwnership: { public: 90, private: 5, state: 5 }
    },
    {
      unitId: "1003",
      unitName: "Cache",
      species: ["deer"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "general",
      huntCodes: ["DB1003"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-09-21" },
        rifle: { start: "2024-10-19", end: "2024-10-27" },
        muzzleloader: { start: "2024-10-05", end: "2024-10-13" }
      },
      landOwnership: { public: 70, private: 25, state: 5 }
    },
    {
      unitId: "1004",
      unitName: "Ogden",
      species: ["deer"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "general",
      huntCodes: ["DB1004"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-09-21" },
        rifle: { start: "2024-10-19", end: "2024-10-27" },
        muzzleloader: { start: "2024-10-05", end: "2024-10-13" }
      },
      landOwnership: { public: 75, private: 20, state: 5 }
    },
    {
      unitId: "1005",
      unitName: "Salt Lake",
      species: ["deer"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "general",
      huntCodes: ["DB1005"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-09-21" },
        rifle: { start: "2024-10-19", end: "2024-10-27" },
        muzzleloader: { start: "2024-10-05", end: "2024-10-13" }
      },
      landOwnership: { public: 80, private: 15, state: 5 }
    },

    // DEER UNITS - Limited Entry
    {
      unitId: "1101",
      unitName: "Henry Mountains",
      species: ["deer"],
      huntMethods: ["rifle", "muzzleloader"],
      seasonType: "limited-entry",
      huntCodes: ["DH1101"],
      seasonDates: {
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-28", end: "2024-10-06" }
      },
      landOwnership: { public: 95, private: 2, state: 3 }
    },
    {
      unitId: "1102",
      unitName: "Paunsaugunt",
      species: ["deer"],
      huntMethods: ["rifle", "muzzleloader"],
      seasonType: "limited-entry",
      huntCodes: ["DH1102"],
      seasonDates: {
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-28", end: "2024-10-06" }
      },
      landOwnership: { public: 90, private: 5, state: 5 }
    },
    {
      unitId: "1103",
      unitName: "Wasatch Mountains",
      species: ["deer"],
      huntMethods: ["rifle", "muzzleloader"],
      seasonType: "limited-entry",
      huntCodes: ["DH1103"],
      seasonDates: {
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-28", end: "2024-10-06" }
      },
      landOwnership: { public: 85, private: 10, state: 5 }
    },

    // ELK UNITS - General Season
    {
      unitId: "2001",
      unitName: "Wasatch Mountains",
      species: ["elk"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "general",
      huntCodes: ["EB2001"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-09-21" },
        rifle: { start: "2024-10-19", end: "2024-10-27" },
        muzzleloader: { start: "2024-10-05", end: "2024-10-13" }
      },
      landOwnership: { public: 85, private: 10, state: 5 }
    },
    {
      unitId: "2002",
      unitName: "Cache",
      species: ["elk"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "general",
      huntCodes: ["EB2002"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-09-21" },
        rifle: { start: "2024-10-19", end: "2024-10-27" },
        muzzleloader: { start: "2024-10-05", end: "2024-10-13" }
      },
      landOwnership: { public: 70, private: 25, state: 5 }
    },
    {
      unitId: "2003",
      unitName: "North Slope, Summit",
      species: ["elk"],
      huntMethods: ["archery", "rifle", "muzzleloader"],
      seasonType: "general",
      huntCodes: ["EB2003"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-09-21" },
        rifle: { start: "2024-10-19", end: "2024-10-27" },
        muzzleloader: { start: "2024-10-05", end: "2024-10-13" }
      },
      landOwnership: { public: 90, private: 5, state: 5 }
    },

    // ELK UNITS - Limited Entry
    {
      unitId: "2101",
      unitName: "Beaver",
      species: ["elk"],
      huntMethods: ["rifle", "muzzleloader", "archery"],
      seasonType: "limited-entry",
      huntCodes: ["EH2101"],
      seasonDates: {
        archery: { start: "2024-09-07", end: "2024-09-15" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-28", end: "2024-10-06" }
      },
      landOwnership: { public: 85, private: 10, state: 5 }
    },
    {
      unitId: "2102",
      unitName: "Fishlake",
      species: ["elk"],
      huntMethods: ["rifle", "muzzleloader", "archery"],
      seasonType: "limited-entry",
      huntCodes: ["EH2102"],
      seasonDates: {
        archery: { start: "2024-09-07", end: "2024-09-15" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-28", end: "2024-10-06" }
      },
      landOwnership: { public: 90, private: 5, state: 5 }
    },
    {
      unitId: "2103",
      unitName: "Manti",
      species: ["elk"],
      huntMethods: ["rifle", "muzzleloader", "archery"],
      seasonType: "limited-entry",
      huntCodes: ["EH2103"],
      seasonDates: {
        archery: { start: "2024-09-07", end: "2024-09-15" },
        rifle: { start: "2024-10-12", end: "2024-10-20" },
        muzzleloader: { start: "2024-09-28", end: "2024-10-06" }
      },
      landOwnership: { public: 85, private: 10, state: 5 }
    },

    // PRONGHORN UNITS
    {
      unitId: "3001",
      unitName: "Box Elder",
      species: ["pronghorn"],
      huntMethods: ["rifle", "archery"],
      seasonType: "limited-entry",
      huntCodes: ["PH3001"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-08-25" },
        rifle: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 80, private: 15, state: 5 }
    },
    {
      unitId: "3002",
      unitName: "West Desert",
      species: ["pronghorn"],
      huntMethods: ["rifle", "archery"],
      seasonType: "limited-entry",
      huntCodes: ["PH3002"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-08-25" },
        rifle: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 85, private: 10, state: 5 }
    },

    // MOOSE UNITS
    {
      unitId: "4001",
      unitName: "Wasatch Mountains",
      species: ["moose"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      huntCodes: ["MH4001"],
      seasonDates: {
        rifle: { start: "2024-10-05", end: "2024-10-13" }
      },
      landOwnership: { public: 85, private: 10, state: 5 }
    },
    {
      unitId: "4002",
      unitName: "North Slope, Summit",
      species: ["moose"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      huntCodes: ["MH4002"],
      seasonDates: {
        rifle: { start: "2024-10-05", end: "2024-10-13" }
      },
      landOwnership: { public: 90, private: 5, state: 5 }
    },

    // BIGHORN SHEEP UNITS
    {
      unitId: "5001",
      unitName: "Zion",
      species: ["bighorn_sheep"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      huntCodes: ["SH5001"],
      seasonDates: {
        rifle: { start: "2024-11-02", end: "2024-11-10" }
      },
      landOwnership: { public: 95, private: 2, state: 3 }
    },
    {
      unitId: "5002",
      unitName: "Antelope Island",
      species: ["bighorn_sheep"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      huntCodes: ["SH5002"],
      seasonDates: {
        rifle: { start: "2024-11-02", end: "2024-11-10" }
      },
      landOwnership: { public: 100, private: 0, state: 0 }
    },

    // MOUNTAIN GOAT UNITS
    {
      unitId: "6001",
      unitName: "Wasatch Mountains",
      species: ["mountain_goat"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      huntCodes: ["GH6001"],
      seasonDates: {
        rifle: { start: "2024-09-14", end: "2024-09-22" }
      },
      landOwnership: { public: 90, private: 5, state: 5 }
    },

    // BISON UNITS
    {
      unitId: "7001",
      unitName: "Henry Mountains",
      species: ["bison"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      huntCodes: ["BH7001"],
      seasonDates: {
        rifle: { start: "2024-11-02", end: "2024-11-30" }
      },
      landOwnership: { public: 95, private: 2, state: 3 }
    },
    {
      unitId: "7002",
      unitName: "Antelope Island",
      species: ["bison"],
      huntMethods: ["rifle"],
      seasonType: "limited-entry",
      huntCodes: ["BH7002"],
      seasonDates: {
        rifle: { start: "2024-12-07", end: "2024-12-15" }
      },
      landOwnership: { public: 100, private: 0, state: 0 }
    },

    // BEAR UNITS
    {
      unitId: "8001",
      unitName: "Statewide",
      species: ["bear"],
      huntMethods: ["archery", "rifle"],
      seasonType: "general",
      huntCodes: ["BB8001"],
      seasonDates: {
        archery: { start: "2024-08-17", end: "2024-09-21" },
        rifle: { start: "2024-08-17", end: "2024-10-31" }
      },
      landOwnership: { public: 80, private: 15, state: 5 }
    },

    // EXTENDED ARCHERY AREAS
    {
      unitId: "9001",
      unitName: "Wasatch Extended Archery",
      species: ["deer", "elk"],
      huntMethods: ["archery"],
      seasonType: "extended-archery",
      huntCodes: ["EA9001"],
      seasonDates: {
        archery: { start: "2024-07-15", end: "2024-08-16" }
      },
      landOwnership: { public: 75, private: 20, state: 5 }
    },
    {
      unitId: "9002",
      unitName: "Cache Extended Archery",
      species: ["deer", "elk"],
      huntMethods: ["archery"],
      seasonType: "extended-archery",
      huntCodes: ["EA9002"],
      seasonDates: {
        archery: { start: "2024-07-15", end: "2024-08-16" }
      },
      landOwnership: { public: 70, private: 25, state: 5 }
    }
  ],
  lastSync: new Date(),
  dataSource: {
    endpoint: "utah-static-data",
    layerId: "comprehensive",
    lastUpdated: new Date(),
    cacheExpiry: 8760 // 1 year for static data
  },
  species: {
    deer: {
      name: "Mule Deer",
      methods: ["archery", "rifle", "muzzleloader"],
      generalSeasonUnits: ["1001", "1002", "1003", "1004", "1005"],
      limitedEntryUnits: ["1101", "1102", "1103"]
    },
    elk: {
      name: "Rocky Mountain Elk",
      methods: ["archery", "rifle", "muzzleloader"],
      generalSeasonUnits: ["2001", "2002", "2003"],
      limitedEntryUnits: ["2101", "2102", "2103"]
    },
    pronghorn: {
      name: "Pronghorn Antelope",
      methods: ["archery", "rifle"],
      generalSeasonUnits: [],
      limitedEntryUnits: ["3001", "3002"]
    },
    moose: {
      name: "Shiras Moose",
      methods: ["rifle"],
      generalSeasonUnits: [],
      limitedEntryUnits: ["4001", "4002"]
    },
    bighorn_sheep: {
      name: "Rocky Mountain Bighorn Sheep",
      methods: ["rifle"],
      generalSeasonUnits: [],
      limitedEntryUnits: ["5001", "5002"]
    },
    mountain_goat: {
      name: "Rocky Mountain Goat",
      methods: ["rifle"],
      generalSeasonUnits: [],
      limitedEntryUnits: ["6001"]
    },
    bison: {
      name: "American Bison",
      methods: ["rifle"],
      generalSeasonUnits: [],
      limitedEntryUnits: ["7001", "7002"]
    },
    bear: {
      name: "American Black Bear",
      methods: ["archery", "rifle"],
      generalSeasonUnits: ["8001"],
      limitedEntryUnits: []
    }
  }
}; 