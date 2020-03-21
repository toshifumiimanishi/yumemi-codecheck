import { useState } from 'react';
import fetch from 'node-fetch';
import styled from '@emotion/styled';
import AppPrefectures from '../components/AppPrefectures';
import AppChart from '../components/AppChart';
import { Prefecture } from '../interfaces';

const Wrapper = styled.div`
  padding: 32px;
`;

const H1 = styled.h1`
  margin-bottom: 24px;
  font-size: 32px;
  text-align: center;
`;

type Props = {
  result: Prefecture[]
};

const Home: React.FC<Props> = ({ result }) => {
  const [totalPopulation, setTotalPopulation] = useState([]);

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

  return (
    <Wrapper>
      <H1>都道府県別の総人口推移グラフ</H1>
      <AppPrefectures prefectures={result} fetchPopulationComposition={fetchPopulationComposition} removeTotalPopulation={removeTotalPopulation} />
      <AppChart totalPopulation={totalPopulation} />
    </Wrapper>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    {
      headers: {
        'X-API-KEY': process.env.RESAS_API_KEY
      }
    }
  );
  const { result } = await res.json();

  return {
    props: {
      result
    }
  };
}

export default Home;
