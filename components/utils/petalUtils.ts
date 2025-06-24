// Utility functions related to petals can be added here

export interface PetalData {
  id: string;
  angle: number;
  isPlucked: boolean;
}

export function generatePetals(count: number): PetalData[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `petal-${index}`,
    angle: (360 / count) * index,
    isPlucked: false,
  }));
}
