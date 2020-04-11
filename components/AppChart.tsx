import { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { TotalPopulation } from '../interfaces'

type ContainerProps = {
  totalPopulation: TotalPopulation[]
}

type Props = {
  options: {}
}

const AppChart: React.FC<Props> = ({ options }) => (
  <HighchartsReact highcharts={Highcharts} options={options} />
)

const ContainerAppChart: React.FC<ContainerProps> = ({ totalPopulation }) => {
  const [options, setOptions] = useState({
    chart: {
      type: 'spline',
    },
    title: {
      text: '都道府県別の総人口推移グラフ',
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    xAxis: {
      title: {
        text: '年度（年）',
      },
      categories: [],
    },
    yAxis: {
      title: {
        text: '人口数（人）',
      },
    },
    series: [],
  })

  const initializeHighcharts = () => {
    const newOptions = { ...options }
    const { xAxis } = newOptions

    Highcharts.setOptions({
      lang: {
        numericSymbols: ['万', '億'],
        numericSymbolMagnitude: 10000,
      },
    })

    totalPopulation.map((population) => {
      const years = population.data.map(({ year }) => year)

      xAxis.categories = years
      setOptions(newOptions)
    })
  }

  const updateSeries = () => {
    const newOptions = { ...options }
    const newSeries = totalPopulation.map((population) => {
      const data = population.data.map(({ value }) => value)

      return {
        name: population.prefName,
        data,
      }
    })

    newOptions.series = newSeries
    setOptions(newOptions)
  }

  useEffect(() => {
    updateSeries()
  }, [totalPopulation])

  useEffect(() => {
    initializeHighcharts()
  }, [])

  return <AppChart options={options} />
}

export default ContainerAppChart
