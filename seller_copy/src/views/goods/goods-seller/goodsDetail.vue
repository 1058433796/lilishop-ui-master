<template>
  <div>
    <Card>
      <p class="title">产品详情</p>
      <Divider />

      <Row type="flex" justify="center">
        <Col span="8">
          <Table
            id="table"
            :data="data"
            :columns="columns"
            :show-header="false"
            :width="301"
            size="small"
          >
            <template slot="goodsSlot" slot-scope="{ row }">
              <div v-if="row.type && row.type === 'file'">
                <div style="display: flex; flex-wrap: flex-start">
                  <div
                    class="demo-upload-list"
                    v-for="(item, __index) in row.value"
                    :key="__index"
                  >
                    <template>
                      <img src="../../../assets/file.png" />
                      <!-- <img :src="item" /> -->
                      <div
                        class="demo-upload-list-cover"
                        @click="handleDownload(item.url)"
                      ></div>
                    </template>
                  </div>
                </div>
              </div>
              <div v-else>{{ row.value }}</div>
            </template>
          </Table>
        </Col>

        <Col span="6">
          <img :src="goodsInfo.original" style="width: 350px" />
        </Col>
      </Row>

      <Row type="flex">
        <Col span="2" push="16">
          <Button type="primary">导出PDF</Button>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import * as API_GOODS from "@/api/goods";
import {HtmlToPDF} from "@/api/index";

