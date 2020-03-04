<template>
  <div>
    <h1>都道府県別の総人口推移グラフ</h1>
    <AppPrefectures :prefectures="prefectures" />
    <AppChart />
  </div>
</template>

<script>
import AppPrefectures from '~/components/AppPrefectures.vue';
import AppChart from '~/components/AppChart.vue';

export default {
  components: {
    AppPrefectures,
    AppChart
  },
  data() {
    return {
      prefectures: []
    };
  },
  async asyncData({ app }) {
    const { result } = await app.$axios
      .$get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: {
          'X-API-KEY': process.env.API_KEY
        }
      });

    return { prefectures: result };
  }
};
</script>

<style>
h1 {
  font-size: 36px;
  margin-bottom: 24px;
  text-align: center;
}
</style>
