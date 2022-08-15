
<script setup lang="ts" name="UpdateData">
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
const { UpdateForm,selectObj } =toRefs(props) ;

const dialogVisible:Ref<Boolean> = ref(false);
const submitReq = ref();
const submitRef =ref(null);
const dialogTitle = ref("新增");
//子组件调用父组件方法
const emit = defineEmits(["reLoad","update:dialogVisible"]);


    
//新增、编辑
const sumbitClick =()=>{
    emit("reLoad",submitReq.value)
}
const pageLoad =(val:any)=>{
    dialogVisible.value = val.dialogVisible;
    submitReq.value = val.submitReq;
}
// 关闭弹框
const closeClick=()=>{  
    dialogVisible.value = false;
    (submitRef.value as any).resetFields();
    // emit("update:dialogVisible",false)      
}

//父组件通过ref调用子组件(暴露给父组件值或方法)
defineExpose({ closeClick , pageLoad })

watch(() => dialogVisible.value, (newValue,oldValue) => {
    dialogVisible.value = dialogVisible.value;
    if(newValue){        
        nextTick(()=>{
            dialogTitle.value = "新增";
            if(selectObj.value?.id) {
                submitReq.value = {...submitReq.value,...selectObj.value};
                dialogTitle.value = "编辑";
            }
        });    
    }    
});
</script>

<template>
  <div>
     <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%" :before-close="closeClick">
        <el-form class="form-inline" label-width="120px" ref="submitRef"  :model="submitReq" >
            <template v-for="item in UpdateForm">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-input v-model="submitReq[item.prop]" :placeholder="item.pleaseholder" />
                </el-form-item>
            </template>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="closeClick()">Cancel</el-button>
            <el-button type="primary" @click="sumbitClick">Confirm</el-button>
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
