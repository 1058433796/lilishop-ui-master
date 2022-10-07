<template>
  <div class="search">
    <Card>
      <Row @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
          <Form-item label="产品编号" prop="goodsId">
            <Input type="text" v-model="searchForm.goodsId" placeholder="请输入" clearable style="width: 200px" />
          </Form-item>

          <Form-item label="产品名称" prop="goodsName">
            <Input type="text" v-model="searchForm.goodsName" placeholder="请输入" clearable style="width: 200px" />
          </Form-item>

          <Form-item label="产品状态" prop="marketEnable">
            <Select v-model="searchForm.marketEnable" style="width:200px">
              <Option v-for="(item,idx) in marketEnableList" :value="item.value" :key="idx">{{ item.label }}</Option>
            </Select>
          </Form-item>

          <Form-item label="审核状态" prop="authFlag">
            <Select v-model="searchForm.authFlag" style="width:200px">
              <Option v-for="(item, idx) in authFlagList" :value="item.value" :key="idx">{{ item.label }}</Option>
            </Select>
          </Form-item>

          <Button @click="handleSearch" type="primary" class="search-btn">搜索</Button>
          <Button @click="handleReset" class="search-btn">重置</Button>
        </Form>
      </Row>
      <Row class="operation padding-row">
        <Button @click="addGoods" type="primary">添加项目</Button>
      </Row>

      <Table class="mt_10" :loading="loading" border :columns="columns" :data="data" ref="table">
        <!-- 商品栏目格式化 -->
        <template slot="goodsSlot" slot-scope="{ row }">
          <div style="margin-top: 5px; height: 90px; display: flex; justify-content: center;">
              <img :src="row.original" style="height: 80px; margin-top: 3px; width: 80px;" />
          </div>
        </template>
      </Table>

      <Row type="flex" justify="end" class="mt_10">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
          @on-page-size-change="changePageSize" :page-size-opts="[10, 20, 50]" size="small" show-total show-elevator
          show-sizer></Page>
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
          title: "产品编号",
          key: "goodsId",
          width: 150,
          align:"center",
          tooltip: true,
        },
        {
          title: "产品名称",
          key: "goodsName",
          width: 150,
          align:"center",
          tooltip: true,
        },
        {
          title: "图片",
          key: "thumbnail",
          minwidth: 200,
          slot: "goodsSlot"
        },
        {
          title: "二维码",
          width: 200,
          align:"center",
          tooltip: true,
        },
        {
          title: "展示价格",
          key: "goodsDisplayPrice",
          align: "center",
          align:"center",
          width: 100,
        },
        {
          title: "产品状态",
          key: "marketEnable",
          width: 150,
          align:"center",
          tooltip: true,
          render:(h, {row}) => {
            let color = "red";
            let title = "未知状态";
            if(row.marketEnable === 'UPPER'){
              color = "blue";
              title = "在售";
            }else if(row.marketEnable === 'DOWN'){
              color = "red";
              title = "下架";
            }
            return h("Tag",{
              props:{
                color     
              }
            }, title)
          }
        },
        {
          title: "审核状态",
          key: "authFlag",
          width: 150,
          align:"center",
          tooltip: true,
          render: (h, {row}) => {
            let color = "red";
            let title = "未知状态";
            if(row.authFlag === 'TOBEAUDITED'){
              color = "red";
              title = "待审";
            }else if(row.authFlag === 'PASS'){
              color = 'green';
              title = '完成';
            }else if(row.authFlag === 'REFUSE'){
              color = 'red';
              title = '拒绝';
            }
            return h("Tag", {
              props: {
                color
              }
            }, title)
          }
        },
        {
          title: "操作",
          align: "center",
          width: 200,
          align:"center",
          render: (h, {row}) => {
            let viewBtn = h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              on: {
                click: () => {
                  this.$router.push({
                    name: 'goods-detail',
                    params:row
                  })
                }
              }
            },"查看");
            let editBtn = h('Button', {
              props: {
                type: 'info',
                size: 'small'
              },
              on: {
                click: () => {
                  this.$router.push({
                    name: 'goods-operation',
                    query: {
                      goodsId: row.id
                    }
                  })
                }
              }
            },"编辑");

            let delBtn = h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  let params = {goodsId: [row.id].toString()}
                  deleteGoods(params).then(res => {
                    console.log(res);
                    this.getDataList();
                  })
                }
              }
            },"删除");

            return h("div", [viewBtn, editBtn, delBtn]);
          },
        },
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数

      marketEnableList: [{ value: 'UPPER', label: '在售' }, { value: 'DOWN', label: '下架' }],
      authFlagList: [{ value: 'PASS', label: '完成' }, { value: 'REFUSE', label: '拒绝' }, { value: 'TOBEAUDITED', label: '待审' }]
    };
  },
  methods: {
    init() {
      // 初始化数据
      this.getDataList();
    },
    // 添加商品
    addGoods() {
      this.$router.push({ name: "goods-operation" });
    },
    // 编辑商品
    editGoods(v) {
      this.$router.push({ name: "goods-operation-edit", query: { id: v.itemId } });
    },
    itemScheme(v) {
      console.log('????')
      console.log(v)
      this.$router.push({ name: "item-scheme", query: { id: v.itemId } });
    },

    //批量操作
    handleDropdown(v) {
      //批量上架
      if (v == "uppers") {
        this.uppers();
      }
      //批量下架
      if (v == "lowers") {
        this.lowers();
      }
      //批量删除商品
      if (v == "deleteAll") {
        this.deleteAll();
      }
      //批量设置物流模板
      if (v == "batchShipTemplate") {
        this.batchShipTemplate();
      }
    },
    // 获取库存详情
    getStockDetail(id) {
      getGoodsSkuListDataSeller({ goodsId: id, pageSize: 1000 }).then((res) => {
        if (res.success) {
          this.updateStockModalVisible = true;
          this.stockAllUpdate = undefined;
          this.stockList = res.result.records;
        }
      });
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
      this.searchForm = {
        // 搜索框初始化对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "create_time", // 默认排序字段
        order: "desc", // 默认排序方式
      };
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
      // let userInfo = JSON.parse(Cookies.get("userInfoSeller"));
      // console.log('userinfo',userInfo)
      // this.searchForm.buyerId=userInfo.id

      // 带多条件搜索参数获取表单数据
      getGoodsListDataSeller(this.searchForm).then((res) => {
        this.loading = false;
        console.log('form', this.searchForm)
        console.log('res', res)
        if (res.success) {
          this.data = res.result.records;
          this.total = res.result.total;
        }
      });
    },

    //下架商品
    lower(v) {
      this.$Modal.confirm({
        title: "确认下架",
        content: "您确认要下架 " + v.goodsName + " ?",
        loading: true,
        onOk: () => {
          let params = {
            goodsId: v.id,
          };
          lowGoods(params).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("下架成功");
              this.getDataList();
            }
          });
        },
      });
    },
    //批量下架
    lowers() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要下架的商品");
        return;
      }
      this.$Modal.confirm({
        title: "确认下架",
        content: "您确认要下架所选的 " + this.selectCount + " 个商品?",
        loading: true,
        onOk: () => {
          let ids = [];
          this.selectList.forEach(function (e) {
            ids.push(e.id);
          });
          let params = {
            goodsId: ids.toString(),
          };
          // 批量上架
          lowGoods(params).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("下架成功");
              this.clearSelectAll();
              this.getDataList();
            }
          });
        },
      });
    },
    //批量删除商品
    deleteAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的商品");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 个商品?",
        loading: true,
        onOk: () => {
          let ids = [];
          this.selectList.forEach(function (e) {
            ids.push(e.id);
          });
          let params = {
            goodsId: ids.toString(),
          };
          // 批量删除
          deleteGoods(params).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.clearSelectAll();
              this.getDataList();
            }
          });
        },
      });
    },
    //批量上架
    uppers(v) {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要上架的商品");
        return;
      }
      this.$Modal.confirm({
        title: "确认上架",
        content: "您确认要上架所选的 " + this.selectCount + " 个商品?",
        loading: true,
        onOk: () => {
          let ids = [];
          this.selectList.forEach(function (e) {
            ids.push(e.id);
          });
          let params = {
            goodsId: ids.toString(),
          };
          // 批量上架
          upGoods(params).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("上架成功");
              this.clearSelectAll();
              this.getDataList();
            }
          });
        },
      });
    },
    upper(v) {
      this.$Modal.confirm({
        title: "确认上架",
        content: "您确认要上架 " + v.goodsName + " ?",
        loading: true,
        onOk: () => {
          let params = {
            goodsId: v.id,
          };
          upGoods(params).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("上架成功");
              this.getDataList();
            }
          });
        },
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/table-common.scss";
</style>
