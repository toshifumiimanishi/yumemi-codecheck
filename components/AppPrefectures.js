import fetch from 'node-fetch';
import styled from '@emotion/styled';

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

function AppPrefectures({ prefectures, totalPopulation, setTotalPopulation }) {

  const fetchPopulationComposition = async ({ prefName, prefCode }) => {
    const res = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          'X-API-KEY': process.env.RESAS_API_KEY
        }
      }
    );
    const { result } = await res.json();
    const newTotalPopulation = result.data[0];

    setTotalPopulation([...totalPopulation, {
      prefName,
      prefCode,
      data: newTotalPopulation.data
    }]);
  };

  const removeTotalPopulation = (prefCode) => {
    const index = totalPopulation.findIndex(population => {
      return population.prefCode === prefCode;
    });
    const newTotalPopulation = [...totalPopulation];

    newTotalPopulation.splice(index, 1);
    setTotalPopulation(newTotalPopulation);
  };

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
