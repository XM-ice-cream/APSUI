
<script setup lang="ts" name="UpdateBase">
//vue 内置
import { ElMessage } from "element-plus";
import {Ref, ref,watch,nextTick,toRefs ,PropType} from "vue";
//entity
import { IUpdateBase } from "@/entitytype/common";
import { UpdateBaseInfo } from "@/entitytype/maintenance/baseInfo";
//api
import { addReq ,updateReq } from "@/apis/maintenance/baseInfo";

const props = defineProps({
    data:{
        type:Object,
        default:()=>{}
    },
    UpdateForm:{
        type:Array as PropType<IUpdateBase[]>,
        default:()=>[]
    }
})
const { UpdateForm } =toRefs(props) ;

const submitRef =ref(null);
let dialogVisible = ref<boolean>(false);//弹框
let dialogTitle = ref("新增");//
let submitReq:Ref<any> = ref({
    modelId: "",//机种ID
    workOrder: "",//工单
    processLineId:"",//制程段Id
    uph:0,//最大产能
    workDayId:"",//工作排程时间ID
    seq:0,//排序（第一段、第二段、第三段）
    priority:9,//优先级 数字越小 级别越高
    id:"",
})
//子组件调用父组件方法
const emit = defineEmits(['reLoad']);
//父组件通过ref调用子组件(暴露给父组件值或方法)
defineExpose({ dialogVisible})

    
//新增、编辑
const sumbit =()=>{
    const { modelId,workOrder,processLineId,uph,workDayId,seq,priority,id } = submitReq.value;
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
const handleClose=()=>{
    (submitRef.value as any).resetFields();
    submitReq.value.id = "";
    dialogVisible.value = false;        
}

watch(() => dialogVisible.value, (newValue,oldValue) => {
    //注意:此时的watch第一个参数是一个箭头函数。
    //监听对象中的某个属性
    if(newValue){
        nextTick(()=>{
            const data = props.data;
            dialogTitle.value = "新增";
            if(data?.id) {
                submitReq.value = {...submitReq.value,...data};
                dialogTitle.value = "编辑";
            }
        });    
    }    
});
</script>

<template>
  <div>
     <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%" :before-close="handleClose">
        <el-form class="form-inline" label-width="120px" ref="submitRef"  :model="submitReq" >
            <template v-for="item in UpdateForm">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-input v-model="submitReq[item.prop]" :placeholder="item.pleaseholder" />
                </el-form-item>
            </template>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="handleClose()">Cancel</el-button>
            <el-button type="primary" @click="sumbit">Confirm</el-button>
        </span>
        </template>
     </el-dialog>
  </div>
</template>


<style lang="scss" scoped>
 .dialog-title{
    font-size: 0.2rem;
 }
</style>
