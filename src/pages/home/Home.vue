<template>
  <div>
    <div class="top">
      <p class="title">新型冠状病毒肺炎疫情</p>
      <p class="tip">实时动态</p>
    </div>
    <Tabs value="name1" size="small" @on-click="tabChange" :animated="false">
      <TabPane label="疫情地图" name="name1" class="map">
        <span class="allCountry">全国</span>
        <span>截至{{ state.virusDesc.modifyTime }}(北京时间)</span>
        <div class="categoryBox">
          <Category
            :title="'确诊'"
            :count="state.virusDesc.confirmedCount"
            :addcount="state.virusDesc.confirmedIncr"
            :color="'#e57471'"
          />
          <Category
            :title="'疑似'"
            :count="state.virusDesc.suspectedCount"
            :addcount="state.virusDesc.suspectedIncr"
            :color="'#dda451'"
          />
          <Category
            :title="'重症'"
            :count="state.virusDesc.seriousCount"
            :addcount="state.virusDesc.seriousIncr"
            :color="'#5d4037'"
          />
          <Category
            :title="'死亡'"
            :count="state.virusDesc.deadCount"
            :addcount="state.virusDesc.deadIncr"
            :color="'#919399'"
          />
          <Category
            :title="'治愈'"
            :count="state.virusDesc.curedCount"
            :addcount="state.virusDesc.curedIncr"
            :color="'#7ebe50'"
          />
        </div>
        <Divider />
        <div>
          <p>各省最新疫情查询（点击选择具体省份）：</p>
          <Select v-model="state.provinceName" style="width:90%;" @on-change="selectChange">
            <Option v-for="item in state.provinceList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </div>
        <div class="mapContainer">
          <Map :provinceName="state.provinceName" :mapList="state.mapList" />
        </div>
        <div class="table">
          <Table :columns="tablecolum.columns" :data="state.mapList"></Table>
        </div>
      </TabPane>
      <TabPane label="最新消息" name="name2">
        <div class="newsBox">
          <News :newlist="state.newsList" />
        </div>
      </TabPane>
      <TabPane label="辟谣信息" name="name3">标签三的内容</TabPane>
      <TabPane label="疫情趋势" name="name4">标签四的内容</TabPane>
    </Tabs>
    <!-- <div class="footer">
      <p>武汉加油呀~</p>
      <a href="http://www.beian.miit.gov.cn/" target="view_window">
        渝ICP备17013916号
      </a>
      <a href="https://github.com/xieyezi/2019-ncov-vue3-version" target="view_window">
        Github
      </a>
    </div> -->
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { createComponent, onMounted, onUnmounted, reactive } from '@vue/composition-api'
import { getVirusDataOnTime, getVirusDataStatic, getRumor, getTrend } from '@/services/getData'
import { getMapData, getMapProvinceData } from '@/utils/getMapData'
import Category from '@/components/category/Category.vue'
import Map from '@/pages/map/Map.vue'
import News from '@/pages/news/News.vue'

export interface HomeState {
  newsList?: []
  caseList?: []
  staticList: []
  mapList: []
  rumorList: []
  dateList: []
  confirmedTrendList: []
  suspectedTrendList: []
  deadTrendList: []
  curedTrendList: []
  provinceList: []
  virusDesc?: {
    confirmedCount: number
    suspectedCount: number
    deadCount: number
    curedCount: number
    seriousCount: number
    seriousIncr: number
    modifyTime: number | string
    note1: string
    note2: string
    note3: string
    remark1: string
    remark2: string
    confirmedIncr: number
    suspectedIncr: number
    deadIncr: number
    curedIncr: number
  }
  provinceName?: string
  tabIndex: number
  loading: boolean
  trendLoading: boolean
}

