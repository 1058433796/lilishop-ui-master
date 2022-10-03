<template>
    <div>
        <Card>
            <p class="title">产品详情</p>
            <Divider />

            <Row type="flex" justify="center">
                <Col span="8">
                <Table id="table" :data="data" :columns="columns" :show-header="false" :width="301" size="small">
                    <template slot="goodsSlot" slot-scope="{ row }">
                        <div v-if="row.type && row.type === 'image'">

                <div style="display: flex; flex-wrap: flex-start">
                  <div class="demo-upload-list" v-for="(item, __index) in reportFileList"
                    :key="__index">
                    <template>
                      <img src="../../../assets/file.png" />
                      <div class="demo-upload-list-cover">
                        <div>
                          <!-- <Icon type="md-search" size="30" @click.native="handleViewGoodsPicture(item.url)"></Icon> -->
                          <Icon type="md-trash" size="30" @click.native="handleRemoveGoodsPicture('reportFiles',item)"></Icon>
                        </div>
                      </div>
                    </template>
                  </div>

                <Upload :show-upload-list="false" :on-success="(res, file) => handleSuccessGoodsPicture('reportFiles', res, file)"
                  :format="['jpg', 'jpeg', 'png']" :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize" :max-size="1024" :before-upload="e => handleBeforeUploadGoodsPicture('reportFiles', e)"
                  multiple type="drag" :action="uploadFile" :headers="{ ...accessToken }" style="margin-left: 10px">
                  <div style="width: 148px; height: 148px; line-height: 148px">
                    <Icon type="md-add" size="20"></Icon>
                  </div>
                </Upload>
              </div>

                        </div>
                        <div v-else>{{row.value}}</div>
                    </template>
                </Table>
                </Col>

                <Col span="6">
                <img :src="goodsInfo.original" style="width: 350px;"/>
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
import { uploadFile } from "@/libs/axios";
export default {
    data() {
        return {
            goodsInfo: {
                goodsName: '未知',
                material: '未知',
                decoration: '未知',
                goodsBrand: '未知',
                goodsDisplayPrice: '未知',
                email: '未知',
                thumbnail: '',
            },
            // 检测报告
            reportFileList:[],
            reportFiles:[],
            // 说明书
            instructionFileList:[],
            instructionFiles:[],
            data: [
                { key: '名称', value: '合页' },
                { key: '性能规格', value: '433，2BB' },
                { key: '材质', value: '304不锈钢' },
                { key: '饰面', value: '合页' },
                { key: '品牌', value: '合页' },
                { key: '价格', value: '合页' },
                { key: '联系人', value: '合页' },
                { key: '联系电话', value: '合页' },
                { key: '邮箱', value: '合页' },
                { key: '检测报告', type: 'image' },
                { key: '说明书', type: 'image' },
            ],
            columns: [
                {
                    key: 'key',
                    width: 100,
                    align: 'right',
                    render: (h, { row }) => {
                        return h("span", {
                            style: { fontWeight: 'bold' }
                        }, row.key + "：")
                    }
                },
                {
                    key: 'value',
                    width: 200,
                    align: 'left',
                    slot: "goodsSlot"
                }
            ]
        }
    },
    methods:{
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
      this[fileListName] = 
        this[fileListName].filter((i) => i.url !== file.url);
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
      console.log(fileListName, 'upload');
      const check = this[fileListName].length < 3;
      if (!check) {
        this.$Notice.warning({
          title: "数量不能多于三个",
        });
        return false;
      }
    },
    // 获取产品已有的图片信息
    getImgList(){
      // 获取reportList
      
      // 获取instructionList
    }

    },
    created() {
        // this.goodsInfo = this.$router.params;
        const row = this.$route.params
        this.data[0].value = row.goodsName;
        this.data[2].value = row.material;
        this.data[3].value = row.decoration;
        this.data[4].value = row.goodsBrand;
        this.data[5].value = row.goodsDisplayPrice;
        this.goodsInfo.thumbnail = row.thumbnail;
        this.goodsInfo.original = row.original;
        console.log(this.$route.params);
    }
}
</script>

<style scoped>
.title {
    font-size: 16px;
}
</style>
