
<script setup lang="ts" name="UpdateBase">
//vue 内置
import {Ref, ref,watch,nextTick,toRefs ,PropType} from "vue";
//entity
import { IFormBase } from "@/entity/common";

const props = defineProps({
    selectObj:{
        type:Object,
        default:()=>{}
    },
    UpdateForm:{
        type:Array as PropType<IFormBase[]>,
        default:()=>[]
    }
})
let { UpdateForm,selectObj } =toRefs(props) ;

let dialogVisible = ref();
let submitReq = ref();
const submitRef =ref(null);
let dialogTitle = ref("新增");
//子组件调用父组件方法
const emit = defineEmits(["reLoad","update:dialogVisible"]);


    
//新增、编辑
const sumbit =()=>{
    emit("reLoad",submitReq.value)
}
const pageLoad =(val:any)=>{
    dialogVisible.value = val.dialogVisible;
    submitReq.value = val.submitReq;
    console.log(dialogVisible.value,submitReq.value);
}
// 关闭弹框
const handleClose=()=>{
    (submitRef.value as any).resetFields();
    dialogVisible.value = false;
    // emit("update:dialogVisible",false)      
}

//父组件通过ref调用子组件(暴露给父组件值或方法)
defineExpose({handleClose,pageLoad})

watch(() => dialogVisible.value, (newValue,oldValue) => {
    dialogVisible.value = dialogVisible.value;
    if(newValue){
        
        nextTick(()=>{
            dialogTitle.value = "新增";
            console.log("selectObj.value",selectObj.value);
            if(selectObj.value?.id) {
                submitReq.value = {...submitReq.value,...selectObj.value};
                console.log( submitReq.value,"watch");
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
