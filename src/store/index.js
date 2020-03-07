import CounterStore from './counter';
import HomeStore from './home';
import GlobalStore from './global';

class Store {
  constructor() {
    this.globalStore = new GlobalStore(this);
    this.homeStore=new HomeStore(this)
    this.counterStore = new CounterStore(this);
  }
}


export default new Store();
