/**
 * axios二次封装
 */
import axios from "axios";
import config from "./config";
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
});
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
});

export default request;
