/**
 * 商家端左侧菜单栏静态数据
 */

export const result = [{
    name: "lili",
    level: 0,
    type: -1,
    title: "产品",
    path: "",
    component: "",
    children: [{
      name: "goods-list",
      level: 1,
      type: 0,
      title: "产品管理",
      path: "",
      component: "Main",
      children: [
        {
          name: "goods-operation",
          level: 2,
          type: 0,
          title: "增加产品",
          path: "goods-operation",
          component: "goods/goods-seller/goodsOperation",
          children: null,
        },
        {
          name: "goods",
          level: 2,
          type: 0,
          title: "产品列表",
          path: "goods",
          component: "goods/goods-seller/goods",
          children: null,
        },
        // {
        //   path: "template-goods",
        //   props: {
        //     type: "TEMPLATE"
        //   },
        //   level: 2,
        //   type: 0,
        //   title: "商品模版",
        //   component: "goods/goods-seller/draftGoods",
        //   name: "template-goods",
        //   children: null,
        // },
        // {
        //   name: "category",
        //   level: 2,
        //   type: 0,
        //   title: "店铺分类",
        //   path: "category",
        //   component: "goods/goods-manage/category",
        //   children: null,
        // }
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
        title: "订单管理",
        path: "/order",
        component: "Main",
        children: [{
            name: "orderList",
            level: 2,
            type: 0,
            keepAlive: true,
            title: "订单详情",
            path: "orderList",
            component: "order/order/orderList",
            children: null,
          },
        ]
      },
      // {
      //   name: "memberComment",
      //   level: 1,
      //   type: 0,
      //   title: "评价管理",
      //   path: "/order",
      //   component: "Main",
      //   children: [{
      //     name: "memberComment",
      //     level: 2,
      //     type: 0,
      //     title: "评价管理",
      //     path: "memberComment",
      //     component: "member/memberComment",
      //     children: null,
      //   }]
      // },
      // {
      //   name: "order",
      //   level: 1,
      //   type: 0,
      //   title: "售后管理",
      //   path: "/order",
      //   component: "Main",
      //   children: [{
      //       name: "returnGoodsOrder",
      //       level: 2,
      //       type: 0,
      //       keepAlive: true,
      //       title: "退货管理",
      //       path: "returnGoodsOrder",
      //       component: "order/after-order/returnGoodsOrder",
      //       children: null
      //     },
      //     {
      //       name: "returnMoneyOrder",
      //       level: 2,
      //       type: 0,
      //       keepAlive: true,
      //       title: "退款管理",
      //       path: "returnMoneyOrder",
      //       component: "order/after-order/returnMoneyOrder",
      //       children: null
      //     },
      //     {
      //       name: "orderComplaint",
      //       level: 2,
      //       type: 0,
      //       keepAlive: true,
      //       title: "投诉管理",
      //       path: "orderComplaint",
      //       component: "order/after-order/orderComplaint",
      //       children: null
      //     }
      //   ]
      // }
    ]
  },
  {
    name: "contract",
    level: 0,
    type: -1,
    title: "合同",
    path: "",
    component: "",
    children: [{
      name: "contract",
      level: 1,
      type: 0,
      title: "合同管理",
      path: "/contract",
      component: "Main",
      children: [{
        name: "contractList",
        level: 2,
        type: 0,
        keepAlive: true,
        title: "合同列表",
        path: "contract",
        component: "contract/contractList",
        children: null
      },

      ]
    },

    ]
  },
  {
    name: "customer",
    level: 0,
    type: -1,
    title: "客户",
    path: "",
    component: "",
    description: "",
    children: [{
      name: "customer",
      level: 1,
      type: 0,
      title: "客户管理",
      path: "/customer",
      component: "Main",
      children: [{
        name: "customerList",
        level: 2,
        type: 0,
        keepAlive: true,
        title: "客户详情",
        path: "customerList",
        component: "customer/customerList",
        children: null,
      },
      ]
    },
      // {
      //   name: "memberComment",
      //   level: 1,
      //   type: 0,
      //   title: "评价管理",
      //   path: "/order",
      //   component: "Main",
      //   children: [{
      //     name: "memberComment",
      //     level: 2,
      //     type: 0,
      //     title: "评价管理",
      //     path: "memberComment",
      //     component: "member/memberComment",
      //     children: null,
      //   }]
      // },
      // {
      //   name: "order",
      //   level: 1,
      //   type: 0,
      //   title: "售后管理",
      //   path: "/order",
      //   component: "Main",
      //   children: [{
      //       name: "returnGoodsOrder",
      //       level: 2,
      //       type: 0,
      //       keepAlive: true,
      //       title: "退货管理",
      //       path: "returnGoodsOrder",
      //       component: "order/after-order/returnGoodsOrder",
      //       children: null
      //     },
      //     {
      //       name: "returnMoneyOrder",
      //       level: 2,
      //       type: 0,
      //       keepAlive: true,
      //       title: "退款管理",
      //       path: "returnMoneyOrder",
      //       component: "order/after-order/returnMoneyOrder",
      //       children: null
      //     },
      //     {
      //       name: "orderComplaint",
      //       level: 2,
      //       type: 0,
      //       keepAlive: true,
      //       title: "投诉管理",
      //       path: "orderComplaint",
      //       component: "order/after-order/orderComplaint",
      //       children: null
      //     }
      //   ]
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
      title: "统计管理",
      path: "/statistics",
      component: "Main",
      children: [{
          name: "orderStatistics",
          level: 2,
          type: 0,
          title: "统计数据",
          path: "orderStatistics",
          component: "statistics/order",
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
      // {
      //   name: "user-manage",
      //   level: 1,
      //   type: 0,
      //   title: "页面设置",
      //   path: "user-manage",
      //   component: "sys/user-manage/userManage",
      //   children: []
      // },
      // {
      //   name: "ship",
      //   level: 1,
      //   type: 0,
      //   title: "配送设置",
      //   path: "",
      //   component: "Main",
      //   children: [{
      //       name: "shipTemplate",
      //       level: 2,
      //       type: 0,
      //       title: "配送模板",
      //       path: "shipTemplate",
      //       component: "shop/ship/shipTemplate",
      //       children: null
      //     },
      //     {
      //       name: "logistics",
      //       level: 2,
      //       type: 0,
      //       title: "物流公司",
      //       path: "logistics",
      //       component: "shop/ship/logistics",
      //       children: null
      //     }
      //   ]
      // },
      {
        name: "shop",
        level: 1,
        type: 0,
        title: "信息管理",
        path: "/shop",
        component: "Main",
        description: "",
        children: [{
            name: "shopSetting",
            level: 2,
            type: 0,
            title: "信息设置",
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
