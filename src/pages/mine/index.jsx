import React, { Component } from 'react'
import {View,Image} from "@tarojs/components";
import {AtList,AtListItem} from 'taro-ui'

import { Inject,doLogin } from "../../utils";
import styles from './index.module.scss'

@doLogin
 @Inject('store')
class Mine extends Component {
  componentDidMount () {

  }

  render () {
    const {store:{homeStore:{userArticlesPage}}}=this.props

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
          <AtList>
            <AtListItem title='标题文字' onClick={this.handleClick} />
            <AtListItem title='标题文字' arrow='right' />
            <AtListItem title='标题文字' extraText='详细信息' />
            <AtListItem title='禁用状态' disabled extraText='详细信息' />
          </AtList>
        </View>
      </View>
    )
  }
}

export default Mine
