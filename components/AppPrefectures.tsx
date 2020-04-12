import { Dispatch } from 'react'
import styled from '@emotion/styled'
import { Actions, Prefecture } from '../interfaces'
import { AddPrefecture, RemovePrefecture } from '../actions'

type ContainerProps = {
  prefectures: Prefecture[]
  dispatch: Dispatch<Actions>
}

type Props = {
  className?: string
  prefectures: Prefecture[]
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AppPrefectures: React.FC<Props> = ({
  className,
  prefectures,
  handleChange,
}) => (
  <section className={className}>
    <h2>都靓府県</h2>
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

const StyledAppPrefectures = styled(AppPrefectures)`
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
  }

  > ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, auto));
    gap: 24px;
  }
`

const ContainerAppPrefectures: React.FC<ContainerProps> = ({
  prefectures,
  dispatch,
}) => {
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
    <StyledAppPrefectures
      prefectures={prefectures}
      handleChange={handleChange}
    />
  )
}

export default ContainerAppPrefectures
