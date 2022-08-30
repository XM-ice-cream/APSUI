<script setup lang="ts" name="Login">
import { Ref, ref,nextTick } from "vue";
import { useRouter } from "vue-router";
import { rules } from "./baseData";
import { userLoginApi ,getUserListApi} from "@/apis/user";
import {IUserLoginReq, IUserLoginRes,IGetUserListItem} from "@/entity/user"
import useLoging from "@/libs/hooks/useLoging";
//两个非常常用的响应式 API：reactive 和 ref

/*  ref:
* ref 用于创建基础类型的响应式，也可以创建引用类型的响应式
接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 .value property，指向该内部值
        const data = ref(xxx) 
引用方式： const dataValue = data.value
*/

/**reactive:
 * 返回对象的响应式副本，响应式转换是“深层”的——它影响所有嵌套 property
 */
const ruleFormRef = ref(); //ref 约等于 reactive({ value: x })
const passwordRef = ref();
const router = useRouter();
const passwordType = ref("password");//密码类型
const ruleForm:Ref<IUserLoginReq> = ref<IUserLoginReq>({////返回对象的响应式副本
    username: "",
    password: "",
});

const { isLoging, setLoging } = useLoging();

const submitForm = async () => {
    ruleFormRef.value.validate(async (valid: boolean) => {
        valid &&
        await setLoging<IUserLoginReq,IGetUserListItem,IUserLoginRes>(userLoginApi,getUserListApi,ruleForm.value)
        router.replace("/");
    });
};
const showPwd =()=> {
      if (passwordType.value === 'password') {
         passwordType.value = ''
      } else {
        passwordType.value = 'password'
      }
      nextTick(() => {
        passwordRef.value.password.focus()
      })
    }
</script>

<template>
  <div class="login-content" id="login-content">
    <el-card class="box-card">
      <h2 class="title">Welcome!</h2>
       <h3 class="subtitle">Logging In to the <span class="subtitle-aps">APS</span> System</h3>
       <el-form ref="ruleFormRef"  :model="ruleForm" :rules="rules" class="login-ruleForm"  @keyup.enter.native="submitForm" @submit.native.prevent>
            <el-form-item prop="username">
            <el-input
                size="large"
                v-model="ruleForm.username"
                placeholder="请输入用户名"
                autocomplete="off"
                prefix-icon="UserFilled"
            />
            </el-form-item>
            <el-form-item prop="password">
            <el-input
                size="large"
                v-model="ruleForm.password"
                :type="passwordType"
                ref="passwordRef"
                autocomplete="off"
                placeholder="请输入系统密码"
                prefix-icon="Key"
            >
            <template #suffix>
                <span class="show-pwd" @click="showPwd">
                <el-icon  v-if="passwordType==='password'" class="el-input__icon"><Hide /></el-icon>
                <el-icon v-else class="el-input__icon"><View /></el-icon>
            </span>
            </template>
            </el-input>
            </el-form-item>
            <el-form-item>
            <el-button
            class="login-btn"
                type="primary"
                :loading="isLoging"
                @click="submitForm"
                >登 录</el-button
            >
            </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style>
 #login-content .el-input--large .el-input__wrapper {
    padding: 0.09rem 0.2rem;  
    border-radius: 0.4rem;
    background: transparent;
}
#login-content .el-card__body {
    position: relative;
    top: 15%;
}
#login-content .el-icon svg {
    color: #fff;
}
</style>

<style lang="scss" scoped>

.title {
   text-align: left;
    color: #fff;
    font-size: 0.24rem;
}
.subtitle{
    margin-top: 0.2rem;
    color: #f99d26;
    .subtitle-aps{
      font-size: 0.16rem;
      font-style: italic; 
      padding: 0 0.05rem;       
    }
}
.login-ruleForm{
    margin-top:0.5rem;
}
.box-card {
     width: 5.5rem;
    height: 6rem;
    padding: 0px 0.3rem 0.3rem 0.3rem;
    position: absolute;
    top: 15%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    border: none;
    background:#521a9f;
    background-image: url("@/assets/images/login.png") !important;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
}
.login-content {
  width: 100%;
  height: 100%;
  background-color: #59289b !important;
  background-image: url("@/assets/images/login-bg.jpg") !important;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100% 100%;
}
.login-btn{
        width: 100%;
    height: 0.5rem;
    font-size: 0.14rem;
    margin-top: 0.5rem;
    border-radius: 0.4rem;
    border: none;
    // background: #7a41f2;
    background: linear-gradient(90deg,#eda473,#a514fb);
}
:deep(.el-input__inner){
    color:#fff;
}
</style>
