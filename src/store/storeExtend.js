import { observable,  action, } from 'mobx';
import _ from "lodash";

class StoreExtend {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable loading = {};

  @action
  commit = (k, v, defaultValue = "") => {
    const change = (k1, v1, defaultValue1) => {
      if (k1) {
        _.set(this, `${k1}`, _.isUndefined(v1) ? v1 || defaultValue1 : v1);
      } else {
        console.error("commit参数的k是必须参数");
      }
    };
    if (_.isObject(k)) {
      for (let i in k) {
        if (k.hasOwnProperty(i)) {
          change(i, k[i], defaultValue);
        }
      }
    } else {
      change(k, v, defaultValue);
    }
  };

  dispatch = (payloads = {}) => {
    const setLoading = (storeName, methodName, status) => {
      if (storeName) {
        this.commit(`rootStore.${storeName}.loading.${methodName}`, status);
      } else {
        this.commit(`loading.${methodName}`, status);
      }
    };
    const checkExistMethod = (storeName, methodName) => {
      console.error(
        `dispatch参数的type是必须参数,并且必须存在${
          storeName ? `${storeName}/${methodName}` : methodName
        }这个方法`
      );
      return Promise.reject(
        new Error("dispatch参数的type是必须参数,并且必须存在这个方法")
      );
    };
    const { type, payload = {} } = payloads;
    const splits = type.split("/");
    let [storeName, methodName] = [];
    let result;
    if (splits[1]) {
      [storeName, methodName] = splits;
      if (
        !this.rootStore[storeName] ||
        !this.rootStore[storeName][methodName]
      ) {
        checkExistMethod(storeName, methodName);
      } else {
        result = this.rootStore[storeName][methodName](payload);
      }
    } else {
      [methodName] = splits;
      storeName = undefined;
      if (!methodName || !this[methodName]) {
        checkExistMethod(storeName, methodName);
      } else {
        result = this[methodName](payload);
      }
    }

    setLoading(storeName, methodName, true);

    if (result && result.then) {
      return result
        .then(res => {
          setLoading(storeName, methodName, false);
          return res;
        })
        .catch(err => {
          setLoading(storeName, methodName, false);
          return Promise.reject(err);
        });
    } else {
      setLoading(storeName, methodName, false);
      return Promise.resolve(result);
    }
  };

  // getUserInfo = () => this.globalStore.userInfo;
}

export default StoreExtend;
