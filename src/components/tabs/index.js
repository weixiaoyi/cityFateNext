// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'

class Tabs extends Component {
  state={
    current:0
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }
  render() {
    const {tabList,scroll}=this.props
    const {current}=this.state
    return (
      <AtTabs scroll={scroll} tabList={tabList} current={current} onClick={this.handleClick.bind(this)}>
        {
          tabList.map((item,index)=>(
            <AtTabsPane  current={current} index={index} key={item.title} >
              {item.component}
            </AtTabsPane>
          ))
        }
      </AtTabs>
    )
  }
}

export default Tabs
