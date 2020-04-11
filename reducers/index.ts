import { TotalPopulation } from '../interfaces'
import { Actions } from '../actions'

export const initialState: TotalPopulation[] = []

export const reducer = (
  state: TotalPopulation[],
  action: Actions
): TotalPopulation[] => {
  switch (action.type) {
    case 'ADD_PREFECTURE':
      return [...state, action.payload]

    case 'REMOVE_PREFECTURE':
      const newState = [...state]
      newState.splice(action.payload, 1)
      return newState

    default:
      throw new Error()
  }
}
