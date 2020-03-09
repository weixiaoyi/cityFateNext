// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { Inject,doLogin } from "../../utils";
import styles from './index.module.scss'
import {Tabs} from '../../components'
import LoadUserList from "./loadUserList";

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
      { title: '同城' },
      { title: '省内' },
      { title: '全国' },
      { title: '诚意会员' },
      ].map(item=>({
      ...item,
      component:<LoadUserList />
    }))

    return (
      <View className={styles.index}>
        <Tabs tabList={tabList} />
      </View>
    )
  }
}

export default Index
