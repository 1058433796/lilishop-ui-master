<template>
  <div>
    <div class="content-goods-publish">
      <Form ref="baseInfoForm" :model="baseInfoForm" :label-width="120" :rules="baseInfoFormRule">
        <h4>基本信息</h4>
        <div class="base-info-item">
          <div class="form-item-view">
            <FormItem label="商品分类">
              <span class="goods-category-name">{{
              this.baseInfoForm.categoryName[0]
              }}</span>
              <span> &gt; {{ this.baseInfoForm.categoryName[1] }}</span>
              <span> &gt; {{ this.baseInfoForm.categoryName[2] }}</span>
            </FormItem>
            <div class="form-item-view-row">
              <FormItem label="产品编号" prop="goodsId">
                <Input type="text" v-model="baseInfoForm.goodsId" placeholder="产品编号" clearable style="width: 260px" />
              </FormItem>
              <FormItem label="产品名称" prop="goodsName">
                <Input type="text" v-model="baseInfoForm.goodsName" placeholder="产品名称" clearable style="width: 260px" />
              </FormItem>
              <FormItem label="产地" prop="goodsOrigin">
                <Input type="text" v-model="baseInfoForm.goodsOrigin" placeholder="产地" clearable style="width: 260px" />
              </FormItem>
              <FormItem label="品牌" prop="goodsBrand">
                <Input type="text" v-model="baseInfoForm.goodsBrand" placeholder="品牌" clearable style="width: 260px" />
              </FormItem>
              <FormItem label="产品重量" prop="goodsWeight">
                <Input type="number" v-model="baseInfoForm.goodsWeight" placeholder="产品重量(kg)" clearable
                  style="width: 260px" />
              </FormItem>
              <FormItem label="重量单位" prop="goodsWeightUnit">
                <Select v-model="baseInfoForm.goodsWeightUnit" clearable style="width:200px">
                  <Option v-for="item in weightUnitList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </FormItem>
              <FormItem label="展示价格" prop="goodsDisplayPrice">
                <Input type="number" v-model="baseInfoForm.goodsDisplayPrice" placeholder="请输入（元）" clearable
                  style="width: 260px" />
              </FormItem>
              <FormItem label="市场价格" prop="goodsMarketPrice">
                <Input type="number" v-model="baseInfoForm.goodsMarketPrice" placeholder="请输入（元）" clearable
                  style="width: 260px" />
              </FormItem>
            </div>
          </div>
          <h4>商品资料及图片</h4>
          <div class="form-item-view-row">
            <FormItem class="form-item-view-el required" label="上传图片" prop="goodsGalleryFiles">
              <div style="display: flex; flex-wrap: flex-start">
                <vuedraggable :list="baseInfoForm.goodsGalleryFiles" :animation="200">
                  <div class="demo-upload-list" v-for="(item, __index) in baseInfoForm.goodsGalleryFiles"
                    :key="__index">
                    <template>
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <div>
                          <Icon type="md-search" size="30" @click.native="handleViewGoodsPicture(item.url)"></Icon>
                          <Icon type="md-trash" size="30" @click.native="handleRemoveGoodsPicture(item)"></Icon>
                        </div>
                      </div>
                    </template>
                  </div>
                </vuedraggable>

                <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccessGoodsPicture"
                  :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize" :max-size="1024" :before-upload="handleBeforeUploadGoodsPicture"
                  multiple type="drag" :action="uploadFileUrl" :headers="{ ...accessToken }" style="margin-left: 10px">
                  <div style="width: 148px; height: 148px; line-height: 148px">
                    <Icon type="md-add" size="20"></Icon>
                  </div>
                </Upload>
              </div>
              <Modal title="View Image" v-model="goodsPictureVisible">
                <img :src="previewGoodsPicture" v-if="goodsPictureVisible" style="width: 100%" />
              </Modal>
            </FormItem>

            <FormItem class="form-item-view-el required" label="上传模型" prop="goodsModelFiles">
              <div style="display: flex; flex-wrap: flex-start">
                <vuedraggable :list="baseInfoForm.goodsModelFiles" :animation="200">
                  <div class="demo-upload-list" v-for="(item, __index) in baseInfoForm.goodsModelFiles" :key="__index">
                    <template>
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <div>
                          <Icon type="md-search" size="30" @click.native="handleViewGoodsPicture(item.url)"></Icon>
                          <Icon type="md-trash" size="30" @click.native="handleRemoveGoodsPicture(item)"></Icon>
                        </div>
                      </div>
                    </template>
                  </div>
                </vuedraggable>

                <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccessGoodsPicture"
                  :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize" :max-size="1024" :before-upload="handleBeforeUploadGoodsPicture"
                  multiple type="drag" :action="uploadFileUrl" :headers="{ ...accessToken }" style="margin-left: 10px">
                  <div style="width: 148px; height: 148px; line-height: 148px">
                    <Icon type="md-add" size="20"></Icon>
                  </div>
                </Upload>
              </div>
              <Modal title="View Image" v-model="goodsPictureVisible">
                <img :src="previewGoodsPicture" v-if="goodsPictureVisible" style="width: 100%" />
              </Modal>
            </FormItem>

            <FormItem class="form-item-view-el required" label="上传资料" prop="goodsMaterialFiles">
              <div style="display: flex; flex-wrap: flex-start">
                <vuedraggable :list="baseInfoForm.goodsMaterialFiles" :animation="200">
                  <div class="demo-upload-list" v-for="(item, __index) in baseInfoForm.goodsMaterialFiles"
                    :key="__index">
                    <template>
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <div>
                          <Icon type="md-search" size="30" @click.native="handleViewGoodsPicture(item.url)"></Icon>
                          <Icon type="md-trash" size="30" @click.native="handleRemoveGoodsPicture(item)"></Icon>
                        </div>
                      </div>
                    </template>
                  </div>
                </vuedraggable>

                <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccessGoodsPicture"
                  :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize" :max-size="1024" :before-upload="handleBeforeUploadGoodsPicture"
                  multiple type="drag" :action="uploadFileUrl" :headers="{ ...accessToken }" style="margin-left: 10px">
                  <div style="width: 148px; height: 148px; line-height: 148px">
                    <Icon type="md-add" size="20"></Icon>
                  </div>
                </Upload>
              </div>
              <Modal title="View Image" v-model="goodsPictureVisible">
                <img :src="previewGoodsPicture" v-if="goodsPictureVisible" style="width: 100%" />
              </Modal>
            </FormItem>

            </div>
            <h4>规格参数</h4>
            <div class="form-item-view-row">
              <formItem label="ANSI认证" prop="ANSICert">
                <Select v-model="baseInfoForm.ANSICert" style="width:100px">
                  <Option v-for="item in ANSIList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="EN认证" prop="ENcert">
                <Select v-model="baseInfoForm.ENcert" style="width:100px">
                  <Option v-for="item in ENList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="GB认证" prop="GBcert">
                <Select v-model="baseInfoForm.GBcert" style="width:100px">
                  <Option v-for="item in GBList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="防火认证" prop="fireProofCert">
                <Select v-model="baseInfoForm.fireProofCert" style="width:100px">
                  <Option v-for="item in fireProofList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="辅助认证" prop="AuxCert">
                <Select v-model="baseInfoForm.fireProofCert" style="width:100px">
                  <Option v-for="item in auxList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="材质" prop="material">
                <Select v-model="baseInfoForm.material" style="width:100px">
                  <Option v-for="item in materialList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="饰面" prop="decoration">
                <Select v-model="baseInfoForm.decoration" style="width:100px">
                  <Option v-for="item in decorationList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="尺寸规格" prop="size">
                <Select v-model="baseInfoForm.size" style="width:100px">
                  <Option v-for="item in sizeList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="承重" prop="loadBearing">
                <Select v-model="baseInfoForm.loadBearing" style="width:100px">
                  <Option v-for="item in loadBearingList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>
              <formItem label="力级" prop="forceLevel">
                <Select v-model="baseInfoForm.forceLevel" style="width:100px">
                  <Option v-for="item in forceLevelList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>
              <formItem label="可调节参数" prop="adjustParam">
                <Select v-model="baseInfoForm.adjustParam"  style="width:100px">
                  <Option v-for="item in adjustParamList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

          </div>

          <h4>详情描述</h4>
          <div class="form-item-view">
            <FormItem style="width: 100%" class="form-item-view-el" prop="intro">
              <editor ref="editor" openXss v-model="baseInfoForm.intro" :init="{ ...initEditor, height: '800px' }">
              </editor>
              <div class="promise-intro-btn">
                <Button type="primary">下一步</Button>
              </div>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <ButtonGroup>
        <Button type="primary" @click="pre" v-if="!$route.query.id && !$route.query.draftId">上一步
        </Button>
        <Button type="primary" @click="save" :loading="submitLoading">
          {{ this.$route.query.id ? "保存" : "保存商品" }}
        </Button>
        <!-- <Button type="primary" @click="saveToDraft">保存为模版</Button> -->
      </ButtonGroup>
    </div>
  </div>
