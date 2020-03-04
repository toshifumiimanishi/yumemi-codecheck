<template>
  <div class="wrapper">
    <h1>都道府県別の総人口推移グラフ</h1>
    <AppPrefectures :prefectures="prefectures" @check="fetchPopulationComposition" @uncheck="removeTotalPopulation" />
    <AppChart :total-population="totalPopulation" />
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
      prefectures: [],
      totalPopulation: []
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
  },

  methods: {
    async fetchPopulationComposition({ prefName, prefCode }) {
      const { result } = await this.$axios.$get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
        headers: {
         'X-API-KEY': process.env.API_KEY
        }
      });

      const totalPopulation = result.data[0];

      this.totalPopulation = [...this.totalPopulation, {
        prefName,
        prefCode,
        data: totalPopulation.data
      }];
    },

    removeTotalPopulation(prefCode) {
      const index = this.totalPopulation.findIndex(population => {
        return population.prefCode === prefCode;
      });

      this.totalPopulation.splice(index, 1);
    },
  }
};
</script>

<style>
.wrapper {
  padding: 32px;
}

h1 {
  font-size: 32px;
  margin-bottom: 24px;
  text-align: center;
}
</style>
