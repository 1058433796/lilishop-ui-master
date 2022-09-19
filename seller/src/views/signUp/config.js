// 行业所属列表
export const companyTypeList = [
    { value: 0, label: 'A' },
    { value: 1, label: 'B' },
    { value: 2, label: 'C' },
    { value: 3, label: 'D' },
    { value: 4, label: 'E' },
]

// 地址列表
export const addressList = [{
    value: 'beijing',
    label: '北京',
    children: [
        {
            value: 'gugong',
            label: '故宫'
        },
        {
            value: 'tiantan',
            label: '天坛'
        },
        {
            value: 'wangfujing',
            label: '王府井'
        }
    ]
}]

// 法人代表证件类型
export const LicenseTypeList = [
    { value: '身份证', label: '身份证' },
    { value: '护照', label: '护照' },
    { value: '证明文件', label: '证明文件' },
]

// 组织机构代码列表
export const orgCodeList = [
    { value: '12345', label: '12345' },
    { value: '4444', label: '4444' },
]

// 表单
export const appForm = {
  //所属行业
  companyType: '',
  // 企业名称
  companyName: '',
  // 营业执照注册号
  licenseRegisterNumber: '',
  // 营业执照所在地
  licenseAddress: [],
  // 营业执照详细地址
  licenseDetailAddress: '',
  // 营业期限
  licenseValidRange: [],
  // 营业期限 长期
  licenseValidLongPeriod: false,
  // 法人代表证件类型
  legalRepresentLicenseType: '',
  // 法人代表证件号
  legalRepresentLicenseNumber: '',
  // 法人代表名称
  legalRepresentName: '',
  // 法人代表信息有效期
  legalRepresentLicenseValidRange: [],
  // 法人代表信息有效期 长期
  legalRepresentLicenseLongPeriod: false,
  // 公司所在地
  companyAddress: [],
  // 公司详细地址
  companyDetailAddress: '',
  // 公司紧急联系人
  companyEmergencyName: '',
  // 公司紧急联系人电话
  companyEmergencyPhoneNumber: '',
  // 组织机构代码
  orgCode: '',
  // 组织机构代码有效期
  orgCodeValidRange: [],
  // 组织机构代码有效期 长期
  orgCodeValidLongPeriod: false,
  // 阅读并接受《中科在线云筑注册条款》
  termAccepted: false,
  // 营业执照/三证合一电子版
  businessLicensePhotos: [],
  // 法人证件电子版
  legalLicensePhotos: [],
  // 银行开户许可证电子版
  bankLicensePhotos: [],
  // 组织机构代码证电子版
  orgCodeLicensePhotos: []
}

// 表格校验规则
export const ruleInline = {
      //所属行业
      companyType: [
        {required: true}
      ],
      // 企业名称
      companyName: [
        {required: true}
      ],
      // 营业执照注册号
      licenseRegisterNumber: [
        {required: true}
      ],
      // 营业执照所在地
      licenseAddress: [
        {required: true}
      ],
      // 营业执照详细地址
      licenseDetailAddress: [
        {required: true}
      ],
      // 营业期限
      licenseValidRange: [
        
      ],
      // 营业期限 长期
      licenseValidLongPeriod: [

      ],
      // 法人代表证件类型
      legalRepresentLicenseType: [
        {required: true}
      ],
      // 法人代表证件号
      legalRepresentLicenseNumber: [
        {required: true}
      ],
      // 法人代表名称
      legalRepresentName: [
        {required: true}
      ],
      // 法人代表信息有效期
      legalRepresentLicenseValidRange: [],
      // 法人代表信息有效期 长期
      legalRepresentLicenseLongPeriod: [],
      // 公司所在地
      companyAddress: [
        {required: true}
      ],
      // 公司详细地址
      companyDetailAddress: [
        {required: true}
      ],
      // 公司紧急联系人
      companyEmergencyName: [
        {required: true}
      ],
      // 公司紧急联系人电话
      companyEmergencyPhoneNumber: [
        {required: true}
      ],
      // 组织机构代码
      orgCode: [
        {required: true}
      ],
      // 组织机构代码有效期
      orgCodeValidRange: [

      ],
      // 组织机构代码有效期 长期
      orgCodeValidLongPeriod: [],
      // 阅读并接受《中科在线云筑注册条款》
      termAccepted: [],
      // 营业执照/三证合一电子版
      businessLicensePhotos: [
        {required: true}
      ],
      // 法人证件电子版
      legalLicensePhotos: [
        {required: true}
      ],
      // 银行开户许可证电子版
      bankLicensePhotos: [
        {required: true}
      ],
      // 组织机构代码证电子版
      orgCodeLicensePhotos: [
        {required: true}
      ]
}