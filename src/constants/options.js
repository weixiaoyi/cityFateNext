
export const Nations=["汉", "蒙古", "回", "藏", "维吾尔", "苗",
  "彝", "壮", "布依", "朝鲜", "满", "侗", "瑶", "白",
  "土家", "哈尼", "哈萨克", "傣", "黎", "傈僳",
  "佤", "畲", "高山", "拉祜", "水", "东乡", "纳西",
  "景颇", "柯尔克孜", "土", "达斡尔", "仫佬", "羌",
  "布朗", "撒拉", "毛难", "仡佬", "锡伯", "阿昌", "普米",
  "塔吉克", "怒", "乌孜别克", "俄罗斯", "鄂温克", "崩龙",
  "保安", "裕固", "京", "塔塔尔", "独龙", "鄂伦春", "赫哲",
  "门巴", "珞巴", "基诺"].map(item=>`${item}族`)

export const Jobs={
  '销售':['销售总监','销售经理','销售主管','销售专员','渠道/分销管理','渠道/分销专员','经销商', '客户经理','客户代表','销售'],
  '客户服务':['客服经理','客服主管','客服专员','客服协调','客服技术支持','客服服务'],
  '计算机/互联网':['IT技术总监','IT技术经理','IT工程师','系统管理员','测试专员','运营管理','网页设计','网站编辑','产品经理','计算机/互联网'],
  '通讯/电子':['通信技术','电子技术','通信/电子'],
  '生产/制造':['工厂经理','工程师','项目主管','营运经理','营运主管','车间主任','物流管理','生产领班','操作工人','安全管理','生产制造'],
  '物流/仓储':['物流经理','物流主管','物流专员','仓库经理','仓库管理员','货运代理','集装箱业务','海关事务管理','报单员','快递员','物流/仓储'],
  '商贸/采购':['商务经理','商务专员','采购经理','采购专员','外贸经理','外贸专员','业务跟单','报关员','商贸/采购'],
  '人事/行政':['人事总监','人事经理','人事主管','人事专员','招聘经理','招聘专员','培训经理','培训专员','秘书','文员','后勤','人事/行政'],
  '高级经理':['总经理','副总经理','合伙人','总监','经理','总裁助理','高级管理'],
  '广告/市场':['广告客户经理','广告客户专员','广告设计经理','广告设计专员','广告策划','市场营销总监',
    '市场营销专员','市场策划','市场调研与分析','市场拓展','公共经理','公关专员','媒介经理','媒介专员','品牌经理','品牌专员','广告/市场'],
  '传媒/艺术':['主编','编辑','作家','撰稿人','文案策划','出版发行','导演','记者','主持人','演员',
    '模特','经纪人','摄影师','影视后期制作','设计师','画家','音乐家','舞蹈','传媒/艺术'],
  '生物/制药':['生物工程','药品工程','临床研究','医疗器械','医药代表','化工工程师','生物/制药'],
  '医疗/护理':['医疗管理','医生','心理医生','药剂师','护士','兽医','医疗/护理'],
  '金融/银行/保险':['投资','保险','金融','银行','证券','金融/银行/保险'],
  '建筑/房地产':['建筑师','工程师','规划师','景观设计','房地产策划','房地产交易','物业管理','建筑/房地产'],
  '咨询/顾问':['专业顾问','咨询经理','咨询师','培训师','咨询顾问'],
  '法律':['律师','律师助理','法务经理','法务专员','知识产权专员','法律'],
  '财会/审计':['财务总监','财务经理','财务主管','会计','注册会计师','审计师','税务经理','成本经理','财会/审计'],
  '教育科研':['教授','讲师/助教','中学教师','小学教师','幼师','教务管理人员','职业技术教师','培训师','科研管理人员','科研人员','教育/科研'],
  '服务业':['餐饮管理','厨师','餐厅服务员','酒店管理','大堂经理','酒店服务员','导游','美容师','健身教练',
    '商场经理','零售店店长','店员','保安经理','保安人员','家政服务','服务业'],
  '交通运输':['飞行员','空乘人员','地勤人员','列车司机','乘务员','船长','船员','司机','交通运输'],
  '政府机构':['公务员','军人','警察','政府机构'],
  '其他职业':['农林牧业','自由职业','在校学生','待业','其他职业']
}

