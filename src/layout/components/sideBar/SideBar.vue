<!-- 侧边栏 -->
<script setup lang="ts" name="SideBar">
import { useRouter } from "vue-router";
import MenuItem from "../MenuItem/MenuItem.vue";
import { computed, ref } from "vue";
import { useUserStore } from "@/libs/store/userStore";

const store = useUserStore();
const router = useRouter();
const current= computed (() => { 
    return router.currentRoute.value.path
}) 
const activatedStyle = ref<string>(router.currentRoute.value.path);
const Logo: string = "https://q1.qlogo.cn/g?b=qq&nk=1942847253&s=100";
const selectMenu = (index: string) => {
    activatedStyle.value = index;
};
const changeCollapse = () => {
    store.collapse = !store.collapse;
};
</script>

<template>
  <div class="side-bar">
    <el-menu router :collapse="store.collapse" :default-active="current" active-text-color="#fff"
      :background-color="`${store.dark ? '#1d1e1fbd' : '#7c40f1'}`" @select="selectMenu"
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
      <div class="menu-item">
        <el-menu-item index="/index/home">
            <el-icon><HomeFilled /></el-icon>
            <template #title>首页</template>
        </el-menu-item>
        <el-sub-menu index="/maintenance">
            <template #title>
                <el-icon>
                    <List />
                </el-icon>
                <span v-show="!store.collapse">维护中心</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/maintenance/base-info">基础信息</el-menu-item>
                <el-menu-item index="/maintenance/eqp-info">设备信息</el-menu-item>
                <el-menu-item index="/maintenance/line">线体</el-menu-item>
                <el-menu-item index="/maintenance/material">物料</el-menu-item>
                <el-menu-item index="/maintenance/model">机种</el-menu-item>
                <el-menu-item index="/maintenance/plant">厂区</el-menu-item>
                <el-menu-item index="/maintenance/process">制程段</el-menu-item>
                <el-menu-item index="/maintenance/process-detail">制程段明细</el-menu-item>
                <el-menu-item index="/maintenance/process-line">组合制程</el-menu-item>
                <el-menu-item index="/maintenance/storage">仓储</el-menu-item>
                <el-menu-item index="/maintenance/work-day">工作日</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
            </div>
      
      <!-- <div v-for="(item, index) of store.userRouters" :key="index">
        <MenuItem :index="(index + 1).toString()" :collapse="store.collapse" :item="item" />
      </div> -->
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  color: #1d1e1fbd;
  .menu-item{
        max-height: calc(100% - 2.7rem);
        overflow-y: auto;
        overflow-x: hidden;
    }
 
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border-radius: 0 0.4rem 0.4rem 0 !important;
  background-image: url("@/assets/images/side-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.el-menu--collapse {
  width: 60px;
  overflow: hidden;
  background-color: #7c40f1;
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



</style>
