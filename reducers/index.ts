import { TotalPopulation } from '../interfaces'
import { Actions } from '../actions'

export const initialState: TotalPopulation[] = []

export const reducer = (state: TotalPopulation[], action: Actions) => {
  switch (action.type) {
    case 'ADD_PREFECTURE':
      return [...state, action.payload]

    case 'REMOVE_PREFECTURE':
      return [...state].splice(action.payload, 1)

    default:
      throw new Error()
  }
}
