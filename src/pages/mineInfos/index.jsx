import React, { Component } from 'react'
import {View} from "@tarojs/components";
import {Inject, doLogin,_} from "../../utils";
import styles from './index.module.scss'
import { Form} from "../../components";
import {Nations, Jobs, InfoOptions} from "../../constants";

const userInfo={
  // introduce: "巍峨呃呃",
  // name: "1",
  // sex: 0,
  // birthday: "2020-04-14",
  // height: 146,
  // weight: 32,
  // bloodType: 'A',
  // nation: '汉族',
  // education: 5,
  // job: "客服经理",
  // nativePlace:  ["北京市", "北京市", "东城区"],
  // workPlace: ["山西省", "长治市", "城区"],
  // maritalStatus: 2,
  // hasChildren: 2,
  // willChildren: 0,
  // isSmoker: 1,
  // isDrink: 3,
  // phone: "18353268994",
  // weixin: "1234566",
  // qq: "呃呃呃呃呃v",
  // income: 8000,
  // housingCondition: 3,
  // carCondition: 2,
  // to_Age:[18, 21],
  // to_Height: [147, 149],
  // to_Education: 3,
  // to_Income: 5000,
  // to_WorkPlace: ["河北省", "秦皇岛市", "北戴河区"],
  // to_MaritalStatus: 3,
  // to_hasChildren: 3,
  // to_isDrink: 1,
  // to_isSmoker: 2,
  // to_willChildren: 3,
}

@doLogin
 @Inject('store')
class MineInfos extends Component {
  componentDidMount () {}

  //onSubmit=(e)=>{}

