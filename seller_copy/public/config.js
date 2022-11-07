var BASE = {
  // 开发模式 dev/pro
  MODE:'dev',
  /**
   * @description api请求基础路径
   */

  API_DEV: {
    common: "http://localhost:8890",
    buyer: "https://localhost:8888",
    seller: "http://localhost:8889",
    manager: "http://localhost:8887",
  },
  /**
   * @description 各个网站的url
   */
  WEB_URL: {
    buyer: "http://localhost:10003",
    seller: "http://localhost:10002",
    admin: "http://localhost:10003",

    // buyer: "http://112.230.202.198:9090",
    // seller: "http://112.230.202.198:9091",
    // admin: "http://112.230.202.198:9092",
  },
  API_PROD: {
    common: "",
    buyer: "",
    seller: "",
    manager: "",
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

  PREFIX: "/store",
};
