<template>
    <Tabs>
      <!-- {{orderComponent}} -->
      <TabPane label="订单信息">
        <div class="search">
          <Card class="mt_10">
            <Row>
              <Col span="12">
                <div class="div-item">
                  <div class="div-item-left">订单号：</div>
                  <div class="div-item-right">{{ orderData.orderId}}</div>
                </div>
                <div class="div-item">
                  <div class="div-item-left">发货状态：</div>
                  <div class="div-item-right">{{orderData.orderStatus}}
                  </div>
                </div>
                <div class="div-item">
                  <div class="div-item-left">支付方式：</div>
                  <div class="div-item-right">{{orderData.payMode}}
                  </div>
                </div>
                <div class="div-item"  >
                  <div class="div-item-left">配送方式：</div>
                  <div class="div-item-right">
                    {{
                      orderData.distributionMode
                    }}
                  </div>
                </div>
                <div class="div-item">
                  <div class="div-item-left">电话：</div>
                  <div class="div-item-right">
                    {{ orderData.buyerPhone }}
                  </div>
                </div>
              </Col>
              <Col span="12">
                <div class="div-item">
                  <div class="div-item-left">创建日期：</div>
                  <div class="div-item-right">
                    {{ orderData.createTime }}
                  </div>
                </div>
                <div class="div-item">
                  <div class="div-item-left">订单金额：</div>
                  <div class="div-item-right">
                    {{ orderData.orderAmount }}
                  </div>
                </div>
                <div class="div-item">
                  <div class="div-item-left">付款状态：</div>
                  <div class="div-item-right">
                    {{ orderData.payStatus }}
                  </div>
                </div>
  
                <div class="div-item">
                  <div class="div-item-left">收货人：</div>
                  <div class="div-item-right">
                    {{ orderData.buyerName}}
                  </div>
                </div>
  
                <div class="div-item">
                  <div class="div-item-left">收货地址：</div>
                  <div class="div-item-right">{{ orderData.buyerAddress }}</div>
                </div>
              </Col>
            </Row>
          </Card>

          <Table
          class = "table"
          :loading="loading"
          border
          :columns="columns"
          :data="orderComponent"
          ref="table"
        >
        </Table>
          <div class="bottom-action">
            <div class="bottom-action">
              <Button class="signAciton" :type='orderData.buyerReply==="已响应"?"success":"primary"'  @click="buyerResponse()" :disabled='orderData.buyerReply==="已响应"'>{{data.buyerReply==="未响应"? "响应":data.buyerReply}}</Button>
              <Button type="success" @click="back">返回</Button>
            </div>
          </div>
        </div>
      </TabPane>
      </Tabs>
  </template>
  
  <script>
  import * as API_Order from "@/api/order";
  import liliMap from "@/views/my-components/map/index";
  import * as RegExp from "@/libs/RegExp.js";
  import region from "@/views/lili-components/region";

  export default {
    name: "orderDetail",
    props: ["data"],
    components: {
      liliMap,
      region,
    },
    data() {
      return {
        orderComponent: [], 
        responsing: false,
        printHiddenFlag:false,//隐藏信息
        printInfoObj:{
          id: "printInfo",//要打印的id名 无#号
          popTitle:'&nbsp;',//页眉标题 默认浏览器标题 空字符串时显示undefined 使用html语言
          extraHead:'',//头部文字 默认空
        },
        submitLoading: false, // 添加或编辑提交状态
        region: [], //地区
        regionId: [], //地区id
        showRegion: false,
        orderLogModal: false, //弹出调整价格框
        logisticsModal: false, //弹出查询物流框
        orderDeliverModal: false, //订单发货弹出框
        orderTakeModal: false, //订单核销弹出框
        checkedLogistics: [], //选中的物流公司集合
        allowOperation: {}, //订单可才做选项
        logisticsInfo: {
          shipper: "",
        }, //物流信息
        orderId: "", //订单编号
        orderInfo: {
          // 订单信息
          itemOrder: {

          },
          orderGoods:[],
          order: {
            logisticsName: {},
          },
        },
        modal: false, //弹出调整价格框
        printModal:false,//弹出打印发货单
        //调整价格表单
        modifyPriceForm: {
          orderPrice: 0,
        },
        //订单核销表单
        orderTakeForm: {
          qrCode: "",
        },
        //验证要调整的订单金额
        orderTakeValidate: {
          qrCode: [
            { required: true, message: "订单核销码不能为空", trigger: "blur" },
          ],
        },
        //订单发货
        orderDeliveryForm: {
          logisticsNo: "", //发货单号
          logisticsId: "", //物流公司
        },
        //验证要调整的订单金额
        modifyPriceValidate: {
          orderPrice: [
            { required: true, message: "请输入大于等于0或小于99999的合法金额" },
            {
              pattern: /^\d+(\.(([1-9])|(0[1-9])|([\d^0]\d)))?$/,
              message: "请输入大于0小于9999的合法金额",
              trigger: "change",
            },
          ],
        },
        addressModal: false, //弹出修改收件信息框
        //收件地址表单
        addressForm: {
          consigneeName: "",
          consigneeMobile: "",
          consigneeDetail: "",
          consigneeAddressPath: "",
          consigneeAddressIdPath: "",
        },
        orderDeliverFormValidate: {
          logisticsNo: [
            { required: true, message: "发货单号不能为空", trigger: "change" },
          ]
        },
        addressRule: {
          consigneeName: [
            { required: true, message: "收货人姓名不能为空", trigger: "blur" },
          ],
          consigneeMobile: [
            { required: true, message: "联系方式不能为空", trigger: "blur" },
            {
              pattern: RegExp.mobile,
              trigger: "blur",
              message: "请输入正确的手机号",
            },
          ],
          consigneeDetail: [
            { required: true, message: "详细地址不能为空", trigger: "blur" },
          ],
        },
        loading: true,
        columns: [
          {
            title: "序号",
            minWidth: 50,
            render:(h,params)=>{
              return h("span" ,{
              },params.index+1)
            }
          },
          {
            title: "商品名",
            key: "pm",
            minWidth: 200,
            //slot: "goodsSlot",
          },
          {
            title: "参数",
            key: "parameter",
            minWidth: 200,
          },
          {
            title: "饰面",
            key: "sm",
            minWidth: 100,
  
          },
          {
            title: "品牌",
            key: "pp",
            minWidth: 100,
          },
          {
            title: "型号",
            key: "xh",
            minWidth: 100,
          },
          {
            title: "数量",
            key: "componentNumber",
            minWidth: 80,
          },
          {
            title: "单位",
            value: "件",
            key: "dw",
            minWidth: 100,
          },
          {
            title: "单价",
            key: "componentUnitPrice",
            minWidth: 100,
          },
          {
            title: "小计",
            minWidth: 100,
            render: (h, params) => {
              return h("div", {},Number(params.row.componentUnitPrice)*Number(params.row.componentNumber))
            }
          },
        ],
        orderData: this.data, // 商品表单数据
        fhcolumns: [
          {
            title: "订单号",
            key: "orderId",
            minWidth: 200,
          },
          {
            title: "配送方式",
            key: "goodName",
            minWidth: 100,
          },
          {
            title: "物流公司",
            key: "",
            minWidth: 100,
          },
          {
            title: "运单号",
            key: "",
            minWidth: 100,
  
          },
         {
            title: "收货人",
            key: "",
            minWidth: 100,
          },
          {
            title: "发货时间",
            key: "",
            minWidth: 100,
          },
        ],
        fhdata: [], // 商品表单数据
        orderLogColumns: [
          // 表头
          {
            title: "时间",
            key: "createTime",
            minWidth: 120,
          },
          {
            title: "操作者",
            key: "operatorName",
            minWidth: 120,
          },
          {
            title: "操作类型",
            key: "operatorType",
            minWidth: 120,
          },
          {
            title: "日志",
            key: "message",
            minWidth: 200,
          },
        ],
        // 订单日志数据
        orderLogData: [],
        responsed: ""
      };
    },
    mounted: function(){
        this.init();
    },
    methods: {
      init() {
        API_Order.getOrderComponent(this.orderData.orderId, this.orderData.storeId).then(res=> {
          if(res.success) {
            console.log(res)
            this.orderComponent = res.result;
            this.loading = false;
          }
        })
      },
      buyerResponse() {
          console.log("开始响应订单")
          API_Order.buyerResponseOrder(this.orderData.orderId).then(res => {
            if (res.success) {
              console.log("已响应订单");
              this.orderData.buyerReply = "已响应";
              this.responsed = this.data.orderId;
            }else {
              console.log("响应失败");
            }
          })
      },
      back() {
        this.$emit("backToOrderResponse", this.orderData.orderId);
      },
      //修改地址
      regionClick() {
        this.showRegion = true;
        this.regionId = "";
      },
      //弹出订单核销框
      orderTake() {
        this.orderTakeForm.qrCode = this.orderInfo.order.verificationCode;
        this.orderTakeModal = true;
      },
      //打印发货单
      printOrder(){
        this.printModal = true;
      },
      printHiddenInfo(){
        this.printHiddenFlag = !this.printHiddenFlag;
      },
      printCancel(){
        // this.printHiddenFlag = false;
      },
      //订单核销提交
      orderTakeSubmit() {
        // this.$refs.orderTakeForm.validate((valid) => {
        //   if (valid) {
        //     API_Order.orderTake(this.sn, this.orderTakeForm.qrCode).then(
        //       (res) => {
        //         if (res.success) {
        //           this.$Message.success("订单核销成功");
        //           this.orderTakeModal = false;
        //           this.getDataDetail();
        //         }
        //       }
        //     );
        //   }
        // });
      },
      //获取订单详细信息
      getDataDetail() {
        this.loading = true;
        // API_Order.getOrderDetail(this.orderId).then((res) => {
        //   this.loading = false;
        //   if (res.success) {
        //     //this.orderInfo = res.result;
        //     this.orderInfo.itemOrder=res.result.itemOrder
        //     this.orderInfo.orderGoods=res.result.orderGoods
        //     this.data = res.result.orderGoods;
        //     console.log(JSON.parse(this.data[0]))
        //     this.allowOperation = res.result.allowOperationVO;
        //     this.orderLogData = res.result.orderLogs;
        //   }
        // });
      },
      // 修改订单金额
      modifyPrice() {
        //默认要修改的金额为订单总金额
        this.modifyPriceForm.orderPrice = this.orderInfo.order.flowPrice;
        this.modal = true;
      },
      //修改订单金额提交
      modifyPriceSubmit() {
        this.$refs.modifyPriceForm.validate((valid) => {
          if (valid) {
            API_Order.modifyOrderPrice(this.sn, this.modifyPriceForm).then(
              (res) => {
                if (res.success) {
                  this.$Message.success("修改订单金额成功");
                  this.modal = false;
                  this.getDataDetail();
                }
              }
            );
          }
        });
      },
      // 选中的地址
      selectedRegion(val) {
        this.region = val[1];
        this.regionId = val[0];
      },
      //查询物流
      logistics() {
        this.logisticsModal = true;
        API_Order.getTraces(this.sn).then((res) => {
          if (res.success && res.result != null) {
            this.logisticsInfo = res.result;
          }
        });
      },
      //订单发货
      orderDeliver() {
        API_Order.getLogisticsChecked().then((res) => {
          if (res.success) {
            this.checkedLogistics = res.result;
            this.orderDeliverModal = true;
          }
        });
      },
      //订单发货提交
      orderDeliverySubmit() {
        this.$refs.orderDeliveryForm.validate((valid) => {
          if (valid) {
            API_Order.orderDelivery(this.sn, this.orderDeliveryForm).then(
              (res) => {
                if (res.success) {
                  this.$Message.success("订单发货成功");
                  this.orderDeliverModal = false;
                  this.getDataDetail();
                }
              }
            );
          }
        });
      },
      //弹出修改收货地址框
      editAddress() {
        this.addressModal = true;
        this.showRegion = false;
        this.regionId = this.orderInfo.order.consigneeAddressIdPath;
        this.region = this.orderInfo.order.consigneeAddressPath;
        this.addressForm.consigneeName = this.orderInfo.order.consigneeName;
        this.addressForm.consigneeMobile = this.orderInfo.order.consigneeMobile;
        this.addressForm.consigneeDetail = this.orderInfo.order.consigneeDetail;
        this.addressForm.consigneeAddressPath =
          this.orderInfo.order.consigneeAddressPath;
        this.addressForm.consigneeAddressIdPath =
          this.orderInfo.order.consigneeAddressIdPath;
      },
      //修改收货地址
      editAddressSubmit() {
        if (this.regionId == "") {
          this.$Message.error("请选择地址");
          return;
        }
        this.addressForm.consigneeAddressPath = this.region;
        this.addressForm.consigneeAddressIdPath = this.regionId;
        this.$refs.addressForm.validate((valid) => {
          if (valid) {
            API_Order.editOrderConsignee(this.sn, this.addressForm).then(
              (res) => {
                if (res.success) {
                  this.$Message.success("收货地址修改成功");
                  this.addressModal = false;
                  this.getDataDetail();
                }
              }
            );
          }
        });
      },
    },
    // mounted() {
    //   this.orderId = this.$route.query.orderId;
    //   this.getDataDetail();
    // },
    // 如果是从详情页返回列表页，修改列表页keepAlive为true，确保不刷新页面
    beforeRouteLeave(to, from, next){
      if(to.name === 'orderList' || to.name === 'virtualOrderList') {
        to.meta.keepAlive = true
      }
      next()
    }
  };
  </script>
  <style lang="scss" scoped>
  // 建议引入通用样式 可删除下面样式代码
  // @import "@/styles/table-common.scss";
  .table {
    margin-top: 20px;
  }
  .table th {
    text-align: center;
  }
  .table td {
    text-align: center;
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
  .lineH30{
    line-height: 30px;
  }
  .order-log-div {
    line-height: 30px;
    height: 500px;
    overflow-y: scroll;
  }
  
  dl dt {
    width: 100px;
    text-align: right;
  }
  .div-express-log {
    max-height: 300px;
    border: solid 1px #e7e7e7;
    background: #fafafa;
    overflow-y: auto;
    overflow-x: auto;
  }
  
  .express-log {
    margin-right: -10px;
    margin: 5px;
    padding: 10px;
    list-style-type: none;
    .time {
      width: 30%;
      display: inline-block;
    }
    .detail {
      width: 60%;
      margin-left: 30px;
      display: inline-block;
    }
    li {
      line-height: 30px;
    }
  }
  
  .layui-layer-wrap {
    dl {
      border-top: solid 1px #f5f5f5;
      margin-top: -1px;
      overflow: hidden;
  
      dt {
        font-size: 14px;
        line-height: 28px;
        display: inline-block;
        padding: 8px 1% 8px 0;
        color: #999;
      }
  
      dd {
        font-size: 14px;
        line-height: 28px;
        display: inline-block;
        padding: 8px 0 8px 8px;
        border-left: solid 1px #f5f5f5;
  
        .text-box {
          line-height: 40px;
          color: #333;
          word-break: break-all;
        }
      }
    }
  }
  
  
  .search {
  
  
    .div-item {
      line-height: 35px;
      display: flex;
  
      > .div-item-left {
        width: 80px;
      }
  
      > .div-item-right {
        flex: 1;
        word-break: break-all;
      }
    }
  
  
    button {
      margin-left: 5px;
    }
  
    .goods-total {
      padding: 20px;
      height: 150px;
      width: 100%;
  
      ul {
        margin-right: 10px;
        display: block;
        float: right;
        list-style-type: none;
        line-height: 25px;
      }
  
      .label {
        float: left;
        width: 500px;
        text-align: right;
      }
  
      .txt {
        float: left;
        width: 130px;
        text-align: right;
        font-family: verdana;
      }
  
      .flowPrice {
        color: $theme_color;
        font-size: 22px;
      }
    }
  }
  .theme_color{
    color: $theme_color;
  }
  .f14{
    font-size: 14px;
    color: #333;
  }
  .printgoodtitle{
    font-size: 14px;
    line-height: 1.5;
    margin-top: 15px;
    color: #333;
  }
  .printgoodinfo{
    // font-size: 14px;
    // background: #f2f2f2;
    // border-bottom:2px solid #333 ;
    padding: 10px;
    overflow: hidden;
    color: #333;
    .printgooditem{
      border-bottom: 1px solid #e8eaec;
      display: flex;
      align-items: flex-start;
      overflow: hidden;
      line-height: 30px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      .printgoodname{
        flex: 1;
        overflow: hidden;
        .printgoodguid{
          font-size: 12px;
          color:#999999;
          line-height:1.5;
          .printgoodguiditem{
            margin-right: 10px;
          }
        }
      }
      .printgoodprice{
        width: 135px;
        margin-left: 15px;
      }
      .printgoodnumber{
        width: 85px;
        margin-left: 15px;
      }
    }
  }
  @media print {
    @page{
      size:  auto;
      margin: 3mm;
    }
    html,body{
      height:inherit;
    }
  }
  </style>