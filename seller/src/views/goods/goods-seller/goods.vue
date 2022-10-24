<template>
  <div class="search">
    <Card>
      <Row @keydown.enter.native="handleSearch">
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="70"
          class="search-form"
        >
          <Form-item label="项目名称" prop="itemName">
            <Input
              type="text"
              v-model="searchForm.itemName"
              placeholder="请输入项目名称"
              clearable
              style="width: 200px"
            />
          </Form-item>

          <Form-item label="地点" prop="createLocation">
            <Input
              type="text"
              v-model="searchForm.createLocation"
              placeholder="请输入地点"
              clearable
              style="width: 200px"
            />
          </Form-item>

          <!-- <Form-item label="创建时间" prop="createTime">
            <date-picker format="yyyy-MM-dd HH:mm:ss"
            v-model="searchForm.createTime"
            placeholder="选择时间"
             />
          </Form-item> -->
          <Button @click="handleSearch" type="primary" class="search-btn">搜索</Button>
          <Button @click="handleReset" class="search-btn">重置</Button>
        </Form>
      </Row>
      <Row class="operation padding-row">
        <Button @click="addGoods" type="primary">添加项目</Button>
      </Row>

      <Table
        class="mt_10"
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        ref="table"
        textAlign="center"

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
import {
  getGoodsListDataSeller,
  getGoodsSkuListDataSeller,
  updateGoodsSkuStocks,
  upGoods,
  lowGoods,
  deleteGoods,
  batchShipTemplate,
} from "@/api/goods";
import * as API_Shop from "@/api/shops";
import Cookies from "js-cookie";
import moment from "moment";

export default {
  name: "goods",
  data() {
    return {
      id: "", //要操作的id
      loading: true, // 表单加载状态
      shipTemplateForm: {}, // 物流模板
      shipTemplateModal: false, // 物流模板是否显示
      logisticsTemplate: [], // 物流列表
      updateStockModalVisible: false, // 更新库存模态框显隐
      stockAllUpdate: undefined, // 更新库存数量
      searchForm: {
        // 搜索框初始化对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "create_time", // 默认排序字段
        order: "desc", // 默认排序方式
        store_id:''//当前店铺id
      },
      stockList: [], // 库存列表
      form: {
        // 添加或编辑表单对象初始化数据
        goodsName: "",
        sn: "",
        marketEnable: "",
        price: "",
        sellerName: "",
      },
      updateStockColumns: [
        {
          title: "sku规格",
          key: "sn",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, params.row.simpleSpecs);
          },
        },
        {
          title: "审核状态",
          key: "authFlag",
          width: 130,
          render: (h, params) => {
            if (params.row.authFlag == "TOBEAUDITED") {
              return h("Tag", { props: { color: "blue" } }, "待审核");
            } else if (params.row.authFlag == "PASS") {
              return h("Tag", { props: { color: "green" } }, "通过");
            } else if (params.row.authFlag == "REFUSE") {
              return h("Tag", { props: { color: "red" } }, "审核拒绝");
            }
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          render: (h, params) => {
            let vm = this;
            return h("InputNumber", {
              props: {
                value: params.row.quantity,
              },
              on: {
                "on-change": (event) => {
                  vm.stockList[params.index].quantity = event;
                },
              },
            });
          },
        },
      ],
      // 表单验证规则
      formValidate: {},
      submitLoading: false, // 添加或编辑提交状态
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center",
        // },
        {
          title: "项目名称",
          key: "itemName",
          width: 400,
          // tooltip: true,
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 400,
        },
        {
          title: "地点",
          key: "createLocation",
          width: 400,
          // tooltip: true,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          fixed: "right",
          width: 600,
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
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.editGoods(params.row);
                    },
                  },
                },
                "详情"
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
                  },
                  on: {
                    click: () => {
                      this.itemScheme(params.row);
                    },
                  },
                },
                "项目方案"
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
                  },
                  on: {
                    click: () => {
                      this.showItermScheme(params.row);
                    },
                  },
                },
                "采购"
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
    init() {
      // 初始化数据
      this.getDataList();
    },
    // 添加商品
    addGoods() {
      this.$router.push({ name: "goods-operation" , flag:false});
    },
    // 编辑商品
    editGoods(v) {
      this.$router.push({ name: "goods-operation-edit", query: { id: v.itemId ,flag:true} });
    },
    itemScheme(v) {
      console.log('v')
      console.log(v.itemName)
      this.$router.push({ name: "item-scheme", query: { itemid: v.itemId, buyerId:v.buyerId,itemName:v.itemName} });
    },
    showItermScheme(v){
      console.log(v)
      this.$router.push({ name: "goods-operation-edit", query: { id: v.itemId} });
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
    // 搜索
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    // 重置搜索条件
    handleReset() {
      this.searchForm = {};
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      // 重新加载数据
      this.getDataList();
    },
    // 清除多选
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    // 添加选中项
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    // 获取商品列表数据
    getDataList() {
      this.loading = true;
      let userInfo = JSON.parse(Cookies.get("userInfoSeller"));
      console.log('userinfo',userInfo)
      this.searchForm.buyerId=userInfo.id
      // this.searchForm.createTime=this.$options.filters.unixToDate(
      //       this.searchForm.createTime / 1000
      //     );

      // this.searchForm.createTime = moment(this.searchForm.createTime).format('YYYY-MM-DD HH:mm:ss')
      // console.log('searchForm',this.searchForm)
      // 带多条件搜索参数获取表单数据
      getGoodsListDataSeller(this.searchForm).then((res) => {
        this.loading = false;
        console.log('form',this.searchForm)
        console.log('res',res)
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
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/table-common.scss";
</style>
