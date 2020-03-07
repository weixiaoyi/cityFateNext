import { observable } from 'mobx';
import Extend from './storeExtend';

class GlobalStore extends Extend {
  constructor(props) {
    super(props);
  }

  @observable userInfo = {};

  updateUserInfo = ({ userInfo }) => {
    this.changeModel('userInfo', userInfo);
  };
}

export default GlobalStore;
