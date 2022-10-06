<!-- 子菜单 -->
<script setup lang="ts" name="MenuItem">
import { toRefs } from "vue"
import { useUserStore } from '@/libs/store/userStore'
const props =  defineProps({
    index: {
        type: String,
        default: "",
    },
    item: {
        type: Object,
        default: {},
    },
    collapse: {
        type: Boolean,
        default:false,
    },
})
const {index,item,collapse} = toRefs(props) //具有响应式 指针指向props下面对应的属性值

const store = useUserStore();

const getItemMenuStyle = () => {
    return store.dark && 'background-color:#282829'
}
</script>

<template>
  <el-sub-menu v-if="item.children && item.children.length >= 1" :index="index + Date.now()">
    <template #title>
      <!-- <el-icon>
        <component :is="item.icon"></component>
      </el-icon> -->
      <span v-show="!collapse"> {{ item.title }}</span>
    </template>
    <div v-for="(c, i) of item.children" :key="i">
      <menu-item :index="(i + 1).toString()" :item="c"></menu-item>
    </div>
  </el-sub-menu>


  <el-menu-item :style="getItemMenuStyle()" v-else-if="item.children && item.children.length === 1"
    :index="item.children[0].path">
    <!-- <el-icon>
      <component :is="item.children[0].icon"></component>
    </el-icon> -->
    <template #title> {{ item.children[0].title }}</template>
  </el-menu-item>

  <el-menu-item :style="getItemMenuStyle()" v-else-if="item && item.pid !== 0" :index="item.path">
    <!-- <el-icon>
      <component :is="item.icon"></component>
    </el-icon> -->
    <template #title>{{ item.title }}</template>
  </el-menu-item>
</template>


<style lang="scss" scoped>
.el-sub-menu.is-active{
 background-color: #6730db !important;
    width: 90%;
    margin: 0 auto;
    border-radius: 0.4rem;
}

:deep(.el-menu--inline) {
  background-color: #000c17;
}


</style>
