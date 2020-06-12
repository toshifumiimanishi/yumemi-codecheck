import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'highcharts',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  public chartOptions: any = {
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
  }

  @Input() totalPopulation;

  constructor() {}

  ngOnInit() {
    Highcharts.chart('container', this.chartOptions)
  }

  ngOnChanges() {
    this.updateSeries()
    Highcharts.chart('container', this.chartOptions)
  }

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
}
