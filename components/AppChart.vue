<template>
  <highcharts class="chart" :options="chartOptions"></highcharts>
</template>

<script>
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'

export default {
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
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          title: {
            text: '人口数'
          }
        },
        series: [
          {
            name: 'Kyoto',
            data: [15, 0, 8, 2, 6, 4, 5, 5, 4, 9, 10, 12],
          }
        ]
      }
    };
  }
};
</script>

<style>
.chart {
  margin-top: 36px;
}
</style>
