<template>
    <div class="block">
        <Table
        class="mt_10 table"
        :loading="loading"
        align="center"
        border
        :columns="columns"
        :data="orderData"
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
          show-sizer></Page>
      </Row>
    </div>
</template>
<script>
export default {
    name: "orderResponse",
    props:['data'],
    data() {
        return {
          loading: false,
          searchForm: {
            // 搜索框初始化对象
            pageNumber: 1, // 当前页数
            pageSize: 10, // 页面大小
            sort: "create_time", // 默认排序字段
            order: "desc", // 默认排序方式
            store_id:''//当前店铺id
          },
          total: this.data.length,
            columns: [
                {
                    title: "订单号",
                    key: "orderId",
                },
                {
                    title: "供应商",
                    key: "storeName"
                },
                {
                    title: "订单金额",
                    key: "orderAmount"
                },
                {
                    title: "下单时间",
                    key:"createTime"
                },
                {
                    title: "供应商响应状态",
                    key: "storeReply"
                },
                {
                    title: "发货状态",
                    key:"orderStatus"
                },
                {
                    title: "响应状态",
                    key: "response_state",
                    width: "100px",
                    render: (h, params) => {
                      if (params.row.replyStatus==="未响应") {
                        return h("div", [
                          h(
                            "Button",
                            {
                              props: {
                                // type: "info",
                                size: "small",
                              },
                              style: {
                                width: "100%",
                                color: "red", 
                                marginRight: "5px",
                                "background-color": "pink"
                              },
                              on: {
                                click: () => {
                                  console.log(params);
                                  this.toResponse(params.row)
                                },
                              },
                            },
                            "响应"
                          ),])
                      } else if ((params.row.replyStatus==="已响应")) {
                        return h("div", [
                          h(
                            "Button",
                            {
                              props: {
                                // type: "info",
                                size: "small",
                              },
                              style: {
                                width: "100%",
                                color: "green", 
                                marginRight: "5px",
                                "background-color": "greenyellow"
                              },
                            },
                            "已响应"
                          ),])
                      }
                    }
                },
                {
                    title: "操作",
                    key: "action",
                    render: (h, params) => {
                      if (params.row.replyStatus==="已响应" && params.row.storeReply==="已响应" ) {
                        return h("div", [
                          h(
                            "Button",
                            {
                              props: {
                                // type: "info",
                                size: "small",
                              },
                              style: {
                                marginRight: "5px",
                                color: "white",
                                width: "35%",
                                "background-color": "orange"
                              },
                              on: {
                                click: () => {
                                  this.toResponse(params.row)
                                },
                              },
                            },
                            "查看"
                          ),
                          h(
                            "Button",
                            {
                              props: {
                                // type: "info",
                                size: "small",
                              },
                              style: {
                                marginRight: "5px",
                                color: "white",
                                width: "35%",
                                "background-color": "lightskyblue"
                              },
                              on: {
                                click: () => {
                                  this.responseNext(params.row);
                                },
                              },
                            },
                            "下一步"
                          ),
                        ])
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
                                marginRight: "5px",
                                color: "white",
                                width: "35%",
                                "background-color": "orange"
                              },
                              on: {
                                click: () => {
                                  this.toResponse(params.row)
                                },
                              },
                            },
                            "查看"
                          ),
                          h(
                            "Button",
                            {
                              props: {
                                // type: "info",
                                size: "small",
                              },
                              style: {
                                marginRight: "5px",
                                color: "black",
                                width: "35%",
                                "background-color": "gainsboro"
                              },
                            },
                            "下一步"
                          ),
                        ])
                      }
                  }
                }
            ],
            orderData : this.data
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
      responseNext(row) {
        this.$emit("toContractSign", row)
      },
      toResponse(row) {
        this.$emit("toOrderDetail", row)
      }
    }
}
</script>
<style>
  .a{
    background-color: gainsboro;
  }
  .table th {
    text-align: center;
  }
  .table td {
    text-align: center;
  }
</style>