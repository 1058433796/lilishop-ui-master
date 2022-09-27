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
      title: "项目库",
      path: "",
      component: "Main",
      children: [
      //     name: "goods-operation",
      //     level: 2,
      //     type: 0,
      //     title: "项目管理",
      //     path: "goods-operation",
      //     component: "goods-operation",
      //     children: null,
      //   },
        {
          name: "goods",
          level: 2,
          type: 0,
          title: "项目列表",
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
        title: "供应商管理",
        path: "/seller",
        component: "Main",
        children: [{
            name: "accountStatementBill",
            level: 2,
            type: 0,
            keepAlive: true,
            title: "供应商详情",
            path: "accountStatementBill",
            component: "shop/bill/accountStatementBill",
            children: null
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
        title: "合同管理",
        path: "/promotion",
        component: "Main",
        children: [{
            name: "pintuan",
            level: 2,
            type: 0,
            keepAlive: true,
            title: "合同详情",
            path: "pintuan",
            component: "promotion/pintuan/pintuan",
            children: null
          },
        ]
      },
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
          name: "goodsStatistics",
          level: 2,
          type: 0,
          title: "统计数据",
          path: "goodsStatistics",
          component: "statistics/goods",
          children: null
        },
       
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
        title: "店铺管理",
        path: "/shop",
        component: "Main",
        description: "",
        children: [{
            name: "shopSetting",
            level: 2,
            type: 0,
            title: "店铺设置",
            path: "shopSetting",
            component: "shop/shopSetting",
            children: null,
          },
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
