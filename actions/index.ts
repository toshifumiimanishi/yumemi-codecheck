import { TotalPopulation } from '../interfaces'
import types from '../types';

export const AddPrefecture = (totalPopulation: TotalPopulation[]) => ({
  type: types.ADD_PREFECTURE,
  payload: totalPopulation
})

export const RemovePrefecture = (index: number) => ({
  type: types.REMOVE_PREFECTURE,
  payload: index
})

export type Actions = ReturnType<typeof AddPrefecture | typeof RemovePrefecture>
