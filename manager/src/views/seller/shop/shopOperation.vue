<template>
<card>
  {{shopForm}}
    <div class = "contract-detail-top">
      <Tabs>
          <TabPane label="供应商详情" name="INFO">
              <table class="contract-table">
                  <tr>
                      <td class="col-title">客户编码</td>
                      <td> {{shopForm.storeId }}</td>
                      <td class="col-title">客户名称</td>
                      <td colspan="3"> {{shopForm.storeName }} </td>
                  </tr>
                  <tr>
                      <td class="col-title">客户简称</td>
                      <td></td>
                      <td class="col-title">英文名</td>
                      <td>  </td>
                      <td class="col-title">拼音简码</td>
                      <td> </td>
                  </tr>
                  <tr>
                    <td class="col-title">所在区域</td>
                    <td> {{shopForm.storeAddressPath}}  </td>
            
                    <td class="col-title">所在省市</td>
                    <td> {{shopForm.storeAddressPath.split(" ")[0] +" " + shopForm.storeAddressPath.split(" ")[1]}} </td>
                    <td class="col-title">使用状态</td>
                    <td> </td>
                  </tr>
                  <tr>
                      <td class="col-title">纳税登记号</td>
                      <td></td>
              
                      <td class="col-title">地址1</td>
                      <td colspan="3">  </td>
                  </tr>
                  <tr>
                    <td class="col-title">邮编</td>
                    <td></td>
                    <td class="col-title">地址2</td>
                    <td colspan="3"> </td>
                  </tr>
                  <tr>
                    <td class="col-title">公司电话</td>
                    <td></td>
                    <td class="col-title">地址3</td>
                    <td colspan="3"> </td>
                  </tr>
                  <tr>
                    <td class="col-title">公司传真</td>
                    <td></td>
                    <td class="col-title">公司网站</td>
                    <td colspan="3"> </td>
                  </tr>
                  <tr>
                    <td class="col-title">客户类型</td>
                    <td></td>
                    <td class="col-title">客户状态</td>
                    <td>  </td>
                    <td class="col-title">客户性质</td>
                    <td> </td>
                </tr>
                <tr>
                  <td class="col-title">获得方式</td>
                  <td></td>
                  <td class="col-title">所属行业</td>
                  <td>  </td>
                  <td class="col-title">行业地位</td>
                  <td> </td>
              </tr>
              <tr>
                <td class="col-title">信用等级</td>
                <td></td>
                <td class="col-title">维护级别</td>
                <td>  </td>
                <td class="col-title">规模级别</td>
                <td> </td>
              </tr>
              <tr>
                  <td class="col-title">客户描述</td>
                  <td colspan="5"></td>
              </tr>
              <tr>
                <td class="col-title">客户需求</td>
                <td colspan="5"></td>
              </tr>
              <tr>
                <td class="col-title">客户价值</td>
                <td colspan="5"></td>
              </tr>
              <tr>
                <td class="col-title">客户描述</td>
                <td colspan="5"></td>
              </tr>
              <tr rowspan="2">
                <td class="col-title">相关附件</td>
                <td colspan="5">
                    <div class="actions">
                        <!-- <img :src="checkDetailImg" />
                        <img :src="editImg" />
                        <img :src="printImg" />
                        <img :src="downloadImg" /> -->
                        <Icon  class="fileAction" type="ios-open-outline" />
                        <Icon  class="fileAction" type="ios-create-outline" />
                        <Icon  class="fileAction" type="ios-print-outline" />
                        <Icon  class="fileAction" type="ios-download-outline" />
                    </div>
                </td>
              </tr>
              <tr>
                <td class="col-title">客户经理</td>
                <td> {{shopForm.memberName}}</td>
                <td class="col-title">创建者</td>
                <td> {{shopForm.memberName}} </td>
                <td class="col-title">创建时间</td>
                <td> {{createTime}} </td>
               </tr>
            
                  
              </table>
              <div class="bottom-action">
                  <Button class="signAciton" :type='shopForm.storeDisable==="APPLY"?"success":"primary"'  @click="sign()" :disabled='shopForm.storeDisable!=="APPLY"'> {{shopForm.storeDisable==="APPLY"?'通过':"已审核通过"}}</Button>
                  <Button type="success" @click="back()">返回</Button>
              </div>
          </TabPane>
      </Tabs>
  </div>
