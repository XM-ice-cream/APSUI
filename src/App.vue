<template>
  <router-view></router-view>
</template>

<script lang="ts" setup name="app">
document.documentElement.style.fontSize = 50 * document.documentElement.clientWidth / 960 + 'px';
window.onresize = function () {
  document.documentElement.style.fontSize = 50 * document.documentElement.clientWidth / 960 + 'px'
}

</script>


<style>
#app {
  height: 100%;
  font-size: 12px;
   font-family: system-ui, -apple-system, Helvetica, Roboto, Tahoma, Arial, 'PingFang SC',
    'Noto Sans', 'Microsoft YaHei', sans-serif;
}
</style>