export default {
  data() {
    return {
      rawData: null,
      goodsInfo: {
        original: "",
        thumbnail: "",
      },
      // 检测报告
      reportFileList: [],
      reportFiles: [],
      // 说明书
      instructionFileList: [],
      instructionFiles: [],
      data: [
        { key: "名称", value: "" },
        { key: "尺寸规格", value: "" },
        { key: "材质", value: "" },
        { key: "饰面", value: "" },
        { key: "品牌", value: "" },
        { key: "价格", value: "" },
        // { key: '上传模型', value: [], type:'file' },
        { key: "上传资料", value: [], type: "file" },
        // { key: '联系人', value: '合页' },
        // { key: '联系电话', value: '合页' },
        // { key: '邮箱', value: '合页' },
        // { key: '检测报告', type: 'image' },
        // { key: '说明书', type: 'image' },
      ],
      columns: [
        {
          key: "key",
          width: 100,
          align: "right",
          render: (h, { row }) => {
            return h(
              "span",
              {
                style: { fontWeight: "bold" },
              },
              row.key + "："
            );
          },
        },
        {
          key: "value",
          width: 200,
          align: "left",
          slot: "goodsSlot",
        },
      ],
    };
  },
  methods: {
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
      this[fileListName] = this[fileListName].filter((i) => i.url !== file.url);
    },
    // 商品图片上传成功
    handleSuccessGoodsPicture(fileListName, res, file) {
      if (file.response) {
        file.url = file.response.result;
        this[fileListName].push(file);
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
      console.log(fileListName, "upload");
      const check = this[fileListName].length < 3;
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
    getBasicInfoTemplateHtml() {
      const {
        categoryName,
        goodsCode,
        goodsOrigin,
        goodsBrand,
        goodsWeight,
        goodsDisplayPrice,
        goodsMarketPrice,
        ansiCert,
        enCert,
        gbCert,
        auxCert,
        material,
        decoration,
        size,
        forceLevel,
        adjustParam,
        intro,
      } = this.rawData;
      return `<!DOCTYPE html>
<html lang="en">
<head>
<style>
h2{
    text-align: center;
}
 table {
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: center;
      padding: 8px;
    }
    td img{
        width: 300px;
    }
</style>
</head>
<body style="font-family: SimSun;">
    <div style="margin:50px auto; width:650px;">
        <h2>产品信息PDF</h2>
        <table>
            <tr>
                <th colspan="4">基本信息</th>
            </tr>
            <tr>
                <td>商品分类</td>
                <td>${categoryName.join(">")}</td>
                <td>产品编号</td>
                <td>${goodsCode}</td>
            </tr>
            <tr>
                <td>产地</td>
                <td>${goodsOrigin}</td>
                <td>品牌</td>
                <td>${goodsBrand}</td>
            </tr>
            <tr>
                <td>产品重量</td>
                <td>${goodsWeight}</td>
                <td>单位</td>
                <td>${goodsUnit}</td>
            </tr>
            <tr>
                <td>展示价格</td>
                <td>${goodsDisplayPrice}</td>
                <td>市场价格</td>
                <td>${goodsMarketPrice}</td>
            </tr>
        </table>

        <table>
            <tr>
                <th colspan="4">规格参数</th>
            </tr>
            <tr>
                <td>ANSI认证</td>
                <td>${ansiCert}</td>
                <td>EN认证</td>
                <td>${enCert}</td>
            </tr>
            <tr>
                <td>GB认证</td>
                <td>${gbCert}</td>
                <td>防火认证</td>
                <td>${fireProofCert}</td>
            </tr>
            <tr>
                <td>辅助认证</td>
                <td>${auxCert}</td>
                <td>防火认证</td>
                <td>${fireProofCert}</td>
            </tr>
            <tr>
                <td>材质</td>
                <td>${material}</td>
                <td>饰面</td>
                <td>${decoration}</td>
            </tr>
            <tr>
                <td>尺寸规格</td>
                <td>${size}</td>
                <td>承重</td>
                <td>${loadBearing}</td>
            </tr>
            <tr>
                <td>力级</td>
                <td>${forceLevel}</td>
                <td>可调节参数</td>
                <td>${adjustParam}</td>
            </tr>
        </table>
        <table>
            <tr>
                <th colspan="4">详情描述</th>
            </tr>
            <tr>
                <td colspan="4">
                    <p>${intro}</p>
                </td>
            </tr>
        </table>
        <!-- imgTable -->
        <!-- otherTable -->
    </div>
</body>
</html>`;
    },
    // 获取图像文件的table
    getImgTableTemplateHtml() {
      const imgFormats = ['jpg', 'jpeg', 'png'];
      const { materialList } = this.rawData;
      let trs = [];
      //判断是否存在材料文件
      if (materialList && materialList.length > 0) {
        // 将材料文件按照模板字符串格式添加到trs中
        materialList.forEach((item) => {
          let { type, url } = item;
          // 取出文件后缀名
          let postfix = url.split('.').pop();
          // 判断文件是否属于图片
          if(!imgFormats.find(postfix))return;
          let tr = `            <tr>
                <td>${type}</td>
                <td colspan="2">
                    <img src="${url}" alt=""/>
                </td>
                <td><a href="${url}">下载</a></td>
            </tr>`;
          trs.push(tr);
        });
      }
      // 将trs中的内容放入table模板中
      let table = `<table>
            <tr><th colspan="4">图像文件</th></tr>
            <tr>
                <th>文件类型</th>
                <th colspan="2">文件预览</th>
                <th>文件下载</th>
            </tr>
            ${trs.join(" ")}
        </table>`;
      return table;
    },
    // 获取其他文件的table
    getOtherTableTemplateHtml() {
      const imgFormats = ['jpg', 'jpeg', 'png'];
      const {materialList} = this.rawData;
      let trs = [];
      //判断是否存在材料文件
      if (materialList && materialList.length > 0) {
        // 将材料文件按照模板字符串格式添加到trs中
        materialList.forEach((item) => {
          let { type, url } = item;
          // 取出文件后缀名
          let postfix = url.split('.').pop();
          // 判断文件是否属于图片
          if(imgFormats.find(postfix))return;
          let tr = `            <tr>
                <td>${type}</td>
                <td><a href="${url}">下载</a></td>
            </tr>`;
          trs.push(tr);
        });
      }
      // 将trs中的内容放入table模板中
      let table = `        <table>
            <tr>
                <th colspan="2">其他文件</th>
            </tr>
            <tr>
                <th>文件类型</th>
                <th>文件下载</th>
            </tr>
            ${trs.join(' ')}
        </table>`;
      return table;
    },
    // 导出PDF文件
    exportPDF() {
      let basicHtml = this.getBasicInfoTemplateHtml();
      const imgTable = this.getImgTableTemplateHtml();
      const otherTable = this.getOtherTableTemplateHtml();
      basicHtml = basicHtml.replace('<!-- imgTable -->', imgTable);
      basicHtml = basicHtml.replace('<!-- otherTable -->', otherTable);
      HtmlToPDF(basicHtml).then(res => {
        console.log(res);
        // 查看res返回的数据形式 如果是文件 想办法触发下载
        // 如果是URL window.open(url)直接触发下载
      })

    },
  },
  created() {
    // this.goodsInfo = this.$router.params;
    const { id } = this.$route.params;
    API_GOODS.getGoods(id).then(({ result }) => {
      this.rawData = result;
      this.data[0].value = result.goodsName;
      this.data[1].value = result.size;
      this.data[2].value = result.material;
      this.data[3].value = result.decoration;
      this.data[4].value = result.goodsBrand;
      this.data[5].value = result.goodsDisplayPrice;
      // this.data[6].value = result.modelList;
      this.data[6].value = result.materialList;
      this.goodsInfo.thumbnail = result.thumbnail;
      this.goodsInfo.original = result.original;
      console.log(this.data);
    });
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
}
.demo-upload-list {
  width: 50px;
  height: 50px;
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
