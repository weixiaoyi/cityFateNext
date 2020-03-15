import React, { Component } from 'react'
import {View} from "@tarojs/components";
import {AtButton} from 'taro-ui'
import {Inject, doLogin, routerGo} from "../../utils";
import styles from './index.module.scss'
import {Title} from "../../components";

@doLogin
 @Inject('store')
class MineInfos extends Component {
  componentDidMount () {

  }

  render () {
    const {store:{homeStore:{userArticlesPage}}}=this.props

    return (
      <View className={styles.mineInfos}>
        <Title>我的资料</Title>
        <AtButton type='primary' onClick={routerGo('mine')}>按钮文案</AtButton>
      </View>
    )
  }
}

export default MineInfos
