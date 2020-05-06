import React, { Component } from 'react'
import {View,Image} from "@tarojs/components";
import {AtList,AtListItem} from 'taro-ui'

import { Inject,doLogin,routerGo } from "../../utils";
import styles from './index.module.scss'
import {Title} from "../../components";


@doLogin
 @Inject('store')
class Mine extends Component {
  componentDidMount () {

  }

  render () {
    const {store:{homeStore:{}}}=this.props

    return (
      <View className={styles.mine}>
        <View className={styles.myInfo}>
          <View className={styles.infoContainer}>
            <Image src='https://cityfate.oss-cn-shanghai.aliyuncs.com/u%3D2437750419%2C148331851%26fm%3D26%26gp%3D0.jpg'></Image>
            <View className={styles.infoShort}>
              <View className={styles.name}>Hr</View>
              <View className={styles.baseInfo}>
                <View>杭州</View>
                <View>18岁</View>
                <View>大学本科</View>
              </View>
            </View>
          </View>
          <View className={styles.announce}>等一人迟暮，择一人终老......愿无岁月可回首；且以深情共白头</View>
        </View>
        <View>
          <Title>相亲舞台</Title>
          <AtList>
            <AtListItem title='我的资料' arrow='right' onClick={routerGo('mineInfos')} />
            <AtListItem title='我的主页' arrow='right' onClick={routerGo('personPage')} />
            <AtListItem title='我关注的' arrow='right' />
            <AtListItem title='关注我的' arrow='right' />
            <AtListItem title='谁看过我' arrow='right' />
          </AtList>
        </View>
      </View>
    )
  }
}

export default Mine
