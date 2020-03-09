// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import {InfoCard} from '../../components'

class LoadUserList extends Component {
  componentDidMount () { }


  render () {
    const {}=this.props
    const props={
      imageSrc:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      description:'miaoshu',
      utils:[
        {
          icon:'star',
          text:'关注'
        },
        {
          icon:'heart',
          text:'关注'
        }
      ]
    }

    return (
      <View>
       list
        <InfoCard {...props} />
      </View>
    )
  }
}

export default LoadUserList
