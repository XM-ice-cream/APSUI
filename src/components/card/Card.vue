<!-- 卡片-->
<script setup lang="ts" name="Card">

</script>

<template>
  <el-card class="box-card" shadow="never">
    <slot></slot>
  </el-card>
</template>



<style scoped>
.box-card {
    border: none;
    margin-bottom: 0.1rem;
}
</style>
