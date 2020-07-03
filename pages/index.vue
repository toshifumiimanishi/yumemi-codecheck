<template>
  <div class="wrapper">
    <h1>都道府県別の総人口推移グラフ</h1>
    <AppPrefectures :prefectures="prefectures" @check="fetchPopulationComposition" @uncheck="removeTotalPopulation" />
    <AppChart :total-population="totalPopulation" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppPrefectures from '~/components/AppPrefectures.vue';
import AppChart from '~/components/AppChart.vue';
import { Prefecture, TotalPopulation } from '~/types';

export default Vue.extend({
  components: {
    AppPrefectures,
    AppChart
  },

  data() {
    return {
      prefectures: [] as Array<Prefecture>,
      totalPopulation: [] as Array<TotalPopulation>
    };
  },

  async asyncData({ app }) {
    const { result } = await app.$axios
      .$get('/prefectures', {
        headers: {
          'X-API-KEY': process.env.RESAS_API_KEY
        }
      });

    return { prefectures: result };
  },

  methods: {
    async fetchPopulationComposition({ prefName, prefCode }: Prefecture) {
      const { result } = await this.$axios.$get(`/population/composition/perYear?prefCode=${prefCode}`, {
        headers: {
         'X-API-KEY': process.env.RESAS_API_KEY
        }
      });

      const totalPopulation = result.data[0];

      this.totalPopulation = [...this.totalPopulation, {
        prefName,
        prefCode,
        data: totalPopulation.data
      }];
    },

    removeTotalPopulation(prefCode: Prefecture['prefCode']) {
      const index = this.totalPopulation.findIndex(population => {
        return population.prefCode === prefCode;
      });

      this.totalPopulation.splice(index, 1);
    },
  }
});
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
