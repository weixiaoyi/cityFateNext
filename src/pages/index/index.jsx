import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { Inject,doLogin } from "../../utils";
import styles from './index.module.scss'
import {Tabs} from '../../components'

@doLogin
 @Inject('store')
class Index extends Component {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    const {store:{homeStore:{userArticlesPage}}}=this.props
    const tabList = [
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' },
      { title: '标签页4' },
      { title: '标签页5' },
      { title: '标签页6' },
      { title: '标签页7' },
      { title: '标签页8' },
      { title: '标签页9' },
      ]

    return (
      <View className={styles.index}>
        <Tabs tabList={tabList} />
      </View>
    )
  }
}

export default Index
