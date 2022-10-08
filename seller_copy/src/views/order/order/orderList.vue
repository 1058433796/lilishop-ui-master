<template>
  <div class="search">
    <Card>
      <Form
        ref="searchForm"
        :model="searchForm"
        inline
        :label-width="70"
        class="search-form"
      >
        <Form-item label="订单编号" prop="orderSn">
          <Input
            type="text"
            v-model="searchForm.orderId"
            clearable
            placeholder="请输入订单编号"
            style="width: 160px"
          />
        </Form-item>
        <Form-item label="采购方" prop="buyerName">
          <Input
            type="text"
            v-model="searchForm.buyerName"
            clearable
            placeholder="请输入采购方名称"
            style="width: 160px"
          />
        </Form-item>
        <Form-item label="采购方响应状态" prop="buyerReply">
          <Select
            v-model="searchForm.buyerReply"
            placeholder="请选择"
            clearable
            style="width: 160px"
          >
            <Option value="已响应">已响应</Option>
            <Option value="未响应">未响应</Option>
          </Select>
        </Form-item>
        <Form-item label="发货状态" prop="distributionStatus">
          <Select
            v-model="searchForm.distributionStatus"
            placeholder="请选择"
            clearable
            style="width: 140px"
          >
            <Option value="已发货">已发货</Option>
            <Option value="待发货">待发货</Option>
            <Option value="已完成">已完成</Option>
            <Option value="已取消">已取消</Option>
          </Select>
        </Form-item>
        <Form-item label="下单时间">
        <DatePicker
          v-model="selectDate"
          type="datetimerange"
          format="yyyy-MM-dd"
          clearable
          @on-change="selectDateRange"
          placeholder="选择起始时间"
          style="width: 160px"
        ></DatePicker>
      </Form-item>
        <Form-item label="付款状态" prop="payStatus">
          <Select
            v-model="searchForm.payStatus"
            placeholder="请选择"
            clearable
            style="width: 160px"
          >
            <Option value="已付款">已付款</Option>
            <Option value="未付款">未付款</Option>
          </Select>
        </Form-item>
        <Form-item label="响应状态" prop="replyStatus">
          <Select
            v-model="searchForm.replyStatus"
            placeholder="请选择"
            clearable
            style="width: 160px"
          >
            <Option value="已响应">已响应</Option>
            <Option value="未响应">未响应</Option>
          </Select>
        </Form-item>

        <Button @click="handleSearch" type="primary" class="search-btn"
          >搜索</Button
        >
        <Button @click="handleReset" class="search-btn">重置</Button>
      </Form>
      <div class="export">
<!--        <Button type="primary" class="mr_10" @click="expressOrderDeliver">-->
<!--          批量发货-->
<!--        </Button>-->
        <download-excel
          style="display: inline-block"
          :data="data"
          :fields="excelColumns"
          :fetch="exportOrder"
          name="订单.xls"
        >
          <Button>导出订单</Button>
        </download-excel>
      </div>
      <Table
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        ref="table"
      ></Table>
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
    </Card>
  </div>
</template>

