import { generatePrecompiles } from '@paima/sdk/precompiles';

export enum PrecompileNames {
  PointsCalculation = 'pointsCalculation',
}

export const precompiles = generatePrecompiles(PrecompileNames);
