import { useState, useReducer } from 'react'
import fetch from 'node-fetch'
import styled from '@emotion/styled'
import ContainerAppPrefectures from '../components/AppPrefectures'
import ContainerAppChart from '../components/AppChart'
import { Prefecture, TotalPopulation } from '../interfaces'
import { reducer } from '../reducers'
import { AddPrefecture, RemovePrefecture } from '../actions';

type ContainerProps = {
  result: Prefecture[]
}

type Props = {
  className?: string
  totalPopulation: TotalPopulation[]
  fetchPopulationComposition: (prefecture: Prefecture) => void
  removeTotalPopulation: (prefCode: number) => void
} & ContainerProps

const Home: React.FC<Props> = ({
  result,
  className,
  totalPopulation,
  fetchPopulationComposition,
  removeTotalPopulation,
}) => (
  <div className={className}>
    <h1>都道府県別の総人口推移グラフ</h1>
    <ContainerAppPrefectures
      prefectures={result}
      fetchPopulationComposition={fetchPopulationComposition}
      removeTotalPopulation={removeTotalPopulation}
    />
    <ContainerAppChart totalPopulation={totalPopulation} />
  </div>
)

const StyledHome = styled(Home)`
  &.wrapper {
    padding: 32px;
  }

  > h1 {
    margin-bottom: 24px;
    font-size: 32px;
    text-align: center;
  }
`

const ContainerHome: React.FC<ContainerProps> = ({ result }) => {
  const [totalPopulation, setTotalPopulation] = useState([])
  const [state, dispatch] = useReducer(reducer, [])

  const fetchPopulationComposition = async ({ prefName, prefCode }) => {
    const res = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          'X-API-KEY': process.env.RESAS_API_KEY,
        },
      }
    )
    const { result } = await res.json()
    const newTotalPopulation = result.data[0]

    setTotalPopulation([
      ...totalPopulation,
      {
        prefName,
        prefCode,
        data: newTotalPopulation.data,
      },
    ])
    dispatch(AddPrefecture(totalPopulation))
  }

  const removeTotalPopulation = (prefCode) => {
    const index = totalPopulation.findIndex((population) => {
      return population.prefCode === prefCode
    })
    const newTotalPopulation = [...totalPopulation]

    newTotalPopulation.splice(index, 1)
    setTotalPopulation(newTotalPopulation)
    dispatch(RemovePrefecture(index))
  }

  return (
    <StyledHome
      result={result}
      className="wrapper"
      totalPopulation={state}
      fetchPopulationComposition={fetchPopulationComposition}
      removeTotalPopulation={removeTotalPopulation}
    />
  )
}

export async function getStaticProps() {
  const res = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    {
      headers: {
        'X-API-KEY': process.env.RESAS_API_KEY,
      },
    }
  )
  const { result } = await res.json()

  return {
    props: {
      result,
    },
  }
}

export default ContainerHome
