<template>
    <card>
    <div class = "contract-detail-top">
        <Tabs>
            <TabPane label="合同详情" name="INFO">
                <table class="contract-table">
                    <tr>
                        <td class="col-title">合同名称</td>
                        <td colspan="3">测试1</td>
                    </tr>
                    <tr>
                        <td class="col-title">签订时间</td>
                        <td>{{contractData.timeStart}}</td>
                        <td class="col-title">合同编号</td>
                        <td> {{contractData.id}}  </td>
                    </tr>
                    <tr>
                        <td class="col-title">甲方</td>
                        <td>深圳蓝凌</td>
                
                        <td class="col-title">乙方</td>
                        <td> {{contractData.providerName}}  </td>
                    </tr>
                    <tr>
                        <td class="col-title">丙方</td>
                        <td></td>
                
                        <td class="col-title">主办部分</td>
                        <td>成都公司</td>
                    </tr>
                    <tr>
                        <td class="col-title">承办人</td>
                        <td>李文怡</td>
                
                        <td class="col-title">承办部分</td>
                        <td>213123131</td>
                    </tr>
                    <tr>
                        <td class="col-title">紧急程度</td>
                        <td>一般</td>
                
                        <td class="col-title">合同形成方式</td>
                        <td>委托</td>
                    </tr>
                    <tr>
                        <td class="col-title">合同总金额（万）</td>
                        <td> {{contractData.amount}} </td>
                
                        <td class="col-title">币种</td>
                        <td>RMB</td>
                    </tr>
                    <tr>
                        <td class="col-title">采购成本预算（万）</td>
                        <td>2022-06-07</td>
                
                        <td class="col-title">履约保证金（万）</td>
                        <td>213123131</td>
                    </tr>
                    <tr>
                        <td class="col-title">合同类型</td>
                        <td>测试合同</td>
                
                        <td class="col-title">合同期限</td>
                        <td>2022-05-07至2021-05-07</td>
                    </tr>
                    <tr>
                        <td class="col-title">合同定稿时间</td>
                        <td>2022-05-07</td>
                
                        <td class="col-title">会签限定完成时间</td>
                        <td>2022-05-08</td>
                    </tr>
                    <tr>
                        <td class="col-title">合同摘要</td>
                        <td colspan="3">11111</td>
                    </tr>
                    <tr>
                        <td class="col-title">合同附件</td>
                        <td colspan="3">
                            <img :src="defaultImg" />
                            {{filename}}
                        </td>
                    </tr>
                    <tr>
                        <td class="col-title">合同对方信息</td>
                        <td colspan="3">测试1</td>
                    </tr>
                    <tr>
                        <td class="col-title">创建人</td>
                        <td>2022-05-07</td>
                
                        <td class="col-title">创建时间</td>
                        <td>2022-05-08</td>
                    </tr>
                    <tr>
                        <td class="col-title">修改人</td>
                        <td>2022-05-07</td>
                
                        <td class="col-title">修改时间</td>
                        <td>2022-05-08</td>
                    </tr>
                </table>
                <div class="bottom-action">
                    <Button class="signAciton" :type='contractData.buyerState==="已签署"?"success":"primary"'  @click="sign()" :disabled='contractData.buyerState==="已签署" || state==="已签署"'> {{contractData.buyerState==='已签署'?'已签署':state}}</Button>
                    <Button type="success" @click="back()">返回</Button>
                </div>
            </TabPane>
        </Tabs>
    </div>
</card>
</template>
<script>
import {signContract} from "@/api/promotion";

export default {
    name: "orderDetail",
    data() {
        return {
            defaultImg: require('@/assets/word.png'),
            filename: "test.docx",
            state: "签署",
            contractData : this.$route.query.data,
        }
    },
    methods: {
        sign() {
            signContract(this.contractData.id).then(res=> {
                if(res.success && res.result) {
                    this.state="已签署";
                }
            });
        },
        back(){
            this.$router.go (-1);
        }
    },
}
</script>
<style>
    .signAciton {
        margin-right: 80px;
    }
    img {
        width: 30px;
        height: 30px;
    }
    .contract-table {
        margin: 1em 0;
        width: 100%;
        overflow: hidden;
        background: #FFF;
        color: black;
        border: 1px solid black;
    }
    .contract-table tr {
        height: 35px;
        border: 1px solid #D9E4E6;
    }
    .contract-table  tr:nth-child(odd) {
        background-color: #f8f0ef;
    }
    .contract-table th {
        display: none;
        border: 1px solid #FFF;
        background-color: #fa735b;
        color: #FFF;
        padding: 1em;
    }
    .col-title {
        background-color: rgb(215,215,215);
        height: 2%;
        width: 15%;
    }
    .bottom-action {
        text-align: right;  
        margin-top: 5%;
        margin-right: 5%;
    }
    .bottom-action .sign {
        margin-right: 30px;
    }
    .bubbly-button {
        font-family: "Helvetica", "Arial", sans-serif;
        display: inline-block;
        font-size: 1em;
        padding: 1em 2em;
        -webkit-appearance: none;
        appearance: none;
        background-color: rgb(1,202,252);
        color: #fff;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        position: relative;
        transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
      }
      .bubbly-button:focus {
        outline: 0;
      }
      .bubbly-button:before, .bubbly-button:after {
        position: absolute;
        content: "";
        display: block;
        width: 140%;
        height: 100%;
        left: -20%;
        z-index: -1000;
        transition: all ease-in-out 0.5s;
        background-repeat: no-repeat;
      }
      .bubbly-button:before {
        display: none;
        top: -75%;
        background-image: radial-gradient(circle, #fa735b 20%, transparent 20%), radial-gradient(circle, transparent 20%, #fa735b 20%, transparent 30%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%);
        background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
      }
      .bubbly-button:after {
        display: none;
        bottom: -75%;
        background-image: radial-gradient(circle, #fa735b 20%, transparent 20%), radial-gradient(circle, #fa735b 20%, transparent 20%), radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%);
        background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
      }
      .bubbly-button:active {
        transform: scale(0.9);
        background-color: #fa735b;
        box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
      }
      .bubbly-button.animate:before {
        display: block;
        animation: topBubbles ease-in-out 0.75s forwards;
      }
      .bubbly-button.animate:after {
        display: block;
        animation: bottomBubbles ease-in-out 0.75s forwards;
      }
      
      .already {
        font-family: "Helvetica", "Arial", sans-serif;
        display: inline-block;
        font-size: 1em;
        padding: 1em 2em;
        -webkit-appearance: none;
        appearance: none;
        background-color:gray;
        color: black;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        position: relative;
        margin-right: 30px;
        transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
    }
   
</style>