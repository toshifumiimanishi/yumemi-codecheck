<template>
  <highcharts class="chart" :options="chartOptions"></highcharts>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Highcharts, { Options } from 'highcharts';
import { Chart } from 'highcharts-vue';
import { TotalPopulation } from '~/types';

Highcharts.setOptions({
  lang: {
    numericSymbols: ['万', '億'],
    numericSymbolMagnitude: 10000
  },
});

export default Vue.extend({
  props: {
    totalPopulation: {
      type: Array as PropType<TotalPopulation[]>
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
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        xAxis: {
          title: {
            text: '年度（年）',
          },
          categories: []
        },
        yAxis: {
          title: {
            text: '人口数（人）'
          }
        },
        series: []
      } as Options
    };
  },

  methods: {
    updateCategoriesOnce() {
      const { xAxis } = this.chartOptions;

      if (xAxis && 'categories' in xAxis) {
        const isUpdated = xAxis.categories ? xAxis.categories.length > 0 : null;
        if (!isUpdated) {
          const totalPopulation = this.totalPopulation;

          totalPopulation.map(population => {
            const years = population.data.map(({ year }) => year);
            xAxis.categories = years as any;
          });
        }
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

      this.chartOptions.series = newSeries as any;
    }
  },

  watch: {
    totalPopulation() {
      this.updateCategoriesOnce();
      this.updateSeries();
    }
  }
});
</script>

<style>
.chart {
  margin-top: 36px;
}
</style>
