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
import { payOrder} from '@/api/order'

export default {
    name: "orderPay",
    props: ['data'],
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
                    key: "orderId"
                },
                {
                    title: "商品名称",
                    key: "product_name"
                },
                {
                    title: "供应商名称",
                    key: "storeName"  
                },
                {
                    title: "数量",
                    key: "product_amount"
                },
                {
                    title:"金额",
                    key: "orderAmount"
                },
                {
                    title: "关联合同",
                    key: "buyerState"
                },
                {
                    title: "创建时间",
                    key: "createTime"
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        if (params.row.payStatus==="已付款") {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                    props: {
                                        // type: "info",
                                        size: "small",
                                        disabled: true
                                    },
                                    style: {
                                        color: "green", 
                                        marginRight: "5px",
                                        width: "50%",
                                        "background-color": "greenyellow"
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
                                        disabled: true
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
            orderData: this.data,
        }
    },
    methods: {
        check(row) {
            payOrder(row.orderId).then(res=>{
                if(res.success && res.result) {
                    row.payStatus ="已支付"
                    this.$Message.success('伪支付--成功');
                    this.orderData[row._index].payStatus = "已付款"
                }else {
                    this.$Message.error('伪支付--失败');
                }
            })
            // this.$emit("toOrderPayDetail", row);
        },
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