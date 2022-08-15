<script lang="ts" setup name="ViewDate">
    //vue 内置
    import { ref,onMounted,toRefs,PropType,nextTick,inject } from "vue";
    // 参数
    import { dateFormat } from "@/libs/utils"
    //自定义组件
    import Card from "@/components/Card/Card.vue";
    import PaginationCustom from "@/components/pagination-custom/PaginationCustom.vue";
    //entity
    import { IFormBase,ITableBase } from "@/entity/common";

    const props = defineProps({
        Column:{
             type:Array as PropType<ITableBase[]>,
            default:()=>[]
        },
        SearchForm:{
            type:Array as PropType<IFormBase[]>,
            default:()=>[]
        },
        req:{
             type:Object,
            default:()=>{}
        },
        tableData:{
            type:Array,
            default:()=>[]
        },
        loading:{
            type:Boolean,
            default:false,
        }
    }) 
    const { Column, SearchForm,req,tableData } =toRefs(props) ;

    //全局变量
    const $config:any = inject("$config");
    const tableConfig = ref({...$config.tableConfig})
    const reqRef = ref(null); 

    const emit = defineEmits(["update:req","pageLoad","deleteClick","updateClick"]);

    // 查询
    const pageLoad = ()=>{
       emit("update:req",req.value)
       emit("pageLoad");
    }
     //新增、编辑
    const  updateClick = (row: any)=> {  
       emit("updateClick",row);
    }
    //删除
    const  deleteClick=(row: any)=> {  
       emit("deleteClick",row);
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
        nextTick(() => {
           tableConfig.value.height = document.body.clientHeight - 230;
        });       
    }
    //重置
    const resetClick = () => {
        (reqRef.value as any).resetFields();
    }    

    onMounted(() => {        
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
         <el-button type="primary" @click="updateClick({})"> + 添加</el-button>
     </div>
      <el-table :data="tableData" fixed="right"  :height="tableConfig.height" v-loading="loading">
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
            <el-button size="small" @click="updateClick(scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteClick(scope.row)"
              >删除</el-button>
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



<style lang="scss" scoped></style>
