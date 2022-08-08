<!-- 表格 分页 自定义封装 -->
<template>
    <el-pagination
      background 
      small
      class="pagination-custom"
      layout="sizes, prev, pager, next"
      :currentPage="pageIndex"
      :page-size="pageSize"
      :total="total"
      :page-sizes="[5, 30, 50, 100]"      
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
     
     </el-pagination>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "PaginationCustom",
    props: {
        elapsedMilliseconds:Number,//耗时
        total: Number, // 总条数
        totalPage: Number, // 总页数
        pageIndex: Number, // 当前页
        pageSize: Number, // 每页大小
    },
    computed: {
    },

    setup(props, {emit}) {
     
        // 选择跳转到第几页
        function handleCurrentChange(index:number) {
             emit("handleCurrentChange", index);
        };
        // 选择一页有条数据
         function handleSizeChange(index:number) {
             emit("handleSizeChange", index);
        };
        return {
            handleCurrentChange,
            handleSizeChange
        };
    },
});
</script>

<style lang="scss" scoped>
</style>
