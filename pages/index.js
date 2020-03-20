import { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import styled from '@emotion/styled';
import AppPrefectures from '../components/AppPrefectures';
import AppChart from '../components/AppChart';

const Wrapper = styled.div`
  padding: 32px;
`;

const H1 = styled.h1`
  margin-bottom: 24px;
  font-size: 32px;
  text-align: center;
`;

function Home({ result }) {
  const [totalPopulation, setTotalPopulation] = useState([]);

  return (
    <Wrapper>
      <H1>都道府県別の総人口推移グラフ</H1>
      <AppPrefectures prefectures={result} totalPopulation={totalPopulation} setTotalPopulation={setTotalPopulation} />
      <AppChart totalPopulation={totalPopulation} useEffect={useEffect} />
    </Wrapper>
  );
}

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
