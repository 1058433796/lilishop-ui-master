import { regular } from "@/utils";

/**
 * 存放数据
 */

export const baseInfoForm = {
    // 商品编号
    goodsId: "",
    // 商品名称
    goodsName:'',
    // 商品产地
    goodsOrigin: '',
    // 商品品牌
    goodsBrand: '',
    // 商品重量
    goodsWeight: '',
        // 商品重量单位
        goodsUnit: '',
    // 展示价格
    goodsDisplayPrice: '',
    // 市场价格
    goodsMarketPrice: '',

    /** 商品图片列表 */
    goodsGalleryFiles: [],
    // 商品模型列表
    goodsModelFiles: [],
    // 商品资料列表
    goodsMaterialFiles: [],

    // ANSI认证
    ANSIcert: '',
    // EN认证
    ENCert: '',
    // GB认证
    GBcert: '',
    // 防火认证
    fireProofCert: '',
    // 辅助认证
    auxCert: '',
    // 材质
    material: '',
    // 饰面
    decoration: '',
    // 尺寸规格
    size: '',
    // 承重
    loadBearing: '',
    // 力级
    forceLevel: '',
    // 可调节参数
    adjustParam: '',
    // 类别id使用逗号连接的类别路径
    categoryPath:'',
    // 商品描述
    intro:'',
    // 商品类型 
    goodsType:'PHYSICAL_GOODS'
}



export const baseInfoFormRule = {
    // goodsName: [regular.REQUIRED, regular.WHITE_SPACE, regular.VARCHAR60],
    // price: [regular.REQUIRED, { validator: checkPrice }],
    // sellingPoint: [regular.REQUIRED, regular.VARCHAR60],
    // goodsUnit: [{ required: true, message: "请选择计量单位" }],
    // name: [regular.REQUIRED, regular.VARCHAR5],
    // value: [regular.REQUIRED, regular.VARCHAR60],
    // templateId: [regular.REQUIRED],
    // weight: [regular.REQUIRED],
}

// 重量单位列表
export const weightUnitList = ['吨', '千克', '克', '毫克']
/** 品牌列表 */
export const brandList = []
/** 店铺分类列表 */
export const shopCategory = []
/** 商品单位列表 */
export const goodsUnitList = []
// 规格参数列表
export const ANSIList = [1, 2, 3]
export const ENList = [1, 2, 3]
export const GBList = [1, 2, 3]
export const fireProofList = [1, 2, 3]
export const auxList = [1, 2, 3]
export const materialList = [1, 2, 3]
export const decorationList = [1, 2, 3]
export const sizeList = [1, 2, 3]
export const loadBearingList = [1, 2, 3]
export const forceLevelList = [1, 2, 3]
export const adjustParamList = [1, 2, 3]