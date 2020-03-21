import styled from '@emotion/styled';
import { Prefecture } from '../interfaces';

const PrefectureContainer = styled.section`
  margin: auto;
  width: 100%;
  max-width: 960px;
`;

const PrefectureHeading = styled.h2`
  display: inline-block;
  margin-bottom: 24px;
  padding: 0 8px;
  font-size: 24px;
  background-color: #000;
  color: #fff;
`;

const PrefectureList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, auto));
  gap: 24px;
`;

type Props = {
  prefectures: Prefecture[],
  fetchPopulationComposition: (prefecture: Prefecture) => void,
  removeTotalPopulation: (prefCode: number) => void
};

const AppPrefectures: React.FC<Props> = ({ prefectures, fetchPopulationComposition, removeTotalPopulation }) => {
  const handleChange = (event) => {
    const prefName = event.currentTarget.name;
    const prefCode = event.currentTarget.value;
    const isChecked = event.currentTarget.checked;

    if (isChecked) {
      fetchPopulationComposition({ prefName, prefCode });
    } else {
      removeTotalPopulation(prefCode);
    }
  };

  return (
    <PrefectureContainer>
      <PrefectureHeading>都道府県</PrefectureHeading>
      <PrefectureList>
        {
          prefectures.map(prefecture => (
            <li key={prefecture.prefCode}>
              <label>
                <input type="checkbox" value={prefecture.prefCode} name={prefecture.prefName} onChange={handleChange} />
                {prefecture.prefName}
              </label>
            </li>
          ))
        }
      </PrefectureList>
    </PrefectureContainer>
  )
};

export default AppPrefectures;
