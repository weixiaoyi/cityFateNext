import React, { Component } from 'react'
import { View,Button,Input,Map } from '@tarojs/components'
import { AtButton,AtTextarea,AtSteps ,AtModal, AtModalHeader, AtModalContent, AtModalAction} from 'taro-ui'

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
    const items = [
      { 'title': '步骤一', 'desc': '这里是额外的信息，最多两行' },
      { 'title': '步骤二', 'desc': '这里是额外的信息，最多两行' },
      { 'title': '步骤三', 'desc': '这里是额外的信息，最多两行' }
    ]
    return (
      <View className={styles.index}>
        <AtModal isOpened
          title='标题'
          cancelText='取消'
          confirmText='确认'
        >
          <AtModalHeader>标题</AtModalHeader>
          <AtModalContent>
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
          </AtModalContent>
          <AtModalAction> <Button>取消</Button> <Button>确定</Button> </AtModalAction>
        </AtModal>
        <AtSteps
          items={items}

        />
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
