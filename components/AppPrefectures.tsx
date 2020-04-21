import { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { Prefecture } from '../interfaces'
import { AddPrefecture, RemovePrefecture } from '../actions'
import AppContext from '../contexts/AppContext'

type ContainerProps = {
  prefectures: Prefecture[]
}

type Props = {
  className?: string
  prefectures: Prefecture[]
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AppPrefecturesDOM: React.FC<Props> = ({
  className,
  prefectures,
  handleChange,
}) => (
  <section className={className}>
    <h2>都道府県</h2>
    <ul>
      {prefectures.map((prefecture) => (
        <li key={prefecture.prefCode}>
          <label>
            <input
              type="checkbox"
              value={prefecture.prefCode}
              name={prefecture.prefName}
              onChange={handleChange}
            />
            {prefecture.prefName}
          </label>
        </li>
      ))}
    </ul>
  </section>
)

const PresentationalAppPrefectures = styled(AppPrefecturesDOM)`
  margin: auto;
  width: 100%;
  max-width: 960px;

  > h2 {
    display: inline-block;
    margin-bottom: 24px;
    padding: 0 8px;
    font-size: 24px;
    background-color: #000;
    color: #fff;

    @media screen and (max-width: 767.8px) {
      font-size: 16px;
    }
  }

  > ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, auto));
    gap: 24px;

    @media screen and (max-width: 767.8px) {
      grid-template-columns: repeat(auto-fill, minmax(80px, auto));
      font-size: 12px;
    }
  }
`

const ContainerAppPrefectures: React.FC<ContainerProps> = ({ prefectures }) => {
  const { dispatch } = useContext(AppContext)

  // Responsive Web Design
  //
  // const [mediaQuery, setMediaQuery] = useState(() => {
  //   if (typeof window !== 'undefined') {
  //     return {
  //       screen: window.innerWidth >= 768 ? 'medium' : 'small',
  //     }
  //   } else {
  //     return {
  //       screen: null,
  //     }
  //   }
  // })

  // useEffect(() => {
  //   const mq = window.matchMedia('(min-width: 768px)')
  //   const handleChangeMediaQuery = (mq) => {
  //     if (mq.matches) {
  //       setMediaQuery({ screen: 'medium' })
  //     } else {
  //       setMediaQuery({ screen: 'small' })
  //     }
  //   }
  //   mq.addListener(handleChangeMediaQuery)
  // }, [])

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

    return {
      prefName,
      prefCode,
      data: newTotalPopulation.data,
    }
  }

  const handleChange = async (event) => {
    const prefName = event.currentTarget.name
    const prefCode = event.currentTarget.value
    const isChecked = event.currentTarget.checked

    if (isChecked) {
      const populationComposition = await fetchPopulationComposition({
        prefName,
        prefCode,
      })
      dispatch(AddPrefecture(populationComposition))
    } else {
      dispatch(RemovePrefecture(prefCode))
    }
  }

  return (
    <PresentationalAppPrefectures
      prefectures={prefectures}
      handleChange={handleChange}
    />
  )
}

const AppPrefectures = ContainerAppPrefectures

export default AppPrefectures
