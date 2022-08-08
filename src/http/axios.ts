import querystring from 'querystring'
import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import { ElMessage } from "element-plus";
import router from "@/router/index";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IConfigType,IStatusType } from "@/entitytype/http"

const { getLocalStorage } = useLocalStorage();

/**
 *  @description  错误返回状态
 */
const _status:IStatusType= {
    400:"请求错误",
    401:"登录已过期，请重新登录",
    403:"禁止访问",
    404:"接口不存在",
    405:"资源被禁止",
    500:"内部服务器错误",
    502:"网关错误"
}


/**
 * @description  请求接口封装
 */
const Fetch=(params:IConfigType)=> {
    const instance = axios.create({
         timeout: (1000 * 20),
         baseURL: params.baseUrl|| "http://10.191.21.51:8000"
    })
      //过滤器
      instance.interceptors.request.use((config: IConfigType) =>{
        // 在这里可以添加一些请求信息，比如配置header，验证令牌等
        // ! 告诉  ts 这个东西一定存在
        if (config.reqType && config.reqType === 'FormData') {
            config.headers!['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
            config.transformRequest = [function (data) {
            return querystring.stringify(data)
            }]
        } else {
            config.headers!['Content-Type'] = 'application/json; charset=UTF-8'
        }
        if (localStorage.token) {
            config.headers!.Authorization = "Bearer " + getLocalStorage("token");
        }
        return config;
    }),
    //请求拦截器
    instance.interceptors.response.use(
        (res: AxiosResponse) => {
            return res.data;
        },
        (err: any) => {
            const errStatus:string = err.response.data.status;
            if (err.response.data) {
                ElMessage({
                    showClose: true,
                    message: _status[errStatus],
                    type: "error",
                });
                // 接口鉴权出错 跳至登录页
                if (err.response.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userName");
                    router.replace("/login");
                }
            }

            return Promise.reject(err);
        }
    );
    return instance(params)
}

  
 export default Fetch