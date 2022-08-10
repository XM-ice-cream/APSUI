<template>
  <div>
     <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
        <template #title>
            <div class="dialog-title">
            {{dialogTitle}}
            </div>
            </template>
        <el-form class="form-inline" label-width="120px" ref="submitRef"  :model="submitReq" >
            <!-- 机种ID -->
            <el-form-item label="机种ID" prop="modelId">
            <el-input v-model="submitReq.modelId" placeholder="请输入机种" />
            </el-form-item>
            <!-- 工单 -->
            <el-form-item label="工单" prop="workOrder">
            <el-input v-model="submitReq.workOrder" placeholder="请输入工单" />
            </el-form-item>
            <!-- 制程段ID -->
            <el-form-item label="制程段ID" prop="processLineId">
            <el-input v-model="submitReq.processLineId" placeholder="请输入制程段ID" />
            </el-form-item>
            <!-- UPH -->
            <el-form-item label="最大产能" prop="uph">
            <el-input v-model="submitReq.uph" placeholder="请输入最大产能" />
            </el-form-item>
            <!-- 工作排程时间ID -->
            <el-form-item label="工作排程时间ID" prop="workDayId">
            <el-input v-model="submitReq.workDayId" placeholder="请输入工作排程时间ID" />
            </el-form-item>
            <!-- 排序 -->
            <el-form-item label="排序" prop="seq">
            <el-input v-model="submitReq.seq" placeholder="请输入排序" />
            </el-form-item>
            <!-- 优先级 -->
            <el-form-item label="优先级" prop="priority">
            <el-input v-model="submitReq.priority" placeholder="请输入优先级" />
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="primary" @click="sumbit">Confirm</el-button>
        </span>
        </template>
     </el-dialog>
  </div>
</template>

<script lang="ts">
//vue 内置
import { ElMessage } from "element-plus";
import {  reactive,toRefs,defineComponent,onMounted} from "vue";
// 参数
//自定义组件
//entity
import { UpdateBaseInfo } from "@/entitytype/maintenance/baseInfo";
//api
import { addReq ,updateReq } from "@/apis/maintenance/baseInfo";

export default defineComponent({
  name: "base-info-update",
  components: {},
  setup(props,{emit}) {
     const dataMap = reactive({
        dialogVisible:false, //弹框
        dialogTitle:"新增",
        submitRef:"",
        submitReq:{
            modelId: "",//机种ID
            workOrder: "",//工单
            processLineId:"",//制程段Id
            uph:0,//最大产能
            workDayId:"",//工作排程时间ID
            seq:0,//排序（第一段、第二段、第三段）
            priority:9,//优先级 数字越小 级别越高
            id:"",
        },
        data:[]
     })
    //新增、编辑
    const sumbit = ()=>{
        const {modelId,workOrder,processLineId,uph,workDayId,seq,priority,id} = dataMap.submitReq;
       const obj:UpdateBaseInfo = { modelId,workOrder,processLineId,uph,workDayId,seq,priority,id };
       const requestApi = obj.id?updateReq:addReq;
       requestApi(obj).then(res=>{
        if(res.code==200){
            ElMessage.success(`${res.message}`);
            emit("reLoad");//重新渲染
            handleClose();//关闭弹框
        }else{
            ElMessage.error(`提交失败,${res.message}`);
        }
       })
    }
    // 关闭弹框
    const handleClose= (formRef:any = dataMap.submitRef)=>{
        dataMap.dialogVisible = false;
        formRef.value.resetFields();
    }


    onMounted(() => { 
    }) ;

    return {
      ...toRefs(dataMap),
      sumbit,//新增
      handleClose,//关闭弹框
    };
  },
});
</script>

<style lang="scss" scoped>
 .dialog-title{
    font-size: 0.2rem;
 }
</style>
