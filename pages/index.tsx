import { useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import fetch from 'node-fetch';
import styled from '@emotion/styled';
import AppPrefectures from '../components/AppPrefectures';
import AppChart from '../components/AppChart';
import { Prefecture, TotalPopulation } from '../interfaces';

type ContainerProps = {
  result: Prefecture[];
};

type HomeProps = {
  className?: string;
  totalPopulation: TotalPopulation[];
  fetchPopulationComposition: (prefecture: Prefecture) => void;
  removeTotalPopulation: (prefCode: number) => void;
} & ContainerProps;

const Home: React.FC<HomeProps> = ({
  className,
  result,
  fetchPopulationComposition,
  removeTotalPopulation,
  totalPopulation,
}) => (
  <div className={className}>
    <h1>都道府県別の総人口推移グラフ</h1>
    <AppPrefectures
      prefectures={result}
      fetchPopulationComposition={fetchPopulationComposition}
      removeTotalPopulation={removeTotalPopulation}
    />
    <AppChart totalPopulation={totalPopulation} />
  </div>
);

const StyledHome = styled(Home)`
  > .wrapper {
    padding: 32px;
  }

  > h1 {
    margin-bottom: 24px;
    font-size: 32px;
    text-align: center;
  }
`

const Container: NextPage<ContainerProps> = ({ result }) => {
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
    const index = totalPopulation.findIndex((population) => {
      return population.prefCode === prefCode;
    });
    const newTotalPopulation = [...totalPopulation];

    newTotalPopulation.splice(index, 1);
    setTotalPopulation(newTotalPopulation);
  };

  return (
    <StyledHome
      {...{
        result,
        totalPopulation,
        fetchPopulationComposition,
        removeTotalPopulation,
      }}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
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

export default Container;
