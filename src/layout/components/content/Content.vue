<!-- 内容 -->
<script setup lang="ts" name="Content">

import { useUserStore } from '@/libs/store/userStore'

const store = useUserStore();



</script>

<template>
  <div class="content" :style="`background-color:${store.dark ? '#1d1e1f' : 'transparent'}`">
    <router-view v-slot="{ Component }">
        <transition name="router_animate">
            <keep-alive>
                <component :is="Component"/>
            </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.router_animate-enter-active {
    animation: slideInLeft 0.5s;
}
.router_animate-leave-active {
    animation: slideOutLeft 0.3s;
}
</style>
