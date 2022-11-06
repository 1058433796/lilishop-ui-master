<template>
  <div>
    <div class="content-goods-publish">
     <div>
       <Input
                  type="text"
                  v-model="message"
                  placeholder="快捷导入"
                  clearable
                  style="width: 260px"
                  @keydown.enter="fillForm(message)"
                />
              <Button @click="fillForm(message)">deal</Button>
     </div>
      <Form
        ref="baseInfoForm"
        :model="baseInfoForm"
        :label-width="120"
        :rules="baseInfoFormRule"
      >
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
                <Input
                  type="text"
                  v-model="baseInfoForm.goodsCode"
                  placeholder="产品编号"
                  clearable
                  style="width: 260px"
                />
              </FormItem>
              <FormItem label="产品名称" prop="goodsName">
                <Input
                  type="text"
                  v-model="baseInfoForm.goodsName"
                  placeholder="产品名称"
                  clearable
                  style="width: 260px"
                />
              </FormItem>
              <FormItem label="产地" prop="goodsOrigin">
                <Input
                  type="text"
                  v-model="baseInfoForm.goodsOrigin"
                  placeholder="产地"
                  clearable
                  style="width: 260px"
                />
              </FormItem>
              <FormItem label="品牌" prop="goodsBrand">
                <Input
                  type="text"
                  v-model="baseInfoForm.goodsBrand"
                  placeholder="品牌"
                  clearable
                  style="width: 260px"
                />
              </FormItem>
              <FormItem label="产品重量" prop="goodsWeight">
                <Input
                  type="number"
                  v-model="baseInfoForm.goodsWeight"
                  placeholder="产品重量(kg)"
                  clearable
                  style="width: 260px"
                />
              </FormItem>
              <FormItem label="重量单位" prop="goodsUnit">
                <Select
                  v-model="baseInfoForm.goodsUnit"
                  clearable
                  style="width: 200px"
                >
                  <Option
                    v-for="item in weightUnitList"
                    :value="item"
                    :key="item"
                    >{{ item }}</Option
                  >
                </Select>
              </FormItem>
              <FormItem label="展示价格" prop="goodsDisplayPrice">
                <Input
                  type="number"
                  v-model="baseInfoForm.goodsDisplayPrice"
                  placeholder="请输入（元）"
                  clearable
                  style="width: 260px"
                />
              </FormItem>
              <FormItem label="市场价格" prop="goodsMarketPrice">
                <Input
                  type="number"
                  v-model="baseInfoForm.goodsMarketPrice"
                  placeholder="请输入（元）"
                  clearable
                  style="width: 260px"
                />
              </FormItem>

              <FormItem label="库存数量" prop="quantity">
                <Input
                  type="number"
                  v-model="baseInfoForm.quantity"
                  placeholder="请输入"
                  clearable
                  style="width: 260px"
                />
              </FormItem>

              <FormItem label="计量单位" prop="goodsCountUnit">
                <Input
                  type="text"
                  v-model="baseInfoForm.goodsCountUnit"
                  placeholder="请输入"
                  clearable
                  style="width: 260px"
                />
              </FormItem>
            </div>
          </div>
          <h4>商品资料及图片</h4>
          <div class="form-item-view-row" style="flex-direction: column">
            <FormItem
              class="form-item-view-el required"
              label="上传图片"
              prop="goodsGalleryFiles"
            >
              <div style="display: flex; flex-wrap: flex-start">
                <draggable
                  :list="baseInfoForm.goodsGalleryFiles"
                  :animation="200"
                >
                  <div
                    class="demo-upload-list"
                    v-for="(item, __index) in baseInfoForm.goodsGalleryFiles"
                    :key="__index"
                  >
                    <template>
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <div>
                          <Icon
                            type="md-search"
                            size="30"
                            @click.native="handleViewGoodsPicture(item.url)"
                          ></Icon>
                          <Icon
                            type="md-trash"
                            size="30"
                            @click.native="
                              handleRemoveGoodsPicture(
                                'goodsGalleryFiles',
                                item,
                                'baseInfoForm'
                              )
                            "
                          ></Icon>
                          <Icon
                            type="ios-folder"
                            size="30"
                            @click.native="handleDownload(item.url)"
                          ></Icon>
                        </div>
                      </div>
                    </template>
                  </div>
                </draggable>

                <Upload
                  :show-upload-list="false"
                  :on-success="
                    (res, file) =>
                      handleSuccessGoodsPicture(
                        'goodsGalleryFiles',
                        res,
                        file,
                        'baseInfoForm'
                      )
                  "
                  :format="['jpg', 'jpeg', 'png']"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :max-size="1024"
                  :before-upload="
                    (e) =>
                      handleBeforeUploadGoodsPicture('goodsGalleryFiles', e)
                  "
                  multiple
                  type="drag"
                  :action="uploadFileUrl"
                  :headers="{ ...accessToken }"
                  style="margin-left: 10px"
                >
                  <div style="width: 148px; height: 148px; line-height: 148px">
                    <Icon type="md-add" size="20"></Icon>
                  </div>
                </Upload>
              </div>
              <Modal title="View Image" v-model="goodsPictureVisible">
                <img
                  :src="previewGoodsPicture"
                  v-if="goodsPictureVisible"
                  style="width: 100%"
                />
              </Modal>
            </FormItem>

            <FormItem
              class="form-item-view-el required"
              label="上传资料"
              prop="goodsMaterialFiles"
            >
              <div style="display: flex; flex-wrap: flex-start">
                <draggable
                  :list="baseInfoForm.goodsMaterialFiles"
                  :animation="200"
                >
                  <div
                    class="demo-upload-list"
                    v-for="(item, __index) in baseInfoForm.goodsMaterialFiles"
                    :key="__index"
                  >
                    <template>
                      <div style="position: relative width:100%; height:100%;">
                        <img src="../../../assets/file.png" />
                        <!-- <img
                          :src="item.file.url"
                          style="w  idth: 100%; height: 100%"
                        /> -->
                        <div class="badge">
                          {{ getItemLabelByValue(item.type) }}
                        </div>
                      </div>

                      <div class="demo-upload-list-cover">
                        <div>
                          <Icon
                            type="md-trash"
                            size="30"
                            @click.native="
                              handleRemoveFilePicture(
                                'goodsMaterialFiles',
                                item.file,
                                'baseInfoForm'
                              )
                            "
                          ></Icon>
                          <Icon
                            type="ios-folder"
                            size="30"
                            @click.native="handleDownload(item.file.url)"
                          ></Icon>
                        </div>
                      </div>
                    </template>
                  </div>
                </draggable>
                <div
                  style="
                    width: 148px;
                    height: 148px;
                    line-height: 148px;
                    border: 1px solid gainsboro;
                    border-radius: 5px;
                  "
                  @click="
                    handleUploadModalOpen('goodsMaterialFiles', 'baseInfoForm')
                  "
                >
                  <Icon type="md-add" size="20"></Icon>
                </div>
              </div>
              <Modal title="图片预览" v-model="goodsPictureVisible">
                <img
                  :src="previewGoodsPicture"
                  v-if="goodsPictureVisible"
                  style="width: 100%"
                />
              </Modal>
              <Modal
                title="文件上传"
                v-model="uploadFileVisible"
                @on-ok="handleModalOK"
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                  "
                >
                  <Form
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    "
                    :label-width="80"
                    ref="uploadForm"
                    :model="uploadForm"
                  >
                    <formItem label="文件上传">
                      <Upload
                        :show-upload-list="false"
                        :on-success="
                          (res, file) =>
                            handleSuccessGoodsPicture(
                              'uploadFiles',
                              res,
                              file,
                              'uploadForm'
                            )
                        "
                        :format="allowFileFormatList"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :max-size="1024"
                        :before-upload="
                          (e) =>
                            handleBeforeUploadGoodsPicture(
                              'uploadFiles',
                              e,
                              'uploadForm'
                            )
                        "
                        multiple
                        :action="uploadFileUrl"
                        :headers="{ ...accessToken }"
                      >
                        <Button
                          icon="ios-cloud-upload-outline"
                          style="width: 200px"
                          >上传文件</Button
                        >
                      </Upload>
                    </formItem>
                    <formItem label="文件类型" prop="fileType">
                      <Select
                        style="width: 200px"
                        v-model="uploadForm.fileType"
                      >
                        <Option
                          v-for="(item, index) in fileTypeList"
                          :value="item.value"
                          :key="index"
                          >{{ item.label }}</Option
                        >
                      </Select>
                    </formItem>
                  </Form>

                  <div style="display: flex">
                    <div
                      class="demo-upload-list"
                      v-for="(item, __index) in uploadForm.uploadFiles"
                      :key="__index"
                    >
                      <template>
                        <img src="../../../assets/file.png" />
                        <!-- <img :src="item.url" style="" /> -->
                        <div class="demo-upload-list-cover">
                          <div>
                            <Icon
                              type="md-trash"
                              size="30"
                              @click.native="
                                handleRemoveGoodsPicture(
                                  'uploadFiles',
                                  item,
                                  'uploadForm'
                                )
                              "
                            ></Icon>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </Modal>
            </FormItem>
          </div>
          <h4>规格参数</h4>
          <div class="form-item-view-row">
            <formItem label="ANSI认证" prop="ansiCert">
              <Select v-model="baseInfoForm.ansiCert" style="width: 100px">
                <Option v-for="item in ANSIList" :value="item" :key="item">{{
                  item
                }}</Option>
              </Select>
            </formItem>

            <formItem label="EN认证" prop="enCert">
              <Select v-model="baseInfoForm.enCert" style="width: 100px">
                <Option v-for="item in ENList" :value="item" :key="item">{{
                  item
                }}</Option>
              </Select>
            </formItem>

            <formItem label="GB认证" prop="gbCert">
              <Select v-model="baseInfoForm.gbCert" style="width: 100px">
                <Option v-for="item in GBList" :value="item" :key="item">{{
                  item
                }}</Option>
              </Select>
            </formItem>

            <formItem label="防火认证" prop="fireProofCert">
              <Select v-model="baseInfoForm.fireProofCert" style="width: 100px">
                <Option
                  v-for="item in fireProofList"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </formItem>

            <formItem label="辅助认证" prop="auxCert">
              <Select v-model="baseInfoForm.auxCert" style="width: 100px">
                <Option v-for="item in auxList" :value="item" :key="item">{{
                  item
                }}</Option>
              </Select>
            </formItem>

            <formItem label="材质" prop="material">
              <Select v-model="baseInfoForm.material" style="width: 100px">
                <Option
                  v-for="item in materialList"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </formItem>

            <formItem label="饰面" prop="decoration">
              <Select v-model="baseInfoForm.decoration" style="width: 100px">
                <Option
                  v-for="item in decorationList"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </formItem>

            <formItem label="尺寸规格" prop="size">
              <!-- <Select v-model="baseInfoForm.size" style="width: 100px">
                <Option v-for="item in sizeList" :value="item" :key="item">{{
                  item
                }}</Option>
              </Select> -->
              <Input
                type="text"
                v-model="baseInfoForm.size"
                placeholder="请输入"
                clearable
                style="width: 260px"
              />
            </formItem>

            <formItem label="承重" prop="loadBearing">
              <Select v-model="baseInfoForm.loadBearing" style="width: 100px">
                <Option
                  v-for="item in loadBearingList"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </formItem>
            <formItem label="力级" prop="forceLevel">
              <Select v-model="baseInfoForm.forceLevel" style="width: 100px">
                <Option
                  v-for="item in forceLevelList"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </formItem>
            <formItem label="可调节参数" prop="adjustParam">
              <!-- <Select v-model="baseInfoForm.adjustParam" style="width: 100px"> -->
              <!-- <Option
                  v-for="item in adjustParamList"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select> -->
              <Input
                type="text"
                v-model="baseInfoForm.adjustParam"
                placeholder="请输入"
                clearable
                style="width: 260px"
              />
            </formItem>
          </div>

          <h4>详情描述</h4>
          <div class="form-item-view">
            <FormItem
              style="width: 100%"
              class="form-item-view-el"
              prop="intro"
            >
              <editor
                ref="editor"
                openXss
                v-model="baseInfoForm.intro"
                :init="{ ...initEditor, height: '800px' }"
              >
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
        <Button
          type="primary"
          @click="pre"
          v-if="!$route.query.goodsId && !$route.query.draftId"
          >上一步
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
import * as MetaData from "./metaData";

