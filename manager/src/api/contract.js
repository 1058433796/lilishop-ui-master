import { getRequest, postRequest, putRequest ,postRequestWithNoForm } from "@/libs/axios";


// 获取合同列表
export const getContractList = (params) => {
  return getRequest('/store/store/contract/list', params)
}