export default createComponent({
  name: 'Home',
  components: {
    Category,
    Map,
    News
  },
  setup() {
    const origin: HomeState = {
      newsList: [],
      caseList: [],
      virusDesc: {
        confirmedCount: 0,
        suspectedCount: 0,
        deadCount: 0,
        curedCount: 0,
        seriousCount: 0,
        modifyTime: 0,
        note1: '',
        note2: '',
        note3: '',
        remark1: '',
        remark2: '',
        confirmedIncr: 0,
        suspectedIncr: 0,
        deadIncr: 0,
        curedIncr: 0,
        seriousIncr: 0
      },
      staticList: [],
      mapList: [],
      rumorList: [],
      provinceName: '全国', //是否点击了某个省份
      tabIndex: 0,
      dateList: [],
      confirmedTrendList: [],
      suspectedTrendList: [],
      deadTrendList: [],
      curedTrendList: [],
      provinceList: [],
      loading: true,
      trendLoading: true
    }
    const state = reactive(origin)
    const tablecolum = reactive({
      columns: [
        {
          title: '地区',
          key: 'name'
        },
        {
          title: '确诊',
          key: 'confirmedCount'
        },
        {
          title: '死亡',
          key: 'deadCount'
        },
        {
          title: '治愈',
          key: 'curedCount'
        }
      ]
    })
    // methods
    const initData = async () => {
      const res = await getVirusDataOnTime()
      if (res.status === 200) {
        // console.log(res.data.newslist)
        const { news, desc } = res.data.newslist[0]
        desc.modifyTime = dayjs(desc.modifyTime).format('YYYY年MM月DD日 HH:mm')
        news.forEach((item: any) => {
          item.pubDate = dayjs(item.pubDate).format('YYYY年MM月DD日 HH:mm')
        })
        state.newsList = news
        state.virusDesc = desc
      }
      const resuslt = await getVirusDataStatic()
      if (resuslt.status === 200) {
        // console.log(resuslt)
        const { newslist } = resuslt.data
        const maplist = getMapData(newslist)
        const provinceArr = [] as any
        provinceArr.push('全国')
        maplist.forEach((item: any) => {
          provinceArr.push(item.provinceShortName)
        })
        state.staticList = newslist
        state.mapList = maplist
        state.provinceList = provinceArr
        state.loading = false
        //state.virusDesc.modifyTime = dayjs(state.virusDesc.modifyTime).format('YYYY年MM月DD日 HH:mm')
        // console.log(state)
      }
    }
    const tabChange = (tabName: string) => {
      console.log(tabName)
    }
    const selectChange = (province: string) => {
      let cites: [] = []
      let provinceName
      for (const item of state.staticList as any) {
        if (province === item.provinceShortName) {
          cites = item.cities
          provinceName = item.provinceName
          break
        }
      }
      if (cites.length !== 0) {
        const maplist = getMapProvinceData(cites, provinceName)
        // console.log(maplist)
        state.mapList = maplist
        state.provinceName = province
      } else {
        const maplist = getMapData(state.staticList)
        state.mapList = maplist
        state.provinceName = '全国'
      }
    }
    // 生命周期部分
    onMounted(() => {
      // console.log('onMounted...')
      initData()
      console.log(state)
    })
    onUnmounted(() => {
      console.log('onUnmounted...')
    })

    return {
      state,
      tablecolum,
      tabChange,
      selectChange
    }
  }
})
</script>

<style scoped>
.top {
  background-image: url('https://cdn.xieyezi.com/nvov.jpg');
  height: 150px;
  width: 100%;
  background-size: cover;
  text-align: center;
  line-height: 36px;
}
.title {
  font-size: 24px;
  color: #fff;
  font-weight: 500;
  padding-top: 10%;
}
.tip {
  font-size: 16px;
  color: #fff;
  font-weight: 400;
  margin-top: 10px;
}
.map {
  text-align: center;
  font-size: 13px;
  color: gray;
  background-color: #fff;
}
.categoryBox {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 8px;
}
.allCountry {
  background-color: #6c63ff;
  display: inline-block;
  width: 30px;
  height: 15px;
  color: #fff;
  font-size: 12px;
}
.mapContainer {
  height: 400px;
}
.table {
  height: 100%;
  margin-bottom: 20px;
}
.newsBox {
  width: 90%;
  margin: 0 auto;
  background: #fff;
}
.footer {
  padding-bottom: 20px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 12px;
  color: #6c63ff;
  line-height: 14px;
}
.footer a {
  color: #6c63ff;
}
</style>
