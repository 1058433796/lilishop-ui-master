<template>
  <div class="pintuan">
    <Card>
      <Row>
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="70"
          class="search-form">
          <Form-item label="合同号" prop="contractId">
            <Input
              type="text"
              v-model="searchForm.contractId"
              placeholder="请输入合同号"
              clearable
              style="width: 240px"
            />
          </Form-item>
          <Form-item label="采购方" prop="storeName">
            <Input
              type="text"
              v-model="searchForm.storeName"
              placeholder="请输入名称"
              clearable
              style="width: 240px"
            />
          </Form-item>
          <Form-item label="采购方商签署状态" prop="providerState">
            <Select
              v-model="searchForm.buyerState"
              placeholder="请选择"
              clearable
              style="width: 240px"
            >
              <Option value="已签署">已签署</Option>
              <Option value="未签署">未签署</Option>
            </Select>
          </Form-item>
          <Form-item label="合同时间">
            <DatePicker
              v-model="time"
              type="daterange"
              clearable
              @on-change='selectDateRange'
              placeholder="选择时间"
              style="width: 240px"
            ></DatePicker>
          </Form-item>
          <Form-item label="签署状态" prop="buyerState">
            <Select
              v-model="searchForm.providerState"
              placeholder="请选择"
              clearable
              style="width: 240px"
            >
              <Option value="已签署">已签署</Option>
              <Option value="未签署">未签署</Option>
            </Select>
          </Form-item>
          <Button
            @click="handleSearch"
            type="primary"
            class="search-btn"
            icon="ios-search"
          >搜索</Button>
          <Button @click="handleReset" class="search-btn">重置</Button>
        </Form>
      </Row>
      <Row class="operation padding-row">
        <download-excel
          style="display: inline-block"
          :data="data"
          :fields="excelColumns"
          :fetch="exportContract"
          name="订单.xls"
        >
          <Button>导出合同</Button>
        </download-excel>
      </Row>
      <Table :loading="loading" border :columns="columns" :data="data" ref="table">
        <template slot-scope="{ row }" slot="action">
          <div class="row">
            <Button
              type="info"
              size="small"
              @click="check(row)"
            >查看及签署</Button
            >

          </div>
        </template>
      </Table>
      <Row type="flex" justify="end" class="mt_10">
        <Page
          :current="searchForm.pageNumber + 1"
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
// 合同列表页面
import { getContractList,queryExportContract } from "@/api/contract";
import Cookies from "js-cookie";
export default {
  name: "contractList",
  data() {
    return {
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框初始化对象
        pageNumber: 0, // 当前页数
        pageSize: 10, // 页面大小
        // sort: "startTime", // 默认排序字段
        // order: "desc", // 默认排序方式
      },
      selectDate: null, // 选择的时间
      columns: [
        {
          title: "合同号",
          key: "id",
          minWidth: 120,
        },
        {
          title: "采购方",
          key: "storeName",
        },
        {
          title: "合同时间",
          key: "createTime",
        },
        {
          title: "采购方签署状态",
          key: "buyerState",
        },
        {
          title: "响应状态",
          render: (h, params) => {
            if (params.row.providerState==="未签署") {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      // type: "info",
                      size: "small",
                    },
                    style: {
                      width: 100,
                      color: "red",
                      marginRight: "5px",
                      "background-color": "pink"
                    },
                    on: {
                      click: () => {
                        console.log(params);
                        this.toResponse(params.row)
                      },
                    },
                  },
                  "未签署"
                ),])
            } else if ((params.row.providerState==="已签署")) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      // type: "info",
                      size: "small",
                    },
                    style: {
                      width: 100,
                      color: "green",
                      marginRight: "5px",
                      "background-color": "greenyellow"
                    },
                  },
                  "已签署"
                ),])
            }
          }
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 200,
        },
      ],
      time: "",
      data: [], // 表单数据
      total: 0, // 表单数据总数
      excelColumns: {
        // 导出excel的参数
        编号: "index",
        合同号: "id",
        采购方ID :"buyerId",
        采购方名称: "buyerName",
        供应商ID :"buyerId",
        供应商名称: "buyerName",
        采购方签署状态: "buyerState",
        供应商签署状态: "providerState",
        合同金额: "amount",
        合同时间: "createTime",
      },
    };
  },
  methods: {
    // 初始化数据
    init() {
      this.getDataList();
    },
    check(row) {
      this.$router.push({name: "contractDetail", query: {data: row}})
    },
    async exportContract() {
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
      const res = await queryExportContract(params);
      if (res.success) {
        if (res.result.length === 0) {
          this.$Message.warning("暂无合同");
          return [];
        }
        for (let i = 0; i < res.result.length; i++) {
          res.result[i].index = i + 1;
          res.result[i].amount = this.$options.filters.unitPrice(
            res.result[i].amount,
            "￥"
          );
        }
        return res.result;
      } else {
        this.$Message.warning("导出合同失败，请重试");
      }
    },
    // 改变页码
    changePage(v) {
      this.searchForm.pageNumber = v - 1;
      this.getDataList();
    },
    // 改变页数
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    // 搜索
    handleSearch() {
      this.searchForm.pageNumber = 0;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    // 重置
    handleReset() {
      this.searchForm = {};
      this.selectDate = "";
      this.searchForm.pageNumber = 0;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    // 时间段分别赋值
    selectDateRange(v) {
      if (v) {
        this.searchForm.startDate = v[0];
        this.searchForm.endDate = v[1];
        this.time = v;
      }
    },
    // 获取列表数据
    getDataList() {
      this.loading = true;
      // if (this.selectDate && this.selectDate[0] && this.selectDate[1]) {
      //   this.searchForm.startTime = this.selectDate[0].getTime();
      //   this.searchForm.endTime = this.selectDate[1].getTime();
      // } else {
      //   this.searchForm.startTime = null;
      //   this.searchForm.endTime = null;
      // }
      getContractList(this.searchForm).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.success) {
          this.data = res.result.records;
          this.total = res.result.total;
        }
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
@import "@/styles/table-common.scss";
.row Button {
  margin-right: 4px;

}
</style>