</template>
<script>
import * as API_GOODS from "@/api/goods";
import * as API_Shop from "@/api/shops";
import cloneObj from "@/utils/index";
import vuedraggable from "vuedraggable";
import Editor from "@tinymce/tinymce-vue";
import { initEditor } from "@/views/lili-components/editor/config";
import { uploadFile } from "@/libs/axios";
import { regular } from "@/utils";
import * as MetaData from "./metaData"

export default {
  name: "goodsOperationSec",
  components: {
    editor: Editor,
    vuedraggable,
  },
  props: {
    firstData: {
      default: {},
      type: Object,
    },
  },
  data() {
    // 表单验证项，商品价格
    const checkPrice = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error("商品价格不能为空"));
      }
      setTimeout(() => {
        if (!regular.money.test(value)) {
          callback(new Error("请输入正整数或者两位小数"));
        } else if (parseFloat(value) > 99999999) {
          callback(new Error("商品价格设置超过上限值"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      regular,
      initEditor,
      total: 0,
      global: 0,
      accessToken: "", //令牌token
      goodsParams: "",
      categoryId: "", // 商品分类第三级id
      //提交状态
      submitLoading: false,
      //上传图片路径
      uploadFileUrl: uploadFile,
      // 预览图片路径
      previewPicture: "",
      //商品图片
      previewGoodsPicture: "",
      //展示图片层
      visible: false,
      //展示商品图片
      goodsPictureVisible: false,

      wholesaleData: [
        {
          num: 0,
          price: 0,
          goodsId: this.goodsId,
        },
      ],
      /** 发布商品基本参数 */
      baseInfoForm: MetaData.baseInfoForm,

      baseInfoFormRule: MetaData.baseInfoFormRule,
      params: {
        pageNumber: 1,
        pageSize: 1000,
      },
      // 重量单位列表
      weightUnitList: MetaData.weightUnitList,
      /** 品牌列表 */
      brandList: MetaData.brandList,
      /** 店铺分类列表 */
      shopCategory: MetaData.shopCategory,
      /** 商品单位列表 */
      goodsUnitList: MetaData.goodsUnitList,
      // 规格参数列表
      ANSIList: MetaData.ANSIList,
      ENList:MetaData.ENList,
      GBList:MetaData.GBList,
      fireProofList:MetaData.fireProofList,
      auxList:MetaData.auxList,
      materialList:MetaData.materialList,
      decorationList:MetaData.decorationList,
      sizeList:MetaData.sizeList,
      loadBearingList:MetaData.loadBearingList,
      forceLevelList:MetaData.forceLevelList,
      adjustParamList:MetaData.adjustParamList,
    };
  },
  methods: {
    /**
     * 选择参数
     * @paramsGroup 参数分组
     * @groupIndex 参数分组下标
     * @params 参数选项
     * @paramIndex 参数下标值
     * @value 参数选项值
     */

    pre() {
      // 上一步
      this.$parent.activestep--;
    },
    // 预览图片
    handleView(url) {
      this.previewPicture = url;
      this.visible = true;
    },
    // 移除已选图片
    handleRemove(item, index) {
      this.selectedSku.images = this.selectedSku.images.filter(
        (i) => i.url !== item.url
      );
      if (this.selectedSku.images.length > 0 && index === 0) {
        this.previewPicture = this.selectedSku.images[0].url;
      } else if (this.selectedSku.images.length < 0) {
        this.previewPicture = "";
      }
    },
    // 查看商品大图
    handleViewGoodsPicture(url) {
      this.previewGoodsPicture = url;
      this.goodsPictureVisible = true;
    },
    // 移除商品图片
    handleRemoveGoodsPicture(file) {
      this.baseInfoForm.goodsGalleryFiles =
        this.baseInfoForm.goodsGalleryFiles.filter((i) => i.url !== file.url);
    },
    // 商品图片上传成功
    handleSuccessGoodsPicture(res, file) {
      if (file.response) {
        file.url = file.response.result;
        this.baseInfoForm.goodsGalleryFiles.push(file);
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
    handleBeforeUploadGoodsPicture(file) {
      const check = this.baseInfoForm.goodsGalleryFiles.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "图片数量不能大于五张",
        });
        return false;
      }
    },
    change(category, goodsType){
      console.log(category, goodsType);
    },

    /**  添加商品 **/
    save() {
      this.submitLoading = true;
      this.$refs["baseInfoForm"].validate((valid) => {
        if (valid) {
          
        } else {
          this.submitLoading = false;
          this.$Message.error("还有必填项未做处理，请检查表单");
        }
      });
    },
  },
  mounted() {
    this.accessToken = {
      accessToken: this.getStore("accessToken"),
    };
    this.baseInfoForm.categoryName = this.firstData.category.map(item => item.name);
    console.log(this.baseInfoForm);
  },
};
</script>
<style lang="scss" scoped>
@import "./addGoods.scss";
</style>

<style scoped>
.form-item-view-row {
  display: flex;
  flex-wrap: wrap;
}

.ivu-select .ivu-select-dropdown {
  overflow: hidden !important;
}

/* .tox-notifications-container{
  display: none !important;
} */
</style>
