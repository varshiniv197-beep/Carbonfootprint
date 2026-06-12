/**
 * Carbon Calculation Engine for TerraSync AI+
 * Provides strictly-typed calculations based on EPA and IPCC global coefficients.
 */

export interface FootprintData {
  transport: number;
  energy: number;
  diet: number;
  habits: number;
}

/**
 * Calculates transportation emissions in kg CO2
 */
export function calculateTransportEmissions(carKm: number, transitHrs: number, flightsHrs: number): number {
  return (carKm * 0.2) + (transitHrs * 0.1) + (flightsHrs * 110);
}

/**
 * Calculates utility emissions in kg CO2
 */
export function calculateEnergyEmissions(electricityKwh: number, heatingGas: number, waterLiters: number): number {
  return (electricityKwh * 0.4) + (heatingGas * 1.5) + (waterLiters * 0.05);
}

/**
 * Calculates dietary emissions in kg CO2
 */
export function calculateDietEmissions(meatMeals: number, wasteKg: number, localPercent: number): number {
  return (meatMeals * 2.5) + (wasteKg * 1.2) - (localPercent * 0.1);
}

/**
 * Calculates consumer habit emissions in kg CO2
 */
export function calculateHabitsEmissions(clothesItems: number, recyclePercent: number, applianceStar: number): number {
  return (clothesItems * 15) - (recyclePercent * 0.5) - (applianceStar * 0.2);
}

/**
 * Computes the overall sustainability score (0 - 100) based on total emissions
 */
export function computeSustainabilityScore(total: number): number {
  if (total > 200) return 30;
  if (total > 150) return 50;
  if (total > 100) return 70;
  if (total > 50) return 85;
  if (total > 0) return 95;
  return 100;
}

/**
 * Maps the score to a corresponding user category level
 */
export function mapScoreToLevel(score: number): string {
  if (score > 80) return 'Climate Champion';
  if (score > 50) return 'Eco Advocate';
  return 'Green Cadet';
}

/**
 * Generates personalized hotspot insights based on the highest category emissions
 */
export interface HotspotInsight {
  name: string;
  advice: string;
}

export function getHotspotInsight(data: FootprintData): HotspotInsight {
  const total = data.transport + data.energy + data.diet + data.habits;
  if (total === 0) {
    return { name: 'None yet', advice: 'Excellent! Complete the onboarding to begin carbon analysis.' };
  }

  const categories = [
    { name: 'Transportation', value: data.transport, advice: 'Your vehicle travel and flights represent your primary carbon hotspot. Try carpooling, cycling, or shifting local commutes to zero-emission modes.' },
    { name: 'Home Utilities', value: data.energy, advice: 'Grid electricity and gas heating are your main carbon drivers. Lowering your thermostat by 2 degrees and toggling smart power strips will optimize this.' },
    { name: 'Food & Diet', value: data.diet, advice: 'Food packaging and livestock consumption are bloating your diet footprint. Try reducing meat-heavy meals and sourcing local ingredients.' },
    { name: 'Consumer Habits', value: data.habits, advice: 'Manufacturing logistics of newly purchased items (like fast fashion clothing) is highly resource-intensive. Practice circular recycling habits.' }
  ];

  return categories.reduce((prev, current) => (prev.value > current.value) ? prev : current);
}

/**
 * Computes a standardized reduction based on split weight baselines (used for standard test comparisons)
 */
export function calculateSimulatorReduction(base: number, solarShare: number, evShare: number, plantShift: number): number {
  let energy = base * 0.3;
  let transport = base * 0.4;
  let diet = base * 0.3;
  
  energy = energy * (1 - (solarShare / 100) * 0.8);
  transport = transport * (1 - (evShare / 100) * 0.7);
  diet = diet * (1 - (plantShift / 100) * 0.6);
  
  return energy + transport + diet;
}

export interface SimulationInputs {
  solarShare: number;
  evShare: number;
  dietPlantShift: number;
  thermostatChange: number;
}

export interface SimulationResults {
  energy: number;
  transport: number;
  diet: number;
  habits: number;
  total: number;
}

/**
 * Computes scenario simulator results based on actual user footprint data and policy changes
 */
export function calculateSimulatedFootprint(
  baseData: FootprintData,
  inputs: SimulationInputs
): SimulationResults {
  const energy = Math.max(0, baseData.energy * (1 - (inputs.solarShare / 100) * 0.8) - (inputs.thermostatChange * 10));
  const transport = Math.max(0, baseData.transport * (1 - (inputs.evShare / 100) * 0.7));
  const diet = Math.max(0, baseData.diet * (1 - (inputs.dietPlantShift / 100) * 0.6));
  const habits = baseData.habits;
  const total = energy + transport + diet + habits;
  
  return { energy, transport, diet, habits, total };
}

