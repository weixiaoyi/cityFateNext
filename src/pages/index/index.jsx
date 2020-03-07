import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { Inject,doLogin } from "../../utils";
import styles from './index.module.scss'

@doLogin
 @Inject('store')
class Index extends Component {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    const {store:{homeStore:{userArticlesPage}}}=this.props
    return (
      <View className={styles.index}>
        给哈哈哈哈{userArticlesPage}
      </View>
    )
  }
}

export default Index
