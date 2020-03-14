// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import {ScrollView, View} from '@tarojs/components'
import {InfoCard} from '../../components'
import styles from    './loadUserList.module.scss'

class LoadUserList extends Component {
  componentDidMount () { }
  render () {
    const {dataSource=[],primaryKey}=this.props
    return (
      <ScrollView scrollY >
        <View className={styles.loadUserList}>
          {
            dataSource.map((item={},index)=>(
              <InfoCard key={primaryKey||index} {...item} />
            ))
          }
        </View>
      </ScrollView>
    )
  }
}

export default LoadUserList
