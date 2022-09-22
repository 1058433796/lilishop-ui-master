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
  businessNumber: '',
  // 营业执照所在地
  businessAddress: [],
  // 营业执照详细地址
  businessDetailAddress: '',
  // 营业期限
  licenseValidRange: [],
  // 营业期限 长期
  businessLongPeriod: false,
  // 法人代表证件类型
  legalType: '',
  // 法人代表证件号
  legalNumber: '',
  // 法人代表名称
  legalName: '',
  // 法人代表信息有效期
  legalRepresentLicenseValidRange: [],
  // 法人代表信息有效期 长期
  legalLongPeriod: false,
  // 公司所在地
  companyAddress: [],
  // 公司详细地址
  companyDetailAddress: '',
  // 公司紧急联系人
  companyEmergencyName: '',
  // 公司紧急联系人电话
  companyEmergencyPhoneNumber: '',
  // 组织机构代码
  code: '',
  // 组织机构代码有效期
  orgCodeValidRange: [],
  // 组织机构代码有效期 长期
  codeLongPeriod: false,
  // 阅读并接受《中科在线云筑注册条款》
  termAccepted: false,
}

export const picForm = {
  // 营业执照/三证合一电子版
  businessLicensePhotos: [],
  // 法人证件电子版
  legalLicensePhotos: [],
  // 银行开户许可证电子版
  bankLicensePhotos: [],
  // 组织机构代码证电子版
  orgCodeLicensePhotos: []
}

// 测试数据表单
export const testForm = {
  //所属行业
  companyType: '0',
  // 企业名称
  companyName: '123123',
  // 营业执照注册号
  businessNumber: '123123',
  // 营业执照所在地
  businessAddress: ['beijing', 'linyi'],
  // 营业执照详细地址
  businessDetailAddress: '2123',
  // 营业期限
  licenseValidRange: ['2022-09-15', '2022-09-17'],
  // 营业期限 长期
  businessLongPeriod: false,
  // 法人代表证件类型
  legalType: '0',
  // 法人代表证件号
  legalNumber: '1232',
  // 法人代表名称
  legalName: '123',
  // 法人代表信息有效期
  legalRepresentLicenseValidRange: ['2022-09-15', '2022-09-17'],
  // 法人代表信息有效期 长期
  legalLongPeriod: false,
  // 公司所在地
  companyAddress: ['beijing', 'linyi'],
  // 公司详细地址
  companyDetailAddress: 'ads',
  // 公司紧急联系人
  companyEmergencyName: 'asd',
  // 公司紧急联系人电话
  companyEmergencyPhoneNumber: '123123',
  // 组织机构代码
  code: '111',
  // 组织机构代码有效期
  orgCodeValidRange: ['2022-09-15', '2022-09-17'],
  // 组织机构代码有效期 长期
  codeLongPeriod: false,
  // 阅读并接受《中科在线云筑注册条款》
  termAccepted: false,
}

// 表格校验规则
export const appRules = {
  //所属行业
  companyType: [
    { required: true }
  ],
  // 企业名称
  companyName: [
    { required: true }
  ],
  // 营业执照注册号
  businessNumber: [
    { required: true }
  ],
  // 营业执照所在地
  businessAddress: [
    { required: true }
  ],
  // 营业执照详细地址
  businessDetailAddress: [
    { required: true }
  ],
  // 营业期限
  licenseValidRange: [

  ],
  // 营业期限 长期
  businessLongPeriod: [

  ],
  // 法人代表证件类型
  legalType: [
    { required: true }
  ],
  // 法人代表证件号
  legalNumber: [
    { required: true }
  ],
  // 法人代表名称
  legalName: [
    { required: true }
  ],
  // 法人代表信息有效期
  legalRepresentLicenseValidRange: [],
  // 法人代表信息有效期 长期
  legalLongPeriod: [],
  // 公司所在地
  companyAddress: [
    { required: true }
  ],
  // 公司详细地址
  companyDetailAddress: [
    { required: true }
  ],
  // 公司紧急联系人
  companyEmergencyName: [
    { required: true }
  ],
  // 公司紧急联系人电话
  companyEmergencyPhoneNumber: [
    { required: true }
  ],
  // 组织机构代码
  code: [
    { required: true }
  ],
  // 组织机构代码有效期
  orgCodeValidRange: [

  ],
  // 组织机构代码有效期 长期
  codeLongPeriod: [],
  // 阅读并接受《中科在线云筑注册条款》
  termAccepted: [],
}

export const picRules = {
  // 营业执照/三证合一电子版
  businessLicensePhotos: [
    { required: true }
  ],
  // 法人证件电子版
  legalLicensePhotos: [
    { required: true }
  ],
  // 银行开户许可证电子版
  bankLicensePhotos: [
    { required: true }
  ],
  // 组织机构代码证电子版
  orgCodeLicensePhotos: [
    { required: true }
  ],
}