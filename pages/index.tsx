import { NextPage, GetStaticProps } from 'next';
import fetch from 'node-fetch';
import TopContainer, { TopContainerProps } from "../container/TopContainer";


const Page: NextPage<TopContainerProps> = ({ result }) => {
  return <TopContainer result={result} />;
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

export default Page;
