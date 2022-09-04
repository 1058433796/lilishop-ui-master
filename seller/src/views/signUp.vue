<template>
  <div>
    <Card>
      <Row type="flex" justify="center">
        <Col span="16">
        <Steps :current="1">
          <Step title="基本信息"></Step>
          <Step title="资料上传"></Step>
          <Step title="企业信息审核"></Step>
          <Step title="注册成功"></Step>
        </Steps>
        <Form ref="appForm" :model="appForm" :rules="ruleInline" class="form" :label-width="120">

          <div v-if="current === 0" class="blocks">
            <div class="block">
              <div class="block-title">营业执照信息</div>
              <div class="block-content">

                <Form-item prop="companyType" label="所属行业">
                <Select v-model="appForm.companyType" class="selector">
                  <Option v-for="item in companyTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>

              <Form-item prop="companyName" label="企业名称">
                <Input type="text" v-model="appForm.companyName" placeholder="请输入企业名称">
                </Input>
              </Form-item>
              
              <Form-item prop="licenseRegisterNumber" label="营业执照注册号">
                <Input type="number" v-model="appForm.licenseRegisterNumber" placeholder="Password">
                </Input>
              </Form-item>
              
              <Form-item prop="licenseAddress" label="营业执照所在地">
                <Cascader :data="addressList" v-model="appForm.licenseAddress" class="selector"></Cascader>
              </Form-item>
             
              <Form-item prop="licenseDetailAddress" label="营业执照详细地址">
                <Input type="text" v-model="appForm.licenseDetailAddress" placeholder="Password">
                </Input>
              </Form-item>
              
              <Form-item label="营业期限">
                <div style="display:flex; justify-content: space-between;">
                  <Date-picker type="daterange" placeholder="选择日期" class="inline-selector" @on-change="onDateChange"
                    v-model="appForm.licenseValidRange"></Date-picker>
                  <Checkbox v-model="appForm.licenseValidLongPeriod" size="large" style="margin-left: 20px; margin-right:0;">长期
                  </Checkbox>
                </div>
              </Form-item>
              
              <Form-item>
                <Button type="primary" @click="handleSignUp('appForm')">注册</Button>
              </Form-item>

              </div>
              
            </div>
          

          <div class="block">
            <div class="block-title">法人代表信息</div>
            <div class="block-content">
              <Form-item label="法人代表证件类型">
                <Select v-model="appForm.legalRepresentLicenseType" class="selector">
                  <Option v-for="item in LicenseTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="法人代表证件号">
                <Input type="text" v-model="appForm.legalRepresentLicenseNumber" placeholder="Password">
                </Input>
              </Form-item>
              <Form-item label="法人代表名称">
                <Input type="text" v-model="appForm.legalRepresentName" placeholder="Password">
                </Input>
              </Form-item>
              <Form-item label="有效期">
                <div style="display:flex; justify-content: space-between;">
                  <Date-picker type="daterange" placeholder="选择日期" class="inline-selector" @on-change="onDateChange"
                    v-model="appForm.legalRepresentLicenseValidRange"></Date-picker>
                  <Checkbox v-model="appForm.legalRepresentLicenseLongPeriod" size="large" style="margin-left: 20px; margin-right:0;">
                    长期
                  </Checkbox>
                </div>
              </Form-item>
              <Form-item prop="companyAddress" label="公司所在地">
                <Cascader :data="addressList" v-model="appForm.companyAddress" class="selector"></Cascader>
              </Form-item>
              <Form-item prop="companyDetailAddress" label="公司详细地址">
                <Input type="text" v-model="appForm.companyDetailAddress" placeholder="Password">
                </Input>
              </Form-item>
              <Form-item prop="companyEmergencyName" label="公司紧急联系人">
                <Input type="text" v-model="appForm.companyEmergencyName" placeholder="Password">
                </Input>
              </Form-item>
              <Form-item prop="companyEmergencyPhoneNumber" label="公司紧急联系人电话">
                <Input type="number" v-model="appForm.companyEmergencyPhoneNumber" placeholder="Password">
                </Input>
              </Form-item>
            </div>
          </div>

          <div class="block">
            <div class="block-title">组织机构代码</div>
            <div class="block-content">
              <Form-item label="组织机构代码">
                <Select v-model="appForm.orgCode" class="selector">
                  <Option v-for="item in orgCodeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="组织机构代码有效期">
                <div style="display:flex; justify-content: space-between;">
                  <Date-picker type="daterange" placeholder="选择日期" class="inline-selector" @on-change="onDateChange"
                    v-model="appForm.orgCodeValidRange"></Date-picker>
                  <Checkbox v-model="appForm.orgCodeValidLongPeriod" size="large" style="margin-left: 20px; margin-right:0;">长期
                  </Checkbox>
                </div>
              </Form-item>
              <br/><br/>
              <Form-item>
                <Button type="error" long @click="next">下一步</Button>
              </Form-item>
            <Form-item prop="termAccepted">
              <Checkbox v-model="appForm.termAccepted" style="margin-right: 0px;">
                &nbsp;&nbsp;&nbsp;我已阅读并接受
              </Checkbox>
              <a href="https://modao.cc/app/BvZbMLnVrgyo8hIRr9xwey#screen=sl75y4sypqmytok" style="color:red;">《中科在线云筑注册条款》</a>
            </Form-item>
            <Form-item>
              <span style="font-size:500; color:red;">切换成个人账户注册 >>></span> 
            </Form-item>
            </div>
          </div>
          <div class="block">
 
            
          </div>
          
        </div>

        <div v-if="current === 1" class="block">
          <!-- 第二部分的内容 -->
            <Form-item>
              <Button type="primary">登录</Button>
            </Form-item>
          </div>
        </Form>
        </Col>

      </Row>
      <Button @click="onClick">next</Button>
    </Card>
  </div>
