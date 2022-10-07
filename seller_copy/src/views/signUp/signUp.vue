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
        <!-- <Button @click="clickFunc">注册测试</Button> -->
        <Button @click="validForm('appForm')">appForm检验测试</Button>
        <Button @click="validForm('picForm')">picForm检验测试</Button>
        <Button @click="autoFill">自动填写</Button>
        <Button @click="testFileUpload">图片上传</Button>
        <Button @click="next">下一步</Button>
        <Form ref="appForm" :model="appForm" :rules="appRules" class="form" :label-width="150">

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

                <Form-item prop="businessNumber" label="营业执照注册号">
                  <Input type="text" v-model="appForm.businessNumber" placeholder="请输入营业执照注册号">
                  </Input>
                </Form-item>

                <Form-item prop="businessAddress" label="营业执照所在地">
                  <Cascader :data="addressList" v-model="appForm.businessAddress" class="selector"></Cascader>
                </Form-item>

                <Form-item prop="businessDetailAddress" label="营业执照详细地址">
                  <Input type="text" v-model="appForm.businessDetailAddress" placeholder="请输入营业执照详细地址">
                  </Input>
                </Form-item>

                <Form-item label="营业期限" prop="licenseValidRange">
                  <div style="display:flex; justify-content: space-between;">
                    <Date-picker type="daterange" placeholder="选择日期" class="inline-selector"
                      @on-change="e => onDateChange(e, 'licenseValidRange')" format="yyyy-MM-dd"
                      :disabled="appForm.businessLongPeriod"></Date-picker>
                    <Checkbox v-model="appForm.businessLongPeriod" size="large"
                      style="margin-left: 20px; margin-right:0;">长期
                    </Checkbox>
                  </div>
                </Form-item>
              </template>
            </Block>

            <Block>
              <template #title>法人代表信息</template>
              <template #content>
                <Form-item label="法人代表证件类型" prop="legalType">
                  <Select v-model="appForm.legalType" class="selector">
                    <Option v-for="item in LicenseTypeList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </Form-item>
                <Form-item label="法人代表证件号" prop="legalNumber">
                  <Input type="text" v-model="appForm.legalNumber" placeholder="请输入法人代表证件号">
                  </Input>
                </Form-item>
                <Form-item label="法人代表名称" prop="legalName">
                  <Input type="text" v-model="appForm.legalName" placeholder="请输入法人代表名称">
                  </Input>
                </Form-item>
                <Form-item label="有效期" prop="legalRepresentLicenseValidRange">
                  <div style="display:flex; justify-content: space-between;">
                    <Date-picker type="daterange" placeholder="选择日期" class="inline-selector"
                      @on-change="e => onDateChange(e, 'legalRepresentLicenseValidRange')" format="yyyy-MM-dd"
                      :disabled="appForm.legalLongPeriod"></Date-picker>
                    <Checkbox v-model="appForm.legalLongPeriod" size="large" style="margin-left: 20px; margin-right:0;">
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
                <Form-item label="组织机构代码" prop="code">
                  <Select v-model="appForm.code" class="selector">
                    <Option v-for="item in orgCodeList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </Form-item>
                <Form-item label="组织机构代码有效期" prop="orgCodeValidRange">
                  <div style="display:flex; justify-content: space-between;">
                    <Date-picker type="daterange" placeholder="选择日期" class="inline-selector"
                      @on-change="e => onDateChange(e, 'orgCodeValidRange')" format="yyyy-MM-dd"
                      :disabled="appForm.codeLongPeriod"></Date-picker>
                    <Checkbox v-model="appForm.codeLongPeriod" size="large" style="margin-left: 20px; margin-right:0;">
                      长期
                    </Checkbox>
                  </div>
                </Form-item>
                <br /><br />
                <Form-item>
                  <Button type="error" size="large" @click="applyFirstStep('appForm')" style="width:100%;"
                    :disabled="!appForm.termAccepted">下一步</Button>
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
        </Form>
        <Form ref="picForm" :model="picForm" :rule="picRules" class="form" :label-width="150">
          <div v-show="current === 1" class="blocks">

            <Block :showTitle="false" :contentStyle="{width: '80%'}">
              <template #content>

                <!--  -->

                <FormItem class="form-item-view-el required" label="营业执照/三证合一电子版" prop="businessLicensePhotos">
                  <div>
                    请上传清晰营业执照图片，系统识别公司信息自动进行填写，营业执照复印件需加盖公司红章扫描上传，
                    若营业执照上未体现注册资本、经营范围，请在营业执照后另行上传企业信息公示网上的截图。
                  </div>
                  <div style="display: flex; flex-wrap: flex-start;">
                    <!-- <draggable :list="picForm.businessLicensePhotos" :animation="200"> -->
                    <div class="demo-upload-list" v-for="(item, __index) in picForm.businessLicensePhotos"
                      :key="__index">
                      <template>
                        <img :src="item.url" style="width:150px;" />
                        <div class="demo-upload-list-cover" style="width:150px;">
                          <div>
                            <Icon type="md-search" size="30" @click.native="handleImgView(item.url)"></Icon>
                            <Icon type="md-trash" size="30"
                              @click.native="handleRemoveGoodsPicture('businessLicensePhotos', item)"></Icon>
                          </div>
                        </div>
                      </template>
                    </div>
                    <!-- </draggable> -->

                    <Upload :show-upload-list="false"
                      :on-success="(res, file) => handleSuccessGoodsPicture('businessLicensePhotos', res, file)"
                      :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize" :max-size="1024"
                      :before-upload="e => handleBeforeUploadGoodsPicture('businessLicensePhotos', e)" multiple
                      type="drag" :action="fileUploadUrl" style="margin-left: 10px">
                      <div style="width: 148px; height: 148px; line-height: 148px">
                        <Icon type="md-add" size="20"></Icon>
                      </div>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </FormItem>

                <!--  -->

                <FormItem class="form-item-view-el required" label="法人证件电子版" prop="legalLicensePhotos">
                  <div>
                    请上传清晰营业执照图片，系统识别公司信息自动进行填写，营业执照复印件需加盖公司红章扫描上传，
                    若营业执照上未体现注册资本、经营范围，请在营业执照后另行上传企业信息公示网上的截图。
                  </div>
                  <div style="display: flex; flex-wrap: flex-start;">
                    <!-- <draggable :list="picForm.businessLicensePhotos" :animation="200"> -->
                    <div class="demo-upload-list" v-for="(item, __index) in picForm.legalLicensePhotos"
                      :key="__index">
                      <template>
                        <img :src="item.url" style="width:150px;" />
                        <div class="demo-upload-list-cover" style="width:150px;">
                          <div>
                            <Icon type="md-search" size="30" @click.native="handleImgView(item.url)"></Icon>
                            <Icon type="md-trash" size="30"
                              @click.native="handleRemoveGoodsPicture('legalLicensePhotos', item)"></Icon>
                          </div>
                        </div>
                      </template>
                    </div>
                    <!-- </draggable> -->

                    <Upload :show-upload-list="false"
                      :on-success="(res, file) => handleSuccessGoodsPicture('legalLicensePhotos', res, file)"
                      :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize" :max-size="1024"
                      :before-upload="e => handleBeforeUploadGoodsPicture('legalLicensePhotos', e)" multiple
                      type="drag" :action="fileUploadUrl" style="margin-left: 10px">
                      <div style="width: 148px; height: 148px; line-height: 148px">
                        <Icon type="md-add" size="20"></Icon>
                      </div>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </FormItem>




                <!-- <Form-item label="法人证件电子版" prop="legalLicensePhotos">
                  <div>
                    请按顺序分别上传正面（带有照片一面）和反面电子版照片，复印件请加盖开店公司红章
                  </div>
                  <div style="display:flex;">
                    <div v-for="item in  picForm.legalLicensePhotos" :key="item.name" style="margin-right: 20px;">
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
                </Form-item> -->

                <FormItem class="form-item-view-el required" label="银行开户许可证电子版" prop="bankLicensePhotos">
                  <div>
                    请上传清晰营业执照图片，系统识别公司信息自动进行填写，营业执照复印件需加盖公司红章扫描上传，
                    若营业执照上未体现注册资本、经营范围，请在营业执照后另行上传企业信息公示网上的截图。
                  </div>
                  <div style="display: flex; flex-wrap: flex-start;">
                    <!-- <draggable :list="picForm.businessLicensePhotos" :animation="200"> -->
                    <div class="demo-upload-list" v-for="(item, __index) in picForm.bankLicensePhotos"
                      :key="__index">
                      <template>
                        <img :src="item.url" style="width:150px;" />
                        <div class="demo-upload-list-cover" style="width:150px;">
                          <div>
                            <Icon type="md-search" size="30" @click.native="handleImgView(item.url)"></Icon>
                            <Icon type="md-trash" size="30"
                              @click.native="handleRemoveGoodsPicture('bankLicensePhotos', item)"></Icon>
                          </div>
                        </div>
                      </template>
                    </div>
                    <!-- </draggable> -->

                    <Upload :show-upload-list="false"
                      :on-success="(res, file) => handleSuccessGoodsPicture('bankLicensePhotos', res, file)"
                      :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize" :max-size="1024"
                      :before-upload="e => handleBeforeUploadGoodsPicture('bankLicensePhotos', e)" multiple
                      type="drag" :action="fileUploadUrl" style="margin-left: 10px">
                      <div style="width: 148px; height: 148px; line-height: 148px">
                        <Icon type="md-add" size="20"></Icon>
                      </div>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </FormItem>


                <!-- <Form-item label="银行开户许可证电子版" prop="bankLicensePhotos">
                  <div>
                    许可证上名称、法人需与营业执照一致，若发生变更须出具变更证明，复印件需加盖公司红章扫描上传
                  </div>
                  <div style="display:flex;">
                    <div v-for="item in  picForm.bankLicensePhotos" :key="item.name" style="margin-right: 20px;">
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
                </Form-item> -->


                <FormItem class="form-item-view-el required" label="组织机构代码证电子版" prop="orgCodeLicensePhotos">
                  <div>
                    请上传清晰营业执照图片，系统识别公司信息自动进行填写，营业执照复印件需加盖公司红章扫描上传，
                    若营业执照上未体现注册资本、经营范围，请在营业执照后另行上传企业信息公示网上的截图。
                  </div>
                  <div style="display: flex; flex-wrap: flex-start;">
                    <!-- <draggable :list="picForm.businessLicensePhotos" :animation="200"> -->
                    <div class="demo-upload-list" v-for="(item, __index) in picForm.orgCodeLicensePhotos"
                      :key="__index">
                      <template>
                        <img :src="item.url" style="width:150px;" />
                        <div class="demo-upload-list-cover" style="width:150px;">
                          <div>
                            <Icon type="md-search" size="30" @click.native="handleImgView(item.url)"></Icon>
                            <Icon type="md-trash" size="30"
                              @click.native="handleRemoveGoodsPicture('orgCodeLicensePhotos', item)"></Icon>
                          </div>
                        </div>
                      </template>
                    </div>
                    <!-- </draggable> -->

                    <Upload :show-upload-list="false"
                      :on-success="(res, file) => handleSuccessGoodsPicture('orgCodeLicensePhotos', res, file)"
                      :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize" :max-size="1024"
                      :before-upload="e => handleBeforeUploadGoodsPicture('orgCodeLicensePhotos', e)" multiple
                      type="drag" :action="fileUploadUrl" style="margin-left: 10px">
                      <div style="width: 148px; height: 148px; line-height: 148px">
                        <Icon type="md-add" size="20"></Icon>
                      </div>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </FormItem>

                <!-- <Form-item label="组织机构代码证电子版" prop="orgCodeLicensePhotos">
                  <div>
                    复印件需加盖公司红章扫描上传，三证合一的此处请上传营业执照电子版
                  </div>
                  <div style="display:flex;">
                    <div v-for="item in  picForm.orgCodeLicensePhotos" :key="item.name" style="margin-right: 20px;">
                      <img :src="item.url" class="photo">
                      <div style="display:flex; justify-content: center;">
                        <Button type="success" size="small" style="margin-right:10px;"
                          @click="handleImgView(item.url)">预览</Button>
                        <Button type="error" size="small"
                          @click="handleImgRemove('orgCodeLicensePhotos', item.name)">删除</Button>
                      </div>
                    </div>
                    <Upload action="" accept="image/png, image/jpeg, image/gif"
                      :before-upload="file => beforeUpload('orgCodeLicensePhotos', file, '组织机构代码证')" :max-size="1024">
                      <Avatar icon="ios-add" shape="square" size="100"></Avatar>
                    </Upload>
                  </div>
                  <div>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpeg、gif格式，最多上传2张</div>
                </Form-item> -->

              </template>
            </Block>

            <Block :showTitle="false"
              :contentStyle="{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '50%'}">
              <template #content>
                <Button @click="previous" size="large" style="width:120px;">上一步</Button>
                <Button type='error' @click="applySecondStep('picForm')" size="large" style="width:200px;">下一步</Button>
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

            <br /><br /><br />

            <Block :showTitle="false"
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

            <br /><br />

            <Block :showTitle="false">
              <template #content>
                <Card>
                  <div>您的账号：15088888888 密码：88888888</div>
                  <div>客户端地址：www.baidu.com</div>
                  <br />
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
import { test, register, upLoadFile, register2 } from "@/api/index";
import Block from '@/views/signUp/Block'
import * as config from "@/views/signUp/config.js"
import { uploadFileWithoutValid } from "@/libs/axios"

