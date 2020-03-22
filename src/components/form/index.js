// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import {AtInput,AtTextarea,} from 'taro-ui'
import {View,Text,Picker} from "@tarojs/components";
import {_} from '../../utils'
import styles from './index.module.scss'

const MultiSelectorOptions='multiSelectorOptions'

class Form extends Component {
  state={}

  componentDidMount() {
    const {configs}=this.props
    const multiSelectors=configs.filter(item=>item.mode==='multiSelector')
    multiSelectors.map(item=>{
      this.setState({
        [`${MultiSelectorOptions}_${item.name}`]:item.range
      },()=>this.onColumnChange({column:0,value:0},item))
    })
  }

  onChange=(value,item)=>{
    this.setState({
      [item.name]:value
    })
    return value
  }

  onColumnChange=({column,value},item)=>{
    const multiSelector=`${MultiSelectorOptions}_${item.name}`
    const currentList=_.cloneDeep(this.state[multiSelector])
    if(item.range[column][value]&&item.range[column][value].value){
      const res=item.onColumnChange({column,value:item.range[column][value].value})
      if(res&&res.options){
        currentList[res.column]=res.options
        this.setState({
          [multiSelector]:currentList
        })
      }
    }
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
                  <AtInput {...item} key={index} onChange={(value)=>this.onChange(value,item)} />
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
                    <AtTextarea {...item} onChange={(value)=>this.onChange(value,item)}  />
                  </View>
                )
              }

              case 'select':{
                const multiSelector=`${MultiSelectorOptions}_${item.name}`
                return (
                  <View className={styles.picker} key={index}>
                    <Picker
                      rangeKey='label'
                      {...item}
                      onChange={(e)=>this.onChange(e.detail.value,item)}
                      {...item.mode==='multiSelector'?{
                        value:'',
                        range:this.state[multiSelector],
                        onChange:(e)=>{
                          const {value}=e.detail
                          this.setState({
                            [item.name]:value.map((one,ins)=>_.get(this.state[multiSelector],`${ins}.${one}.value`))
                          })
                          return value
                        },
                        onColumnChange:(e)=>{
                          this.onColumnChange(e.detail,item)
                        }
                      }:{}}
                    >
                      <view className={styles.select}>
                        <View className={styles.label}>
                          {
                            item.required &&<Text className={styles.required}>*</Text>
                          }
                          {
                            item.title &&<Text className={styles.title}>{item.title}</Text>
                          }
                        </View>
                        <View>
                          {
                            item.mode==='selector'&&_.get(item,`range.${this.state[item.name]}.label`)
                          }
                          {
                            item.mode==='date'&&this.state[item.name]
                          }
                          {
                            item.mode==='multiSelector'&&this.state[item.name]&&this.state[item.name].join('-')
                          }
                        </View>
                      </view>
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
