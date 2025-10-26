const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  saveRecipe: (recipe) => ipcRenderer.invoke('save-recipe', recipe),
  loadRecipes: () => ipcRenderer.invoke('load-recipes'),
  saveBrewingSession: (session) => ipcRenderer.invoke('save-brewing-session', session),
  
  // Brewbrain Float Integration
  connectToFloat: () => ipcRenderer.invoke('connect-float'),
  getFloatData: () => ipcRenderer.invoke('get-float-data'),
  
  // Chart data operations
  saveMashCurve: (curve) => ipcRenderer.invoke('save-mash-curve', curve),
  loadMashCurves: () => ipcRenderer.invoke('load-mash-curves'),
  saveFermentationCurve: (curve) => ipcRenderer.invoke('save-fermentation-curve', curve),
  loadFermentationCurves: () => ipcRenderer.invoke('load-fermentation-curves')
});
