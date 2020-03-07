import _ from 'lodash'

export {default as Inject} from './hoc/inject'
export {default as doLogin} from './hoc/doLogin'

export const resOk = res => _.get(res, 'result.data') || _.get(res, 'data');

