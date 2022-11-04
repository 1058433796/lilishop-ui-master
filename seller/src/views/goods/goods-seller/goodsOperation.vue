<template>
<div class="new-item">
    <Card>  
      <Form ref="form" :model="form" :label-width="130" >
      <Row type="flex" :gutter="20">
        <Col span="8" :offset="3">
        <FormItem label="工程项目名称" prop="itemName" :label-width="100">
          <Input v-model="form.itemName" clearable style="width: 200px" maxlength="25" :disabled="flag" />
        </FormItem>
        <FormItem label="归属区域" prop="createLocation" :label-width="100">
          <Input v-model="form.createLocation" style="width: 200px" maxlength="25" :disabled="flag">
          </Input>
        </FormItem>
        <FormItem label="项目规模描述" prop="itemScale" :label-width="100">
          <Input v-model="form.itemScale" type="textarea" :rows="1" style="width: 200px" :disabled="flag">
          </Input>
        </FormItem>
        </Col>
        <Col span="12"  > 
          <FormItem label="项目状态" prop="itemStatus">
          <RadioGroup type="button" button-style="solid" v-model="form.itemStatus" :disabled="flag">
            <Radio title="开工" :label="1">
              <span>开工</span>
            </Radio>
            <Radio title="未开工" :label="0">
              <span>未开工</span>
            </Radio>
          </RadioGroup>
        </FormItem>
          <FormItem label="项目坐标" prop="createLocationDetail" :label-width="130">
          <Input v-model="form.itemLongitude" style="width: 50px" maxlength="25" placeholder="经度" :disabled="flag">
          </Input>
          <Input v-model="form.itemLatitude" style="width: 50px" maxlength="25" placeholder="纬度" :disabled="flag">
          </Input>
        </FormItem>
        <FormItem label="项目开始和结束时间" prop="rangeTime">
          <DatePicker type="datetimerange" v-model="form.rangeTime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择" style="width: 300px" :disabled="flag">
          </DatePicker>
        </FormItem>
      </Col>
    </Row> 

      <Row>
        <Col span="12" :offset="3">
        <FormItem label="项目概述" prop="itemOverview" :label-width="100">
          <Input v-model="form.itemOverview" type="textarea" :rows="3" style="width: 980px" :disabled="flag">
          </Input>
        </FormItem>
      </Col>
      </Row>
      
      <Row type="flex" :gutter="20">
        <Col span="8" :offset="3">
          <FormItem label="项目详细地址" prop="itemAddress" :label-width="100">
          <Input v-model="form.itemAddress" type="textarea" :rows="1" style="width: 400px" :disabled="flag">
          </Input>
        </FormItem>
        </Col>
        <Col span="12" :offset="1">
          <FormItem label="项目标识" prop="itemLogo" :label-width="100">
          <Input v-model="form.itemLogo" type="textarea" :rows="1" style="width: 260px" :disabled="flag">
          </Input>
        </FormItem>
        </Col>
      </Row>


        <Row type="flex" :gutter="30">
          <Col span="4" :offset="3">
            <FormItem label="项目概算" prop="itemBudget" :label-width="100" >
          <Input v-model="form.itemBudget" style="width: 200px" :disabled="flag">
          <span slot="append">元</span>
          </Input>
        </FormItem>
          </Col>
          <Col span="5">  
             <FormItem label="批复概算" prop="replyBudget" :label-width="100">
          <Input v-model="form.replyBudget" style="width: 200px" :disabled="flag">
          <span slot="append">元</span>
          </Input>
        </FormItem>
          </Col>
          <Col span="6">
        <FormItem label="批复时间" prop="replyTime" :label-width="100">
          <date-picker 
            v-model="form.replyTime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择"  style="width: 260px" :disabled="flag" />
        </FormItem>
          </Col>
        </Row>
        <Row v-if="!flag">
          <Col span="4" :offset="3">
            <FormItem  label="设计师用户名" prop="designerName" :label-width="100" >
          <Input v-model="form.designerName" style="width: 200px" :disabled="flag">
          </Input>
        </FormItem>
          </Col>
          <Col span="4" :offset="3">
            <FormItem label="设计师密码" prop="designerName" :label-width="100" >
          <Input v-model="form.designerPass" style="width: 200px" :disabled="flag">
          </Input>
        </FormItem>
          </Col>
        </Row>
      </Form>
  
      <div style="text-align: center">
        <Button type="text" @click="closeCurrentPage">返回</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit" :disabled="flag">提交</Button>
      </div>
    </Card>
  </div>
