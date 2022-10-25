<template>
  <div>

    <Modal v-model="noticeFlage" :title="noticesDetail.title">
      <div v-if="noticesDetail" v-html="noticesDetail.content">

      </div>
    </Modal>
    <div class="box flex">
      <div class="box-left">
        <div class="card shop flex">
          <div>
            <h4>Hi,<span style="margin-left:5px;">{{userData.nickName}}</span></h4>
            <img class="shop-logo" :src="userData.storeLogo || require('@/assets/logo1.png')" alt="">
          </div>
          <div class="shop-box">
            <div class="box-item">
              <div>店铺名称：{{userData.storeName || '暂无'}}</div>
            </div>
            <div class="box-item">
              <div>店铺状态：{{userData.storeDisable=='OPEN' ? '开启中' : '关闭'}}</div>
            </div>
            <div class="box-item" @click="im()">
              <Button type="info">点击登录客服</Button>
            </div>
          </div>

          <div class="rate-box">
            <div>
              <i-circle :size="120" stroke-color="#fecb89" :trail-width="4" :stroke-width="5" :percent="(userData.serviceScore  *  20)" stroke-linecap="square">
                <div class="demo-Circle-custom">

                  <p class="bold">{{userData.serviceScore}}分</p>
                </div>
              </i-circle>
              <h5>服务得分</h5>
            </div>
            <div>
              <i-circle :size="120" stroke-color="#a7c5eb" :trail-width="4" :stroke-width="5" :percent="(userData.deliveryScore  *  20)" stroke-linecap="square">
                <div>

                  <p class="bold">{{userData.deliveryScore}}分</p>
                </div>
              </i-circle>
              <h5>交货得分</h5>
            </div>
            <div>
              <i-circle :size="120" stroke-color="#848ccf" :trail-width="4" :stroke-width="5" :percent="(userData.descriptionScore  *  20)" stroke-linecap="square">
                <div>
                  <p class="bold">{{userData.descriptionScore}}分</p>
                </div>
              </i-circle>
              <h5>评价得分</h5>
            </div>
          </div>
        </div>
        <div class="card">
          <h4>待办事项</h4>

          <div class="detail-list">
            <div class="detail-item" @click="navigateTo('orderList')">
              <div>
                <span>{{homeData.unRepliedOrder || 0}}</span>
                <div>待响应</div>
              </div>
              <div class="detail-title">
                待响应订单
              </div>
            </div>
            <div class="detail-item" @click="navigateTo('contractList')">
              <div>
                <span>{{homeData.unRepliedContract|| 0}}</span>
                <div>待响应</div>
              </div>
              <div class="detail-title">
                待响应合同
              </div>
            </div>
            <div class="detail-item" @click="navigateTo('orderList')">
              <div>
                <span>{{homeData.unDeliveredOrder || 0}}</span>
                <div>待发货</div>
              </div>
              <div class="detail-title">
                待发货订单
              </div>
            </div>

            <div class="detail-item" @click="navigateTo('orderList')">
              <div>
                <span>{{homeData.deliveredOrder || 0}}</span>
                <div>待收货</div>
              </div>

              <div class="detail-title">
                待签收订单
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- 公告 -->
      <div class="card box-right">
        <h4>平台公告</h4>
        <div>
          <div class="notice-title" v-for="(item,index) in notices" :key="index">
            <a @click="clickLinkNotices(item)">{{item.title}}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="card ">
      <h4>整体数据</h4>
      <div class="count-list flex">
        <div class="count-item" @click="navigateTo('goods')">
          <div>
            <Icon class="icon" size="31" type="md-photos" />
          </div>
          <div>
            <div class="counts">{{homeData.goodsNum ||0}}</div>
            <div>产品数量</div>
          </div>

        </div>
        <div class="count-item" @click="navigateTo('orderStatistics')">
          <div>
            <Icon class="icon" size="31" type="ios-card" />
          </div>
          <div>
            <div class="counts">{{homeData.orderPrice || 0 | unitPrice('￥')}}</div>
            <div>订单总额</div>
          </div>

        </div>
        <div class="count-item" @click="navigateTo('orderList')">
          <div>

            <Icon class="icon" size="31" type="md-list" />
          </div>
          <div>
            <div class="counts">{{homeData.orderNum ||0}}</div>
            <div>订单数量</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSellerHomeData, getHomeNotice } from "@/api/index";
import { getIMDetail } from "@/api/common"
import { seeArticle } from "@/api/pages";
import Cookies from "js-cookie";
import {test} from "@/api/index";

export default {
  name: "home",
  data() {
    return {
      noticeFlage: false, // 控制平台公告显隐

      homeData: {}, // 首页数据
      userData: "", // 店铺信息
      notices: "", // 平台公告列表
      noticesDetail: { // 平台公告详情
        title: "",
      },
      IMLink:"",
    };
  },
  methods: {
    // 跳转页面
    navigateTo(name) {
      this.$router.push({
        name,
      });
    },
    // 初始化数据
    async init() {
      let userInfo = JSON.parse(Cookies.get("userInfoSeller"));

      this.userData = userInfo;

      let res = await getHomeNotice();
      if (res.success) {
        this.notices = res.result.records;
      }
    },
    // 跳转文章页
    async clickLinkNotices(val) {
      let res = await seeArticle(val.id);
      if (res.success) {
        this.noticesDetail = res.result;
        this.noticeFlage = true;
      }
    },
    async im() {
      // 获取访问Token
      let accessToken = this.getStore("accessToken");
      await this.getIMDetailMethods();
      if (!accessToken) {
        this.$Message.error("请登录后再联系客服");
        return;
      }
      window.open(this.IMLink + "?token=" + accessToken);
    },

    // 获取im信息
    async getIMDetailMethods() {
      let res = await getIMDetail();
      if (res.success) {
        this.IMLink = res.result;
      }
    },
    // 获取首页数据
    async getHomeData() {
      let res = await getSellerHomeData();
      if (res.success) {
        this.homeData = res.result;
      }
    },
  },
  mounted() {
    this.init();
    this.getHomeData();
  },
};
</script>
<style lang="scss" scoped>
@import "./home.scss";
</style>
