import { getRequest, postRequest, putRequest ,postRequestWithNoForm } from "@/libs/axios";


export const createContract = (orderId) =>{
    return putRequest(`/contract/contract/${orderId}/create`)
}