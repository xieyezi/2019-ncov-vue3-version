<template>
  <div ref="pie" class="pie"></div>
</template>

<script>
import { createComponent, watch } from '@vue/composition-api'
import Echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default createComponent({
  props: {
    virusDesc: Object
  },
  setup(props, context) {
    watch(async () => {
      const { virusDesc } = props
      const dataList = []
      const confirm = {
        name: '在诊人数',
        value: virusDesc.confirmedCount - virusDesc.deadCount - virusDesc.curedCount
      }
      const dead = {
        name: '死亡人数',
        value: virusDesc.deadCount
      }
      const cure = {
        name: '治愈人数',
        value: virusDesc.curedCount
      }
      dataList.push(confirm)
      dataList.push(dead)
      dataList.push(cure)
      const mychart = Echarts.init(context.refs.pie)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          data: ['在诊人数', '死亡人数', '治愈人数']
        },
        color: ['#e57471', '#919399', '#7ebe50'],
        series: [
          {
            name: '占比率',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: dataList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      mychart.setOption(option)
    })
  }
})
</script>

<style>
.pie{
    height: 300px;
}
</style>
