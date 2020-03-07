import React ,{Component} from "react";
import Taro from '@tarojs/taro'

const doLogin =(WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin:false,
        loginFail:true,
      };
    }


    componentDidMount() {
      this.checkSession()
    }

    checkSession=async ()=>{

      await Taro.checkSession().catch(this.login)
      this.confirmIsLogin()
    }

    login= async ()=>{
      const res=await Taro.login()
      if (res.code) {
        this.confirmIsLogin()
      } else {
        this.setState({
          loginFail:res?res.errMsg:'未知原因'
        })
      }
    }

    confirmIsLogin=()=>{
      this.setState({
        isLogin:true
      })
    }

    render(){
      const { isLogin, loginFail }=this.state
      return (
        <>
          <WrappedComponent {...this.props} />
        </>
      )
    }
  }
}

export default doLogin
