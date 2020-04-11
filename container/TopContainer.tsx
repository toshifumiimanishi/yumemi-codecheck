import { useState } from 'react';
import { NextPage } from 'next';
import { Prefecture } from '../interfaces';
import { StyledHome } from '../components/Top/styles';

export type TopContainerProps = {
  result: Prefecture[];
};

const TopContainer: NextPage<TopContainerProps> = ({ result }) => {
  const [totalPopulation, setTotalPopulation] = useState([]);

  const fetchPopulationComposition = async ({ prefName, prefCode }) => {
    const res = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          'X-API-KEY': process.env.RESAS_API_KEY,
        },
      }
    );
    const { result } = await res.json();
    const newTotalPopulation = result.data[0];

    setTotalPopulation([
      ...totalPopulation,
      {
        prefName,
        prefCode,
        data: newTotalPopulation.data,
      },
    ]);
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

export default TopContainer;
