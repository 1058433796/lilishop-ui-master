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
          <Form-item label="供应商" prop="storeName">
            <Input
              type="text"
              v-model="searchForm.storeName"
              placeholder="请输入名称"
              clearable
              style="width: 240px"
            />
          </Form-item>
          <Form-item label="供应商签署状态" prop="providerState">
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
              v-model="searchForm.buyerState"
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
        <Button  type="primary">导出合同</Button>
      </Row>
      <Table class="table" :loading="loading" border :columns="columns" :data="data" ref="table">
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
// 合同列表页面
import { getContractList } from "@/api/promotion";
export default {
  name: "pintuan",
  data() {
    return {
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框初始化对象
        pageNumber: 1, // 当前页数
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
          title: "供应商",
          key: "storeName",
        },
        {
          title: "合同时间",
          key: "createTime",
        },
        {
          title: "供应商签署状态",
          key: "providerState",
        },
        {
          title: "签署状态",
          render: (h, params) => {
                      if (params.row.buyerState==="未签署") {
                        return h("div", [
                          h(
                            "Button",
                            {
                              props: {
                                // type: "info",
                                size: "small",
                                disabled: true,
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
                      } else if ((params.row.buyerState==="已签署")) {
                        return h("div", [
                          h(
                            "Button",
                            {
                              props: {
                                // type: "info",
                                size: "small",
                                disabled: true,
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
    };
  },
  methods: {
    // 初始化数据
    init() {
      this.getDataList();
    },
    check(row) {
      this.$router.push({name: "contractDetailSingle", query: {data: row}})
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
    // // 新建拼团
    // newAct() {
    //   this.$router.push({ name: "pintuan-edit" });
    // },
    // // 编辑拼团
    // edit(v) {
    //   this.$router.push({ name: "pintuan-edit", query: { id: v.id } });
    // },
    // // 管理拼团商品
    // manage(v, status) {
    //   this.$router.push({ name: "pintuan-goods", query: { id: v.id, status: status } });
    // },
    // 手动开启拼团活动
    // open(v) {
    //   let sTime = new Date();
    //   sTime.setMinutes(sTime.getMinutes() + 10);
    //   let eTime = new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1);
    //   this.openStartTime = sTime.getTime();
    //   this.openEndTime = eTime.getTime();
    //   this.$Modal.confirm({
    //     title: "确认开启(默认为当前时间的十分钟之后)",
    //     content: "您确认要开启此拼团活动?",
    //     onOk: () => {
    //       let params = {
    //         startTime: this.openStartTime,
    //         endTime: this.openEndTime,
    //       };
    //       editPintuanStatus(v.id, params).then((res) => {
    //         this.$Modal.remove();
    //         if (res.success) {
    //           this.$Message.success("开启活动成功");
    //           this.getDataList();
    //         }
    //       });
    //     },
    //     render: (h) => {
    //       return h("div", [
    //         h("DatePicker", {
    //           props: {
    //             type: "datetimerange",
    //             placeholder: "请选择开始时间和结束时间",
    //             value: [sTime, eTime],
    //           },
    //           style: {
    //             width: "350px",
    //           },
    //           on: {
    //             input: (val) => {
    //               if (val[0]) {
    //                 this.openStartTime = val[0].getTime();
    //               }
    //               if (val[1]) {
    //                 this.openEndTime = val[1].getTime();
    //               }
    //             },
    //           },
    //         }),
    //       ]);
    //     },
    //   });
    // },
    // 关闭拼团活动
    // close(v) {
    //   this.$Modal.confirm({
    //     title: "确认关闭",
    //     content: "您确认要关闭此拼团活动?",
    //     loading: true,
    //     onOk: () => {
    //       editPintuanStatus(v.id).then((res) => {
    //         this.$Modal.remove();
    //         if (res.success) {
    //           this.$Message.success("关闭活动成功");
    //           this.getDataList();
    //         }
    //       });
    //     },
    //   });
    // },
    // // 删除拼团活动
    // remove(v) {
    //   this.$Modal.confirm({
    //     title: "确认删除",
    //     content: "您确认要删除此拼团活动?",
    //     loading: true,
    //     onOk: () => {
    //       // 删除
    //       deletePintuan(v.id).then((res) => {
    //         this.$Modal.remove();
    //         if (res.success) {
    //           this.$Message.success("操作成功");
    //           this.getDataList();
    //         }
    //       });
    //     },
    //   });
    // },
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
.table {
  text-align: center;
}
</style>
