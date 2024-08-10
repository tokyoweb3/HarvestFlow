import type { SQLUpdate } from '@paima/node-sdk/db';
import { addPoints } from '@harvest-flow/db';

export function addUserPoints(userAddress: string, amount: number): SQLUpdate {
  const addUserPointsParams = {
    user_address: userAddress,
    amount: amount,
  };

  return [addPoints, addUserPointsParams];
}
