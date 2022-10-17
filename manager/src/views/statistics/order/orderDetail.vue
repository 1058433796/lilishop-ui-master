<template>
  <div class="wrapper">
    <div class="shop">
      <h3>订单详情</h3>
      <div class="shop-item">
        <div class="label-item">
          <span>采购方id</span>
          <span>{{ res.buyerId | clientTypeWay }}</span>
        </div>
        <div class="label-item">
          <span>供应商id</span>
          <span>{{ res.storeId || "暂无" }}</span>
        </div>
        <div class="label-item">
          <span>供应商</span>
          <span>{{ res.storeName }}</span>
        </div>
      </div>
      <div class="shop-item">
        <div class="label-item">
          <span>采购方</span>
          <span>{{ res.buyerName }}</span>
        </div>
        <div class="label-item">
          <span>采购人姓名</span>
          <span>{{ res.consigneeName }}</span>
        </div>
        <div class="label-item">
          <span>采购人电话</span>
          <span>{{ res.consigneePhone }}</span>
        </div>
       
      </div>
      <div class="shop-item">

        <div class="label-item">
          <span>创建时间</span>
          <span>{{ res.createTime }}</span>
        </div>
        <div class="label-item">
          <span>订单状态</span>
          <span> {{res.orderStatus}}</span>
          <!-- <span>{{ orderStatusList[res.orderStatus] }}</span> -->
        </div>
      </div>
      <div class="shop-item">
        
    
        <div class="label-item">
          <span>支付方式</span>
          <span>
            {{res.payMode || "暂无"}}
            <!-- {{ res.payMode == "ONLINE" ? "在线支付" : ""
            }}{{
              res.paymentMethod == "ALIPAY"
                ? "支付宝"
                : res.paymentMethod == "BANK_TRANSFER"
                ? "银行卡"
                : "" || "暂无"
            }} -->
          </span>
          </div>

        <div class="label-item">
          <span>付款状态</span>
          <span>{{
            res.payStatus == "未付款"
              ? "未付款"
              : res.payStatus == "已付款"
              ? "已付款"
              : ""
          }}</span>
        </div>
       
        <div class="label-item">
          <span>支付时间</span>
          <span>{{ res.payTime || "暂无" }}</span>
        </div>
      </div>
      <h3>商品详情</h3>
      <div class="shop-item">
        <div
          class="goods-item"
          @click="handleClickGoods(item.goodsId)"
          v-for="(item, index) in res.orderItems"
          :key="index"
        >
          <div class="goods-img">
            <img class="img" :src="item.image" alt="" />
          </div>
          <div class="goods-title">
            <div>{{ item.name }}</div>
            <div>{{ "x" + item.num }}</div>
            <div class="goods-price">{{ res.flowPrice | unitPrice("￥") }}</div>
          </div>
        </div>
      </div>
      <div class="count-price">
        <div class="label-item">
          <span>总价格</span>
          <span class="flowPrice">{{ res.orderAmount | unitPrice("￥") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderStatusList: {
        // 订单状态
        UNDELIVERED: "待发货",
        UNPAID: "未付款",
        PAID: "已付款",
        DELIVERED: "已发货",
        CANCELLED: "已取消",
        COMPLETED: "已完成",
        TAKE: "已完成",
      },
    };
  },
  props: ["res"],
  methods: {
    handleClickGoods(id) {
      this.$router.push({
        query: { id },
        path: "/goods/goods-info/goodsDetail",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.shop {
  padding: 10px 0;
  background: #fff;
}
.shop-item {
  display: flex;

  flex-wrap: wrap;
}
h3 {
  margin: 20px 16px;
  font-size: 18px;
}
.goods-price {
  font-size: 18px;
  color: red;
}
.goods-item {
  display: flex;
  width: 100%;
  margin: 16px;
  cursor: pointer;
}
.count-price {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.flowPrice {
  font-size: 24px;
  color: red;
}
.goods-title {
  margin: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
}

.img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
.label-item {
  margin: 10px 0;
  width: 33%;
  padding: 8px;
  align-items: center;
  font-weight: bold;
  display: flex;
  > span:nth-child(1) {
    width: 70px;
    color: #999;
  }
}
</style>
