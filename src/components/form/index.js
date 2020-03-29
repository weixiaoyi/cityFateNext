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
        [`${MultiSelectorOptions}_${item.name}`]:item.range,
        [`${MultiSelectorOptions}_${item.name}_selected`]:{0:0}
      },()=>this.onColumnChange({column:0,value:0},item))
    })
  }

  onChange=(value,item)=>{
    this.setState({
      [item.name]:item.getValue?item.getValue(value,item):value
    })
    return value
  }

  onColumnChange=({column,value},item)=>{
    const multiSelector=`${MultiSelectorOptions}_${item.name}`
    const selected=`${MultiSelectorOptions}_${item.name}_selected`
    const currentList=_.cloneDeep(this.state[multiSelector])
    if(currentList[column][value]&&currentList[column][value].value){
      const restores=Object.keys(this.state[selected]).filter(one=>one>column)
      const currentValues={
        ...this.state[selected],
        [column]:currentList[column][value].value,
      }
      restores.map(one=>delete currentValues[one])
      const res=item.onColumnChange({currentValues,column,value,})
      if(res&&res.options){
        currentList[res.column]=res.options
        this.setState({
          [multiSelector]:currentList,
          [selected]:currentValues
        })
      }
    }
  }

  showValue=(defaultValue,item)=>item.showValue?
    item.showValue(this.state[item.name]):item.showDefaultValue?item.showDefaultValue(defaultValue):defaultValue

  render() {
    const {configs}=this.props
    return (
      <View className={styles.form}>
        {
          configs.map((item={},index)=>{
            const type=item.formType
            item.placeholder=item.placeholder||'请输入'
            const currentSelect=this.state[item.name]
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
                        onChange:(e)=>this.onChange(e.detail.value.map((one,ins)=>_.get(this.state[multiSelector],`${ins}.${one}.value`)),item),
                        onColumnChange:(e)=>this.onColumnChange(e.detail,item)
                      }:{}}
                      {...item.mode==='region'?{
                        value:[],
                        rangeKey:undefined
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
                            item.mode==='selector'&&this.showValue(_.get(item,`range.${currentSelect}.label`),item)
                          }
                          {
                            item.mode==='date'&&this.showValue(currentSelect,item)
                          }
                          {
                            (item.mode==='multiSelector'||item.mode==='region')&&this.showValue(currentSelect&&currentSelect.join&&currentSelect.join('-'),item)
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
