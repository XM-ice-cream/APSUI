<script lang="ts" setup name="ViewDate">
    //vue 内置
    import { ref,onMounted,toRefs,PropType,nextTick,inject } from "vue";
    // 参数
    import { dateFormat } from "@/libs/utils"
    //自定义组件
    import Card from "@/components/Card/Card.vue";
    import PaginationCustom from "@/components/pagination-custom/PaginationCustom.vue";
    //entity
    import { GlobalVariableType, IFormBase,ITableBase } from "@/entity/common";

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
            type:Boolean ,
            default:false
        }
    }) 
    const { Column, SearchForm,req,tableData } =toRefs(props) ;

    //全局变量
    const $config = inject<GlobalVariableType>("$config");
    const tableConfig = ref({...($config as GlobalVariableType).tableConfig});

    const reqRef = ref(null); 

    const emit = defineEmits(["update:req","pageLoad","deleteClick","updateClick","resetClick"]);

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
        emit("resetClick");
        nextTick(()=>{
             (reqRef.value as any).resetFields();
        });
    }    

    onMounted(() => {        
        autoSize();
        addEventListener("resize", () => autoSize()); 
    }) ;
</script>
<template>
  <div class="base-info-box">
      <el-form  class="form-inline" label-width="85px" ref="reqRef" :inline="true" :model="req" @keyup.native.enter="pageLoad" @submit.native.prevent>
       <template v-for="(item,key) in SearchForm">
        <el-form-item :label="item.label" :prop="item.prop" :label-width="item?.labelWidth">
            <el-input v-if="item.type==='input'" v-model="req[item.prop]" :placeholder="`请输入${item.label}`"  clearable />
            <el-input-number v-if="item.type==='inputNumber'" v-model="req[item.prop]" :placeholder="`请输入${item.label}`" clearable />
            <el-date-picker v-if="item.type==='datePicker'"   v-model="req[item.prop]" type="datetime"   format="YYYY-MM-DD HH:mm:ss" :placeholder="`请选择${item.label}`" clearable />
            <el-switch v-if="item.type==='switch'" v-model.trim="req[item.prop]"  active-value="Y"  inactive-value="N" size="small" />
            <el-select v-if="item.type==='select'" v-model="req[item.prop]"  :placeholder="`请选择${item.label}`">
                <el-option v-for="list in item.selectList" :key="list.value" :label="list.label" :value="list.value" />
            </el-select>
        </el-form-item>
       </template>
        <el-form-item>
          <el-button type="primary" @click="pageLoad">查询</el-button>
          <el-button class="reset" @click="resetClick">重置</el-button>
           <slot></slot>
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
          :width="item?.width"
          :min-width="item?.minWidth"
          :align="item?.align"
          :show-overflow-tooltip="item?.tooltip"
          :formatter="item?.formatter==='dateFormat'?dateFormat:null"  
        >
        <template #default="scope" v-if="item?.isTag">
             <el-tag v-if="['Y'].includes(scope.row[item.key])" :type="item.type![0]">Y</el-tag>
             <el-tag v-else :type="item.type![1]" >N</el-tag>
        </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button size="small" class="reset"  @click="updateClick(scope.row)">编辑</el-button>
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
