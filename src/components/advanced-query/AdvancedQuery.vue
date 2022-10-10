
<!-- 高级查询 -->
<script setup lang="ts" name="AdvancedQuery">
//vue 内置
import { ref,toRefs ,PropType ,nextTick} from "vue";
//entity
import { IFormBase } from "@/entity/common";

const props = defineProps({
    req:{
        type:Object,
        default:()=>{}
    },
    AdvancedForm:{
        type:Array as PropType<IFormBase[]>,
        default:()=>[]
    }
})
const { req, AdvancedForm } =toRefs(props) ;

const dialogVisible =ref(false);
const submitReq = ref();
const submitRef =ref(null);
const dialogTitle = ref("高级查询");
//子组件调用父组件方法
const emit = defineEmits(["pageLoad","update:dialogVisible","update:req"]);

//接收父组件参数
const pageLoad = (val:any)=>{
   dialogVisible.value = val.dialogVisible;   
   submitReq.value = {...submitReq.value,...req.value};
}

    
//新增、编辑
const sumbitClick =()=>{
    emit("update:req",submitReq.value)
    emit("pageLoad");
    closeClick();//关闭弹框
}
// 关闭弹框
const closeClick=()=>{  
    dialogVisible.value = false;
}
//重置
const resetClick=()=>{
    (submitRef.value as any).resetFields();
    emit("update:req",submitReq.value)   
}

//父组件通过ref调用子组件(暴露给父组件值或方法)
defineExpose({ pageLoad,resetClick })

</script>

<template>
  <div>
     <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%" :before-close="closeClick">
        <el-form class="form-inline" label-width="120px" ref="submitRef"  :model="submitReq" >
            <template v-for="item in AdvancedForm">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-input v-if="item.type==='input'" v-model="submitReq[item.prop]" :placeholder= "`请输入${item.label}`" clearable />
                    <el-input-number v-if="item.type==='inputNumber'" v-model="submitReq[item.prop]" :placeholder="`请输入${item.label}`" clearable />
                    <el-date-picker v-if="item.type==='datePicker'"   v-model="submitReq[item.prop]" type="datetime"   format="YYYY-MM-DD HH:mm:ss" :placeholder="`请选择${item.label}`" clearable />
                    <el-switch v-if="item.type==='switch'" v-model.trim="submitReq[item.prop]"  active-value="Y"  inactive-value="N" size="small" />
                    <el-select v-if="item.type==='select'" v-model="submitReq[item.prop]"  :placeholder="`请选择${item.label}`">
                        <el-option v-for="list in item.selectList" :key="list.value" :label="list.label" :value="list.value" />
                    </el-select>
                </el-form-item>
            </template>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="reset" @click="closeClick">Cancel</el-button>
                <el-button class="reset" @click="resetClick">Reset</el-button>
                <el-button type="primary" @click="sumbitClick">Search</el-button>
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
