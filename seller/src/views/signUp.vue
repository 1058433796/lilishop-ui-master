<template>
  <div>
    <Card>
      <Row type="flex" justify="center">
        <Col span="16">
        <Steps :current="current">
          <Step title="基本信息"></Step>
          <Step title="资料上传"></Step>
          <Step title="企业信息审核"></Step>
          <Step title="注册成功"></Step>
        </Steps>
        <Form ref="appForm" :model="appForm" :rules="ruleInline" class="form" :label-width="150">

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
                    <Checkbox v-model="appForm.licenseValidLongPeriod" size="large"
                      style="margin-left: 20px; margin-right:0;">长期
                    </Checkbox>
                  </div>
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
                    <Checkbox v-model="appForm.legalRepresentLicenseLongPeriod" size="large"
                      style="margin-left: 20px; margin-right:0;">
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
                    <Checkbox v-model="appForm.orgCodeValidLongPeriod" size="large"
                      style="margin-left: 20px; margin-right:0;">长期
                    </Checkbox>
                  </div>
                </Form-item>
                <br /><br />
                <Form-item>
                  <Button type="error" size="large" @click="next" style="width:100%;">下一步</Button>
                </Form-item>
                <Form-item prop="termAccepted">
                  <Checkbox v-model="appForm.termAccepted" style="margin-right: 0px;">
                    &nbsp;&nbsp;&nbsp;我已阅读并接受
                  </Checkbox>
                  <a href="https://modao.cc/app/BvZbMLnVrgyo8hIRr9xwey#screen=sl75y4sypqmytok"
                    style="color:red;">《中科在线云筑注册条款》</a>
                </Form-item>
                <Form-item>
                  <span style="font-size:500; color:red;">切换成个人账户注册 >>></span>
                </Form-item>
              </div>
            </div>
          </div>

          <div v-if="current === 1" class="blocks">
            <!-- 第二部分的内容 -->
            <div class="block">
              <div class="block-content" style="width:80%;">
                <Form-item label="营业执照/三证合一电子版">
                  <div>
                    请上传清晰营业执照图片，系统识别公司信息自动进行填写，营业执照复印件需加盖公司红章扫描上传，
                    若营业执照上未体现注册资本、经营范围，请在营业执照后另行上传企业信息公示网上的截图。
                  </div>
                  <div style="display:flex;">
                    <div v-for="item in  appForm.businessLicensePhotos" :key="item.name" style="margin-right: 20px;">
                      <img :src="item.url" class="photo">
                      <div style="display:flex; justify-content: center;">
                        <Button type="success" size="small" style="margin-right:10px;"
                          @click="handleImgView(item.url)">预览</Button>
                        <Button type="error" size="small"
                          @click="handleImgRemove('businessLicensePhotos', item.name)">删除</Button>
                      </div>
                    </div>
                    <Upload action="//jsonplaceholder.typicode.com/posts/" accept="image/png, image/jpeg, image/gif"
                      :before-upload="file => beforeUpload('businessLicensePhotos', file)" :max-size="1024">
                      <Avatar icon="ios-add" shape="square" size="100"></Avatar>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </Form-item>

                <Form-item label="法人证件电子版">
                  <div>
                    请按顺序分别上传正面（带有照片一面）和反面电子版照片，复印件请加盖开店公司红章
                  </div>
                  <div style="display:flex;">
                    <div v-for="item in  appForm.legalLicensePhotos" :key="item.name" style="margin-right: 20px;">
                      <img :src="item.url" class="photo">
                      <div style="display:flex; justify-content: center;">
                        <Button type="success" size="small" style="margin-right:10px;"
                          @click="handleImgView(item.url)">预览</Button>
                        <Button type="error" size="small"
                          @click="handleImgRemove('legalLicensePhotos', item.name)">删除</Button>
                      </div>
                    </div>
                    <Upload action="//jsonplaceholder.typicode.com/posts/" accept="image/png, image/jpeg, image/gif"
                      :before-upload="file => beforeUpload('legalLicensePhotos', file)" :max-size="1024">
                      <Avatar icon="ios-add" shape="square" size="100"></Avatar>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </Form-item>

                <Form-item label="银行开户许可证电子版">
                  <div>
                    许可证上名称、法人需与营业执照一致，若发生变更须出具变更证明，复印件需加盖公司红章扫描上传
                  </div>
                  <div style="display:flex;">
                    <div v-for="item in  appForm.bankLicensePhotos" :key="item.name" style="margin-right: 20px;">
                      <img :src="item.url" class="photo">
                      <div style="display:flex; justify-content: center;">
                        <Button type="success" size="small" style="margin-right:10px;"
                          @click="handleImgView(item.url)">预览</Button>
                        <Button type="error" size="small"
                          @click="handleImgRemove('bankLicensePhotos', item.name)">删除</Button>
                      </div>
                    </div>
                    <Upload action="//jsonplaceholder.typicode.com/posts/" accept="image/png, image/jpeg, image/gif"
                      :before-upload="file => beforeUpload('bankLicensePhotos', file)" :max-size="1024">
                      <Avatar icon="ios-add" shape="square" size="100"></Avatar>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </Form-item>

                <Form-item label="组织机构代码证电子版">
                  <div>
                    复印件需加盖公司红章扫描上传，三证合一的此处请上传营业执照电子版
                  </div>
                  <div style="display:flex;">
                    <div v-for="item in  appForm.orgCodeLicensePhotos" :key="item.name" style="margin-right: 20px;">
                      <img :src="item.url" class="photo">
                      <div style="display:flex; justify-content: center;">
                        <Button type="success" size="small" style="margin-right:10px;"
                          @click="handleImgView(item.url)">预览</Button>
                        <Button type="error" size="small"
                          @click="handleImgRemove('orgCodeLicensePhotos', item.name)">删除</Button>
                      </div>
                    </div>
                    <Upload action="//jsonplaceholder.typicode.com/posts/" accept="image/png, image/jpeg, image/gif"
                      :before-upload="file => beforeUpload('orgCodeLicensePhotos', file)" :max-size="1024">
                      <Avatar icon="ios-add" shape="square" size="100"></Avatar>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </Form-item>
              </div>
              <div class="block">
                <div style="display:flex; justify-content: space-between; width:50%;">
                  <Button @click="current--" size="large" style="width:120px;">上一步</Button>
                  <Button type='error' @click="current++" size="large" style="width:200px;">下一步</Button>
                </div>

              </div>
            </div>




          </div>
        </Form>
        </Col>
        <Modal title="预览图片" v-model="modalVisible">
          <img :src="modalUrl" v-if="modalVisible" style="width: 100%">
        </Modal>
      </Row>
      <Button @click="current--">previous</Button>
      <Button @click="current++">next</Button>
      <Button @click="handleSignUp('appForm')">注册</Button>
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
        termAccepted: false,
        businessLicensePhotos: [],
        legalLicensePhotos: [],
        bankLicensePhotos: [],
        orgCodeLicensePhotos: []
        // businessLicenseUrls: ['', ''],
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
      current: 0,
      modalVisible: false,
      modalUrl:''
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
    },
    testFunction(e){
      console.log('testFunction', e);
    },
    beforeUpload(fileListName, file) {
      let appForm = this.appForm;
      // 最多上传两张图片
      if(appForm[fileListName].length >= 2){
        return false;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        let photoObj = {file:file, name: file.name, url: reader.result}
        appForm[fileListName].push(photoObj);
      }
      return false;
    },
    handleImgView(fileUrl){
      this.modalUrl = fileUrl;
      this.modalVisible = true;
    },
    handleImgRemove(photoList, fileName){
      let photoIdx = this.appForm[photoList].findIndex(item => item.name === fileName)
      if(photoIdx === -1)return;
      this.appForm[photoList].splice(photoIdx, 1)
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

.blocks {
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
  width: 100%;
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
.block-content {
  display: flex;
  flex-direction: column;
  // align-items:flex-start;
  width: 60%;
}
.selector {
  // width: 380px;
}

.inline-selector {
  // width:310px;
  width: 70%;
}

.photo {
  background-color: rgba($color: #000000, $alpha: 0.1);
  height: 100px;
  width: 200px;
}
</style>
