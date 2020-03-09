// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import {View,Image} from "@tarojs/components";
import styles from './index.module.scss'

class InfoCard extends Component {

  render() {
    const {description='描述',utils, imageSrc=''}=this.props
    return (
      <View className={styles.infoCard}>
        <View className={styles.img}>
          {
            imageSrc&& <Image
              src={imageSrc}
            />
          }
        </View>

        <View className={styles.info}>
          {description}
        </View>
        {
          utils&&utils.length>0&&(
            <View className={styles.utils}>
              {
                utils.map((item)=>(
                  <View key={item.text} className={styles.util}>
                    <View
                      className={styles.iconContainer}
                      onClick={()=>{
                        item.onClick&&item.onClick(item)
                      }}
                    >
                      <View className={`at-icon at-icon-${item.icon} ${styles.icon}`} />
                      {item.text}
                    </View>
                  </View>
                ))
              }
            </View>
          )
        }

      </View>
    )
  }
}

export default InfoCard
