<!-- 表格 分页 自定义封装 -->
<script setup lang="ts" name="PaginationCustom">
import { toRefs, inject } from "vue";

import { GlobalVariableType } from "@/entity/common";

const props = defineProps({
	elapsedMilliseconds: {
		type: Number,
		default: 0,
	}, //耗时
	total: {
		type: Number,
		default: 0,
	}, // 总条数
	totalPage: {
		type: Number,
		default: 0,
	}, // 总页数
	pageIndex: {
		type: Number,
		default: 0,
	}, // 当前页
	pageSize: {
		type: Number,
		default: 0,
	}, // 每页大小
});
const { elapsedMilliseconds, total, totalPage, pageIndex, pageSize } = toRefs(props); //具有响应式 指针指向props下面对应的属性值
//全局变量
const $config = inject<GlobalVariableType>("$config");

//子组件调用父组件方法
const emit = defineEmits(["handleCurrentChange", "handleSizeChange"]);

// 选择跳转到第几页
const handleCurrentChange = (index: number) => {
	emit("handleCurrentChange", index);
};
// 选择一页有条数据
const handleSizeChange = (index: number) => {
	emit("handleSizeChange", index);
};
</script>

<template>
	<el-pagination background small class="pagination-custom" layout="total, sizes, prev, pager, next" :currentPage="pageIndex" :page-size="pageSize" :total="total" :page-sizes="$config!.pageSizeList" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
</template>

<style lang="scss" scoped></style>
