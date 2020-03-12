import fetch from 'node-fetch';
import AppPrefectures from '../components/AppPrefectures';

function Home({ result }) {
  return (
    <div>
      <AppPrefectures prefectures={result} />
    </div>
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
