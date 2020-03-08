import React, { Component } from 'react'
import { View,Button,Input,Map } from '@tarojs/components'
import { AtButton,AtTextarea } from 'taro-ui'

import { Inject,doLogin } from "../../utils";
import styles from './index.module.scss'

@doLogin
 @Inject('store')
class Index extends Component {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    const {store:{homeStore:{userArticlesPage}}}=this.props
    return (
      <View className={styles.index}>
        <AtButton type='primary'>按钮文案</AtButton>
        <AtTextarea
          maxLength={200}
          placeholder='你的问题是...'
        />
        给哈哈哈哈{userArticlesPage}
      </View>
    )
  }
}

export default Index
