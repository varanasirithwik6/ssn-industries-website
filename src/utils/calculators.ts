export function calculateTmtWeight(diameter: number, length: number): number {
  return ((diameter * diameter) / 162.2) * length;
}

export function calculatePipeWeight(pipeOdt: number, pipeThk: number, length: number): number {
  return 3.14159 * (pipeOdt - pipeThk) * pipeThk * length * 0.00785;
}

export function calculateBeamWeight(ibeamWeight: number, length: number): number {
  return ibeamWeight * length;
}

export function calculateSheetsNeeded(
  roofWidth: number,
  roofLength: number,
  overlapMm: number,
  sheetWidthEffective: number = 1.0,
  sheetLengthStandard: number = 3.0
): number {
  const overlapM = overlapMm / 1000;
  const sheetsAlongWidth = Math.ceil(roofWidth / sheetWidthEffective);
  const sheetsAlongLength = Math.ceil(roofLength / (sheetLengthStandard - overlapM));
  return sheetsAlongWidth * sheetsAlongLength;
}
