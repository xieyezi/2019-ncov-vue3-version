<template>
  <div ref="map" class="mapBox"></div>
</template>

<script>
import { createComponent, watch, ref } from '@vue/composition-api'
import { getChinaJson, getProvinceJson } from '@/services/getData'
import provinceMap from '@/map/province-map'
import Echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/tooltip'

export default createComponent({
  name: 'Map',
  props: {
    provinceName: String,
    mapList: Array
  },
  setup(props, context) {
    watch(async () => {
      const { provinceName, mapList } = props
      // console.log(provinceName)
      // console.log(mapList)
      const mychart = Echarts.init(context.refs.map)
      const province = provinceMap[provinceName]
      
      if (!province) {
        const chinaMapJson = await getChinaJson()
        Echarts.registerMap('china', chinaMapJson.data)
      } else {
        const provinceMapJson = await getProvinceJson(province)
        Echarts.registerMap(province, provinceMapJson.data)
      }
      const option = {
        tooltip: {
          show: true,
          formatter: function(params) {
            let tip = ''
            if (params.data) {
              tip =
                params.name +
                '：<br>确诊：' +
                params.data['value'] +
                '例<br>死亡：' +
                params.data['deadCount'] +
                '例<br>治愈：' +
                params.data['curedCount'] +
                '例'
            }
            return tip
          }
        },
        visualMap: {
          show: true,
          type: 'piecewise',
          min: 0,
          max: 2000,
          align: 'right',
          top: '2%',
          right: 0,
          left: 'center',
          inRange: {
            color: ['#ffc0b1', '#ff8c71', '#ef1717', '#9c0505']
          },
          pieces: [
            { min: 1000 },
            { min: 500, max: 999 },
            { min: 100, max: 499 },
            { min: 10, max: 99 },
            { min: 1, max: 9 }
          ],
          orient: 'horizontal',
          showLabel: true,
          padding: 5,
          text: ['高', '低'],
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10
          }
        },
        series: [
          {
            left: 'center',
            type: 'map',
            name: '确诊人数',
            // silent: province ? true : false,
            label: {
              show: true,
              position: 'inside',
              // margin: 8,
              fontSize: 6
            },
            mapType: province ? province : 'china',
            data: mapList,
            zoom: province ? 1.1 : 1.2,
            roam: false,
            showLegendSymbol: false,
            rippleEffect: {
              show: true,
              brushType: 'stroke',
              scale: 2.5,
              period: 4
            }
          }
        ]
      }
      mychart.setOption(option)
    })
  }
})
</script>

<style scoped>
.mapBox {
  height: 400px;
  width: 100%;
  background-color: #fff;
}
</style>
