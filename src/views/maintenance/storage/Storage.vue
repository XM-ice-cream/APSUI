<!--组合制程 基础信息维护 -->
<script lang="ts" setup name="Storage">
//vue 内置
import { ElMessage, ElMessageBox } from "element-plus";
import { Ref, ref, onMounted, inject } from "vue";
// 参数
import { Column, SearchForm, UpdateForm, AdvancedForm } from "./baseData";
// 自定义组件
import ViewData from "@/components/change-base-info/ViewData.vue";
import UpdateData from "@/components/change-base-info/UpdateData.vue";
import AdvancedQuery from "@/components/advanced-query/AdvancedQuery.vue";
//entity
import { ISearchInfo, ISubmitInfo, ISearchReq } from "@/entity/maintenance/storage";
import { IPagination, GlobalVariableType } from "@/entity/common";
//api
import { getPageListReq, deteteReq, addReq, updateReq } from "@/apis/maintenance/storage";
//工具
import { formatDate } from "@/libs/utils";

//全局变量
const $config = inject<GlobalVariableType>("$config");
const tableConfig = ref($config!.tableConfig);

const updateDataRef = ref();
const advancedQueryRef = ref();
const dialogVisible = ref(false);
const selectObj = ref({}); //选中值
const tableData = ref([]); //表格值
const submitReq: Ref<ISubmitInfo> = ref({
	id: "",
	po: "",
	modelId: "",
	inStorageQty: 0,
	workOrder: "",
	status: "Y",
	storageDateTime: "",
});
const req: Ref<ISearchReq> = ref({
	po: "",
	modelId: "",
	workOrder: "",
	storageStartDateTime: "",
	storageEndDateTime: "",
	...($config as GlobalVariableType).pageConfig,
}); //表单参数

// 查询
const pageLoad = () => {
	const { po, modelId, workOrder, storageStartDateTime, storageEndDateTime, pageIndex, pageSize } = req.value;
	const obj: IPagination<ISearchInfo> = {
		orderField: "po", // 排序字段
		ascending: true, // 是否升序
		pageSize, // 分页大小
		pageIndex, // 当前页码
		data: {
			po,
			modelId,
			workOrder,
			storageStartDateTime: formatDate(storageStartDateTime),
			storageEndDateTime: formatDate(storageEndDateTime),
		},
	};
	tableConfig.value.loading = true;
	getPageListReq(obj)
		.then((res) => {
			if (res.code === 200) {
				let { data, pageSize, pageIndex, total, totalPage } = res.result;
				tableData.value = data || [];
				req.value = { ...req.value, pageSize, pageIndex, total, totalPage, elapsedMilliseconds: res.elapsedMilliseconds };
			} else {
				ElMessage.error(`${res.message}`);
			}
		})
		.finally(() => {
			tableConfig.value.loading = false;
		});
};
//新增、编辑
const sumbitClick = (row: ISubmitInfo) => {
	const { id, po, modelId, inStorageQty, workOrder, status, storageDateTime } = row;
	const obj = { id, po, modelId, inStorageQty, workOrder, status, storageDateTime: formatDate(storageDateTime) };
	const requestApi = obj.id ? updateReq : addReq;
	requestApi(obj).then((res) => {
		if (res.code == 200) {
			ElMessage.success(`${res.message}`);
			pageLoad();
			updateDataRef.value.closeClick(); //关闭弹框
		} else {
			ElMessage.error(`提交失败,${res.message}`);
		}
	});
};
//删除
const deleteClick = (row: ISubmitInfo) => {
	ElMessageBox.confirm("是否确认删除该笔数据", "Warning", {
		confirmButtonText: "OK",
		cancelButtonText: "Cancel",
		type: "warning",
	}).then(() => {
		// 提供空字符串作为回退值：Undefined不能赋值给类型string
		deteteReq({ id: row?.id ?? "" }).then((res) => {
			if (res.code === 200) {
				ElMessage.success("删除成功");
				pageLoad();
			} else {
				ElMessage.error(`删除失败,${res.message}`);
			}
		});
	});
};
//弹框
const updateClick = (row: ISubmitInfo | {}) => {
	dialogVisible.value = true;
	selectObj.value = { ...row };
	updateDataRef.value.pageLoad({ dialogVisible: dialogVisible.value, submitReq: submitReq.value });
};
//高级查询
const advQuery = () => {
	advancedQueryRef.value.pageLoad({ dialogVisible: true });
};
const resetClick = () => {
	advancedQueryRef.value.resetClick();
};

onMounted(() => {
	pageLoad();
});
</script>

<template>
	<!-- 查看 -->
	<ViewData ref="viewDataRef" :Column="Column" :SearchForm="SearchForm" :loading="Boolean(tableConfig.loading)" :req="req" :tableData="tableData" @pageLoad="pageLoad" @deleteClick="deleteClick" @updateClick="updateClick" @resetClick="resetClick">
		<el-button type="primary" class="advQuery" @click="advQuery">高级查询</el-button>
	</ViewData>
	<!-- 高级查询 -->
	<AdvancedQuery ref="advancedQueryRef" v-model:req="req" :AdvancedForm="AdvancedForm" @pageLoad="pageLoad" />
	<!-- 新增、编辑 、删除-->
	<UpdateData ref="updateDataRef" :UpdateForm="UpdateForm" :selectObj="selectObj" :dialogVisible="dialogVisible" :submitReq="submitReq" @reLoad="sumbitClick" />
</template>
