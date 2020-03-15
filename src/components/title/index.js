// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import {View} from "@tarojs/components";
import styles from './index.module.scss'

class Title extends Component {
  render() {
    const {children}=this.props
    return (
      <View className={styles.title}>{children}</View>

    )
  }
}

export default Title
