import { Flex, VStack } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { StatsIndicator } from 'presentation/components/Stats/StatsIndicator'
import { useWeeklyEarnings } from 'presentation/hooks/useWeeklyEarnings'
require('dayjs/locale/pt-br')

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const lastSevenDaysName: Array<string> = []

dayjs.locale('pt-br')

for (let index = 6; index > -1; index--) {
  const dayName = dayjs().subtract(index, 'days').locale('pt').format('dddd')

  if (index === 0) {
    lastSevenDaysName.push(dayName + ' (hoje)')
  } else {
    lastSevenDaysName.push(dayName)
  }
}

export const lineAreaChartOptionsTotalSpent: ApexOptions = {
  chart: {
    type: 'area',
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: '#4318FF',
    },
  },
  colors: ['#4318FF', '#39B8FF'],
  markers: {
    size: 0,
    colors: 'white',
    strokeColors: '#7551FF',
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: 'dark',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    categories: lastSevenDaysName,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
  legend: {
    show: false,
  },
}

export function FinanceCard() {
  const { data: weeklyEarnings } = useWeeklyEarnings()

  const seriesIncomes = [
    {
      name: 'Faturamento',
      data: weeklyEarnings?.incomes ?? [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Despesas',
      data: weeklyEarnings?.outcomes ?? [0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]

  return (
    <Flex
      bg="white"
      align="center"
      justify="space-between"
      w="100%"
      borderRadius={12}
    >
      <Chart
        height="100%"
        w="120%"
        type="area"
        options={lineAreaChartOptionsTotalSpent}
        series={seriesIncomes}
      />
      <VStack align="start" px={2}>
        {weeklyEarnings ? (
          <StatsIndicator
            label="Faturamento diário"
            stat={weeklyEarnings.incomes[6]}
            newValue={[weeklyEarnings.incomes[6]]}
            oldValue={[weeklyEarnings.incomes[5]]}
          />
        ) : (
          <StatsIndicator
            label="Sem dados"
            stat={0}
            newValue={[0]}
            oldValue={[0]}
          />
        )}
      </VStack>
    </Flex>
  )
}
