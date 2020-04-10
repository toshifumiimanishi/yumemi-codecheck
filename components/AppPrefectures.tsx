import styled from '@emotion/styled';
import { Prefecture } from '../interfaces';

type ContainerProps = {
  prefectures: Prefecture[],
  fetchPopulationComposition: (prefecture: Prefecture) => void,
  removeTotalPopulation: (prefCode: number) => void
};

type Props = {
  className?: string,
  prefectures: Prefecture[],
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const AppPrefectures: React.FC<Props> = ({
  className,
  prefectures,
  handleChange
}) => (
  <section className={className}>
    <h2>都道府県</h2>
    <ul>
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
    </ul>
  </section>
);

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
  fetchPopulationComposition,
  removeTotalPopulation
}) => {
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
    <StyledAppPrefectures
      prefectures={prefectures}
      handleChange={handleChange}
    />
  )
};

export default ContainerAppPrefectures;
