<template>
  <div :style="{color: color}" class="category">
      <p>{{title}}</p>
      <p>{{count}}例</p>
      <p><span class="tip">较昨日</span><span class="add">+{{addcount}}</span></p>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';

export default createComponent({
    name: 'Category',
    props:{
      title: {
          type: String,
          required: true
      },
      color: {
          type: String,
          required: true
      },
      addcount: {
          type: Number,
          required: true
      },
      count: {
          type: Number,
          required: true
      }
    }
})
</script>

<style>
.category{
    font-size: 14px;
    font-weight: 800;
    line-height: 16px;
}
.category p{
    margin-bottom: 5px;
}
.add{
    font-size: xx-small;
}
.category .tip{
    color: gray;
    font-size: xx-small;
}
</style>