// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import {ScrollView, View} from '@tarojs/components'
import {InfoCard} from '../components'
import styles from    './loadUserList.module.scss'

class LoadUserList extends Component {
  componentDidMount () { }
  render () {
    const dataSource=[1,2,3,4,5,6,7,8].map((item,index)=>(
      {
        id:index,
        baseInfo:{
          name:'叫我Hr',
          avatar:'https://cityfate.oss-cn-shanghai.aliyuncs.com/u%3D2437750419%2C148331851%26fm%3D26%26gp%3D0.jpg',
          city:'杭州',
          age:18,
          education:'大学本科',
          job:'小学教师',
          height:160,
          weight:50,
        }
      }
    ))
    return (
      <ScrollView scrollY >
        <View className={styles.loadUserList}>
          {
            dataSource.map((item={})=>(
              <InfoCard key={item.id} {...item} />
            ))
          }
        </View>
      </ScrollView>
    )
  }
}

export default LoadUserList
