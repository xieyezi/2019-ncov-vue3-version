<template>
  <div id="app">
    <Home />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import Home from '@/pages/home/Home.vue'

export default createComponent({
  components: {
    Home
  }
})
</script>

<style>
div,
p {
  margin: 0;
}
body {
  margin: 0;
  background: #fff;
}
.ivu-tabs-mini .ivu-tabs-bar .ivu-tabs-tab {
  margin-right: 0;
  padding: 8px 16px;
  font-size: 15px;
}
.ivu-tabs-mini .ivu-tabs-nav .ivu-tabs-tab-active {
  color: #6c63ff;
}
.ivu-tabs-mini .ivu-tabs-nav .ivu-tabs-tab:hover {
  color: #6c63ff;
}
.ivu-tabs-mini .ivu-tabs-ink-bar {
  background-color: #6c63ff;
}
.ivu-select {
  text-align: start;
}
</style>