export default {
  name: "signUp",
  components: {
    Block
  },

  data() {
    return {
      // 表单
      appForm: config.appForm,
      picForm: config.picForm,
      // 校验规则
      appRules: config.appRules,
      picRules: config.picRules,
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
      modalUrl: '',
      fileUploadUrl: uploadFileWithoutValid
    }
  },
  methods: {
    testFileUpload() {
      // 依次上传图片
      let fileList = ['businessLicensePhotos', 'legalLicensePhotos', 'bankLicensePhotos', 'orgCodeLicensePhotos'];
      this.handleUpload(fileList);
    },
    autoFill() {
      this.appForm = config.testForm;
      this.appRules = {};
      this.picRules = {};
    },
    validForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
      })
    },
    // 对form进行处理
    getProcessedForm(form) {

      let subForm = JSON.parse(JSON.stringify(form));

      let addrJoiner = addrs => addrs.join('-');

      subForm.businessAddress = addrJoiner(form.businessAddress);

      if (form.licenseValidRange.length === 2) {
        subForm.businessValidBeg = form.licenseValidRange[0];
        subForm.businessValidEnd = form.licenseValidRange[1];
      }

      if (form.legalRepresentLicenseValidRange.length === 2) {
        subForm.legalValidBeg = form.legalRepresentLicenseValidRange[0];
        subForm.legalValidEnd = form.legalRepresentLicenseValidRange[1];
      }

      subForm.companyAddress = addrJoiner(form.companyAddress);
      if (form.orgCodeValidRange.length === 2) {
        subForm.codeValidBeg = form.orgCodeValidRange[0];
        subForm.codeValidEnd = form.orgCodeValidRange[1];
      }

      // 删除无用属性
      delete subForm.licenseValidRange;
      delete subForm.legalRepresentLicenseValidRange;
      delete subForm.orgCodeValidRange;
      delete subForm.termAccepted;

      subForm.username = this.getStore('username');
      subForm.password = this.md5(this.getStore('password'));
      return subForm;
    },
    // 提交表格注册
    applyFirstStep(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        let form = this.getProcessedForm(this.appForm);
        console.log(form);
        register(form).then(e => {
          if (!e.success) return;
          // 下一步
          this.next();
        })
      })
    },
    applySecondStep(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (!valid) return;
        const form = this[formName];
        console.log(form)
        let submit = {};

        submit.username = this.getStore("username");
        submit.password = this.md5(this.getStore("password"));

        // 营业执照设置
        if (form.businessLicensePhotos.length > 0) {
          submit.busLicPhotoList = form.businessLicensePhotos.map((i) => i.url).toString();
        }

        // 法人证件设置
        if (form.legalLicensePhotos.length > 0) {
          submit.legalLicPhotoList = form.legalLicensePhotos.map((i) => i.url).toString();
        }

        // 银行开户许可证设置
        if (form.bankLicensePhotos.length > 0) {
          submit.bankLicPhotoList = form.bankLicensePhotos.map((i) => i.url).toString();
        }

        //组织机构代码证设置
        if (form.orgCodeLicensePhotos.length > 0) {
          submit.orgCodeLicPhotosList = form.orgCodeLicensePhotos.map((i) => i.url).toString();
        }

        console.log(submit);
        register2(submit).then(res => {
          console.log(res);
          if(res && res.success){
            next();
          }
        })
      })
    },
    // 上一步
    previous() {
      if (this.current > 0) this.current--;
    },
    // 下一步
    next() {
      if (this.current < 3)
        this.current++;
    },
    onDateChange(e, name) {
      this.appForm[name] = e
    },

    /**upload上传文件前操作
     * 
     * @param fileListName 文件列表名称
     * @param file 上传文件
     * @param fileType 文件类型（身份证，营业执照，...）
     */
    beforeUpload(fileListName, file, fileType) {
      let form = this.picForm;
      // 最多上传两张图片
      if (form[fileListName].length >= 2) {
        return false;
      }

      // // 修改上传文件名称为 type + uid + 后缀名
      // let postfix = file.name.split('.').pop();
      // let fileName = fileType + uuidv4() + '.' + postfix;
      // let copyFile = new File([file], fileName, { type: file.type });
      // const reader = new FileReader();
      // reader.readAsDataURL(copyFile)
      // reader.onload = () => {
      //   let photoObj = { file: copyFile, name: file.name, url: reader.result }
      //   form[fileListName].push(photoObj);
      // }

    },

    // 将所有fileList中的图片进行上传
    handleUpload(fileListNames) {
      let username = this.getStore('username');
      let password = this.md5(this.getStore('password'));

      let formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      for (let i = 0; i < fileListNames.length; i++) {
        this.picForm[fileListNames[i]].forEach(item => {
          formData.append("files", item.file)
        })
      }
      return upLoadFile(formData);
    },

    // 处理图片预览
    handleImgView(fileUrl) {
      this.modalUrl = fileUrl;
      this.modalVisible = true;
    },

    // 处理图片删除
    handleImgRemove(photoList, fileName) {
      // let photoIdx = this.appForm[photoList].findIndex(item => item.name === fileName)
      // if (photoIdx === -1) return;
      // this.appForm[photoList].splice(photoIdx, 1)
    },

    // 移除商品图片
    handleRemoveGoodsPicture(fileListName, file) {
      this.picForm[fileListName] =
        this.picForm[fileListName].filter((i) => i.url !== file.url);
    },

    handleSuccessGoodsPicture(fileListName, res, file) {
      if (file.response) {
        file.url = file.response.result;
        this.picForm[fileListName].push(file);
      }
    },
    // 图片格式不正确
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件 " + file.name + " 的格式不正确",
      });
    },
    // 图片大小不正确
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超过文件大小限制",
        desc: "图片大小不能超过1MB",
      });
    },
    // 图片上传前钩子
    handleBeforeUploadGoodsPicture(fileListName, file) {
      console.log(fileListName, 'upload');
      const check = this.picForm[fileListName].length < 3;
      if (!check) {
        this.$Notice.warning({
          title: "数量不能多于三个",
        });
        return false;
      }
    },
  },

  created() {
    console.log('路由传值：', this.$route.query);
    if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
    if (!this.getStore("username") || !this.getStore("password")) {
      console.log("账户密码为空，跳转到登录页面");
      this.$router.push("login");
    }
    console.log(this.getStore('username'), this.getStore('password'));
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
  width: 150px;
}

.form-item-view-row {
  display: flex;
  flex-wrap: wrap;
}

.ivu-select .ivu-select-dropdown {
  overflow: hidden !important;
}

.demo-upload-list {
  width: 150px;
  height: 150px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  display: inline-block;
  background: #fff;
  position: relative;
  margin-right: 4px;
  vertical-align: bottom;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  right: 0;
  background: rgba(0, 0, 0, 0.6);

  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: flex;
}

.demo-upload-list-cover div {
  margin-top: 50px;
  width: 100%;

  >i {
    width: 50%;
    margin-top: 8px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>

  
