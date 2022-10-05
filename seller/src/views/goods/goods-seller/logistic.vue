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
export default {
    name: "logistic",
    data() {
        return {
            loading: false,
            total: 0,
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
                    key: "order_num"
                },
                {
                    title: "配送方式",
                    key: "deliver_type"
                },
                {
                    title: "物流公司",
                    key: "deliver_cop"
                },
                {
                    title: "运单号",
                    key:"deliver_order_num"
                },
                {
                    title:"发货人",
                    key: "sender"
                },
                {
                    title:"发货时间",
                    key:"send_time"
                },
                {
                    title: "操作",
                    render:(h, params) => {
                        return h("div", [
                          h(
                            "Button",
                            {
                              props: {
                                // type: "info",
                                size: "small",
                              },
                              style: {
                                color: "green", 
                               
                                width: "50%",
                              },
                            },
                            "签收"
                          ),])
                    }
                }
            ],
            deliverData : [
                {order_num: "2020171809", deliver_type: "快递", deliver_cop: "顺丰", deliver_order_num:"12408888S", sender: "ASSA", send_time:"2022-1-3" }
            ]
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

    }
    
}

</script>