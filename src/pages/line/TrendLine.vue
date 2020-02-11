<template>
  <div ref="trendline" class="line"></div>
</template>

<script>
import Echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import { createComponent, watch } from '@vue/composition-api'

export default createComponent({
  props: {
    dateList: Array,
    firstList: Array,
    secondList: Array,
    legendData: Array,
    firstColor: String,
    secondColor: String
  },
  setup(props, context) {
    watch(async () => {
      const { dateList, firstList, secondList, legendData, firstColor, secondColor } = props
      const mychart = Echarts.init(context.refs.trendline)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          data: legendData
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dateList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: legendData[0],
            type: 'line',
            stack: '总量',
            itemStyle: {
              normal: {
                color: firstColor,
                lineStyle: {
                  color: firstColor
                }
              }
            },
            data: firstList
          },
          {
            name: legendData[1],
            type: 'line',
            stack: '总量',
            itemStyle: {
              normal: {
                color: secondColor,
                lineStyle: {
                  color: secondColor
                }
              }
            },
            data: secondList
          }
        ]
      }
      mychart.setOption(option)
    })
  }
})
</script>

<style>
.line{
    height: 300px;
}
</style>
