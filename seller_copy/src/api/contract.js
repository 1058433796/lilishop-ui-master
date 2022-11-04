import { getRequest, postRequest, putRequest ,postRequestWithNoForm } from "@/libs/axios";


// 获取合同列表
export const getContractList = (params) => {
  return getRequest('/contract/contract/list', params)
}

export const signContract = (contractId)=> {
  return putRequest(`/contract/contract/${contractId}/sign`)
}
// 导出待发货订单
export const queryExportContract = params => {
  return getRequest(`/contract/contract/queryExportContract`, params);
};
