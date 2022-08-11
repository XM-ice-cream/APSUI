<script setup lang="ts" name="Layout">
import Header from "./components/Header/Header.vue";
import SideBar from "./components/SideBar/SideBar.vue";
import Content from "./components/Content/Content.vue";
import { useUserStore } from "@/libs/store/userStore";

const store = useUserStore();

</script>

<template>
  <div :class="store.dark && 'common-layout'" style="transition: background-color .4s ease;">
    <el-scrollbar height="100vh">
      <el-container>
        <el-aside :style="`--el-aside-width: ${!store.collapse ? '200px' : '55px'}`">
          <SideBar />
        </el-aside>
        <el-container>
          <el-header class="el-header">
            <Header />
          </el-header>
          <el-main class="el-main">
            <Content />
          </el-main>
        </el-container>
      </el-container>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  background-color: #1d1e1f;
}
.el-main {
  padding: 0 6px;
  margin: 0 0.2rem;
}

.test {
  height: 100%;
  overflow: hidden;
}

.el-header {
  height: 50px;
}

.el-aside {
  transition: width 0.3s ease-in-out;
}
</style>
