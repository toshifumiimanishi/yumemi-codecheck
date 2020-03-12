import styled from '@emotion/styled';

const Section = styled.section`
  margin: auto;
  width: 100%;
  max-width: 960px;
`;

const H2 = styled.h2`
  display: inline-block;
  margin-bottom: 24px;
  padding: 0 8px;
  font-size: 24px;
  background-color: #000;
  color: #fff;
`;

const List = styled.li`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, auto));
  gap: 24px;
`;

const AppPrefectures = () => (
  <Section>
    <H2>都道府県</H2>
    <ul>
      <List>
        <label>
          <input type="checkbox" />
        </label>
      </List>
    </ul>
  </Section>
);

export default AppPrefectures;
