<!-- 内容 -->
<script setup lang="ts" name="Content">
import { useUserStore } from '@/libs/store/userStore'

const store = useUserStore();



</script>

<template>
  <div class="content" :style="`background-color:${store.dark ? '#1d1e1f' : 'transparent'}`">
    <router-view v-slot="{ Component }">
        <keep-alive>
             <transition>
                <component :is="Component" />
             </transition>
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
</style>
