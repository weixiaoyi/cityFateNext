// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import {ScrollView, View} from '@tarojs/components'
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
      ]

    const userList=[1,2,3,4,5,6,7,8].map(item=>({
      imageSrc:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      description:'miaoshu',
      utils:[
        {
          icon:'star',
          text:'关注'
        },
        {
          icon:'heart',
          text:'打招呼'
        }
      ]
    }))

    return (
      <View className={styles.index}>
        <View style={{height:50,background:'red'}}>其他测试</View>
        <View className={styles.sticky}>
          <Tabs tabList={tabList} />
        </View>
        <LoadUserList dataSource={userList} />
      </View>
    )
  }
}

export default Index
