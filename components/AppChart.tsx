import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { TotalPopulation } from '../interfaces';

type Props = {
  totalPopulation: TotalPopulation[]
};

const AppChart: React.FC<Props> = ({ totalPopulation }) => {
  const [options, setOptions] = useState({
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
  });

  const initializeHighcharts = () => {
    const newOptions = {...options};
    const { xAxis } = newOptions;
    const isInitialized = xAxis.categories.length > 0;

    if (!isInitialized) {
      Highcharts.setOptions({
        lang: {
          numericSymbols: ['万', '億'],
          numericSymbolMagnitude: 10000
        },
      });

      totalPopulation.map(population => {
        const years = population.data.map(({ year }) => year);

        xAxis.categories = years;
        setOptions(newOptions);
      });
    }
  };

  const updateSeries = () => {
    const newOptions = {...options};
    const newSeries = totalPopulation.map(population => {
      const data = population.data.map(({ value }) => value);

      return {
        name: population.prefName,
        data
      }
    });

    newOptions.series = newSeries;
    setOptions(newOptions);
  };

  useEffect(() => {
    initializeHighcharts();
    updateSeries();
  }, [totalPopulation]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default AppChart;
