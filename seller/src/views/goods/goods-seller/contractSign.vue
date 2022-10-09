<template>
    <div>
      <Button type="primary" class="mr_10">
        导出合同
      </Button>
        <Table
        class="mt_10 table"
        :loading="loading"
        border
        :columns="columns"
        :data="contractData"
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
import { getContractList } from "@/api/promotion";

export default {
    name: "contractSign",
    props: ['data'],
    data () {
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
                    title: "合同号",
                    key: "id"
                },
                {
                    title: "供应商",
                    key: "storeName"
                },
                {
                    title: "合同创建时间",
                    key: "createTime"
                },
                {
                    title: "供应商签署状态",
                    key: "providerState"
                },
                {
                    title: "签署状态",
                    render: (h, params) => {
                        if (params.row.buyerState==="已签署") {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            size: "small"
                                        },
                                        style: {
                                            color: "green", 
                                            marginRight: "5px",
                                            width: "65px",
                                            "background-color": "greenyellow"
                                        },
                                        
                                    },
                                    "已签署"
                                )
                            ])
                        }else if (params.row.buyerState==="未签署") {
                          return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            size: "small"
                                        },
                                        style: {
                                          color: "red", 
                                          marginRight: "5px",
                                          width: "65px",
                                          "background-color": "pink"
                                        },
                                        on: {
                                          click: () => {
                                            this.check(params.row)
                                          },
                                        },
                                    },
                                    "签署"
                                )
                            ])
                        }
                    }
                },
                {
                    title: "操作",
                    render: (h, params) => {
                      if (params.row.buyerState==="已签署" && params.row.providerState==="已签署") {
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
                                "background-color": "orange"
                              },
                              on: {
                                click: () => {
                                  this.check(params.row)
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
                                "background-color": "orange"
                              },
                              on: {
                                click: () => {
                                  this.check(params.row)
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
            // 合同数据
            contractData: this.data, 
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
            this.$emit("toOrderPay", row)
        },
        // 点击查看合同或签署合同
        check(row) {
          this.$emit("toContractDetail", row); 
        },
        getDataList() {

        }
    }
}
</script>
<style>
  .contract-export-btn {
    background-color: rgb(255,126,76);
    color: white;
    padding: 5px;
    border-radius: 3px;
    border-color: rgb(255,126,76);
    margin-bottom: 13px;
  }
</style>