<template>
  <div>
    <div class="content-goods-publish">
      <Form ref="baseInfoForm" :model="baseInfoForm" :label-width="120" :rules="baseInfoFormRule">
        <h4>基本信息</h4>
        <div class="base-info-item">
          <div class="form-item-view">
            <FormItem label="商品分类">
              <span class="goods-category-name">{{
              this.categoryName[0]
              }}</span>
              <span> &gt; {{ this.categoryName[1] }}</span>
              <span> &gt; {{ this.categoryName[2] }}</span>
            </FormItem>
            <div class="form-item-view-row">
              <FormItem label="产品编号" prop="goodsCode">
                <Input type="text" v-model="baseInfoForm.goodsCode" placeholder="产品编号" clearable style="width: 260px" />
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
              <FormItem label="重量单位" prop="goodsUnit">
                <Select v-model="baseInfoForm.goodsUnit" clearable style="width:200px">
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
          <div class="form-item-view-row" style="flex-direction:column;">

            <FormItem class="form-item-view-el required" label="上传图片" prop="goodsGalleryFiles">
              <div style="display: flex; flex-wrap: flex-start">
                <draggable :list="baseInfoForm.goodsGalleryFiles" :animation="200">
                  <div class="demo-upload-list" v-for="(item, __index) in baseInfoForm.goodsGalleryFiles"
                    :key="__index">
                    <template>
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <div>
                          <Icon type="md-search" size="30" @click.native="handleViewGoodsPicture(item.url)"></Icon>
                          <Icon type="md-trash" size="30" @click.native="handleRemoveGoodsPicture('goodsGalleryFiles',item)"></Icon>
                        </div>
                      </div>
                    </template>
                  </div>
                </draggable>

                <Upload :show-upload-list="false" :on-success="(res, file) => handleSuccessGoodsPicture('goodsGalleryFiles', res, file)"
                  :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize" :max-size="1024" :before-upload="e => handleBeforeUploadGoodsPicture('goodsGalleryFiles', e)"
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
                <draggable :list="baseInfoForm.goodsModelFiles" :animation="200">
                  <div class="demo-upload-list" v-for="(item, __index) in baseInfoForm.goodsModelFiles"
                    :key="__index">
                    <template>
                      <!-- <img src="../../../assets/file.png" /> -->
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <div>
                          <Icon type="md-search" size="30" @click.native="handleViewGoodsPicture(item.url)"></Icon>
                          <Icon type="md-trash" size="30" @click.native="handleRemoveGoodsPicture('goodsModelFiles',item)"></Icon>
                        </div>
                      </div>
                    </template>
                  </div>
                </draggable>

                <Upload :show-upload-list="false" :on-success="(res, file) => handleSuccessGoodsPicture('goodsModelFiles', res, file)"
                  :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize" :max-size="1024" :before-upload="e => handleBeforeUploadGoodsPicture('goodsModelFiles', e)"
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
                <draggable :list="baseInfoForm.goodsMaterialFiles" :animation="200">
                  <div class="demo-upload-list" v-for="(item, __index) in baseInfoForm.goodsMaterialFiles"
                    :key="__index">
                    <template>
                      <!-- <img src="../../../assets/upload.png" /> -->
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <div>
                          <!-- <Icon type="md-search" size="30" @click.native="handleViewGoodsPicture(item.url)"></Icon> -->
                          <Icon type="md-trash" size="30" @click.native="handleRemoveGoodsPicture('goodsMaterialFiles', item)"></Icon>
                        </div>
                      </div>
                    </template>
                  </div>
                </draggable>

                <Upload :show-upload-list="false" :on-success="(res, file) => handleSuccessGoodsPicture('goodsMaterialFiles', res, file)"
                  :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize" :max-size="1024" :before-upload="e => handleBeforeUploadGoodsPicture('goodsMaterialFiles', e)"
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
              <formItem label="ANSI认证" prop="ansiCert">
                <Select v-model="baseInfoForm.ansiCert" style="width:100px">
                  <Option v-for="item in ANSIList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="EN认证" prop="enCert">
                <Select v-model="baseInfoForm.enCert" style="width:100px">
                  <Option v-for="item in ENList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="GB认证" prop="gbCert">
                <Select v-model="baseInfoForm.gbCert" style="width:100px">
                  <Option v-for="item in GBList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="防火认证" prop="fireProofCert">
                <Select v-model="baseInfoForm.fireProofCert" style="width:100px">
                  <Option v-for="item in fireProofList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </formItem>

              <formItem label="辅助认证" prop="auxCert">
                <Select v-model="baseInfoForm.auxCert" style="width:100px">
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
                <Button type="primary" @click="save">下一步</Button>
              </div>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <ButtonGroup>
        <Button type="primary" @click="pre" v-if="!$route.query.goodsId && !$route.query.draftId">上一步
        </Button>
        <Button type="primary" @click="save" :loading="submitLoading">
          {{ this.$route.query.goodsId ? "保存修改" : "添加商品" }}
        </Button>
      </ButtonGroup>
    </div>
  </div>
