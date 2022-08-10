<template>
  <div class="base-info-box">
      <el-form  class="form-inline" label-width="50px" ref="reqRef" :inline="true" :model="req">
        <el-form-item label="机种" prop="modelId">
          <el-input v-model="req.modelId" placeholder="请输入机种" />
        </el-form-item>
        <el-form-item label="工单" prop="workOrder">
          <el-input v-model="req.workOrder" placeholder="请输入工单" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pageLoad">搜索</el-button>
          <el-button @click="resetClick(reqRef)">重置</el-button>
        </el-form-item>
      </el-form>
    <Card>
     <div class="operator fr">
         <el-button type="primary" @click="updateBase(updateBaseRef,{})"> + 添加</el-button>
     </div>
      <el-table :data="data" fixed="right"  :height="tableConfig.height">
       <el-table-column type="index" label="#" :index="indexMethod" />
        <el-table-column
          v-for="(item, index) in Column"
          :prop="item.key"
          :key="index"
          :label="item.title"
          :width="item.width"
          :align="item?.align"
          :show-overflow-tooltip="item?.tooltip"
          :formatter="(item.formatter&&item.formatter==='dateFormat')?dateFormat:null"  
        />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="updateBase(updateBaseRef,scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <PaginationCustom 
        :total="req.total"
        :totalPage="req.totalPage"
        :pageIndex="req.pageIndex"
        :pageSize="req.pageSize"
        :elapsedMilliseconds="req.elapsedMilliseconds"  
        @handleCurrentChange="pageChange"
        @handleSizeChange="pageSizeChange"/>
    </Card>
    <UpdateBase ref="updateBaseRef" @reLoad="pageLoad"/>
  </div>
</template>

<script lang="ts">
//vue 内置
import { ElMessage } from "element-plus";
import {  reactive,toRefs,defineComponent,onMounted } from "vue";
// 参数
import { Column } from "./baseData";
import { dateFormat } from "@/libs/utils"
//自定义组件
import Card from "@/components/Card/Card.vue";
import PaginationCustom from "@/components/pagination-custom/PaginationCustom.vue";
import UpdateBase from "./UpdateBase.vue";
//entity
import { IBaseInfoQuery,BaseInfo } from "@/entitytype/maintenance/baseInfo";
//api
import { getPageListReq ,deteteReq } from "@/apis/maintenance/baseInfo";


export default defineComponent({
  name: "baseInfo",
  components: {
    Card,
    PaginationCustom,
    UpdateBase
},
  setup(props,cxt) {
     const dataMap = reactive({
        dateFormat:dateFormat,
        reqRef:null,
        updateBaseRef:null,
        tableConfig:{
            height:document.body.clientHeight - 230
        },
        req:{
            modelId: "",
            workOrder: "",
            pageSize:30, 
            pageIndex:1, 
            total:0,
            totalPage:0,
            elapsedMilliseconds:0
        },
        data:[]
     })
   
    // 查询
    const pageLoad= ()=>{
        const {modelId,workOrder} = dataMap.req;
        const obj:IBaseInfoQuery = {
                orderField:"workOrder", // 排序字段
                ascending: true, // 是否升序
                pageSize: 30, // 分页大小
                pageIndex:1, // 当前页码
                data: { 
                    modelId,
                    workOrder
                },
        };
        getPageListReq(obj).then(res=>{
            if(res.code===200){
                let { data, pageSize, pageIndex, total, totalPage } = res.result;
                dataMap.data = data || [];
                dataMap.req = { ...dataMap.req, pageSize, pageIndex, total, totalPage,elapsedMilliseconds:res.elapsedMilliseconds };
            }
        })
    }

    //删除
    const handleDelete = (row: BaseInfo) => {       
       deteteReq({id:row.id}).then(res=>{
            if(res.code===200){
                ElMessage.success("删除成功");
                pageLoad();
            }else{
                ElMessage.error(`删除失败,${res.message}`);
            }
       })
    };
    //新增
    const updateBase = (ref:any,row: BaseInfo) => {        
        ref.dialogVisible = true;
        ref.dialogTitle="新增";
        if(JSON.stringify(row)!=="{}"){
            ref.submitReq={...row};
            ref.dialogTitle="编辑"
        }
    };

     //表格 index
    const indexMethod =  (index: number) =>{
        return  (dataMap.req.pageIndex - 1) * dataMap.req.pageSize + index + 1;
    }

     // 选择第几页
   const pageChange=(index:number)=> {
         dataMap.req.pageIndex = index;
         pageLoad();
    };
    // 选择一页有条数据
   const pageSizeChange=(index:number)=> {
        dataMap.req.pageIndex = 1;
        dataMap.req.pageSize = index;
        pageLoad();
    };
      // 自动改变表格高度
   const autoSize =()=> {
      dataMap.tableConfig.height = document.body.clientHeight - 230;
    };
    //重置
    const resetClick = (formRef:any) => {
        if (!formRef) return;
        formRef.resetFields();
    };

    onMounted(() => {        
        pageLoad();
        autoSize();
        window.addEventListener("resize", () => autoSize()); 
    }) ;

    return {
      ...toRefs(dataMap),
      Column,
      pageLoad,
      updateBase,
      handleDelete,
      indexMethod,     
      pageChange,
      pageSizeChange,
      autoSize,
      resetClick,
    };
  },
});
</script>

<style lang="scss" scoped></style>
