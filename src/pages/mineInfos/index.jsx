import React, { Component } from 'react'
import {View,Text} from "@tarojs/components";
import {AtImagePicker,AtButton,AtForm,AtInput} from 'taro-ui'
import {Inject, doLogin, routerGo} from "../../utils";
import styles from './index.module.scss'
import {Title, Form} from "../../components";

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
              range:['1','2'],
              required:true,
            },
            {
              formType:'input',
              name:'name',
              title:'姓名',
              type:'text',
              required:true
            },
          ]
        }
        />
      </View>
    )
  }
}

export default MineInfos
