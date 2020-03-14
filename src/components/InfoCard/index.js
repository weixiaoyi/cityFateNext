// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { AtTag } from 'taro-ui'

import {View,Image} from "@tarojs/components";
import styles from './index.module.scss'

class InfoCard extends Component {

  render() {
    const {
      baseInfo:{name, avatar, city, age, education, job, height,}={},
    }=this.props
    return (
      <View className={styles.infoCard}>
        <View className={styles.img}>
          {
            avatar&& <Image
              className={styles.img}
              src={avatar}
            />
          }
        </View>
        <View className={styles.infos}>
          <View className={styles.name}>{name}</View>
          <View className={styles.baseInfo}>
            <View>{city}</View>
            <View>{age}岁</View>
            <View>{education}</View>
          </View>
          <View className={styles.labels}>
            {
              [
                {label:'内敛',type:'nature'},
                {label:'内向',type:'nature'},
                {label:job},
                {label:`${height}cm`},

              ].map((item={})=>(
                <AtTag  active key={item.label} className={`${styles.label} ${styles[item.type]}`}>{item.label}</AtTag>
              ))
            }
          </View>
          <View className={styles.otherImages}>
            {
              [
                {url:avatar},
              ].map((item={})=>(
                <Image
                  key={item.url}
                  src={avatar}
                />
              ))
            }
          </View>
        </View>

      </View>
    )
  }
}

export default InfoCard
