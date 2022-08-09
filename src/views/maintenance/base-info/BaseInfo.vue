<template>
  <div class="base-info-box">
      <el-form :inline="true" :model="req" class="form-inline" label-width="50px">
        <el-form-item label="机种">
          <el-input v-model="req.modelId" placeholder="请输入机种" />
        </el-form-item>
        <el-form-item label="工单">
          <el-input v-model="req.workOrder" placeholder="请输入工单" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pageLoad">搜索</el-button>
          <el-button @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    <Card>
     <div class="operator fr">
         <el-button type="primary" @click="onSubmit"> + 添加</el-button>
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
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
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
  </div>
</template>

<script lang="ts">
import Card from "@/components/Card/Card.vue";
import {  reactive,toRefs,defineComponent,onMounted} from "vue";
import { Column } from "./baseData";
import PaginationCustom from "@/components/pagination-custom/PaginationCustom.vue";
import { IBaseInfoQuery } from "@/entitytype/maintenance/baseInfo";
import { getPageListReq } from "@/apis/maintenance/baseInfo";
import { dateFormat } from "@/libs/utils"
export default defineComponent({
  name: "baseInfo",
  components: {
    Card,
    PaginationCustom
  },
  setup() {
     const dataMap = reactive({
        dateFormat:dateFormat,
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
        console.log("查询");
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

    const handleEdit = (index: number, row: any) => {};

    const handleDelete = (index: number, row: any) => {};

    const onSubmit = () => {};
     //表格 index
    const indexMethod =  (index: number) =>{
        return  (dataMap.req.pageIndex - 1) * dataMap.req.pageSize + index + 1;
    }

     // 选择第几页
   const pageChange=(index:number)=> {
    console.log("选中第几页",index);
    //   this.req.pageIndex = index;
    //   this.pageLoad();
    };
    // 选择一页有条数据
   const pageSizeChange=(index:number)=> {
      console.log("选择一页有条数据",index);
    //   this.req.pageIndex = 1;
    //   this.req.pageSize = index;
    //   this.pageLoad();
    };
      // 自动改变表格高度
   const autoSize =()=> {
      dataMap.tableConfig.height = document.body.clientHeight - 230;
      console.log( dataMap.tableConfig.height);
    };

    onMounted(() => { 
        pageLoad();
        window.addEventListener("resize", () => autoSize()); 
    }) ;

    return {
      ...toRefs(dataMap),
      Column,
      pageLoad,
      onSubmit,
      handleEdit,
      handleDelete,
      indexMethod,
      pageChange,
      pageSizeChange
    };
  },
});
</script>

<style lang="scss" scoped></style>
