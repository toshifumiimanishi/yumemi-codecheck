import { useReducer } from 'react'
import { NextPage, GetStaticProps } from 'next'
import fetch from 'node-fetch'
import styled from '@emotion/styled'
import ContainerAppPrefectures from '../components/AppPrefectures'
import ContainerAppChart from '../components/AppChart'
import { Prefecture, TotalPopulation } from '../interfaces'
import { reducer, initialState } from '../reducers'
import { AddPrefecture, RemovePrefecture } from '../actions'

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

const ContainerHome: NextPage<ContainerProps> = ({ result }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

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

    dispatch(
      AddPrefecture({
        prefName,
        prefCode,
        data: newTotalPopulation.data,
      })
    )
  }

  const removeTotalPopulation = (prefCode) => {
    const index = state.findIndex((population) => {
      return population.prefCode === prefCode
    })

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

export const getStaticProps: GetStaticProps = async () => {
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
