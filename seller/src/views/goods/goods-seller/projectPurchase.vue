<template>
    <card>
        <div class="htitle">希尔顿项目采购</div>
        <Form
            ref="titleForm"
            :model="titleForm"
            inline
            :label-width="70"
            class="search-form">
            <Form-item label="履约保证单号/订单号/合同号" prop="orderId" :label-width=labelWidth>
                <Input
                    type="text"
                    v-model="titleForm.content"
                    clearable
                    placeholder="请输入内容"
                    style="width: 200px"
                />
            </Form-item>
            <Button @click="handleSearch" type="primary" class="search-btn">查询</Button>
            <Button @click="handleReset" class="search-btn">重置</Button>
        </Form>
        <Tabs v-model="type" @on-click="handleClickType">
            <TabPane label="履约保证单" :name='tabs[0]'>
                <Table
                    class="mt_10 table"
                    :loading="loading"
                    border
                    :columns="certificateTable"
                    :data="certificateData"
                    ref="table"
                />
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
                      show-sizer>
                    </Page>
                </Row>
            </TabPane>
            <TabPane label="订单" :name='tabs[1]'>
                <Table
                    class="mt_10 table"
                    :loading="loading"
                    border
                    :columns="orderTable"
                    :data="orderData"
                    ref="table"
                />
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
                    show-sizer>
                    </Page>
                </Row>
            </TabPane>
            <TabPane label="合同" :name='tabs[2]'>
                <Table
                    class="mt_10 table"
                    :loading="loading"
                    border
                    :columns="contractTable"
                    :data="contractData"
                    ref="table"
                />
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
                    show-sizer>
                    </Page>
                </Row>
            </TabPane>

        </Tabs>
    </card>
</template>
<script>
import {searchGuaranty, saveGuaranty, searchOrderGuaranty, searchContractGuaranty} from "@/api/schemes"
export default {
    name : "projectPurchase",
    data () {
        return {
            loading: true,
            total: 0,
            labelWidth: 170,
            tabs: [
                "GUARANTY",
                "ORDER",
                "CONTRACT",
            ],
            type: "GUARANTY",
            titleForm: {
                content: ""
            },
            searchForm: {
                // 搜索框初始化对象
                pageNumber: 1, // 当前页数
                pageSize: 10, // 页面大小
                sort: "create_time", // 默认排序字段
                order: "desc", // 默认排序方式
            },
            basicProjectInfo: this.$route.query,
            certificateTable: [
                {
                    title: "序号",
                    key: "index",
                    render: (h, params) => {
                        return h("div", [
                                h(
                                    "div",
                                    {
                                    props: {
                                        // type: "info",
                                        width: 10,
                                        size: "small",
                                    },
                                    },
                                    (params.row._index + 1) + (this.searchForm.pageNumber-1)*this.searchForm.pageSize
                                ),])
                    },
                },
                {
                    title: "履约保证单",
                    key: "id"
                },
                {
                    title: "内容",
                    key: "orderContent"
                },
                {
                    title: "订单数",
                    key: "orderNum"
                },
                {
                    title: "金额",
                    key: "schemeSum"
                },
                {
                    title: "创建时间",
                    key: "createTime"
                },
                {
                    title: "支付状态",
                    render: (h, params) => {
                        return h("div", [
                                h(
                                    "div",
                                    {
                                    props: {
                                        // type: "info",
                                        width: 10,
                                        size: "small",
                                    },
                                    },
                                    params.row.payFlag===0? "未支付": "已支付"
                                ),])
                    },
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        return h("div", [
                                h(
                                    "Button",
                                    {
                                    props: {
                                        // type: "info",
                                        size: "small",
                                    },
                                    style: {
                                        width: "40%",
                                        marginRight: "5px",
                                    },
                                    on: {
                                            click: () => {
                                            console.log(params);
                                            this.toGuaranty(params.row)
                                        },
                                    },
                                    },
                                    "详情"
                                ),])
                    },
                }
                
            ],
            certificateData: [],
            orderTable: [
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
                                  this.checkOrder(params.row)
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
                                disabled: true
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
                                  this.checkOrder(params.row)
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
                                  this.checkOrder(params.row)
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
                                disabled: true
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
            orderData: [],
            contractTable: [
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
                                            size: "small",
                                            disabled: true

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
                                            this.checkContract(params.row)
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
                                  this.checkContract(params.row)
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
                                  this.contractNext(params.row);
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
                                  this.checkContract(params.row)
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
            contractData: [],
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        handleSearch(){

        },
        handleReset() {

        },
        handleClickType(v) { 
            this.getData();
        },
        changePage(v) {
            this.searchForm.pageNumber = v;
            this.getData();
        },
        changePageSize(v) {
            this.searchForm.pageSize = v;
            this.getData();
        },
        getData() {
            if(this.type===this.tabs[0]) {
                this.searchForm.itemId = this.basicProjectInfo.itemId;
                searchGuaranty(this.searchForm).then(res=> {
                    if(res.success) {
                        console.log(res);
                        this.loading = false;
                        this.certificateData = res.result.records;
                        this.total = res.result.total;
                    }
                })
            }else if (this.type===this.tabs[1]) {
                this.loading = true;    
                this.searchForm.itemId = this.basicProjectInfo.itemId;
                searchOrderGuaranty(this.searchForm).then(res=> {
                    if(res.success) {
                        console.log(res);
                        this.loading = false;
                        this.orderData = res.result.records;
                        this.total = res.result.total;
                    }
                })
            }else if (this.type===this.tabs[2]) {
                this.loading = true;    
                this.searchForm.itemId = this.basicProjectInfo.itemId;
                searchContractGuaranty(this.searchForm).then(res=> {
                    if(res.success) {
                        console.log(res);
                        this.loading = false;
                        this.contractData = res.result.records;
                        this.total = res.result.total;
                    }
                })
            }
        },
        responseNext(row) {
            this.$router.push({name: "deal", query: {type:"contractSign", data: row}})
        },  
        toGuaranty(row) {
            let params = JSON.parse(JSON.stringify(row));
            saveGuaranty(params).then((res)=>{
                this.$router.push({ name: "deal", query: { Form: row } });
            })
        },
        checkOrder(row) {
            row.processing = "orderDetail";
            this.$router.push({ name: "deal", query: { data: row} });
        },
        contractNext(row) {
            this.$router.push({ name: "deal", query: {type:"orderPay", data: row } });
        },
        checkContract(row) {
            this.$router.push({name: "contractDetailSingle", query: {data: row}})
        },
    }
}
</script>
<style lang="scss">
@import "@/styles/table-common.scss";

.htitle {
    font-weight: bold;
    font-size: x-large;
    margin-bottom: 2%;
}
.search-form {
    margin-bottom: 2%;
}
</style>