</template>
<script>
import * as API_GOODS from "@/api/goods";
import draggable from "vuedraggable";
import Editor from "@tinymce/tinymce-vue";
import { initEditor } from "@/views/lili-components/editor/config";
import { uploadFile } from "@/libs/axios";
import { regular } from "@/utils";
import * as MetaData from "./metaData"

export default {
  name: "goodsOperationSec",
  components: {
    editor: Editor,
    draggable,
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
        // 类别名称
      categoryName: [],
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
      /** 发布商品基本参数 序列化再转对象 防止修改metaData*/
      baseInfoForm: JSON.parse(JSON.stringify(MetaData.baseInfoForm)),

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
    // 查看商品大图
    handleViewGoodsPicture(url) {
      this.previewGoodsPicture = url;
      this.goodsPictureVisible = true;
    },
    // 移除商品图片
    handleRemoveGoodsPicture(fileListName, file) {
      this.baseInfoForm[fileListName] = 
        this.baseInfoForm[fileListName].filter((i) => i.url !== file.url);
    },
    // 商品图片上传成功
    handleSuccessGoodsPicture(fileListName, res, file) {
      if (file.response) {
        file.url = file.response.result;
        this.baseInfoForm[fileListName].push(file);
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
      const check = this.baseInfoForm[fileListName].length < 3;
      if (!check) {
        this.$Notice.warning({
          title: "数量不能多于三个",
        });
        return false;
      }
    },

    /**  添加商品或者修改商品 **/
    save() {
      this.submitLoading = true;
      this.$refs["baseInfoForm"].validate((valid) => {
        if (valid) {
          let submit = JSON.parse(JSON.stringify(this.baseInfoForm));

          // 商品图片设置
          if (submit.goodsGalleryFiles.length <= 0) {
            this.submitLoading = false;
            this.$Message.error("请上传商品图片");
            return;
          }else {
            submit.goodsGalleryList = submit.goodsGalleryFiles.map(
              (i) => i.url
            );
          }
          // 添加模型文件上传
          if(submit.goodsModelFiles.length > 0){
            submit.modelList = submit.goodsModelFiles.map(
              item => item.url
            )
          }
          // 添加材料上传
          if(submit.goodsMaterialFiles.length > 0){
            submit.materialList = submit.goodsMaterialFiles.map(
              item => item.url
            )
          }
          if(this.$route.query && this.$route.query.goodsId){
            console.log('修改商品', submit);
            API_GOODS.editGoods(this.$route.query.goodsId, submit).then(e=>{
            if(e && e.success){
              this.submitLoading = false;
                this.$parent.activestep = 2;
            }
          });
          }else{
            console.log('创建商品', submit);
            // this.submitLoading = false;
            // return;
            API_GOODS.createGoods(submit).then(e=>{
            if(e && e.success){
              console.log(e);
              this.submitLoading = false;
                this.$parent.activestep = 2;
            }
          });
          }

          setTimeout(() =>{
            this.$Message.error("服务器无响应，请稍后再试");
            this.submitLoading = false;
          }, 1000 * 10);
        } else {
          this.submitLoading = false;
          this.$Message.error("还有必填项未做处理，请检查表单");
        }
      });
    },
    async get_GoodData(id){
    let response = (await API_GOODS.getGoods(id)).result;
    console.log('response.reuslt', response);
    this.categoryName = response.categoryName;
    this.baseInfoForm = Object.assign(this.baseInfoForm, response);
    // this.baseInfoForm = {...response}
    // 图片处理
    if (
        response.goodsGalleryList &&
        response.goodsGalleryList.length > 0
      ) {
        this.baseInfoForm.goodsGalleryFiles =
          response.goodsGalleryList.map((i) => {
            return { url: i };
          });
      }
      // 模型处理
      if (
        response.modelList &&
        response.modelList.length > 0
      ) {
        this.baseInfoForm.goodsModelFiles =
          response.modelList.map((i) => {
            return { url: i };
          });
      }
      // 材料处理
      if (
        response.materialList &&
        response.materialList.length > 0
      ) {
        this.baseInfoForm.goodsMaterialFiles =
          response.materialList.map((i) => {
            return { url: i };
          });
      }
      // 报告处理&说明书处理

  },

  },

  mounted() {
    this.accessToken = {
      accessToken: this.getStore("accessToken"),
    };
    console.log('firstData',this.firstData)
    console.log('$route.query',this.$route.query)
    // 使用JSON深拷贝
    this.baseInfoForm = JSON.parse(JSON.stringify(MetaData.baseInfoForm));
    if(this.$route.query && this.$route.query.goodsId){
      // 进行商品编辑行为
      console.log('正在进行商品编辑');
      const goodsId = this.$route.query.goodsId;
      this.get_GoodData(goodsId);
    }else{
      // 进行商品创建行为
      console.log('正在进行商品添加');
      this.categoryName = this.firstData.category.map(item => item.name);
      this.baseInfoForm.categoryPath = this.firstData.category.map(item => item.id).join(',');
    }

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