</template>
<script>
import { saveItem,getItemDetail} from "@/api/goods";
import moment from "moment";
import Cookies from "js-cookie";
export default {
  // name: "addGoods",
  // components: {
  //   firstStep,
  //   secondStep,
  //   thirdStep
  // },

  data() {
    return {
      // /** 当前激活步骤*/
      // activestep: 0,
      // firstData: {}, // 第一步传递的数据
      flag:this.$route.query.flag,
      id: this.$route.query.id, // 项目id 这里要改
      form: {
        // 添加或编辑表单对象初始化数据
        createLocation: "",
        itemName: "",
        itemStatus: 0,
        itemLongitude: "",
        itemLatitude: "",
        itemScale: "",
        itemOverview:"",
        itemAddress:"",
        itemLogo:"",
        itemBudget:"",
        replyBudget:"",
        replyTime:"",
        startTime: "",
        endTime: "",
        designerName:"",
        designerPass:"",
        buyerId: JSON.parse(Cookies.get("userInfoSeller")).memberId,
        buyerName:JSON.parse(Cookies.get("userInfoSeller")).memberName
      },
      submitLoading: false, // 添加或编辑提交状态
      // options: {
      //   // 不可选取时间
      //   disabledDate(date) {
      //     return date && date.valueOf() < Date.now() - 86400000;
      //   },
      // },
    };
  },
  methods: {
    closeCurrentPage() {
      this.$store.commit("removeTag", "goods-operation");
      localStorage.storeOpenedList = JSON.stringify(
        this.$store.state.app.storeOpenedList
      );
      this.$router.go(-1);
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          let params = JSON.parse(JSON.stringify(this.form));
          params.designerPass=this.md5(this.form.designerPass)
          // params.itemStatus
          //   ? (params.itemStatus = "已开工")
          //   : (params.itemStatus = "未开工");
          params.startTime = this.$options.filters.unixToDate(
            this.form.rangeTime[0] / 1000
          );

          params.endTime = this.$options.filters.unixToDate(
            this.form.rangeTime[1] / 1000
          );
          if (params.startTime === "" || params.endTime === "") {
            this.$Message.error("时间不能为空");
            this.submitLoading = false;
            return;
          }
          console.log('?form')
          console.log(this.form)
          
          params.replyTime = moment(params.replyTime).format('YYYY-MM-DD HH:mm:ss')
          delete params.rangeTime;
          if (!this.id) {
            // 添加 避免编辑后传入id等数据 记得删除
            delete params.id;
            saveItem(params).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("项目发布成功");
                this.closeCurrentPage();
              }
            });}
          // } else {
          //   // 编辑
          //   if (params.promotionGoodsList == "")
          //     delete params.promotionGoodsList;
          //   editPintuan(params).then((res) => {
          //     this.submitLoading = false;
          //     if (res.success) {
          //       this.$Message.success("操作成功");
          //       this.closeCurrentPage();
          //     }
          //   });
          // }
        }
      });
    },
    getDetail() {
      getItemDetail(this.id).then((res) => {
        if (res.success) {
          const data = res.result;
          data.rangeTime = [];
          data.rangeTime.push(new Date(data.startTime), new Date(data.endTime));
          this.form = data;
          // 此处将值转换为 1 true ，0 false 不然ivew radio组件会报错
          this.form.itemStatus ? this.$set(this.form, "itemStatus", 1)  : this.$set(this.form, "itemStatus", 0);
    
       }
      });
    },
  },
  mounted() {
    // 编辑商品、模板
    if (this.id) {
      this.getDetail();
    }
    
  }
};
</script>
<style lang="scss" scoped>
/deep/ .ivu-form-item {
  padding: 18px 10px !important;
}
</style>
