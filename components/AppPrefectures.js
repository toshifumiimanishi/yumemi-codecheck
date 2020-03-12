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

function AppPrefectures({ prefectures }) {

  return (
    <PrefectureContainer>
      <PrefectureHeading>都道府県</PrefectureHeading>
      <PrefectureList>
        {
          prefectures.map(prefecture => (
            <li key={prefecture.prefCode}>
              <label>
                <input type="checkbox" />
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
