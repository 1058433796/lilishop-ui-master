// 统一请求路径前缀在libs/axios.js中修改
import { getRequest, postRequest, putRequest ,postRequestWithNoForm } from "@/libs/axios";

import { baseUrl } from "@/libs/axios.js";

// 获取客户列表
export const getCustomerList = params => {
  return getRequest(`/customer/customer`, params);
};

// 获取客户详细信息
export const getCustomerDetail = Id => {
  return getRequest(`/customer/customer/${Id}`);
};
