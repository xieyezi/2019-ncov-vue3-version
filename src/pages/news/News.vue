<template>
  <Timeline>
    <TimelineItem v-for="item in newlist" :key="item.id">
      <div class="newsitem">
        <p>
          {{item.pubDate}}（{{ item.pubDateStr }}）
        </p>
        <Card>
          <p slot="title">
            {{item.title}}
          </p>
          <p class="newscontent">{{ item.summary }}</p>
          <div class="newsfooter">
            <p>
              地区:<span class="area">{{ item.provinceName }}</span>
            </p>
            <p>
              来源:<span class="origin">{{ item.infoSource }}</span>
            </p>
          </div>
        </Card>
      </div>
    </TimelineItem>
  </Timeline>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'News',
  props: {
    newlist: Array
  }
})
</script>

<style scoped>

.newsitem{
    margin-top: 30px;
    width: 100%;
    background-color: #fff;
}
.newscontent{
    overflow: hidden;
}
.newsfooter{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
}
.area{
    padding-left: 5px;
}
.origin{
    color: #6C63FF;
    padding-left: 5px;
}
</style>
