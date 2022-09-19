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