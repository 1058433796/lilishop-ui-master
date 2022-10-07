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
            @toOrderPayDetail="orderPayDetail">
            </component>
        </div>
        <!-- {{childData}}
        {{this.$route.query.data}} -->
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
import { establishOrder} from '@/api/schemes'
import {getAssociatedOrders, getAssociatedContractOrders} from '@/api/order'
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
            process : "zhifu",
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
            if (this.$route.query.data.processing==="orderDetail") {
                this.process = orderDetail;
                this.childData = this.$route.query.data;
                this.current_process = 1;
                this.fullData = [this.$route.query.data];
            }
        },
        processChange(index) {
            console.log(this.$route.query.Form);
            // this.current_process = index
            if (index === 1) {
                establishOrder(this.form.primaryId).then(res => {
                    console.log("建立订单");
                    console.log(res);
                    this.childData = res.result;
                    this.fullData = res.result;
                    this.process = orderResponse;
                    this.current_process = index;
                })
            }
        },
        contractSign(row){
            createContract(row.orderId).then(res=> {
                if (res.success) {
                    console.log(res)
                    this.childData = res.result.records;
                    this.process = contractSign;
                    this.current_process = 2;
                } else {
                    
                }
            });
        },
        orderPay(row) {
            getAssociatedContractOrders(row.orderId).then(res=>{
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
            this.process = "zhifu";
        },
        deliver(row) {
            this.current_process++;
            this.process = logistic;
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
            getAssociatedOrders(orderId).then(res=> {
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
            createContract(contract.orderId).then(res=> {
                if (res.success) {
                    this.childData = res.result.records;
                    this.process = contractSign;
                    this.current_process = 2;
                }else {

                }
            })
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