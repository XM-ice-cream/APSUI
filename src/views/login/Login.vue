<script setup lang="ts" name="Login">
import { Ref, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { rules } from "./baseData";
import { userLoginApi, getUserListApi } from "@/apis/user";
import { IUserLoginReq, IUserLoginRes, IGetUserListItem } from "@/entity/user";
import useLoging from "@/libs/hooks/useLoging";

const ruleFormRef = ref(); //ref 约等于 reactive({ value: x })
const passwordRef = ref();
const router = useRouter();
const passwordType = ref("password"); //密码类型
const ruleForm: Ref<IUserLoginReq> = ref<IUserLoginReq>({
	////返回对象的响应式副本
	username: "",
	password: "",
});

const { isLoging, setLoging } = useLoging();

const submitForm = async () => {
	ruleFormRef.value.validate(async (valid: boolean) => {
		valid && (await setLoging<IUserLoginReq, IGetUserListItem, IUserLoginRes>(userLoginApi, getUserListApi, ruleForm.value));
		router.replace("/");
	});
};
const showPwd = () => {
	if (passwordType.value === "password") {
		passwordType.value = "";
	} else {
		passwordType.value = "password";
	}
	nextTick(() => {
		passwordRef.value.password.focus();
	});
};
</script>

<template>
	<div class="login-content" id="login-content">
		<el-card class="box-card">
			<h2 class="title">Welcome!</h2>
			<h3 class="subtitle">Logging In to the <span class="subtitle-aps">APS</span> System</h3>
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="login-ruleForm" @keyup.enter.native="submitForm" @submit.native.prevent>
				<el-form-item prop="username">
					<el-input size="large" v-model="ruleForm.username" placeholder="请输入用户名" autocomplete="off" prefix-icon="UserFilled" />
				</el-form-item>
				<el-form-item prop="password">
					<el-input size="large" v-model="ruleForm.password" :type="passwordType" ref="passwordRef" autocomplete="off" placeholder="请输入系统密码" prefix-icon="Key">
						<template #suffix>
							<span class="show-pwd" @click="showPwd">
								<el-icon v-if="passwordType === 'password'" class="el-input__icon"><Hide /></el-icon>
								<el-icon v-else class="el-input__icon"><View /></el-icon>
							</span>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="login-btn" type="primary" :loading="isLoging" @click="submitForm">
						登 录
						<el-icon><Right /></el-icon>
					</el-button>
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
@import "../../assets/css/login.less";
</style>
