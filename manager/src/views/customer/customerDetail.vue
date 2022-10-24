<template>

  <div class="search">

        <Card class="mt_10">
          <table class="contract-table" >
            <table-head style="font-size: 20px">&nbsp;&nbsp;客户信息:</table-head>
            <tr>
              <td class="col-title" >客户编码</td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;{{this.customerInfo.storeId}}</td>
              <td class="col-title">客户名称</td>
              <td colspan="3">&nbsp;&nbsp;{{this.customerInfo.storeName}}</td>
            </tr>
            <tr>
              <td class="col-title">客户简称</td>
              <td>&nbsp;&nbsp;{{this.customerInfo.storeName}}</td>
              <td class="col-title">英文名:</td>
              <td></td>
              <td class="col-title">拼音简码:</td>
              <td width="15%"></td>
            </tr>
            <tr>
              <td class="col-title">所在区域:</td>
              <td>&nbsp;&nbsp;test1</td>
              <td class="col-title">所在省市:</td>
              <td>&nbsp;&nbsp;test2</td>
              <td class="col-title">使用状态:</td>
              <td>&nbsp;&nbsp;test3</td>
            </tr>
            <tr>
              <td class="col-title">纳税登记号:</td>
              <td></td>
              <td class="col-title">地址1:</td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td class="col-title">邮编:              </td>
              <td></td>
              <td class="col-title">地址2:              </td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td class="col-title">公司电话:              </td>
              <td></td>
              <td class="col-title">地址3:              </td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td class="col-title">公司传真:              </td>
              <td></td>
              <td class="col-title">公司网站:              </td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td class="col-title">客户类型:              </td>
              <td></td>
              <td class="col-title">客户状态:              </td>
              <td></td>
              <td class="col-title">客户性质:              </td>
              <td></td>
            </tr>
            <tr>
              <td class="col-title">获得方式:              </td>
              <td></td>
              <td class="col-title">所属行业:              </td>
              <td></td>
              <td class="col-title">行业地位:              </td>
              <td></td>
            </tr>
            <tr>
              <td class="col-title">信用等级:</td>
              <td></td>
              <td class="col-title">维护级别:</td>
              <td></td>
              <td class="col-title">规模级别:</td>
              <td></td>
            </tr>
            <tr>
              <td class="col-title">客户描述:</td>
              <td colspan="5"></td>
            </tr>
            <tr>
              <td class="col-title">客户需求:</td>
              <td colspan="5"></td>
            </tr>
            <tr>
              <td class="col-title">客户价值:</td>
              <td colspan="5"></td>
            </tr>
            <tr>
              <td class="col-title">相关附件:</td>
              <td colspan="5"></td>
            </tr>
            <tr>
              <td class="col-title">客户经理:</td>
              <td></td>
              <td class="col-title">创建者:</td>
              <td></td>
              <td class="col-title">创建时间:</td>
              <td></td>
            </tr>
          </table>
          <div>
            关联合同
          </div>
          <Table
            :loading="loading"
            border
            :columns="columns"
            :data="data"
            ref="table"
          >
            <template slot-scope="{ row }" slot="action">
              <div class="row">
                <Button
                  type="info"
                  size="small"
                  @click="check(row)"
                >查看</Button
                >

              </div>
            </template>
          </Table>
          <div class="bottom-action" style="margin-top: 20px;text-align: right">
            <Button type="success" @click="back">返回</Button>
          </div>
        </Card>
  </div>




</template>

<script>
import * as API_Store from "@/api/shops";
import { getContractList } from "@/api/contract";
import liliMap from "@/views/my-components/map/index";
import region from "@/views/lili-components/region";
export default {
  name: "customerDetail",
  components: {
    liliMap,
    region,
  },
  data() {
    return {
      loading: true,
      region: [], //地区
      regionId: [], //地区id
      showRegion: false,
      customerInfo: {
      },
      columns: [
        {
          title: '编号',
          width: 120,
          key:'id',

        },
        {
          title: "名称",
          key: "",
          minWidth: 150,
          tooltip: true,
        },
        {
          title: "时间",
          key: "timeStart",
          width: 150,
          tooltip: true,
        },

        {
          title: "发起人",
          key: "buyerId",
          width: 120,
          tooltip: true,
        },
        {
          title: "金额",
          key: "amount",
          minWidth: 150,
          tooltip: true,
          render: (h, params) => {
            return h(
              "div",
              this.$options.filters.unitPrice(params.row.amount, "￥")
            );
          },
        },
        {
          title: "审核",
          key: "storeName",
          width: 120,
        },
        {
          title: "类型",
          key: "",
          width: 120,
        },
        {
          title: "状态",
          key: "",
          width: 120,
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 100,
          // render: (h, params) => {
          //   return h("div", [
          //     h(
          //       "Button",
          //       {
          //         props: {
          //           type: "info",
          //           size: "small",
          //         },
          //         style: {
          //           marginRight: "5px",
          //         },
          //         on: {
          //           click: () => {
          //
          //           },
          //         },
          //       },
          //       "查看"
          //     ),
          //   ]);
          // },
        },
      ],
      searchForm: {
        // 搜索框初始化对象
        pageNumber: 0, // 当前页数
        pageSize: 10, // 页面大小
        buyerId:""
        // sort: "startTime", // 默认排序字段
        // order: "desc", // 默认排序方式
      },
      data: [], // 表格数据
      total: 0, // 表格数据总数
      id:"",
    };
  },
  methods: {
    back(){
      this.$router.push({name: "customerList"})
    },
    //获取客户详细信息
    getDataDetail() {
      this.loading = true;
      API_Store.getStoreDetail(this.id).then((res) => {
        this.loading = false;
        if (res.success) {
          this.customerInfo=res.result
          this.searchForm.buyerId=this.customerInfo.storeId;
          getContractList(this.searchForm).then((res) => {
            if (res.success) {
              this.data = res.result.records;
              this.total = res.result.total;
              console.log(this.date)
            }
          });
        }
      });

    },
    check(row) {
      this.$router.push({name: "customerContractDetail", query: {data: row}})
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getDataDetail();
  },
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
    float: left;
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
.contract-table {
  margin: 1em 0;
  width: 100%;
  overflow: hidden;
  background: #FFF;
  color: black;
  border-collapse: collapse;
}
.contract-table tr {
  height: 35px;
  border: 1px solid #202020;
}
.contract-table  tr:nth-child(odd) {
  background-color: #ffffff;
}
.contract-table th {
  display: none;
  border: 1px solid #000;
  background-color: #ffffff;
  color: #FFF;
  padding: 1em;
}
.col-title {
  background-color: rgb(245,245,245);
  height: 2%;
  width: 15%;
}
td {
  border: 1px solid #d0d0d0;
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
