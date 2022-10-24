import { getRequest, postRequest, putRequest, deleteRequest} from '@/libs/axios';

export const getContractList = (params) => {
    return getRequest('/contract/contract/list', params)
}
