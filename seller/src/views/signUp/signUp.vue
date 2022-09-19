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
        <Button @click="clickFunc">注册测试</Button>
        <Button @click="validForm('appForm')">检验测试</Button>
        <Form ref="appForm" :model="appForm" :rules="ruleInline" class="form" :label-width="150">

          <div v-show="current === 0" class="blocks">
            <Block>
                <template #title>营业执照信息</template>
                <template #content>
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
                  <Input type="text" v-model="appForm.licenseRegisterNumber" placeholder="请输入营业执照注册号">
                  </Input>
                </Form-item>

                <Form-item prop="licenseAddress" label="营业执照所在地">
                  <Cascader :data="addressList" v-model="appForm.licenseAddress" class="selector"></Cascader>
                </Form-item>

                <Form-item prop="licenseDetailAddress" label="营业执照详细地址">
                  <Input type="text" v-model="appForm.licenseDetailAddress" placeholder="请输入营业执照详细地址">
                  </Input>
                </Form-item>

                <Form-item label="营业期限" prop="licenseValidRange">
                  <div style="display:flex; justify-content: space-between;">
                    <Date-picker type="daterange" placeholder="选择日期" class="inline-selector" @on-change="e => onDateChange(e, 'licenseValidRange')"
                    format="yyyy-MM-dd" :disabled="appForm.licenseValidLongPeriod"></Date-picker>
                    <Checkbox v-model="appForm.licenseValidLongPeriod" size="large"
                      style="margin-left: 20px; margin-right:0;">长期
                    </Checkbox>
                  </div>
                </Form-item>
                </template>
              </Block>

            <Block>
              <template #title>法人代表信息</template>
              <template #content>
                <Form-item label="法人代表证件类型" prop="legalRepresentLicenseType">
                  <Select v-model="appForm.legalRepresentLicenseType" class="selector">
                    <Option v-for="item in LicenseTypeList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </Form-item>
                <Form-item label="法人代表证件号" prop="legalRepresentLicenseNumber">
                  <Input type="text" v-model="appForm.legalRepresentLicenseNumber" placeholder="请输入法人代表证件号">
                  </Input>
                </Form-item>
                <Form-item label="法人代表名称" prop="legalRepresentName">
                  <Input type="text" v-model="appForm.legalRepresentName" placeholder="请输入法人代表名称">
                  </Input>
                </Form-item>
                <Form-item label="有效期" prop="legalRepresentLicenseValidRange">
                  <div style="display:flex; justify-content: space-between;">
                    <Date-picker type="daterange" placeholder="选择日期" 
                    class="inline-selector" @on-change="e => onDateChange(e, 'legalRepresentLicenseValidRange')"
                    format="yyyy-MM-dd" :disabled="appForm.legalRepresentLicenseLongPeriod"></Date-picker>
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
                  <Input type="text" v-model="appForm.companyDetailAddress" placeholder="请输入公司详细地址">
                  </Input>
                </Form-item>
                <Form-item prop="companyEmergencyName" label="公司紧急联系人">
                  <Input type="text" v-model="appForm.companyEmergencyName" placeholder="请输入公司紧急联系人">
                  </Input>
                </Form-item>
                <Form-item prop="companyEmergencyPhoneNumber" label="公司紧急联系人电话">
                  <Input type="number" v-model="appForm.companyEmergencyPhoneNumber" placeholder="请输入公司紧急联系人号码">
                  </Input>
                </Form-item>
              </template>
            </Block>

            <Block>
              <template #title>组织机构代码</template>
              <template #content>
                <Form-item label="组织机构代码" prop="orgCode">
                  <Select v-model="appForm.orgCode" class="selector">
                    <Option v-for="item in orgCodeList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </Form-item>
                <Form-item label="组织机构代码有效期" prop="orgCodeValidRange">
                  <div style="display:flex; justify-content: space-between;">
                    <Date-picker type="daterange" placeholder="选择日期"
                     class="inline-selector" @on-change="e => onDateChange(e, 'orgCodeValidRange')"
                    format="yyyy-MM-dd" :disabled="appForm.orgCodeValidLongPeriod"></Date-picker>
                    <Checkbox v-model="appForm.orgCodeValidLongPeriod" size="large"
                      style="margin-left: 20px; margin-right:0;">长期
                    </Checkbox>
                  </div>
                </Form-item>
                <br /><br />
                <Form-item>
                  <Button type="error" size="large" @click="next" style="width:100%;" :disabled="!appForm.termAccepted">下一步</Button>
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
              </template>
            </Block>

          </div>

          <div v-show="current === 1" class="blocks">

            <Block :showTitle="false"
             :contentStyle="{width: '80%'}">
                <template #content>
                  <Form-item label="营业执照/三证合一电子版" prop="businessLicensePhotos">
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
                    <Upload action="" accept="image/png, image/jpeg, image/gif"
                      :before-upload="file => beforeUpload('businessLicensePhotos', file, '营业执照')" :max-size="1024">
                      <Avatar icon="ios-add" shape="square" size="100"></Avatar>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </Form-item>
                <Form-item label="法人证件电子版" prop="legalLicensePhotos">
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
                    <Upload action="" accept="image/png, image/jpeg, image/gif"
                      :before-upload="file => beforeUpload('legalLicensePhotos', file, '法人证件')" :max-size="1024">
                      <Avatar icon="ios-add" shape="square" size="100"></Avatar>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </Form-item>

                <Form-item label="银行开户许可证电子版" prop="bankLicensePhotos">
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
                    <Upload action="" accept="image/png, image/jpeg, image/gif"
                      :before-upload="file => beforeUpload('bankLicensePhotos', file, '银行开户许可证')" :max-size="1024">
                      <Avatar icon="ios-add" shape="square" size="100"></Avatar>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </Form-item>

                <Form-item label="组织机构代码证电子版" prop="orgCodeLicensePhotos">
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
                    <Upload action=""  accept="image/png, image/jpeg, image/gif"
                      :before-upload="file => beforeUpload('orgCodeLicensePhotos', file, '组织机构代码证')" :max-size="1024">
                      <Avatar icon="ios-add" shape="square" size="100"></Avatar>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </Form-item>
                </template>
            </Block>

            <Block :showTitle="false" 
            :contentStyle="{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '50%'}">
              <template #content>
                <Button @click="previous" size="large" style="width:120px;">上一步</Button>
                  <Button type='error' @click="next" size="large" style="width:200px;">下一步</Button>
              </template>
              </Block>
          </div>

          <div v-if="current === 2" class="blocks">

            <Block :showTitle="false">
              <template #content>
                您的资料已提交成功，我们将会在2-5个工作日与您电话联系，请您保持电话畅通，谢谢。
                <a style="align-self:flex-end; color:cadetblue;">点击此处查看审核进度 >></a>
              </template>
            </Block>

            <br/><br/><br/>

            <Block 
            :showTitle="false"
            :contentStyle="{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '50%'}">
                  <template #content>
                    <Button @click="previous" size="large" style="width:120px;">上一步</Button>
                    <Button type='error' @click="next" size="large" style="width:200px;">下一步</Button>
                  </template>
            </Block>

          </div>

          <div v-if="current === 3" class="blocks">

          <Block :showTitle="false">
            <template #content>
              <div style="display:flex; justify-content:center;">
                <span style="margin-right:40px;">亲爱的用户，您已注册并审核通过！</span>
              <a style="color:cadetblue;">前往客户端 >></a>
              </div>
            </template>
          </Block>

          <br/><br/>

          <Block :showTitle="false">
            <template #content>
              <Card>
              <div>您的账号：15088888888 密码：88888888</div>
              <div>客户端地址：www.baidu.com</div>
              <br/>
              <div>请惠存您的账号密码，如您在使用过程中有任何问题，请拨打：0512-88888888，我们会5*8h在线为您解答。</div>
            </Card>
            </template>
          </Block>

          <Button @click="previous" size="large">上一步</Button>

          </div>
        </Form>
        </Col>
        <Modal title="预览图片" v-model="modalVisible">
          <img :src="modalUrl" v-if="modalVisible" style="width: 100%">
        </Modal>
      </Row>
    </Card>
  </div>
