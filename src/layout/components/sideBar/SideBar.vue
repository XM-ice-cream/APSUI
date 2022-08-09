<template>
  <div class="side-bar">
    <el-menu router :collapse="store.collapse" :default-active="current" active-text-color="#fff"
      :background-color="`${store.dark ? '#1d1e1fbd' : '#7b41f2'}`" @select="selectMenu"
      :class="`el-menu-vertical-demo ${store.collapse && 'hideIcon'}`" style="height: 100vh" text-color="#ffffffa6">
      <div class="logo">
        <span class="menu-collapse" @click="changeCollapse">
        <el-icon>
          <Fold v-if="!store.collapse" />
          <Expand v-else />
        </el-icon>
      </span>
        <!-- <el-avatar :size="35" :src="Logo" /> -->
        <span v-if="!store.collapse">&nbsp;APS</span>
      </div>
      <el-menu-item index="/index/home">
        <el-icon>
          <List />
        </el-icon>
        <template #title>首页</template>
      </el-menu-item>
       <el-menu-item index="/goods/goodsList">
        <el-icon>
          <List />
        </el-icon>
        <template #title>Goods</template>
      </el-menu-item>
      <el-menu-item index="/maintenance/base-info">
        <el-icon>
          <List />
        </el-icon>
        <template #title>基础信息</template>
      </el-menu-item>
      <!-- <div v-for="(item, index) of store.userRouters" :key="index">
        <MenuItem :index="(index + 1).toString()" :collapse="store.collapse" :item="item" />
      </div> -->
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import MenuItem from "../MenuItem/MenuItem.vue";
import { defineComponent, computed, ref } from "vue";
import { useUserStore } from "@/libs/store/userStore";
export default defineComponent({
  name: "SideBar",
  components: {
    MenuItem,
  },
  setup() {
    const store = useUserStore();
    const router = useRouter();
    const activatedStyle = ref<string>(router.currentRoute.value.path);
    const Logo: string = "https://q1.qlogo.cn/g?b=qq&nk=1942847253&s=100";
    const selectMenu = (index: string) => {
      activatedStyle.value = index;
    };
     const changeCollapse = () => {
      store.collapse = !store.collapse;
    };
    return {
      store,
      current: computed(() => router.currentRoute.value.path),
      selectMenu,
      activatedStyle,
      Logo,
      changeCollapse,
    };
  },
});
</script>

<style scoped lang="scss">
.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  color: #1d1e1fbd;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border-radius: 0 0.4rem 0.4rem 0 !important;
}

.el-menu--collapse {
  width: 60px;
  overflow: hidden;
}

.hideIcon:deep(.el-sub-menu .el-sub-menu__icon-arrow) {
  display: none;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 48px;
  padding: 10px 4px 10px 5px;

  span {
    font-size: 18px;
    margin-left: 12px;
    font-weight: 700;
    line-height: normal;
    color: #fff;
    transition: all 0.5s ease;
  }
   .menu-collapse {
        padding-left: 8px;
        font-size: 20px;
        color: #fffcfc;
        cursor: pointer;       
        
    }

    .menu-collapse:hover {
        background-color: #d7d7d748;
    }
}

.avatar-logo {
  padding: 10px 0 5px 10px;
}

.el-menu-item.is-active {  
    width: 97%;
    margin: 0 auto;
    padding-left: 0.15rem !important;
    background-color: #6730db !important;
    border-radius: 0.4rem;
}
:deep(.el-menu-item:hover) {
   width: 97%;
    margin: 0 auto;
    padding-left: 0.15rem !important;
    background-color: #6730db !important;
    border-radius: 0.4rem;
}
:deep(.el-menu){
    --el-menu-item-height: 40px;
}
</style>
