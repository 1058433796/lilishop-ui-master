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
        class="mt_10 table"
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        ref="table"

      >
        <!-- 商品栏目格式化 -->
        <template slot="goodsSlot" slot-scope="{ row }">
          <div style="margin-top: 5px; height: 90px; display: flex">
            <div style="">
              <img
                :src="row.original"
                style="height: 80px; margin-top: 3px; width: 70px"
              />
            </div>


            <div style="margin-left: 13px">
              <div class="div-zoom">
                <a @click="linkTo(row.id, row.skuId)">{{ row.goodsName }}</a>
              </div>
              <Poptip trigger="hover" title="扫码在手机中查看" transfer>
                <div slot="content">
                  <!-- <vueQr>123</vueQr> -->
                  <vue-qr
                    :text="wapLinkTo(row.id, row.skuId)"
                    :margin="0"
                    colorDark="#000"
                    colorLight="#fff"
                    :size="150"
                  ></vue-qr>
                </div>
                <img
                  src="../../../assets/qrcode.svg"
                  class="hover-pointer"
                  width="20"
                  height="20"
                  alt=""
                />
              </Poptip>
            </div>
          </div>       
         </template>
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

    <Modal
      title="更新库存"
      v-model="updateStockModalVisible"
      :mask-closable="false"
      :width="500"
    >
      <Tabs value="updateStock">
        <TabPane label="手动规格更新" name="updateStock">
          <Table
            class="mt_10"
            :columns="updateStockColumns"
            :data="stockList"
            border
          ></Table>
        </TabPane>
        <TabPane label="批量规格更新" name="stockAll">
          <Input type="number" v-model="stockAllUpdate" placeholder="统一规格修改" />
        </TabPane>
      </Tabs>

      <div slot="footer">
        <Button type="text" @click="updateStockModalVisible = false">取消</Button>
        <Button type="primary" @click="updateStock">更新</Button>
      </div>
    </Modal>

    <!-- 批量设置物流模板 -->
    <Modal
      title="批量设置物流模板"
      v-model="shipTemplateModal"
      :mask-closable="false"
      :width="500"
    >
      <Form ref="shipTemplateForm" :model="shipTemplateForm" :label-width="120">
        <FormItem class="form-item-view-el" label="物流模板" prop="templateId">
          <Select v-model="shipTemplateForm.templateId" style="width: 200px">
            <Option v-for="item in logisticsTemplate" :value="item.id" :key="item.id"
              >{{ item.name }}
            </Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="shipTemplateModal = false">取消</Button>
        <Button type="primary" @click="saveShipTemplate">更新</Button>
      </div>
    </Modal>
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
          tooltip: true,
        },
        {
          title: "创建时间",
          key: "createTime",
        },
        {
          title: "地点",
          key: "createLocation",
          tooltip: true,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          fixed: "right",
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
                      this.editGoods(params.row);
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
      this.$router.push({ name: "goods-operation" });
    },
    // 编辑商品
    editGoods(v) {
      this.$router.push({ name: "goods-operation-edit", query: { id: v.itemId } });
    },
    itemScheme(v) {
      console.log('v')
      console.log(v.itemName)
      this.$router.push({ name: "item-scheme", query: { itemid: v.itemId, buyerId:v.buyerId,itemName:v.itemName} });
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
    // 更新库存
    updateStock() {
      let updateStockList = this.stockList.map((i) => {
        let j = { skuId: i.id, quantity: i.quantity };
        if (this.stockAllUpdate) {
          j.quantity = this.stockAllUpdate;
        }
        return j;
      });
      updateGoodsSkuStocks(updateStockList).then((res) => {
        if (res.success) {
          this.updateStockModalVisible = false;
          this.$Message.success("更新库存成功");
          this.getDataList();
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
    //保存物流模板信息
    saveShipTemplate() {
      this.$Modal.confirm({
        title: "确认设置物流模板",
        content: "您确认要设置所选的 " + this.selectCount + " 个商品的物流模板?",
        loading: true,
        onOk: () => {
          let ids = [];
          this.selectList.forEach(function (e) {
            ids.push(e.id);
          });
          // 批量设置物流模板
          batchShipTemplate(this.shipTemplateForm).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("物流模板设置成功");
              this.clearSelectAll();
              this.getDataList();
            }
            this.shipTemplateModal = false;
          });
        },
      });
    },
    //批量设置物流模板
    batchShipTemplate() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要设置物流模板的商品");
        return;
      }
      this.getShipTempList();
      let data = [];
      this.selectList.forEach(function (e) {
        data.push(e.id);
      });
      this.shipTemplateForm.goodsId = data;
      this.shipTemplateModal = true;
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
    // 获取物流模板
    getShipTempList() {
      API_Shop.getShipTemplate().then((res) => {
        if (res.success) {
          this.logisticsTemplate = res.result;
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
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/table-common.scss";
.table{
  text-align: center;
}
</style>
