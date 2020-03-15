import Taro from '@tarojs/taro'
import _ from './lodash'
import {Pages} from '../constants'

export {default as Inject} from './hoc/inject'
export {default as doLogin} from './hoc/doLogin'

export const resOk = res => _.get(res, 'result.data') || _.get(res, 'data');

export const routerGo=(pageName,params)=>{
  const url=Pages[pageName].absoluteUrl
  const type=Pages[pageName].type
  let go=Taro.navigateTo
  return ()=>{
    if(type==='tab'){
      go=Taro.switchTab
    }
    go({url})
  }
}
