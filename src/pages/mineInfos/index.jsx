import React, { Component } from 'react'
import {View} from "@tarojs/components";
// import {AtImagePicker,AtButton,AtForm,AtInput} from 'taro-ui'
import {Inject, doLogin} from "../../utils";
import styles from './index.module.scss'
import { Form} from "../../components";
import {Nations,Jobs} from "../../constants";

@doLogin
 @Inject('store')
class MineInfos extends Component {
  componentDidMount () {

  }

  onSubmit=(e)=>{
    console.log(e,'---')
  }

  render () {
    const {store:{homeStore:{userArticlesPage}}}=this.props

    return (
      <View className={styles.mineInfos}>
        <Form configs={
          [
            {
              formType:'textarea',
              name:'introduce',
              title:'自我介绍',
              type:'text',
              required:true
            },
            {
              formType:'input',
              name:'name',
              title:'姓名',
              type:'text',
              required:true
            },
            {
              formType:'select',
              name:'sex',
              title:'性别',
              mode:'selector',
              range:[{label:'男',value:1},{label:'女',value:0}],
              required:true,
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
              range:[{label:'145cm以下',value:144}].concat((new Array(201-145))
                .fill(145).map((item,index)=>({label:`${item+index}cm`,value:item+index}))).concat({label:'200cm以上',value:201}),
              required:true,
            },
            {
              formType:'select',
              name:'weight',
              title:'体重',
              mode:'selector',
              range:(new Array(131-30))
                .fill(30).map((item,index)=>({label:`${item+index}kg`,value:item+index})).concat({label:'130以上',value:131}),
              required:true,
            },
            {
              formType:'select',
              name:'bloodType',
              title:'血型',
              mode:'selector',
              range:['A','B','AB','O','其他'].map(item=>({label:item,value:item})),
              required:true,
            },
            {
              formType:'select',
              name:'nation',
              title:'名族',
              mode:'selector',
              range:Nations.map(item=>({label:item,value:item})),
              required:true,
            },
            {
              formType:'select',
              name:'education',
              title:'学历',
              mode:'selector',
              range:['初中及以下','中专','高中','大专','本科','硕士','博士'].map(item=>({label:item,value:item})),
              required:true,
            },
            {
              formType:'select',
              name:'job',
              title:'职业',
              mode:'multiSelector',
              range:[Object.keys(Jobs).map(item=>({label:item,value:item})),[]],
              onColumnChange:({column,value})=>{
                return {
                  column:column+1,
                  options:Jobs[value].map(item=>({label:item,value:item}))
                }
              },
              getValue:(value)=>value&&value[1],
              showValue:(getValues)=>getValues,
              required:true,
            },
          ]
        }
        />
      </View>
    )
  }
}

export default MineInfos
