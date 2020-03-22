// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import {AtInput,AtTextarea,} from 'taro-ui'
import {View,Text,Picker} from "@tarojs/components";
import styles from './index.module.scss'

class Form extends Component {
  state={

  }
  render() {
    const {configs}=this.props
    return (
      <View className={styles.form}>
        {
          configs.map((item={},index)=>{
            const type=item.formType
            item.placeholder=item.placeholder||'请输入'
            switch (type){
              case 'input':{
                return (
                  <AtInput {...item} key={index} />
                )
              }
              case 'textarea':{
                return (
                  <View className={styles.textarea} key={index}>
                    <View className={styles.label}>
                      {
                        item.required &&<Text className={styles.required}>*</Text>
                      }
                      {
                        item.title &&<Text className={styles.title}>{item.title}</Text>
                      }
                    </View>
                    <AtTextarea {...item} />
                  </View>
                )
              }

              case 'select':{
                return (
                  <View className={styles.picker} key={index}>
                    <Picker {...item}  >
                      <View className={styles.label}>
                        {
                          item.required &&<Text className={styles.required}>*</Text>
                        }
                        {
                          item.title &&<Text className={styles.title}>{item.title}</Text>
                        }
                      </View>
                      <View>
                        {this.state[item.name]}
                      </View>
                    </Picker>
                  </View>

                )
              }
            }
          })
        }
      </View>
    )
  }
}

export default Form
