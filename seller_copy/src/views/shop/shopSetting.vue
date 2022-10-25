<template>
  <div class="search">
    <Card style="margin-left: 10px">
      <Tabs v-model="type" >
        <TabPane label="基本信息" name="INFO" style="font-size: 15px">
          <Form
            ref="form"
            :model="form"
            :label-width="100"
            :rules="formValidate"
          >
            <FormItem label="姓名">
              <Input
                v-model="form.nickName"
                clearable
                style="width: 20%"
              />
            </FormItem>
            <FormItem label="手机号">
              <Input
                v-model="form.mobile"
                clearable
                style="width: 20%"
              />
            </FormItem>
            <FormItem label="邮箱">
              <Input
                v-model="form.email"
                clearable
                style="width: 20%"
              />
            </FormItem>
            <FormItem label="地址" prop="address">
              <Input
                v-model="form.region"
                @on-focus="$refs.liliMap.showMap = true"
                clearable
                style="width: 20%"
              />
            </FormItem>
            <FormItem label="微信号">
              <Input
                v-model="form.wechat"
                clearable
                style="width: 20%"
              />
            </FormItem>

            <Form-item>
              <Button
                @click="handleSubmit"
                :loading="submitLoading"
                type="primary"
                style="margin-right: 5px"
                >修改
              </Button>
            </Form-item>
          </Form>
        </TabPane>

      </Tabs>
    </Card>

    <liliMap ref="liliMap" @getAddress="getAddress"></liliMap>
  </div>
</template>

<script>
import * as API_User from "@/api/index";
import { validateMobile } from "@/libs/validate";
import uploadPicThumb from "@/views/my-components/lili/upload-pic-thumb";
import liliMap from "@/views/my-components/map/index";
import regionMap from "@/views/lili-components/region";
import * as RegExp from "@/libs/RegExp.js";
import Cookies from "js-cookie";
import {getStoreUserInfo, saveUserInfo} from "../../api";

export default {
  name: "shopSetting",
  components: {
    uploadPicThumb,
    liliMap,
    regionMap,
  },
  data() {
    return {
      type: "INFO",
      showRegion: false, // 选择地址模态框显隐
      storeName: "", //店铺名称
      region: "", // 地区名称
      regionId: [], // 地区id
      afterFormValidate: {
        salesConsigneeMobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: RegExp.mobile,
            trigger: "blur",
            message: "请输入正确的手机号",
          },
        ],
        salesConsigneeName: [
          { required: true, message: "请输入收货人", trigger: "blur" },
        ],
        salesConsigneeDetail: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
      form: {
          nickName:"",
          mobile:"",
          region:"",
          wechat:"",
          email:"",
          regionId:""
      },

      // 表单验证规则
      formValidate: {
        nickName: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
        ],
        region: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur",
          },
        ],
      },
      submitLoading: false, // 添加或编辑提交状态
    };
  },
  methods: {
    // 初始化数据
    init() {
      this.getShopUserInfo();
    },
    //获取店铺信息


    getShopUserInfo() {
      this.loading = true;
      API_User.getStoreUserInfo().then((res) => {
        this.loading = false;
        if (res.success) {
          this.form.nickName = res.result.nickName;
          this.form.mobile = res.result.mobile;
          this.form.region = res.result.region;
          this.form.wechat = res.result.wechat;
          this.form.regionId = res.result.regionId;
          this.form.email = res.result.email;
          //Cookies.set("userInfoSeller", JSON.stringify(res.result));
        }
      });
    },
    //重置
    handleReset() {
      this.$refs.form.resetFields();
    },
    //提交保存
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.submitLoading = true;
          API_User.saveUserInfo(this.form).then((res) => {
            this.submitLoading = false;
            if (res.success) {
              this.$Message.success("修改成功");
              this.getShopUserInfo();
            }
          });
        }
      });
    },

    //获取地址
    getAddress(item) {
      //console.log(item)
      //this.$set(this.form, "address", item.addr);
      this.form.region = item.addr;
      this.form.regionId = item.addrId;

    },
  },
  mounted() {
    this.init();
  },
};
</script>