</template>

<script>
import {test, register, upLoadFile} from "@/api/index";
import {v4 as uuidv4} from 'uuid';
import Block from '@/views/signUp/Block'
import * as config from "@/views/signUp/config.js"

export default {
  name: "signUp",
  components: {
    Block
},

  data() {
    return {
      // 表单
      appForm: config.appForm,
      // 校验规则
      ruleInline: config.ruleInline,
      // 企业所属行业列表
      companyTypeList: config.companyTypeList,
      // 地址列表
      addressList: config.addressList,
      // 证件类型列表
      LicenseTypeList: config.LicenseTypeList,
      // 组织机构代码列表
      orgCodeList: config.orgCodeList,
      // 注册步骤
      current: 0,
      // modal窗口可见
      modalVisible: false,
      // modal窗口预览图片URL
      modalUrl:'',
    }
  },
  methods: {
    validForm(formName){
      this.$refs[formName].validate(valid => {
        console.log(valid);
      })
    },
    // 对form进行处理
    getProcessedForm(form){
      let subForm = JSON.parse(JSON.stringify(form));

      let addrJoiner = addrs => addrs.join('-');

      subForm.licenseAddress = addrJoiner(form.licenseAddress);
      if(form.licenseValidRange.length === 2){
        subForm.licenseValidBeg = form.licenseValidRange[0];
        subForm.licenseValidEnd = form.licenseValidRange[1];
      }
      if(form.legalRepresentLicenseValidRange.length === 2){
        subForm.legalRepresentLicenseValidBeg = form.legalRepresentLicenseValidRange[0];
      subForm.legalRepresentLicenseValidEnd = form.legalRepresentLicenseValidRange[1];
      }

      subForm.companyAddress = addrJoiner(form.companyAddress);
      if(form.orgCodeValidRange.length === 2){
        subForm.orgCodeValidBeg = form.orgCodeValidRange[0];
        subForm.orgCodeValidEnd = form.orgCodeValidRange[1];
      }

      // 删除无用属性
      delete subForm.licenseValidRange;
      delete subForm.legalRepresentLicenseValidRange;
      delete subForm.orgCodeValidRange;
      
      delete subForm.bankLicensePhotos;
      delete subForm.businessLicensePhotos;
      delete subForm.legalLicensePhotos;
      delete subForm.orgCodeLicensePhotos;
      
      return subForm;
    },
    clickFunc(){
    let form = this.getProcessedForm(this.appForm);
    console.log(form);
    register(form).then(e => {
      if(!e.success)return;

      // 登录成功后获取token
      let accessToken = e.result.accessToken;
      let refreshToken = e.result.refreshToken;
      this.setStore("accessToken", accessToken);
      this.setStore("refreshToken", refreshToken);
      // 依次上传图片
      let fileList = ['businessLicensePhotos', 'legalLicensePhotos', 'bankLicensePhotos', 'orgCodeLicensePhotos'];
      this.handleUpload(fileList);
    })
  },
    // 上一步
    previous(){
      if(this.current > 0)this.current--;
    },
    // 下一步
    next() {
      if(this.current < 3)
      this.current++;
    },
    onDateChange(e, name) {
      this.appForm[name] = e
    },
    // 提交表格注册
    handleSignUp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.appForm))
          console.log(data)
        } else {
          console.log('表单无效');
        }
      })
    },
    /**upload上传文件前操作
     * 
     * @param fileListName 文件列表名称
     * @param file 上传文件
     * @param fileType 文件类型（身份证，营业执照，...）
     */
    beforeUpload(fileListName, file, fileType) {
      let appForm = this.appForm;
      // 最多上传两张图片
      if(appForm[fileListName].length >= 2){
        return false;
      }
      // 修改上传文件名称为 type + uid + 后缀名
      let postfix = file.name.split('.').pop();
      let fileName = fileType + uuidv4() + '.' + postfix;
      let copyFile = new File([file], fileName, {type: file.type});
      const reader = new FileReader();
      reader.readAsDataURL(copyFile)
      reader.onload = () => {
        let photoObj = {file:copyFile, name: file.name, url: reader.result}
        appForm[fileListName].push(photoObj);
      }
      return false;
    },

    // 将所有fileList中的图片进行上传
    handleUpload(fileListNames){
      console.log('handleUpload');
      for(let i = 0; i < fileListNames.length; i++){
        this.appForm[fileListNames[i]].forEach(item => {
          // 将图片依次上传
          let formData = new FormData();
          formData.append("file", item.file)
          upLoadFile(formData).then(e => {
            console.log(e);
          });
        })
      }
    },

    // 处理图片预览
    handleImgView(fileUrl){
      this.modalUrl = fileUrl;
      this.modalVisible = true;
    },
    
    // 处理图片删除
    handleImgRemove(photoList, fileName){
      let photoIdx = this.appForm[photoList].findIndex(item => item.name === fileName)
      if(photoIdx === -1)return;
      this.appForm[photoList].splice(photoIdx, 1)
    }
  },

  created() {
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
