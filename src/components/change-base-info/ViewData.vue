<script lang="ts" setup name="BaseInfo">
    //vue 内置
    import { ElMessage } from "element-plus";
    import { Ref,ref,onMounted } from "vue";
    // 参数
    import { Column,SearchForm,UpdateForm } from "./baseData";
    import { dateFormat } from "@/libs/utils"
    //自定义组件
    import Card from "@/components/Card/Card.vue";
    import PaginationCustom from "@/components/pagination-custom/PaginationCustom.vue";
    import UpdateBase from "./UpdateBase.vue";
    //entity
    import { IBaseInfoQuery,BaseInfo } from "@/entitytype/maintenance/baseInfo";
    //api
    import { getPageListReq ,deteteReq } from "@/apis/maintenance/baseInfo";
  
    const reqRef = ref(null); 
    const updateBaseRef = ref(null);
    const selectObj = ref({});//选中值
    let tableData = ref([]);//表格值
    const tableConfig = ref({
            height:document.body.clientHeight - 230
        })//表格设定
    const req: Ref<any>  = ref({
            modelId: "",
            workOrder: "",
            pageSize:30, 
            pageIndex:1, 
            total:0,
            totalPage:0,
            elapsedMilliseconds:0,
        })//表单参数
   
   // 查询
    const pageLoad = ()=>{
        const { modelId,workOrder} = req.value;
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
                tableData.value = data || [];
                console.log(tableData);
                req.value = { ...req.value, pageSize, pageIndex, total, totalPage,elapsedMilliseconds:res.elapsedMilliseconds };
            }
        })
    }
    //删除
    const  handleDelete=(row: BaseInfo)=> {  
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
    //新增
    const  updateBase = (row: BaseInfo)=> {  
        console.log(((updateBaseRef.value as any).dialogVisible));  
        (updateBaseRef.value as any).dialogVisible = true;
        selectObj.value = {...row};
    }

    //表格 index
    const indexMethod = (index: number)=>{
        return  (req.value.pageIndex - 1) * req.value.pageSize + index + 1;
    }

    // 选择第几页
    const pageChange =(index:number)=> {
        req.value.pageIndex = index;
        pageLoad();
    }
    // 选择一页有条数据
    const pageSizeChange =(index:number) => {
        req.value.pageIndex = 1;
        req.value.pageSize = index;
        pageLoad();
    }
    // 自动改变表格高度
    const autoSize = () => {
        tableConfig.value.height = document.body.clientHeight - 230;
    }
    //重置
    const resetClick = () => {
        (reqRef.value as any).resetFields();
    }    

    onMounted(() => {        
        pageLoad();
        autoSize();
        addEventListener("resize", () => autoSize()); 
    }) ;
</script>
<template>
  <div class="base-info-box">
      <el-form  class="form-inline" label-width="50px" ref="reqRef" :inline="true" :model="req">
       <template v-for="(item,key) in SearchForm">
        <el-form-item :label="item.label" :prop="item.prop">
            <el-input v-model="req[item.prop]" :placeholder="item.pleaseholder" />
        </el-form-item>
       </template>
        <el-form-item>
          <el-button type="primary" @click="pageLoad">搜索</el-button>
          <el-button @click="resetClick()">重置</el-button>
        </el-form-item>
      </el-form>
    <Card>
     <div class="operator fr">
         <el-button type="primary" @click="updateBase({})"> + 添加</el-button>
     </div>
      <el-table :data="tableData" fixed="right"  :height="tableConfig.height">
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
            <el-button size="small" @click="updateBase(scope.row)"
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
    <UpdateBase ref="updateBaseRef" :data="selectObj" :UpdateForm="UpdateForm"  @reLoad="pageLoad"/>
  </div>
</template>



<style lang="scss" scoped></style>
