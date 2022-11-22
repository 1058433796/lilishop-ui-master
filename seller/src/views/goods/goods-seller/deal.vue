<template>
    <card>
        <div class="title">
            <button
                v-for="(item, index) in processList"
                :key="index"
                class="process" 
                :class="current_process === index ? 'going process' + index : 'process'+ index"
                @click="processChange(index)"
                >
            {{ item.title }}
            </button>
        </div>
        <div class="sub-component">      
            <!-- {{form}} -->
            <component :is="process"  :data="childData" 
            @backToContractSign="backContractSign"
            @toContractSign="contractSign"  
            @backToOrderResponse="backOrderResponse"
            @toOrderDetail="orderDetail" @toOrderPay="orderPay" @toDeliver="deliver" @toContractDetail="contractDetail"
            @toOrderPayDetail="orderPayDetail" @toProcess="processChange">
            </component>
        </div>
    </card>
</template>
<script>
import zhifu from '@/views/goods/goods-seller/zhifu.vue'
import orderResponse from  '@/views/goods/goods-seller/orderResponse.vue'
import contractSign from  '@/views/goods/goods-seller/contractSign.vue'
import orderPay from  '@/views/goods/goods-seller/orderPay.vue'
import logistic from  '@/views/goods/goods-seller/logistic.vue'
import orderDetail from  '@/views/goods/goods-seller/orderDetail.vue'
import  contractDetail from '@/views/goods/goods-seller/contractDetail.vue'
import { establishOrder,} from '@/api/schemes'
import {getAssociatedOrders, getAssociatedContractOrders,getSignedOrders} from '@/api/order'
import { getContractList } from "@/api/promotion";
import { createContract } from '@/api/contract'
export default {
    name: " ",
    components: {
        zhifu,
        orderResponse,
        contractSign,
        orderPay,
        logistic,
        contractDetail
    },
    data() {
        return {
            processList: [
                { title: "履约保证" },
                { title: "订单响应" },
                { title: "合同签署" },
                { title: "订单支付" },
                { title: "物流签署" }
            ],
            current_process :0,
            form :  this.$route.query.Form,
            itemid: this.$route.query.id,
            guarantyFlag:'',
            process : "zhifu",
            schemeId:1,
            orderInfo : [],
            fullData: [],
            childData: []
        }
    },
    mounted: function(){
        this.init();
    },
    methods: {
        init(){
            console.log('deal',this.$route.query.type)
            if (this.$route.query.data.processing==="orderDetail") {
                console.log("d")
                this.process = orderDetail;
                this.childData = this.$route.query.data;
                this.current_process = 1;
                this.fullData = [this.$route.query.data];
            }
            if (this.$route.query.type==="contractSign") {
                console.log('c')
                this.contractDetail(this.$route.query.data)
                // var order = this.$route.query.data;
                // this.contractSign();
            }
            if (this.$route.query.type==="orderPay") {
                // var contract = this.$route.query.data;
                console.log('p')
                this.orderPay()
            }
        },
        processChange(index) {
            // console.log("testform",this.$route.query.Form);
            // this.current_process = index
            if (index === 1) {
                getAssociatedOrders(this.itemid,this.schemeId).then(res=> {
                    //没有生成订单
                if (res.result.length == 0) {
                    console.log("没有订单")
                    //建立订单需要项目ID和方案id
                    establishOrder(this.schemeId,this.itemid).then(res => {
                    console.log("建立订单",this.schemeId,this.itemid);
                    console.log(res);
                    this.childData = res.result;
                    this.fullData = res.result;
                    this.process = orderResponse;
                    this.current_process = index;
                })
                }else { 
                    console.log("有订单了")
                    this.childData = res.result;
                    this.process = orderResponse;
                    this.current_process = index;
                }
            })
                //primaryid是schemeid=1，传入itemid进行新建
               
            }
        },
        // test(index){
        //     console.log("?????",index)
        // },

        contractSign() {
            console.log("contract")
            getAssociatedContractOrders(this.itemid,this.schemeId).then(res=>{
                if(res.success) {
                    this.childData = res.result.records;
                    this.current_process = 2;
                    this.process = contractSign;
                    // this.process = orderPay;
                } else {
                }
            })
            // createContract(row.orderId).then(res=> {
            //     if (res.success) {
            //         console.log(res)
            //         this.childData = res.result.records;
            //         this.process = contractSign;
            //         this.current_process = 2;
            //     } else {
                    
            //     }
            // });
        },
        orderPay() {
            console.log("orderpay")
            getSignedOrders(this.itemid).then(res=>{
                if(res.success) {
                    this.childData = res.result.records;
                    this.current_process = 3;
                    this.process = orderPay;
                } else {
                }
            })
        },
        orderPayDetail(row) {
            alert("orderPayDetail");
            console.log("id",this.itemid)
            this.process = "zhifu";
        },
        deliver() {
            getSignedOrders(this.itemid).then(res=>{
                if(res.success) {
                    this.childData = res.result.records;
                    this.current_process = 4;
                    this.process = logistic;
                } else {
                }
            })
           
        },
        orderDetail(row) {
            this.process = orderDetail;
            this.childData = row;
        },
        contractDetail(row) {
            this.process = contractDetail;
            this.childData = row;
        },
        backOrderResponse(orderId) {
            console.log("backOrderResponse");
            console.log(orderId);
            console.log("itemid"+this.itemid)
            getAssociatedOrders(this.itemid,this.schemeId).then(res=> {
                if (res.success) {
                    this.childData = res.result;
                    this.process = orderResponse;
                }else {

                }
            })
            // for (var i=0; i < this.fullData.length; ++i) {
            //     if(this.fullData[i].orderId === check) {
            //         this.fullData[i].replyStatus = "已响应"
            //     }
            // }
            // this.childData = this.fullData;
            // this.process = orderResponse;
        },
        backContractSign(contract) {
            console.log("backContractSign",this.itemid,this.schemeId)
            this.contractSign()
            // getAssociatedOrders(this.itemid,this.schemeId).then(res=> {
            //     if (res.success) {
            //         console.log(res)
            //         this.childData = res.result;
            //         this.process = contractSign;
            //         this.current_process = 2;
            //     }else {
            //     }
            // })
            // createContract(contract.orderId).then(res=> {
            //     if (res.success) {
            //         this.childData = res.result.records;
            //         this.process = contractSign;
            //         this.current_process = 2;
            //     }else {

            //     }
            // })
        }
    }
}
</script>
<style>
    .title{
        text-align: center;
        color: rgb(22,132,252);
    }
    .process {
        border-style:ridge;
        width: 20%;
        display:inline-block;
        text-align: center;
        border-color: rgb(255, 91, 91);
        border-width: 1.5px;
    }
    .process0 {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        border-right: none;
    }
    .process1 {
        border-right: none;

    }
    .process2{
        border-right: none;

    }
    .process3{
        border-right: none;

    }
    .process4 {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    .going {
        background-color: rgb(255, 91, 91);
        color: white;
    }
    .table th {
        text-align: center;
    }
    .table td {
        text-align: center;
    }
    .sub-component {
        margin-top: 15px;
    }
</style>