<template>
  <Carousel v-model="index" autoplay :radius-dot="true" :autoplay-speed="5000" loop>
    <CarouselItem v-for="item in rumorList" :key="item.id">
      <Card style="height: 400px;">
        <div>
          <img :src="item.imgsrc" style="height:200px;width=100%;opacity: 0.8;" />
          <div class="roumorcontent">
            <p class="romortitle">{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </div>
        </div>
        <img class="roumorimg" v-if="item.explain === '谣言' || item.explain === '伪科学' || item.explain === '有失实'" src="https://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/badge-big@2x.5395c013.png" alt="谣言">
        <img class="roumorimg" v-if="item.explain === '尚无定论'" src="https://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/badge-y-big@2x.c0fd84da.png" alt="尚无定论">
      </Card>
    </CarouselItem>
  </Carousel>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  name: 'Rumor',
  props: {
    rumorList: Array
  },
  setup() {
    const index = ref(0)
    return {
      index
    }
  }
})
</script>

<style>
.roumorcontent {
  padding: 24px;
}
.romortitle {
  font-size: 16px;
  color: #37474f;
  font-weight: 400;
}
.roumorimg{
    position: absolute;
    width: 150px;
    height: 150px;
    top:5%;
    left: 28%;
}
</style>
