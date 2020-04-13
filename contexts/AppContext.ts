import { createContext } from 'react'

const AppContext = createContext({
  state: {
    totalPopulation: [],
  },
  dispatch: null,
})

export default AppContext
