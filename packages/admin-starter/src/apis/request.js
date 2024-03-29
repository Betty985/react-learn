/**
 * axios二次封装
 */
import axios from "axios";
import config from "../config";
import storage from "../hooks/storage";
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
});
// 请求拦截器
service.interceptors.request.use((req) => {
  const headers = req.headers;
  const token = storage.getItem("jwt");
  if (!headers.Authorization&&token) headers.Authorization = 'Token '+ token;
  return req;
});
// 响应拦截器
service.interceptors.response.use(
  // 请求成功
  (res) => {
    const { status, statusText, data } = res
    // 需要判断当前请求是否成功
    // if 成功 返回解析数据
    if (status>=200&&status<300||status==403) {
      return data
    } else {
      return Promise.reject(new Error(status+':'+statusText))
    }
  },
  // 请求失败
  ({response}) => {
    const err=response?.data?.errors
    return Promise.reject(err)
  }
)
function request(options) {
  options.method = options.method || "get";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }
  return service(options);
}
["get", "post", "put", "delete", "patch"].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({ url, data, method: item, ...options });
  };
})
export default request;
