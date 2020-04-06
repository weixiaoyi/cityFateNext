// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import {AtInput,AtTextarea,AtButton} from 'taro-ui'
import {View,Text,Picker} from "@tarojs/components";
import {_} from '../../utils'
import styles from './index.module.scss'

const MultiSelectorOptions='multiSelectorOptions'

class Form extends Component {
  constructor(props){
    super(props)
    this.configs=this.getConfigs()
    this.state={}
  }

  getConfigs=()=>{
    const {configs}=this.props
    return configs.map(item=>{
      let result=item
      if(typeof item==='function'){
        result=item()
      }
      if(typeof result.range==='function'){
        result.range=result.range()
      }
      return result
    })
  }

  componentDidMount() {
    const configs=this.configs
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
      const res=item.onColumnChange({currentValues,column,value})
      if(res&&res.options){
        currentList[res.column]=res.options
        this.setState({
          [multiSelector]:currentList,
          [selected]:{
            ...currentValues,
            [res.column]:res.options[0].value
          },
        })
      }
    }
  }

  showValue=(defaultValue,item)=>item.showValue?
    item.showValue(this.state[item.name]):item.showDefaultValue?item.showDefaultValue(defaultValue):defaultValue

  onSubmit=()=>{
    const {onSubmit}=this.props
    console.log(this.state,'----state')
    console.log(this.configs,'---configs')
  }

  render() {
    const configs=this.configs

    return (
      <View className={styles.form}>
        {
          configs.map((item={},index)=>{
            let Ele=''
            const type=item.formType
            item.placeholder=item.placeholder||'请输入'
            const currentSelect=this.state[item.name]
            const label=(
              <View className={styles.label}>
                {
                  item.required &&<Text className={styles.required}>*</Text>
                }
                {
                  item.title &&<Text className={styles.title}>{item.title}</Text>
                }
              </View>
            )

            switch (type){
              case 'groupLabel':{
                Ele= <View {...item} className={styles.groupLabel}>{item.title}</View>
                break;
              }
              case 'input':{
                Ele=(
                  <AtInput {...item} onChange={(value)=>this.onChange(value,item)} />
                )
                break;
              }
              case 'textarea':{
                Ele=(
                  <View className={styles.textarea}>
                    {label}
                    <AtTextarea {...item} onChange={(e)=>this.onChange(e.detail.value,item)}  />
                  </View>
                )
                break;
              }
              case 'select':{
                const multiSelector=`${MultiSelectorOptions}_${item.name}`
                Ele=(
                  <View className={styles.picker}>
                    <Picker
                      rangeKey='label'
                      {...item}
                      onChange={(e)=>this.onChange(e.detail.value,item)}
                      {...item.mode==='multiSelector'?{
                        value:[],
                        range:this.state[multiSelector],
                        onChange:(e)=>{
                          this.onChange(e.detail.value.map((one,ins)=>_.get(this.state[multiSelector],`${ins}.${one}.value`)),item)
                        },
                        onColumnChange:(e)=>this.onColumnChange(e.detail,item)
                      }:{}}
                      {...item.mode==='region'?{
                        value:[],
                        rangeKey:undefined
                      }:{}}
                    >
                      <view className={styles.select}>
                        {label}
                        <View className={`${styles.selectValue} pickerSelectValue`}>
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
                break;
              }
            }
            return <View key={index}  className={`${item.showRequiredDistance?styles.showRequiredDistance:null}`}>{Ele}</View>
          })
        }
        {this.props.onSubmit&&<AtButton onClick={this.onSubmit} type='primary' className={styles.submit}>保存</AtButton>}
      </View>
    )
  }
}

export default Form
