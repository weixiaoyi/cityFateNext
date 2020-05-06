import React, { Component } from 'react'
import classNames from 'classnames'
import { AtImagePicker,AtTag } from 'taro-ui'
import {Image, View} from "@tarojs/components";
import {Inject, doLogin,_} from "../../utils";
import styles from './index.module.scss'

@doLogin
 @Inject('store')
class MineInfos extends Component {
  state={
    files: [{
      url: 'https://cityfate.oss-cn-shanghai.aliyuncs.com/u%3D2437750419%2C148331851%26fm%3D26%26gp%3D0.jpg',
    },
      {
        url: 'https://cityfate.oss-cn-shanghai.aliyuncs.com/u%3D2437750419%2C148331851%26fm%3D26%26gp%3D0.jpg',
      },
      {
        url: 'https://cityfate.oss-cn-shanghai.aliyuncs.com/u%3D2437750419%2C148331851%26fm%3D26%26gp%3D0.jpg',
      }]
  }
  componentDidMount () {}

  //onSubmit=(e)=>{}

  render () {
    const {store:{homeStore:{}}}=this.props
    return (
      <View className={styles.personPage}>
        <View className={styles.header}>
          <Image src='https://cityfate.oss-cn-shanghai.aliyuncs.com/u%3D2437750419%2C148331851%26fm%3D26%26gp%3D0.jpg'></Image>
        </View>
        <View className='horDivide' />
        <View className={styles.images}>
          <AtImagePicker
            multiple
            files={this.state.files}
          />
        </View>
        <View className='horDivide' />
        <View className={styles.personInfos}>
          <view className={
            classNames(styles.infoText,styles.title)
          }
          >个人资料</view>
          <View  className={styles.infoTags}>
            {
              [{
                label:'未婚',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              }].map((item,index)=>(
                <View  key={index}>
                  <AtTag

                    circle
                  >
                    {item.label}
                  </AtTag>
                </View>
              ))
            }
          </View>
        </View>

        <View className={styles.toPersonInfos}>
          <view className={classNames(styles.infoText,styles.title)}>择偶条件</view>
          <View  className={styles.infoTags}>
            {
              [{
                label:'未婚',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              },{
                label:'28岁',
                value:'0'
              }].map((item,index)=>(
                <View  key={index}>
                  <AtTag

                    circle
                  >
                    {item.label}
                  </AtTag>
                </View>
              ))
            }
          </View>
        </View>
        <View className='horDivide' />

        <View className={styles.innerIntroduce}>
          <View className={classNames(styles.title)}>
            内心独白
          </View>
          <View className={styles.introduce}>
            内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心
            独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白
          </View>
        </View>
        <View className='horDivide' />
        <View className={styles.trends}>
          <View className={classNames(styles.title)}>
            个人动态
          </View>
          <View className={styles.timeline}>
            <View className={styles.message}>
              <View className={styles.timestamp}>09-15</View>
              <View>
                <View>喜欢阅读</View>
                <View></View>
              </View>
            </View>

          </View>
        </View>

      </View>
    )
  }
}

export default MineInfos
