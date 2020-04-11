export type Prefecture = {
  prefCode: number
  prefName: string
}

export type TotalPopulation = {
  data: { value: number; year: number }[]
} & Prefecture
