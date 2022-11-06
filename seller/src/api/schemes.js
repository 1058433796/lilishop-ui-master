import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    importRequest,
    getRequestWithNoToken,
    commonUrl
  } from "@/libs/axios";
  //查询项目是否生成方案
  export const getItemSchemeList = params => {
    return getRequest(`/itemScheme/itemScheme/itemSchemeList`,params)
  }

  export const getItemDetail = (id) => {
    return getRequest(`/item/item/${id}`)
  }
  //生成项目方案
  export const setItemScheme = (id) => {
    return postRequest(`/itemScheme/itemScheme/${id}`)
  }

  //查询方案零件内容
  export const getSchemeDetail = params => {
    return getRequest(`/schemeComponent/schemeComponent/list`,params)
  }

  //确认项目方案
  export const checkItemScheme = (id,params)  => {
    return postRequest(`/itemScheme/itemScheme/${id}/check`,params)
  }
  //新增履约保证单
  export const saveGuaranty = (params) => {
    return postRequest(`/itemGuaranty/itemGuaranty/set`,params,{'Content-type': 'application/json'})
  }
  //测试jsp
  export const testPayBack = (zongji,ordersn) => {
    return postRequest(`/payMent/payMent/pay/${zongji}/${ordersn}`)
  }
  // 生成订单
  export const establishOrder=(id,itemid) => {
    return postRequest(`/schemeComponent/schemeComponent/${id}/${itemid}/supplier`)
  }

  export const searchGuaranty = (params) => {
    return getRequest(`/itemGuaranty/itemGuaranty/item`,params)
  }
  export const searchOrderGuaranty = (params) => {
    return getRequest(`/itemGuaranty/itemGuaranty/order`,params)
  }
  export const searchContractGuaranty = (params) => {
    return getRequest(`/itemGuaranty/itemGuaranty/contract`,params)
  }
  
  export const testIbank = () => {
    return postRequest(`iBank/iBank/payNew`)}

    export const getSchemeSum = (id) => {
      return getRequest(`/schemeComponent/schemeComponent/sum/${id}`)
    }