<template>
    <div>
        <Table
        class="mt_10 table"
        :loading="loading"
        border
        :columns="columns"
        :data="deliverData"
        ref="table"
       >
      </Table>
      <Row type="flex" justify="end" class="mt_10">
        <Page
          :current="searchForm.pageNumber"
          :total="total"
          :page-size="searchForm.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </div>
</template>
<script>
import { orderLogisticSign} from '@/api/order'

export default {
    name: "logistic",
    props: ['data'],
    data() {
        return {
            loading: false,
            total: this.data.length,
            searchForm: {
                // 搜索框初始化对象
                pageNumber: 1, // 当前页数
                pageSize: 10, // 页面大小
                sort: "create_time", // 默认排序字段
                order: "desc", // 默认排序方式
                store_id:''//当前店铺id
            },
            columns: [
                {
                    title: "订单号",
                    key: "orderId"
                },
                {
                    title: "配送方式",
                    key: "deliver_type",
                    render:(h, params) => {
                        return h("div", [
                          h(
                            "div",
                            {
                            },
                            "快递"
                          ),])
                    }
                },
                {
                    title: "物流公司",
                    key: "logisticsName",
                    render:(h, params) => {
                        return h("div", [
                          h(
                            "div",
                            {
                            },
                            params.row.logisticsName || "暂未发货"
                          ),])
                    }
                },
                {
                    title: "运单号",
                    key:"logisticsNo",
                    render:(h, params) => {
                        return h("div", [
                          h(
                            "div",
                            {
                            },
                            params.row.logisticsNo || "暂未发货"
                          ),])
                    }
                },
                {
                    title:"发货人",
                    key: "storeName"
                },
                {
                    title:"发货时间",
                    key:"logisticsTime",
                    render:(h, params) => {
                        return h("div", [
                          h(
                            "div",
                            {
                            },
                            params.row.logisticsTime || "暂未发货"
                          ),])
                    }
                },
                {
                    title: "操作",
                    render:(h, params) => {
                      if(params.row.orderStatus==="已签收") {
                        return h("div", [
                          h(
                            "Button",
                            {
                              props: {
                                // type: "info",
                                size: "small",
                                disabled: true,
                              },
                              style: {
                                color: "green", 
                                width: "50%",
                              },
                              on
                            },
                            "已签收"
                          ),])
                      }else{
                        return h("div", [
                          h(
                            "Button",
                            {
                              props: {
                                // type: "info",
                                size: "small",
                              },
                              style: {
                                color: "red", 
                                width: "50%",
                              },
                              on: {
                                click: () => {
                                this.sign(params.row);
                                },
                              },
                              
                            },
                            "签收"
                          ),])
                      }
                    }
                }
            ],
            deliverData : this.data
        }
    },
    methods: {
         // 改变页码
        changePage(v) {
            this.searchForm.pageNumber = v;
            this.getDataList();
            this.clearSelectAll();
        },
        // 改变页数
        changePageSize(v) {
            this.searchForm.pageSize = v;
            this.getDataList();
        },
        sign(row) {
          orderLogisticSign(row.orderId).then(res=>{
                if(res.success && res.result) {
                    row.orderStatus ="已签收"
                    this.$Message.success('签收成功');
                    this.deliverData[row._index].orderStatus = "已签收"
                }else {
                    this.$Message.error('签收失败');
                }
            })
        }
    }
    
}

</script>