<script setup lang="ts" name="Login">
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { rules } from "./baseData";
import { userLoginApi ,getUserListApi} from "@/apis/user";
import {IUserLoginReq, IUserLoginRes,IGetUserListItem} from "@/entityType/user"
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
const router = useRouter();
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
</script>

<template>
  <div class="login-content" id="login-content">
    <el-card class="box-card">
      <h2 class="title">Welcome!</h2>
       <h3 class="subtitle">Logging In to the APS System</h3>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="login-ruleForm"
      >
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
            type="password"
            autocomplete="off"
            placeholder="请输入系统密码"
            @keyup.enter.navtive="submitForm"
            prefix-icon="Key"
          />
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
}
#login-content .el-card__body {
    position: relative;
    top: 15%;
}
#login-content .el-icon svg {
    color: #59289b;
}
</style>

<style lang="scss" scoped>

.title {
   text-align: left;
    color: #121212d4;
    font-size: 0.24rem;
}
.subtitle{
     margin-top: 0.2rem;
    color: #909399;
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
}
.login-content {
  width: 100%;
  height: 100%;
  background-color: #59289b !important;
//   background-image: url("@/assets/images/login-bg.png") !important;
//   background-repeat: no-repeat;
//   background-position: 50%;
//   background-size: 100% 100%;
}
.login-btn{
        width: 100%;
    height: 0.5rem;
    font-size: 0.14rem;
    margin-top: 0.5rem;
    border-radius: 0.4rem;
    background: #7a41f2;
}
</style>