/**
 * 重写上传文件逻辑，在添加文件前显示上传文件窗口，允许用户添加文件信息
 * 相应文件信息保存在uploadForm中，当用户点击确定时将已上传文件及其文件信息存入对应文件列表
 * TODO：
 * 1. 图片的预览格式不再是:src=item.url 而是:src=item.file.url 需要修改相关位置 V
 * 2. save()上传文件前需要将用户填写的文件信息一并上传 V
 * 3. 后端create的逻辑需要修改，可能是List<String> => List<GoodsMaterial>？ 必须存储文件相关信息
 * 4. Get_DataList时不能仅获取url，还必须包含其他文件信息
 */

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
    return {
      regular,
      initEditor,
      total: 0,
      global: 0,
      accessToken: "", //令牌token
      goodsParams: "",
      categoryId: "", // 商品分类第三级id
      message: "",
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
      uploadFileVisible: false,

      wholesaleData: [
        {
          num: 0,
          price: 0,
          goodsId: this.goodsId,
        },
      ],
      // 上传文件使用的form
      uploadForm: {
        uploadFiles: [],
        fileType: null,
      },
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
      ENList: MetaData.ENList,
      GBList: MetaData.GBList,
      fireProofList: MetaData.fireProofList,
      auxList: MetaData.auxList,
      materialList: MetaData.materialList,
      decorationList: MetaData.decorationList,
      sizeList: MetaData.sizeList,
      loadBearingList: MetaData.loadBearingList,
      forceLevelList: MetaData.forceLevelList,
      adjustParamList: MetaData.adjustParamList,
      // 文件类型列表
      fileTypeList: [
        { label: "说明书", value: " INSTRUCTION" },
        { label: "检测报告", value: "REPORT" },
        { label: "模型", value: "MODEL" },
        { label: "其他", value: "OTHER" },
      ],
      // 允许上传文件类型
      allowFileFormatList: [],
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
    handleRemoveGoodsPicture(fileListName, file, fileForm) {
      this[fileForm][fileListName] = this[fileForm][fileListName].filter(
        (i) => i.url !== file.url
      );
    },
    // 移除文件
    handleRemoveFilePicture(fileListName, file, fileForm) {
      this[fileForm][fileListName] = this[fileForm][fileListName].filter(
        (i) => i.file.url !== file.url
      );
    },
    // 商品图片上传成功
    handleSuccessGoodsPicture(fileListName, res, file, fileForm) {
      if (file.response) {
        file.url = file.response.result;
        this[fileForm][fileListName].push(file);
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
    handleBeforeUploadGoodsPicture(
      fileListName,
      file,
      fileForm = "baseInfoForm"
    ) {
      console.log(fileListName, "upload");
      const check = this[fileForm][fileListName].length < 3;
      if (!check) {
        this.$Notice.warning({
          title: "数量不能多于三个",
        });
        return false;
      }
    },
    handleDownload(url) {
      window.open(url);
    },
    // modal打开时事件
    handleUploadModalOpen(fileListName, formName, uploadForm = null) {
      this.uploadFileVisible = true;
      //  重置参数
      this.uploadForm = uploadForm || {
        uploadFiles: [],
        fileType: null,
        fileListName,
        formName,
      };
    },
    // 点击确认后将文件存入对应文件列表，并将fileType一并放入
    handleModalOK() {
      let { uploadFiles, fileType, fileListName, formName } = this.uploadForm;
      if (uploadFiles.length + this[formName][fileListName].length > 3) {
        this.$Message.error("数量不能多于三个");
      } else if (uploadFiles.length > 0 && fileType) {
        uploadFiles.forEach((val) => {
          this[formName][fileListName].push({ file: val, type: fileType });
        });
      } else {
        this.$Message.error("请正确上传文件并且填写参数！");
      }
    },
    /**  添加商品或者修改商品 **/
    save() {
      this.submitLoading = true;
      this.$refs["baseInfoForm"].validate((valid) => {
        if (valid) {
          let submit = JSON.parse(JSON.stringify(this.baseInfoForm));

          // 商品图片设置
          if (
            submit.goodsGalleryFiles &&
            submit.goodsGalleryFiles.length <= 0
          ) {
            this.submitLoading = false;
            this.$Message.error("请上传商品图片");
            return;
          } else {
            submit.goodsGalleryList = submit.goodsGalleryFiles.map(
              (i) => i.url
            );
          }
          // // 添加模型文件上传
          // if (submit.goodsModelFiles && submit.goodsModelFiles.length > 0) {
          //   submit.modelList = submit.goodsModelFiles.map((item) => {
          //     return {
          //       url: item.file.url,
          //       type: item.type,
          //     };
          //   });
          // }
          // 添加材料上传
          if (
            submit.goodsMaterialFiles &&
            submit.goodsMaterialFiles.length > 0
          ) {
            submit.materialList = submit.goodsMaterialFiles.map((item) => {
              return {
                url: item.file.url,
                type: item.type,
              };
            });
          }
          if (this.$route.query && this.$route.query.goodsId) {
            console.log("修改商品", submit);
            API_GOODS.editGoods(this.$route.query.goodsId, submit).then((e) => {
              if (e && e.success) {
                this.submitLoading = false;
                this.$parent.activestep = 2;
              }
            });
          } else {
            console.log("创建商品", submit);
            API_GOODS.createGoods(submit).then((e) => {
              if (e && e.success) {
                console.log(e);
                this.submitLoading = false;
                this.$parent.activestep = 2;
              }
            });
          }

          setTimeout(() => {
            this.$Message.error("服务器无响应，请稍后再试");
            this.submitLoading = false;
          }, 1000 * 10);
        } else {
          this.submitLoading = false;
          this.$Message.error("还有必填项未做处理，请检查表单");
        }
      });
    },
    async get_GoodData(id) {
      let response = (await API_GOODS.getGoods(id)).result;
      console.log("response.reuslt", response);
      this.categoryName = response.categoryName;
      this.baseInfoForm = Object.assign(this.baseInfoForm, response);
      // this.baseInfoForm = {...response}
      // 图片处理
      if (response.goodsGalleryList && response.goodsGalleryList.length > 0) {
        this.baseInfoForm.goodsGalleryFiles = response.goodsGalleryList.map(
          (i) => {
            return { url: i };
          }
        );
      }
      // // 模型处理
      // if (response.modelList && response.modelList.length > 0) {
      //   this.baseInfoForm.goodsModelFiles = response.modelList.map((i) => {
      //     return { url: i, type: i.type };
      //   });
      // }
      // 材料处理
      if (response.materialList && response.materialList.length > 0) {
        this.baseInfoForm.goodsMaterialFiles = response.materialList.map(
          (i) => {
            return { file: i, type: i.type };
          }
        );
      }
      // 报告处理&说明书处理
    },
    // 点击图片后显示modal
    handleEditFile(file, type, fileListName, formName) {
      let uploadForm = {
        uploadFiles: [file],
        fileType: type,
        fileListName,
        formName,
      };
      this.handleUploadModalOpen(fileListName, formName, uploadForm);
    },
    getItemLabelByValue(value) {
      return this.fileTypeList.filter((item) => item.value === value)[0].label;
    },
    fillForm(message) {
      console.log('fillForm');
      const items = message.trim().split("\t");
      const columns = [
        "goodsCode",
        "goodsName",
        "quantity",
        "goodsCountUnit",
        "goodsBrand",
        "goodsDisplayPrice",
        "intro",
        "ansiCert",
        "enCert",
        "gbCert",
        "fireProofCert",
        "material",
        "size",
        "loadBearing",
        "forceLevel",
        "adjustParam",
        "auxCert",
        "decoration",
      ];
      while (items.length > columns.length) {
        items.shift();
      }
      columns.forEach((value, index) => {
        this.baseInfoForm[value] = items[index];
      });
      
      let file = {url: 'https://img.tukuppt.com/png_preview/00/10/82/K8fmk9G3BI.jpg!/fw/780'}
      this["baseInfoForm"]["goodsGalleryFiles"].push(file);
    },
  },

  mounted() {
    this.accessToken = {
      accessToken: this.getStore("accessToken"),
    };
    console.log("firstData", this.firstData);
    console.log("$route.query", this.$route.query);
    // 使用JSON深拷贝
    this.baseInfoForm = JSON.parse(JSON.stringify(MetaData.baseInfoForm));
    if (this.$route.query && this.$route.query.goodsId) {
      // 进行商品编辑行为
      console.log("正在进行商品编辑");
      const goodsId = this.$route.query.goodsId;
      this.get_GoodData(goodsId);
    } else {
      // 进行商品创建行为
      console.log("正在进行商品添加");
      this.categoryName = this.firstData.category.map((item) => item.name);
      this.baseInfoForm.categoryPath = this.firstData.category
        .map((item) => item.id)
        .join(",");
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
.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  border-radius: 10px;
  border: 1px solid transparent;
  line-height: 18px;
  background-color: #5dade2;
  height: 20px;
  width: 60px;
  color: white;
}
</style>