</card>
</template>

<script>
import memberLayout from "@/views/member/list/index";
import ossManage from "@/views/sys/oss-manage/ossManage";
import { getCategoryTree } from "@/api/goods";
import { shopDetail, shopAdd, shopEdit, getShopByMemberId, shopAudit } from "@/api/shops";
import uploadPicInput from "@/views/my-components/lili/upload-pic-input";
import region from "@/views/lili-components/region";
import liliMap from "@/views/my-components/map/index";

export default {
  name: "shop-operation",
  components: {
    uploadPicInput,
    ossManage,
    region,
    memberLayout,
    liliMap,
  },

  data() {
    return {
      contractData: "",
      createTime: this.$route.query.createTime,
      shopId: this.$route.query.shopId, // 店铺id
      isRead: false, // 是否只读，只有在店铺通过审核才可修改
      selectedFormBtnName: "", // 点击图片绑定form
      loading: false,
      auditModel: false,
      auditModalLoading: false,
      picModalFlag: false, // 图片选择器
      address: "", // 地址
      returnAddress: "", // 退货地址
      memberModalFlag: false, // 商家账号
      settlementShow: false, // 是否展示结算日输入框
      addSettlementConfirmBtn: false, // 添加结算日确认按钮
      addSettlementBtn: true, // 添加结算日按钮
      day: 1, //结算日
      tabName: "base", // tab栏name值
      tabNameList: ["base", "entry", "category", "settlement"], // tab栏name值数组
      shopValidate: {
        // 表单验证规则
        memberName: [{ required: true, message: "会员不能为空" }],
        storeName: [{ required: true, message: "店铺名称不能为空" }],
        companyAddress: [{ required: true, message: "公司地址不能为空" }],
        storeAddressDetail: [{ required: true, message: "店铺详细地址不能为空" }],
        storeDesc: [{ required: true, message: "店铺简介不能为空" }],
        storeCenter: [{ required: true, message: "店铺未定位" }],
        companyName: [{ required: true, message: "公司名称不能为空" }],
        companyPhone: [{ required: true, message: "公司电话不能为空" }],
        employeeNum: [
          {
            required: true,
            type: "number",
            message: "员工总数不能为空",
            trigger: "blur",
          },
        ],
        companyAddressIdPath: [{ required: true, message: "请选择公司地址" }],
        registeredCapital: [
          {
            required: true,
            type: "number",
            message: "注册资金不能为空",
            trigger: "blur",
          },
        ],
        linkName: [{ required: true, message: "联系人姓名不能为空" }],
        linkPhone: [
          { required: true, message: "联系人手机号不能为空" },
          {
            type: "string",
            pattern: /^1[3|4|5|6|7|8][0-9]{9}$/,
            message: "手机号格式出错",
            trigger: "blur",
          },
        ],
        companyEmail: [
          { required: true, message: "邮箱不能为空" },
          { type: "email", message: "邮箱格式错误" },
        ],
        licenseNum: [{ required: true, message: "营业执照号不能为空" }],
        scope: [{ required: true, message: "法定经营范围不能为空" }],
        legalName: [{ required: true, message: "法人姓名不能为空" }],
        legalId: [{ required: true, message: "法人证件号不能为空" }],
        settlementBankAccountName: [{ required: true, message: "银行开户名不能为空" }],
        settlementBankAccountNum: [{ required: true, message: "银行账号不能为空" }],
        settlementBankBranchName: [{ required: true, message: "银行支行名称不能为空" }],
        settlementBankJointName: [{ required: true, message: "支行联行号不能为空" }],

        salesConsigneeMobile: [
          {
            type: "string",
            pattern: /^1[3|4|5|6|7|8][0-9]{9}$/,
            message: "手机号格式出错",
            trigger: "blur",
          },
        ],
      },
      indeterminate: true, // 复选框全选样式
      checkAll: false, // 全选
      checkAllGroup: [], // 全选数组
      submitLoading: false, // 添加或编辑提交状态
      settlementCycle: [], // 结算周期
      shopForm: {
        // 店铺数据
        settlementCycle: "",
        selfOperated: "false",
        memberName: "",
        companyName: "",
        addressPath: "",
        addressIdPath: "",
        companyAddressPath: "",
        companyAddressIdPath: "",
        companyAddress: "",
        companyEmail: "",
        employeeNum: 1,
        registeredCapital: 1,
        linkName: "",
        linkPhone: "",
        licenseNum: "",
        scope: "",
        licencePhoto: "",
        legalName: "",
        legalId: "",
        legalPhoto: ["", ""],
        companyPhone: "",
        settlementBankAccountName: "",
        settlementBankAccountNum: "",
        settlementBankBranchName: "",
        settlementBankJointName: "",
        businesses: "",
        storeName: "",
        storeLogo: "",
        storeDesc: "",
        ddCode: "",
      },
      categories: [], // 分类

      infoResult: {}, // 店铺详情
      picIndex: "", // 存储身份证图片下标，方便赋值
    };
  },
  methods: {
    back(){
        this.$router.go (-1);
    },
    // 选择会员的回调
    callbackMember(val) {
      if (val) {
        //选择会员后需要检验此会员是否开过店铺
        getShopByMemberId(val.id).then((res) => {
          if (res.success) {
            if (res.result != null) {
              this.$Message.error("当前会员已经拥有店铺");
            } else {
              this.shopForm.memberId = val.id;
              this.shopForm.memberName = val.username;
            }
            this.memberModalFlag = false;
          }
        });
      }
    },

    //选择会员
    selectMember() {
      this.$refs["memberLayout"].selectedMember = true;
      this.memberModalFlag = true;
    },

    //修改地址
    regionClick() {
      this.showRegion = true;
      this.regionId = "";
    },
    //删除所选择的结算日
    removesettlementCycle(event, name) {
      this.settlementCycle = this.settlementCycle.filter((i) => i !== name);
    },
    //确认添加方法
    addsettlementCycle() {
      this.settlementShow = true;
      this.addSettlementConfirmBtn = true;
      this.addSettlementBtn = false;
    },
    //添加结算日
    addsettlementCycleConfirm() {
      if (!this.day) {
        this.$Message.warning("请输入正确的结算周期，1-31的整数");
        return;
      }
      if (this.settlementCycle.includes(this.day)) {
        this.$Message.warning("已有该结算周期，不能重复输入");
        return;
      }
      this.settlementCycle.push(this.day);
      this.addSettlementConfirmBtn = false;
      this.addSettlementBtn = true;
      this.settlementShow = false;
      this.day = 1;
    },
    // 选择公司地址
    selectedRegion(val) {
      this.$set(this.shopForm, "companyAddressIdPath", val[0].toString());
      this.$set(
        this.shopForm,
        "companyAddressPath",
        val[1].toString().replace(/\s/g, "")
      );
    },
    // 选择退货收件地址
    selectedConsigneeRegion(val) {
      this.$set(this.shopForm, "salesConsigneeAddressId", val[0].toString());
      this.$set(
        this.shopForm,
        "salesConsigneeAddressPath",
        val[1].toString().replace(/\s/g, "")
      );
    },
    // 选择图片modal
    handleCLickImg(val, index) {
      this.$refs.ossManage.selectImage = true;
      this.picModalFlag = true;
      this.selectedFormBtnName = val;
      this.picIndex = index;
    },
    // 图片回显
    callbackSelected(val) {
      this.picModalFlag = false;
      if (this.picIndex === 0 || this.picIndex === 1) {
        this.shopForm[this.selectedFormBtnName][this.picIndex] = val.url;
      } else {
        this.shopForm[this.selectedFormBtnName] = val.url;
      }
      this.picIndex = "";
    },
    // 初始化数据
    init() {
      this.getCategories();
      if (this.shopId) {
        this.getShopDetail();
      }
    },
    next() {
      // 下一步
      let index = this.tabNameList.indexOf(this.tabName) + 1;
      this.tabName = this.tabNameList[index];
    },
    prev() {
      // 上一步
      let index = this.tabNameList.indexOf(this.tabName) - 1;
      this.tabName = this.tabNameList[index];
    },
    formValidate(prop, status, error) {},
    // 获取店铺详情
    getShopDetail() {
      shopDetail(this.shopId).then((res) => {
        if (res.success) {
          this.infoResult = res.result;
          this.shopForm = res.result;
          this.shopForm.selfOperated
            ? (this.shopForm.selfOperated = "true")
            : (this.shopForm.selfOperated = "false");

          this.checkAllGroup = this.shopForm.goodsManagementCategory.split(",");
          if (this.shopForm.settlementCycle) {
            this.settlementCycle = this.shopForm.settlementCycle.split(",");
          }
          this.shopForm.legalPhoto = this.shopForm.legalPhoto.split(",");
          this.address = this.shopForm.companyAddressIdPath;
          this.returnAddress = this.shopForm.salesConsigneeAddressId;
        }
      });
    },
    // 保存
    save() {
      this.$refs.shopForm.validate((valid) => {
        //校验结算日是否已经确认完成
        if (this.settlementShow) {
          this.$Message.error("请确认当前所填结算日信息");
          return;
        }
        //校验经营类目
        if (this.checkAllGroup == "") {
          this.$Message.error("请选择店铺经营类目");
          this.tabName = "cagetory";
          return;
        }
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.shopForm));
          //处理经营类目，结算日
          params.goodsManagementCategory = this.checkAllGroup;
          params.settlementCycle = this.settlementCycle;
          if (this.shopId) {
            delete params.memberId;
            shopEdit(this.shopId, params).then((res) => {
              if (res.success) {
                this.$Message.success("编辑成功");
                this.$router.push({ name: "shopList" });
              }
            });
          } else {
            //添加店铺单独需要检验的参数
            if (params.memberName == "") {
              this.$Message.error("请选择开店的会员");
              return;
            }
            shopAdd(params).then((resp) => {
              if (resp.success) {
                this.$Message.success("添加成功");
                this.shopForm = {};
                this.$router.push({ name: "shopList" });
              }
            });
          }
        }
      });
    },
    // 点击定位获取店铺地址
    getAddress(item) {
      this.shopForm.storeCenter = item.position.lng + "," + item.position.lat;
      this.$set(this.shopForm, "storeAddressPath", item.addr);
      this.$set(this.shopForm, "storeAddressIdPath", item.addrId);
    },
    // 全部选中
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        let checkAllDate = [];
        this.categories.forEach((i) => checkAllDate.push(i.id));
        this.checkAllGroup = checkAllDate;
      } else {
        this.checkAllGroup = [];
      }
    },
    // 经营类目的选择
    checkAllGroupChange(data) {
      if (data.length === this.categories.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    // 获取所有分类
    getCategories() {
      getCategoryTree().then((res) => {
        if (res.success) {
          this.categories = res.result;
        }
      });
    },
    auditHandler() {
      this.auditModel = true;
    },
    // 审核店铺
    audit(operation) {
      let id = this.$route.query.shopId;
      if (operation === "PASS") {
        shopAudit(id, 0).then((res) => {
          this.auditModel = false;
          if (res.success) {
            this.$Message.success("操作成功");
            this.$router.push({ name: "shopAuth" });
          }
        });
      } else {
        shopAudit(id, 1).then((res) => {
          this.auditModel = false;
          if (res.success) {
            this.$Message.success("操作成功");
            this.$router.push({ name: "shopAuth" });
          }
        });
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>

.signAciton {
  margin-right: 80px;
}
img {
  width: 30px;
  height: 30px;
}
.actions {
  text-align: right;  
  margin-right: 3%;
}
.actions i {
  width: 20px;
  height: 20px
}
.contract-table td {
  border: 1px solid #d0d0d0;
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
  width: 13%;
}
.bottom-action {
  text-align: right;  
  margin-top: 5%;
  margin-right: 5%;
}
.bottom-action .sign {
  margin-right: 30px;
}
td {
  min-width: 13%;
  max-width: 20%;
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
.selectedMember {
  width: 100%;
}

.mask {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(105, 105, 105, 0.1);
  z-index: 9;
}

/deep/ .ivu-tabs-bar {
  margin: 0;
}

.tab {
  padding: 16px;
  position: relative;
}

.categories-checkbox {
  display: flex;
  align-items: center;
}

.img {
  margin-right: 10px;
  width: 100px;
  height: 100px;
}

.item {
  width: 350px !important;
  display: flex;

  > * {
    margin: 0 4px;
  }
}
.legal-photo {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
</style>