  render () {
    const {store:{homeStore:{}}}=this.props

    return (
      <View className={styles.mineInfos}>
        <Form
          onSubmit={values=>{
            console.log(values,'----values')
          }}
          configs={
          [
            {
              formType:'groupLabel',
              title:'基本信息',
            },
            {
              formType:'textarea',
              name:'introduce',
              title:'自我介绍',
              type:'text',
              required:true,
            },
            {
              formType:'input',
              name:'name',
              title:'姓名',
              type:'text',
              required:true,
            },
            {
              formType:'select',
              name:'sex',
              title:'性别',
              mode:'selector',
              range:[{label:'男',value:1},{label:'女',value:0}],
              required:true
            },
            {
              formType:'select',
              name:'birthday',
              title:'生日',
              mode:'date',
              required:true,
            },
            {
              formType:'select',
              name:'height',
              title:'身高',
              mode:'selector',
              range:InfoOptions.HeightOptions,
              required:true,
            },
            {
              formType:'select',
              name:'weight',
              title:'体重',
              mode:'selector',
              range:InfoOptions.WeightOptions,
              required:true,
            },
            {
              formType:'select',
              name:'bloodType',
              title:'血型',
              mode:'selector',
              range:['A','B','AB','O','其他'].map((item)=>({label:item,value:item})),
              required:true,
            },
            {
              formType:'select',
              name:'nation',
              title:'名族',
              mode:'selector',
              range:Nations.map((item)=>({label:item,value:item})),
              required:true,
            },
            {
              formType:'select',
              name:'education',
              title:'学历',
              mode:'selector',
              range:InfoOptions.EducationOptions,
              required:true,
            },
            {
              formType:'select',
              name:'job',
              title:'职业',
              mode:'multiSelector',
              range:[Object.keys(Jobs).map(item=>({label:item,value:item})),[]],
              onColumnChange:({column,currentValues})=>{
                const selectValues=Object.values(currentValues)
                const values=_.get(Jobs,`${selectValues.join('.')}`)
                const results=_.isArray(values)?values:values?Object.keys(values):''
                return {
                  column:column+1,
                  options:results&&results.map(item=>({label:item,value:item}))
                }
              },
              getValue:(value)=>value&&value[1],
              showValue:(getValues)=>getValues,
              required:true,
            },
            {
              formType:'select',
              mode:'region',
              name:'workPlace',
              title:'工作地区',
              required:true,
            },
            {
              formType:'select',
              mode:'region',
              name:'nativePlace',
              title:'籍贯',
              required:true,
            },
            {
              formType:'select',
              name:'maritalStatus',
              title:'婚姻状况',
              mode:'selector',
              range:InfoOptions.MaritalStatusOptions,
              required:true,
            },
            {
              formType:'select',
              name:'hasChildren',
              title:'有没有小孩',
              mode:'selector',
              range:InfoOptions.HasChildrenOptions,
              required:true,
            },
            {
              formType:'select',
              name:'willChildren',
              title:'是否想要小孩',
              mode:'selector',
              range:InfoOptions.WillChildrenOptions,
              required:true,
            },
            {
              formType:'select',
              name:'isSmoker',
              title:'是否吸烟',
              mode:'selector',
              range:InfoOptions.IsSmokerOptions,
              required:true,
            },
            {
              formType:'select',
              name:'isDrink',
              title:'是否喝酒',
              mode:'selector',
              range:InfoOptions.IsDrink,
              required:true,
            },
            {
              formType:'groupLabel',
              title:'联系方式',
            },
            {
              formType:'input',
              name:'phone',
              title:'手机号',
              type:'text',
              required:true
            },
            {
              formType:'input',
              name:'weixin',
              title:'微信号',
              type:'text',
              required:true
            },
            {
              formType:'input',
              name:'qq',
              title:'QQ',
              type:'text',
              showRequiredDistance:true
            },
            {
              formType:'groupLabel',
              title:'经济实力',
            },
            {
              formType:'select',
              name:'income',
              title:'月收入',
              mode:'selector',
              range:InfoOptions.InComeOptions,
              required:true,
            },
            {
              formType:'select',
              name:'housingCondition',
              title:'住房情况',
              mode:'selector',
              range:InfoOptions.HousingConditionOptions,
              required:true,
            },
            {
              formType:'select',
              name:'carCondition',
              title:'买车情况',
              mode:'selector',
              range:InfoOptions.CarConditionOptions,
              required:true,
            },
            {
              formType:'groupLabel',
              title:'择偶要求',
            },
            {
              formType:'select',
              name:'to_Age',
              title:'年龄',
              mode:'multiSelector',
              range:InfoOptions.ToAge,
              onColumnChange:InfoOptions.ToAgeChange,
              required:true,
            },
            {
              formType:'select',
              name:'to_Height',
              title:'身高',
              mode:'multiSelector',
              range:InfoOptions.ToHeightOptions,
              onColumnChange:InfoOptions.ToHeightOptionsChange,
              required:true,
            },
            {
              formType:'select',
              name:'to_Education',
              title:'学历',
              mode:'selector',
              range:InfoOptions.ToEducationOptions,
              required:true,
            },
            {
              formType:'select',
              name:'to_Income',
              title:'月收入',
              mode:'selector',
              range:InfoOptions.ToInComeOptions,
              required:true,
            },
            {
              formType:'select',
              mode:'region',
              name:'to_WorkPlace',
              title:'工作地区',
              customItem:'不限',
              required:true,
            },
            {
              formType:'select',
              name:'to_MaritalStatus',
              title:'婚姻状况',
              mode:'selector',
              range:InfoOptions.ToMaritalStatusOptions,
              required:true,
            },
            {
              formType:'select',
              name:'to_hasChildren',
              title:'有没有小孩',
              mode:'selector',
              range:InfoOptions.ToHasChildrenOptions,
              required:true,
            },
            {
              formType:'select',
              name:'to_willChildren',
              title:'是否想要小孩',
              mode:'selector',
              range:InfoOptions.ToWillChildrenOptions,
              required:true,
            },
            {
              formType:'select',
              name:'to_isSmoker',
              title:'是否吸烟',
              mode:'selector',
              range:InfoOptions.ToIsSmokerOptions,
              required:true,
            },
            {
              formType:'select',
              name:'to_isDrink',
              title:'是否喝酒',
              mode:'selector',
              range:InfoOptions.ToIsDrink,
              required:true,
            },
          ].map(item=>({
            ...item,
            value:item.value||userInfo[item.name]
          }))
        }
        />
      </View>
    )
  }
}

export default MineInfos
