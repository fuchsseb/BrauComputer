declare global {
  interface Window {
    electronAPI: {
      saveRecipe: (recipe: any) => Promise<{ success: boolean; id: number }>;
      loadRecipes: () => Promise<any[]>;
      saveBrewingSession: (session: any) => Promise<{ success: boolean; id: number }>;
      loadBrewingSessions: () => Promise<any[]>;
      connectToFloat: () => Promise<{ success: boolean }>;
      getFloatData: () => Promise<any>;
      saveMashCurve: (curve: any) => Promise<{ success: boolean; id: number }>;
      loadMashCurves: () => Promise<any[]>;
      saveFermentationCurve: (curve: any) => Promise<{ success: boolean; id: number }>;
      loadFermentationCurves: () => Promise<any[]>;
    };
  }
}

export {};