</template>

<script>
// import memberLayout from "@/views/member/list/index";
// import ossManage from "@/views/sys/oss-manage/ossManage";
// import { getCategoryTree } from "@/api/goods";
// import { shopDetail, shopAdd, shopEdit, getShopByMemberId, shopAudit } from "@/api/shops";
// import uploadPicInput from "@/views/my-components/lili/upload-pic-input";
// import region from "@/views/lili-components/region";
// import liliMap from "@/views/my-components/map/index";

export default {
  name: "signUp",
  components: {
  },

  data() {
    return {
      // 表单
      appForm: {
        companyType: '',
        companyName: '',
        licenseRegisterNumber: '',
        licenseAddress: [],
        licenseDetailAddress: '',
        licenseValidRange: ['', ''],
        licenseValidLongPeriod: false,
        legalRepresentLicenseType: '',
        legalRepresentLicenseNumber: '',
        legalRepresentName: '',
        legalRepresentLicenseValidRange: ['', ''],
        legalRepresentLicenseLongPeriod: false,
        companyAddress: [],
        companyDetailAddress: '',
        companyEmergencyName: '',
        companyEmergencyPhoneNumber: '',
        orgCode: '',
        orgCodeValidRange: [],
        orgCodeValidLongPeriod: false,
        termAccepted:false
      },
      // 行业所属列表
      companyTypeList: [
        { value: 0, label: 'A' },
        { value: 1, label: 'B' },
        { value: 2, label: 'C' },
        { value: 3, label: 'D' },
        { value: 4, label: 'E' },
      ],
      // 地址列表
      addressList: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }
      ],
      // 法人代表证件类型
      LicenseTypeList: [
        { value: '身份证', label: '身份证' },
        { value: '护照', label: '护照' },
        { value: '证明文件', label: '证明文件' },
      ],
      orgCodeList: [
        { value: '12345', label: '12345' },
        { value: '4444', label: '4444' },
      ],
      ruleInline: {
      },
      current: 0
    }
  },
  methods: {
    onClick() {
      this.current++;
    },
    next() {
      this.current++;
    },
    onDateChange(e) {
      console.log(e);
    },
    handleSignUp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.appForm))
          console.log(data)
        } else {
          console.log('表单无效')
        }
      })
    }
  },
  created() {
    // this.init();
  },
};
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  margin-top: 40px;
}

.blocks{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
}

.block-content {
  display: flex;
  flex-direction: column;
  // align-items:center;
  width: 60%;
}

.block-title {
  border-left: 10px solid red;
  padding-left: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid red;
  font-size: large;
  margin-bottom: 20px;
  width: 70%;
}

.selector {
  // width: 380px;
}
.inline-selector{
  // width:310px;
  width:70%;
}
</style>
