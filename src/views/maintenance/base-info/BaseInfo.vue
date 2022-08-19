<!-- 基础信息维护 -->
<script lang="ts" setup name="BaseInfo">
//vue 内置
import { ElMessage } from "element-plus";
import { Ref,ref,onMounted,inject } from "vue";

// 参数
import { Column,SearchForm,UpdateForm } from "./baseData";

// 自定义组件
import ViewData from "@/components/change-base-info/ViewData.vue";
import UpdateData from "@/components/change-base-info/UpdateData.vue";

//entity
import { IBaseInfoQuery,IBaseInfoSubmitInfo,IBaseInfoReq} from "@/entity/maintenance/baseInfo";
//api
import { getPageListReq ,deteteReq ,addReq ,updateReq} from "@/apis/maintenance/baseInfo";
import { GlobalVariableType } from "@/entity/common";

//全局变量
const $config = inject<GlobalVariableType>("$config");
const tableConfig = ref($config!.tableConfig);

const updateDataRef = ref();
const dialogVisible = ref(false);
const selectObj = ref({});//选中值
const tableData = ref([]);//表格值
const submitReq:Ref<IBaseInfoSubmitInfo> = ref({
    modelId: "",//机种ID
    workOrder: "",//工单
    processLineId:"",//制程段Id
    uph:0,//最大产能
    workDayId:"",//工作排程时间ID
    seq:0,//排序（第一段、第二段、第三段）
    priority:9,//优先级 数字越小 级别越高
    id:"",
})
const req: Ref<IBaseInfoReq>  = ref({
        modelId: "",
        workOrder: "",
        ...($config as GlobalVariableType).pageConfig
      
})//表单参数


// 查询
const pageLoad = ()=>{
    const { modelId,workOrder,pageIndex,pageSize} = req.value;
    const obj:IBaseInfoQuery = {
            orderField:"workOrder", // 排序字段
            ascending: true, // 是否升序
            pageSize, // 分页大小
            pageIndex, // 当前页码
            data: { 
                modelId,
                workOrder
            },
    };
    tableConfig.value.loading=true;
    getPageListReq(obj).then(res=>{
        if(res.code===200){
            let { data, pageSize, pageIndex, total, totalPage } = res.result;
            tableData.value = data || [];
            req.value = { ...req.value, pageSize, pageIndex, total, totalPage,elapsedMilliseconds:res.elapsedMilliseconds };
          
        }
    }).finally(()=>{ tableConfig.value.loading = false; })
}
//新增、编辑
const sumbitClick =(row :IBaseInfoSubmitInfo)=>{
    const { modelId,workOrder,processLineId,uph,workDayId,seq,priority,id } = row;
    const obj = { modelId,workOrder,processLineId,uph,workDayId,seq,priority,id };
    const requestApi = obj.id?updateReq:addReq;
    requestApi(obj).then(res=>{
        if(res.code==200){
            ElMessage.success(`${res.message}`);
            pageLoad();
            updateDataRef.value.closeClick();//关闭弹框
        }else{
            ElMessage.error(`提交失败,${res.message}`);
        }
    })
}

//删除
const  deleteClick=(row: IBaseInfoSubmitInfo)=> {  
    // 提供空字符串作为回退值：Undefined不能赋值给类型string  
    deteteReq({id:row?.id??''}).then(res=>{
        if(res.code===200){
            ElMessage.success("删除成功");
            pageLoad();
        }else{
            ElMessage.error(`删除失败,${res.message}`);
        }
    })
}
//弹框
const  updateClick = (row: IBaseInfoSubmitInfo | {})=> {  
    dialogVisible.value= true;
    selectObj.value = {...row};
    updateDataRef.value.pageLoad({dialogVisible:dialogVisible.value,submitReq:submitReq.value});
}

onMounted(() => {        
   pageLoad();
}) ;
</script>

<template>
  <div class="base-info-box">
    <!-- 查看 -->
    <ViewData 
        ref="viewDataRef" 
        :Column="Column"
        :SearchForm="SearchForm" 
        :loading = "tableConfig.loading"
        :req="req" 
        :tableData="tableData"        
        @pageLoad="pageLoad" 
        @deleteClick="deleteClick" 
        @updateClick="updateClick"
        />
     <!-- 新增、编辑 、删除-->
     <UpdateData ref="updateDataRef" :UpdateForm="UpdateForm" :selectObj = "selectObj" :dialogVisible="dialogVisible" :submitReq ="submitReq" @reLoad="sumbitClick"/>
  </div>
</template>



<style lang="scss" scoped></style>
