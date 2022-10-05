<template>
    <div>
        <Table
        class="mt_10 table"
        :loading="loading"
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
          show-sizer
        ></Page>
      </Row>
    </div>
</template>
<script>
export default {
    name: "orderPay",
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
            total: 0,
            columns: [
                {
                    title: "订单号",
                    key: "order_num"
                },
                {
                    title: "商品名称",
                    key: "product_name"
                },
                {
                    title: "供应商名称",
                    key: "supplier"  
                },
                {
                    title: "数量",
                    key: "product_amount"
                },
                {
                    title:"金额",
                    key: "pay"
                },
                {
                    title: "关联合同",
                    key: "contract_state"
                },
                {
                    title: "创建时间",
                    key: "create_time"
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        if (params.row.already_pay==="已支付") {
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
                                        marginRight: "5px",
                                        width: "50%",
                                        "background-color": "greenyellow"
                                    },
                                    on: {
                                        click: () => {
                                        this.check(params.row)
                                        },
                                    },
                                    },
                                    "已支付"
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
                        }else if (params.row.already_pay==="支付") {
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
                                        width: "50%",
                                        "background-color": "orange"
                                    },
                                    on: {
                                        click: () => {
                                        this.check(params.row)
                                        },
                                    },
                                    },
                                    "支付"
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
            orderData: [
                {order_num:2022021001, product_name: "样板房五金", supplier:"ASSA", product_amount:1, pay:10000.00, contract_state:"已签署", create_time:"2022-02-10 16:00:00", already_pay:"已支付"},
                {order_num:2022021001, product_name: "公区五金", supplier:"DORMA", product_amount:1, pay:10000.00, contract_state:"已签署", create_time:"2022-02-10 16:00:00", already_pay:"支付"}
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
        responseNext(row) {
            this.$emit("toDeliver", row)
        }
    }
}
</script>