import { useReducer, Dispatch } from 'react'
import { NextPage, GetStaticProps } from 'next'
import fetch from 'node-fetch'
import styled from '@emotion/styled'
import ContainerAppPrefectures from '../components/AppPrefectures'
import ContainerAppChart from '../components/AppChart'
import { Prefecture, TotalPopulation } from '../interfaces'
import { reducer, initialState } from '../reducers'
import { Actions } from '../actions'

type ContainerProps = {
  result: Prefecture[]
}

type Props = {
  className?: string
  totalPopulation: TotalPopulation[]
  dispatch: Dispatch<Actions>
} & ContainerProps

const Home: React.FC<Props> = ({
  result,
  className,
  totalPopulation,
  dispatch,
}) => (
  <div className={className}>
    <h1>都道府県別の総人口推移グラフ</h1>
    <ContainerAppPrefectures
      prefectures={result}
      dispatch={dispatch}
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

  return (
    <StyledHome
      result={result}
      className="wrapper"
      totalPopulation={state}
      dispatch={dispatch}
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
