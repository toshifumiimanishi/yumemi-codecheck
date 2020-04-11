import { TopContainerProps } from '../../container/TopContainer';
import { TotalPopulation, Prefecture } from '../../interfaces';
import AppPrefectures from '../AppPrefectures';
import AppChart from '../AppChart';

export type HomeProps = {
  className?: string;
  totalPopulation: TotalPopulation[];
  fetchPopulationComposition: (prefecture: Prefecture) => void;
  removeTotalPopulation: (prefCode: number) => void;
} & TopContainerProps;

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

export default Home;
