// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { AtTabs,} from 'taro-ui'

class Tabs extends Component {
  state={
    current:0
  }

  handleClick (value) {
    this.setState({
      current: value
    })
    this.props.onChange&&this.props.onChange(value)
  }
  render() {
    const {tabList,scroll,}=this.props
    const {current}=this.state
    return (
      <AtTabs scroll={scroll} tabList={tabList} current={current} onClick={this.handleClick.bind(this)} />
    )
  }
}

export default Tabs
