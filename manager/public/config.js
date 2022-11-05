var BASE = {
  /**
   * @description api请求基础路径
   */
  API_DEV: {
     manager: "http://localhost:8887",
     
     common: "http://localhost:8890",

    // common: "",
    // buyer: "",
    // seller: "",
    // manager: "",
  },
  API_PROD: {
    common: "https://common-api.pickmall.cn",
    buyer: "https://buyer-api.pickmall.cn",
    seller: "https://store-api.pickmall.cn",
    manager: "https://admin-api.pickmall.cn",
  },
  /**
   * @description 各个网站的url
   */
  WEB_URL: {
    buyer: "http://localhost:10003",
    seller: "http://localhost:10002",
    admin: "",
  },
  /**
   * @description // 跳转买家端地址 pc端
   */
  PC_URL: "https://pc-b2b2c.pickmall.cn",
  /**
   * @description  // 跳转买家端地址 wap端
   */
  WAP_URL: "https://m-b2b2c.pickmall.cn",
  /**
   *  @description api请求基础路径前缀
   */
  PREFIX: "/manager",
};
>>>>>>> LYJ