export const InfoOptions=(()=>{
  const InComeRange=[3000,5000,8000,12000,15000,20000,30000,40000,50000]

  return {
    ToAge:[new Array(63).fill(18).map((item,index)=>item+index).map(item=>({label:`${item}岁`,value:item})),[]],
    ToAgeChange:({column,currentValues})=>{
      if(column===0){
        return {
          column:column+1,
          options:[{label:'不限',value:'不限'}].
          concat(new Array(80-currentValues[column]).
          fill(currentValues[column]+1).map((item,index)=>item+index).map(item=>({label:`${item}岁`,value:item})))
        }
      }
    },

    WeightOptions:(new Array(131-30))
      .fill(30).map((item,index)=>({label:`${item+index}kg`,value:item+index})).concat({label:'130以上',value:131}),

    HeightOptions:[{label:'145cm以下',value:144}].concat((new Array(201-145))
      .fill(145).map((item,index)=>({label:`${item+index}cm`,value:item+index}))).concat({label:'200cm以上',value:201}),
    ToHeightOptions:[[{label:'不限',value:'不限'}].concat(new Array(56).fill(145).map((item,index)=>({label:`${item+index}cm`,value:item+index}))),[]],
    ToHeightOptionsChange:({column,currentValues})=>{
      if(column===0){
        let base=145
        if(currentValues[column]!=='不限'){
          base=currentValues[column]
        }
        return {
          column:column+1,
          options:[{label:'不限',value:'不限'}].
          concat(new Array(200- base).
          fill( base+1).map((item,index)=>({label:`${item+index}cm`,value:item+index})))
        }
      }
    },

    InComeOptions:()=>{
      return [{label:'3000元以下',value:2000}].
      concat(InComeRange.slice(0,8).map((item,index)=>({label:`${item}-${InComeRange[index+1]}元`,value:item}))).concat([{label:'50000元以上',value:60000}])
    },
    ToInComeOptions:()=>{
      return [{label:'不限',value:'不限'},{label:'3000元以下',value:2000}].
      concat(InComeRange.slice(0,8).map((item,index)=>({label:`${item}-${InComeRange[index+1]}元`,value:item}))).concat([{label:'50000元以上',value:60000}])
    },

    HousingConditionOptions:['和家人同住','已购房','租房','需要时购买','住单位宿舍','暂无购房','已购房-有贷款','已购房-无贷款','与人合租'].map((item,index)=>({label:item,value:index})),
    CarConditionOptions:['暂无购车','已购车-经济型','已购车-中档型','已购车-豪华型','单位用车','需要时购置'].map((item,index)=>({label:item,value:index})),

    EducationOptions:['初中及以下','中专','高中','大专','本科','硕士','博士'].map((item,index)=>({label:item,value:index})),
    ToEducationOptions:['不限','初中及以下','中专及以上','高中及以上','大专及以上','本科及以上','硕士及以上','博士及以上'].map((item,index)=>({label:item,value:index})),

    MaritalStatusOptions:['未婚','离异','丧偶'].map((item,index)=>({label:item,value:index})),
    ToMaritalStatusOptions:['不限','未婚','离异','丧偶'].map((item,index)=>({label:item,value:index})),

    HasChildrenOptions:['没有孩子','有孩子且住在一起','有孩子且偶尔会住在一起','有孩子但不在身边'].map((item,index)=>({label:item,value:index})),
    ToHasChildrenOptions:['不限','没有孩子','有孩子且住在一起','有孩子且偶尔会住在一起','有孩子但不在身边'].map((item,index)=>({label:item,value:index})),

    WillChildrenOptions:['视情况而定','想要孩子','不想要孩子','以后再说'].map((item,index)=>({label:item,value:index})),
    ToWillChildrenOptions:['不限','视情况而定','想要孩子','不想要孩子','以后再说'].map((item,index)=>({label:item,value:index})),

    IsSmokerOptions:['不吸烟','吸烟'].map((item,index)=>({label:item,value:index})),
    ToIsSmokerOptions:['不限','不吸烟','吸烟'].map((item,index)=>({label:item,value:index})),

    IsDrink:['不喝酒','经常喝酒','偶尔喝酒','社交场合会喝酒'].map((item,index)=>({label:item,value:index})),
    ToIsDrink:['不限','不喝酒','经常喝酒','偶尔喝酒','社交场合会喝酒'].map((item,index)=>({label:item,value:index}))
  }
})()