<script>
import * as API_Order from "@/api/order";
import JsonExcel from "vue-json-excel";
import Cookies from "js-cookie";
export default {
  name: "orderList",
  components: {
    "download-excel": JsonExcel,
  },
  data() {
    return {
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框初始化对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "", // 默认排序字段
        order: "", // 默认排序方式
        orderId:"",
        storeId:"",//供应商
        storeReply:"",//供应商响应状态
        distributionStatus:"",//发货状态
        //createTime:"",//创建时间
        payStatus:"",//付款状态
        replyStatus:"",//响应状态
        startDate: "", // 起始时间
        endDate: "", // 终止时间
        //orderSn: "",
        //buyerName: "",
        //orderStatus: "",
        //
        //orderType: "NORMAL",
      },
      selectDate: null,
      columns: [
        {
          title: "订单号",
          key: "orderId",
          minWidth: 200,
          tooltip: true,
        },

        {
          title: "采购方",
          key: "buyerName",
          width: 120,
          tooltip: true,
        },
        {
          title: "订单金额",
          key: "orderAmount",
          minWidth: 100,
          tooltip: true,
          align:"right",
          render: (h, params) => {
            return h(
              "div",
              this.$options.filters.unitPrice(params.row.orderAmount, "￥")
            );
          },
        },
        {
          title: "下单时间",
          key: "createTime",
          width: 170,
        },
        {
          title: "采购方响应状态",
          key: "buyerReply",
          minWidth: 100,
          render: (h, params) => {
            if (params.row.buyerReply== "已响应") {
              return h("div", [
                h("tag", { props: { color: "magenta" } }, "已响应"),
              ]);
            } else if (params.row.buyerReply == "未响应") {
              return h("div", [
                h("tag", { props: { color: "blue" } }, "未响应"),
              ]);
            }
          },
        },
        {
          title: "付款状态",
          key: "payStatus",
          minWidth: 100,
          render: (h, params) => {
            if (params.row.payStatus == "已付款") {
              return h("div", [
                h("tag", { props: { color: "magenta" } }, "已付款"),
              ]);
            } else if (params.row.payStatus == "未付款") {
              return h("div", [
                h("tag", { props: { color: "blue" } }, "未付款"),
              ]);
            }
          },
        },
        {
          title: "发货状态",
          key: "distributionStatus",
          minWidth: 100,
          render: (h, params) => {
            if (params.row.distributionStatus == "已发货") {
              return h("div", [
                h("tag", { props: { color: "cyan" } }, "已发货"),
              ]);
            } else if (params.row.distributionStatus == "待发货") {
              return h("div", [
                h("tag", { props: { color: "geekblue" } }, "待发货"),
              ]);
            }  else if (params.row.orderStatus == "已完成") {
              return h("div", [
                h("tag", { props: { color: "green" } }, "已完成"),
              ]);
            } else if (params.row.orderStatus == "TAKE") {
              return h("div", [
                h("tag", { props: { color: "volcano" } }, "待核验"),
              ]);
            } else if (params.row.orderStatus == "CANCELLED") {
              return h("div", [
                h("tag", { props: { color: "red" } }, "已取消"),
              ]);
            }
          },
        },
        {
          title: "响应状态",
          key: "replyStatus",
          minWidth: 100,
          render: (h, params) => {
            if (params.row.replyStatus == "已响应") {
              return h("div", [
                h("tag", { props: { color: "magenta" } }, "已响应"),
              ]);
            } else if (params.row.replyStatus == "未响应") {
              return h("div", [
                h("tag", { props: { color: "blue" } }, "已响应"),
              ]);
            }
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.detail(params.row);
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
      excelColumns: {
        // 导出excel的参数
        编号: "index",
        订单号: "orderId",
        采购方ID :"buyerId",
        采购方名称: "buyerName",
        收货人: "consigneeName",
        收货人联系电话: "buyerPhone",
        收货地址: "buyerAddress",
        订单金额: "orderAmount",
        采购方响应状态: "buyerReply",
        付款状态: "payStatus",
        发货状态: "distributionStatus",
        响应状态: "replyStatus",
        创建时间: "createTime",
      },
    };
  },
  methods: {
    /**
     * 批量发货
     */
    expressOrderDeliver() {
      this.$router.push({
        path: "/export-order-deliver",
      });
    },
    // 初始化数据
    init() {
      this.getDataList();
    },
    // 改变页码
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
    },
    // 改变页数
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    // 搜索订单
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    // 重置
    handleReset() {
      this.searchForm = {};
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.selectDate = null;
      this.searchForm.startDate = "";
      this.searchForm.endDate = "";
      // 重新加载数据
      this.getDataList();
    },
    // 起始时间处理
    selectDateRange(v) {
      if (v) {
        this.searchForm.startDate = v[0];
        this.searchForm.endDate = v[1];


      }
    },
    // 获取表格数据
    getDataList() {
      this.loading = true;
      API_Order.getOrderList(this.searchForm).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.records;
          this.total = res.result.total;
        }
      });
    },
    // 导出的待发货订单数据
    async exportOrder() {
      let userInfo = JSON.parse(Cookies.get("userInfoSeller"));
      const params = {
        // 搜索框初始化对象
        pageNumber: 1, // 当前页数
        pageSize: 10000, // 页面大小
        sort: "startDate", // 默认排序字段
        order: "desc", // 默认排序方式
        startDate: "", // 起始时间
        endDate: "", // 终止时间
        orderId: "",
        buyerName: "",
        tag: "WAIT_SHIP",
        orderType: "NORMAL",
        storeId: userInfo.id,
      };
      const res = await API_Order.queryExportOrder(params);
      if (res.success) {
        if (res.result.length === 0) {
          this.$Message.warning("暂无订单");
          return [];
        }
        for (let i = 0; i < res.result.length; i++) {
          res.result[i].index = i + 1;
          // res.result[i].consigneeAddress =
          //   res.result[i].consigneeAddressPath.replace(/,/g, "") +
          //   res.result[i].consigneeDetail;
          res.result[i].orderAmount = this.$options.filters.unitPrice(
            res.result[i].orderAmount,
            "￥"
          );
        }
        return res.result;
      } else {
        this.$Message.warning("导出订单失败，请重试");
      }
    },
    // 查看订单详情
    detail(v) {

      let orderId = v.orderId;
      this.$router.push({
        name: "order-detail",
        query: { orderId: orderId },
      });
    },
  },
  mounted() {
    this.init();
  },
  // 页面缓存处理，从该页面离开时，修改KeepAlive为false，保证进入该页面是刷新
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  },
};
</script>
<style lang="scss">
// 建议引入通用样式 可删除下面样式代码
@import "@/styles/table-common.scss";
.export {
  margin: 10px 20px 10px 0;
}
</style>
