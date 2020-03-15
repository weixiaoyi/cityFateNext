// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import Taro from "@tarojs/taro";
import { View,} from '@tarojs/components'
import { Inject,doLogin } from "../../utils";
import styles from './index.module.scss'
import {Tabs} from '../../components'

import LoadUserList from "./loadUserList";


@doLogin
 @Inject('store')
class Index extends Component {
  componentDidMount () {
    Taro.switchTab({
      url: '/pages/mine/index'
    })
    // Taro.redirectTo({
    //   url:'/pages/mineInfos/index'
    // })
  }


  render () {
    const {store:{homeStore:{userArticlesPage}}}=this.props
    const tabList = [
      { title: '同城' },
      { title: '省内' },
      { title: '全国' },
      { title: '诚意会员' },
      ]

    return (
      <View className={styles.index}>

        <View style={{height:50,background:'red'}}>其他测试</View>
        <View className={styles.sticky}>
          <Tabs tabList={tabList} />
        </View>
        <LoadUserList />
      </View>
    )
  }
}

export default Index
