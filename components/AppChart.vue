<template>
  <highcharts class="chart" :options="chartOptions"></highcharts>
</template>

<script>
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'

export default {
  props: {
    totalPopulation: {
      type: Array
    }
  },

  components: {
    highcharts: Chart
  },

  data() {
    return {
      chartOptions: {
        chart: {
          type: 'spline'
        },
        title: {
          text: '都道府県別の総人口推移グラフ'
        },
        xAxis: {
          title: {
            text: '年度',
          },
          categories: []
        },
        yAxis: {
          title: {
            text: '人口数'
          }
        },
        series: []
      }
    };
  },

  methods: {
    updateCategoriesOnce() {
      const { xAxis } = this.chartOptions;
      const isUpdated = xAxis.categories.length > 0;

      if (!isUpdated) {
        const totalPopulation = this.totalPopulation;

        totalPopulation.map(population => {
          const years = population.data.map(({ year }) => year);

          xAxis.categories = years;
        });
      }
    },

    updateSeries() {
      const totalPopulation = this.totalPopulation;
      const newSeries = totalPopulation.map(population => {
        const data = population.data.map(({ value }) => value);

        return {
          name: population.prefName,
          data
        }
      })

      this.chartOptions.series = newSeries;
    }
  },

  watch: {
    totalPopulation() {
      this.updateCategoriesOnce();
      this.updateSeries();
    }
  }
};
</script>

<style>
.chart {
  margin-top: 36px;
}
</style>
