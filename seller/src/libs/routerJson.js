/**
 * 商家端左侧菜单栏静态数据
 */
export const result = [{
    name: "lili",
    level: 0,
    type: -1,
    title: "项目",
    path: "",
    component: "",
    children: [{
      name: "goods-list",
      level: 1,
      type: 0,
      title: "项目",
      path: "",
      component: "Main",
      children: [
        {
          name: "goods",
          level: 2,
          type: 0,
          title: "项目库",
          path: "goods",
          component: "goods/goods-seller/goods",
          children: null,
        },
      ]
    }]
  },
  {
    name: "order",
    level: 0,
    type: -1,
    title: "订单",
    path: "",
    component: "",
    description: "",
    children: [{
        name: "order",
        level: 1,
        type: 0,
        title: "订单",
        path: "/order",
        component: "Main",
        children: [{
            name: "orderList",
            level: 2,
            type: 0,
            keepAlive: true,
            title: "产品订单",
            path: "orderList",
            component: "order/order/orderList",
            children: null,
          },
        ]
      },
    ]
  },
  {
    name: "promotion",
    level: 0,
    type: -1,
    title: "合同",
    path: "",
    component: "",

    children: [{
        name: "promotion",
        level: 1,
        type: 0,
        title: "合同",
        keepAlive: true,
        path: "/promotion",
        component: "Main",
        children: [{
            name: "pintuan",
            level: 2,
            type: 0,
            keepAlive: true,
            title: "合同管理",
            path: "pintuan",
            component: "promotion/pintuan/pintuan",
            children: null
          },
          // {
          //   name: "seckill",
          //   level: 2,
          //   type: 0,
          //   keepAlive: true,
          //   title: "秒杀活动",
          //   path: "seckill",
          //   component: "promotion/seckill/seckill",
          //   children: null
          // }
        ]
      },
      // {
      //   name: "lives",
      //   level: 1,
      //   type: 0,
      //   title: "直播活动",
      //   path: "/promotion",
      //   component: "Main",
      //   children: [{
      //       name: "live",
      //       level: 2,
      //       type: 0,
      //       title: "直播管理",
      //       path: "live",
      //       component: "promotion/live/live",
      //       children: null
      //     },
      //     {
      //       name: "liveGoods",
      //       level: 2,
      //       type: 0,
      //       title: "直播商品",
      //       path: "liveGoods",
      //       component: "promotion/live/liveGoods",
      //       children: null
      //     }
      //   ]
      // },
      // {
      //   name: "storePromotion",
      //   level: 1,
      //   type: 0,
      //   title: "商家活动",
      //   path: "/storePromotion",
      //   component: "Main",
      //   children: [{
      //       name: "full-cut",
      //       level: 2,
      //       type: 0,
      //       title: "满额活动",
      //       path: "full-discount",
      //       component: "promotion/full-discount/full-discount",
      //       children: null
      //     },
      //     {
      //       name: "coupon",
      //       level: 2,
      //       type: 0,
      //       title: "优惠券",
      //       path: "coupon",
      //       component: "promotion/coupon/coupon",
      //       children: null
      //     },
      //   ]
      // },
      // {
      //   name: "distribution",
      //   level: 1,
      //   type: 0,
      //   title: "分销管理",
      //   path: "/distribution",
      //   component: "Main",
      //   children: [{
      //       name: "distributionGoods",
      //       level: 2,
      //       type: 0,
      //       title: "分销商品",
      //       path: "distributionGoods",
      //       component: "distribution/distributionGoods",
      //       children: null
      //     },
      //     {
      //       name: "distributionOrder",
      //       level: 2,
      //       type: 0,
      //       title: "分销订单",
      //       path: "distributionOrder",
      //       component: "distribution/distributionOrder",
      //       children: null
      //     }
      //   ]
      // }
    ]
  },
  {
    name: "seller",
    level: 0,
    type: -1,
    title: "供应商",
    path: "",
    component: "",
    children: [{
        name: "seller",
        level: 1,
        type: 0,
        title: "供应商",
        path: "/seller",
        component: "Main",
        children: [{
            name: "accountStatementBill",
            level: 2,
            type: 0,
            keepAlive: true,
            title: "供应商管理",
            path: "accountStatementBill",
            component: "shop/bill/accountStatementBill",
            children: null
          },
          // {
          //   name: "storeBill",
          //   level: 2,
          //   type: 0,
          //   keepAlive: true,
          //   title: "店铺结算",
          //   path: "storeBill",
          //   component: "shop/bill/storeBill",
          //   children: null
          // }
        ]
      },
      // {
      //   name: "receiptManager",
      //   level: 1,
      //   type: 0,
      //   title: "发票管理",
      //   path: "/bill",
      //   component: "Main",
      //   children: [{
      //     name: "receipt",
      //     level: 2,
      //     type: 0,
      //     title: "发票管理",
      //     path: "receipt",
      //     component: "order/receiptManager/receipt",
      //     children: null
      //   }]
      // }
    ]
  },
  {
    name: "statistics",
    level: 0,
    type: -1,
    title: "统计",
    path: "",
    component: "",
    children: [{
      name: "statistics",
      level: 1,
      type: 0,
      title: "统计",
      path: "/statistics",
      component: "Main",
      children: [{
          name: "goodsStatistics",
          level: 2,
          type: 0,
          title: "订单统计",
          path: "goodsStatistics",
          component: "statistics/goods",
          children: null
        },
        // {
        //   name: "orderStatistics",
        //   level: 2,
        //   type: 0,
        //   title: "订单统计",
        //   path: "orderStatistics",
        //   component: "statistics/order",
        //   children: null
        // },
        // {
        //   name: "trafficStatistics",
        //   level: 2,
        //   type: 0,
        //   title: "流量统计",
        //   path: "trafficStatistics",
        //   component: "statistics/traffic",
        //   children: null
        // },
      ]
    }]
  },
  {
    name: "settings",
    level: 0,
    type: -1,
    title: "设置",
    path: "",
    component: "",
    description: "",
    children: [

      {
        name: "shop",
        level: 1,
        type: 0,
        title: "设置",
        path: "/shop",
        component: "Main",
        description: "",
        children: [{
            name: "shopSetting",
            level: 2,
            type: 0,
            title: "账号信息",
            path: "shopSetting",
            component: "shop/shopSetting",
            children: null,
          },
          // {
          //   name: "shopAddress",
          //   level: 2,
          //   type: 0,
          //   title: "自提管理",
          //   path: "shopAddress",
          //   component: "shop/shopAddress",
          //   children: null,
          // }
        ]
      }
    ]
  },
  {
    name: "messages",
    level: 0,
    type: -1,
    title: "消息",
    path: "",
    component: "",
    children: [{
      name: "user-manage",
      level: 1,
      type: 0,
      title: "系统消息",
      path: "user-manage",
      component: "sys/user-manage/userManage",
      children: [{
        name: "message_index",
        level: 2,
        type: 0,
        title: "系统消息",
        path: "message",
        component: "message",
        children: null
      }]
    }]
  }
];
