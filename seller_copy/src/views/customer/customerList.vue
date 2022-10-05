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
        <Form-item label="客户名" prop="buyerName">
          <Input
            type="text"
            v-model="searchForm.buyerName"
            clearable
            placeholder="请输入客户名"
            style="width: 160px"
          />
        </Form-item>
        <Form-item label="联系方式" prop="buyerPhone">
          <Input
            type="text"
            v-model="searchForm.buyerPhone"
            clearable
            placeholder="请输入联系方式"
            style="width: 160px"
          />
        </Form-item>


        <Button @click="handleSearch" type="primary" class="search-btn"
          >搜索</Button
        >
        <Button @click="handleReset" class="search-btn">重置</Button>
      </Form>
      <Table
        :loading="loading"
        border
        :columns="columns"
        :data="data"
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
    </Card>
  </div>
</template>

<script>
import * as API_Order from "@/api/customer";
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

        storeId:"",//供应商
        buyerName: "",
        buyerPhone: "",

      },
      columns: [
        {
          title: "用户名",
          key: "buyerName",
          minWidth: 200,
          tooltip: true,
        },//buyerName
        {
          title: "地址",
          key: "storeAddressPath",
          width: 200,
          tooltip: true,
        },//buyerstoreAddressPath

        {
          title: "联系方式",
          key: "buyerPhone",
          width: 120,
          tooltip: true,
        },//buyerPhone
        {
          title: "交易金额",
          key: "tradeAmount",
          minWidth: 100,
          tooltip: true,
          render: (h, params) => {
            return h(
              "div",
              this.$options.filters.unitPrice(params.row.tradeAmount, "￥")
            );
          },
        },//tradeAmount
        {
          title: "最近交易时间",
          key: "latestTime",
          width: 170,
        },//latestTime

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
    };
  },
  methods: {
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
    // 搜索
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
      // 重新加载数据
      this.getDataList();
    },
    // 获取表格数据
    getDataList() {
      this.loading = true;
      API_Order.getCustomerList(this.searchForm).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.records;
          this.total = res.result.total;
        }
      });
    },

    // 查看订单详情
    detail(v) {

      let id = v.id;
      this.$router.push({
        name: "customer-detail",
        query: { id: id },
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
