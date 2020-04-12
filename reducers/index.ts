import { Actions, State } from '../interfaces'

export const initialState: State = {
  totalPopulation: []
}

export const reducer = (
  state: State,
  action: Actions
): State => {
  switch (action.type) {
    case 'ADD_PREFECTURE': {
      const { totalPopulation } = state
      return {
        ...state,
        totalPopulation: [...totalPopulation, action.payload],
      }
    }

    case 'REMOVE_PREFECTURE': {
      const { totalPopulation } = state
      const index = totalPopulation.findIndex((population) => {
        return population.prefCode === action.payload
      })
      const newTotalPopulation = [...totalPopulation]
      newTotalPopulation.splice(index, 1)
      return {
        ...state,
        totalPopulation: newTotalPopulation,
      }
    }

    default:
      throw new Error()
  }
}
