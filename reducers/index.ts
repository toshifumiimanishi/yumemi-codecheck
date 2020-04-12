import { TotalPopulation } from '../interfaces'
import { Actions } from '../interfaces/actions'

export const initialState: TotalPopulation[] = []

export const reducer = (
  state: TotalPopulation[],
  action: Actions
): TotalPopulation[] => {
  switch (action.type) {
    case 'ADD_PREFECTURE':
      return [...state, action.payload]

    case 'REMOVE_PREFECTURE':
      const index = state.findIndex((population) => {
        return population.prefCode === action.payload
      })
      const newState = [...state]
      newState.splice(index, 1)
      return newState

    default:
      throw new Error()
  }
}
