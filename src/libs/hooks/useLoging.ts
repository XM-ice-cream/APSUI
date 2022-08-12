import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { IUserLoginReq, IGetUserListItem } from '@/entity/user'
import { sha1_to_base64, encryptDes } from '../des'
import { useLocalStorage } from '@/libs/hooks/useLocalStorage'
import { useSessionStorage } from '@/libs/hooks/useSessionStorage'

const useLoging = () => {
	const isLoging = ref<boolean>(false)
	const { setLocalStorage } = useLocalStorage()
	const { setSessionStorage } = useSessionStorage()
	async function setLoging<T, S, D>(
		loginApi: (data: IUserLoginReq) => Promise<D>,
		getUserListApi: () => Promise<S>,
		data: IUserLoginReq
	): Promise<void> {
		try {
			isLoging.value = true
			const { username, password } = data
			const obj = {
				client_id: 'baize',
				client_secret: 'secret',
				grant_type: 'password',
				username: username.trim(),
				password: sha1_to_base64(
					encryptDes(password.trim(), 'baize#66', 'lxeP@ssx')
				),
				scope: 'api offline_access',
				source: 1,
			}
			//缓存用户信息
			setSessionStorage('userName', obj.username)
			setSessionStorage('password', obj.password)
			//获取token
			await loginApi(obj).then((res: any) => {
				const { access_token } = res
				//缓存登录token
				setLocalStorage('token', access_token)
				setLocalStorage('userName', obj.username)
				setLocalStorage('password', obj.password)
			})
			//获取用户信息
			await getUserListApi().then((res: any) => {
				if (res.code === 200) {
					isLoging.value = false
					ElMessage({
						message: '登录成功',
						type: 'success',
					})
				}
			})
		} catch (err: any) {
			isLoging.value = false
			throw new Error(err)
		}
	}
	return {
		isLoging,
		setLoging,
	}
}

export default useLoging
