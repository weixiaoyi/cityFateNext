import classNames from 'classnames';
import * as React from 'nervjs';
import PropTypes from 'prop-types';
import { Button, Form, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import AtComponent from '../../common/component';
import AtLoading from '../loading/index';
const SIZE_CLASS = {
    normal: 'normal',
    small: 'small'
};
const TYPE_CLASS = {
    primary: 'primary',
    secondary: 'secondary'
};
export default class AtButton extends AtComponent {
    constructor(props) {
        super(props);
        this.state = {
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
            isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
            isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
        };
    }
    onClick(event) {
        if (!this.props.disabled) {
            this.props.onClick && this.props.onClick(event);
        }
    }
    onGetUserInfo(event) {
        this.props.onGetUserInfo && this.props.onGetUserInfo(event);
    }
    onContact(event) {
        // TODO: Change Taro button component types
        this.props.onContact && this.props.onContact(event);
    }
    onGetPhoneNumber(event) {
        this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(event);
    }
    onError(event) {
        this.props.onError && this.props.onError(event);
    }
    onOpenSetting(event) {
        this.props.onOpenSetting && this.props.onOpenSetting(event);
    }
    onSumit(event) {
        if (this.state.isWEAPP || this.state.isWEB) {
            this.$scope.triggerEvent('submit', event.detail, {
                bubbles: true,
                composed: true
            });
        }
    }
    onReset(event) {
        if (this.state.isWEAPP || this.state.isWEB) {
            this.$scope.triggerEvent('reset', event.detail, {
                bubbles: true,
                composed: true
            });
        }
    }
    render() {
        const { size = 'normal', type = '', circle, full, loading, disabled, customStyle, formType, openType, lang, sessionFrom, sendMessageTitle, sendMessagePath, sendMessageImg, showMessageCard, appParameter } = this.props;
        const { isWEAPP, isALIPAY, isWEB } = this.state;
        const rootClassName = ['at-button'];
        const classObject = {
            [`at-button--${SIZE_CLASS[size]}`]: SIZE_CLASS[size],
            'at-button--disabled': disabled,
            [`at-button--${type}`]: TYPE_CLASS[type],
            'at-button--circle': circle,
            'at-button--full': full
        };
        const loadingColor = type === 'primary' ? '#fff' : '';
        const loadingSize = size === 'small' ? '30' : 0;
        let loadingComponent = null;
        if (loading) {
            loadingComponent = (<View className='at-button__icon'>
          <AtLoading color={loadingColor} size={loadingSize}/>
        </View>);
            rootClassName.push('at-button--icon');
        }
        const webButton = (<Button className='at-button__wxbutton' lang={lang} formType={formType === 'submit' || formType === 'reset' ? formType : undefined}></Button>);
        const button = (<Button className='at-button__wxbutton' formType={formType} openType={openType} lang={lang} sessionFrom={sessionFrom} sendMessageTitle={sendMessageTitle} sendMessagePath={sendMessagePath} sendMessageImg={sendMessageImg} showMessageCard={showMessageCard} appParameter={appParameter} onGetUserInfo={this.onGetUserInfo.bind(this)} onGetPhoneNumber={this.onGetPhoneNumber.bind(this)} onOpenSetting={this.onOpenSetting.bind(this)} onError={this.onError.bind(this)} onContact={this.onContact.bind(this)}></Button>);
        return (<View className={classNames(rootClassName, classObject, this.props.className)} style={customStyle} onClick={this.onClick.bind(this)}>
        {isWEB && !disabled && webButton}
        {isWEAPP && !disabled && (<Form reportSubmit onSubmit={this.onSumit.bind(this)} onReset={this.onReset.bind(this)}>
            {button}
          </Form>)}
        {isALIPAY && !disabled && button}
        {loadingComponent}
        <View className='at-button__text'>{this.props.children}</View>
      </View>);
    }
}
AtButton.defaultProps = {
    size: 'normal',
    type: undefined,
    circle: false,
    full: false,
    loading: false,
    disabled: false,
    customStyle: {},
    onClick: () => { },
    // Button props
    formType: undefined,
    openType: undefined,
    lang: 'en',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    appParameter: '',
    onGetUserInfo: () => { },
    onContact: () => { },
    onGetPhoneNumber: () => { },
    onError: () => { },
    onOpenSetting: () => { }
};
AtButton.propTypes = {
    size: PropTypes.oneOf(['normal', 'small']),
    type: PropTypes.oneOf(['primary', 'secondary', '']),
    circle: PropTypes.bool,
    full: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    formType: PropTypes.oneOf(['submit', 'reset', '']),
    openType: PropTypes.oneOf([
        'contact',
        'share',
        'getUserInfo',
        'getPhoneNumber',
        'launchApp',
        'openSetting',
        'feedback',
        'getRealnameAuthInfo',
        'getAuthorize',
        'contactShare',
        ''
    ]),
    lang: PropTypes.string,
    sessionFrom: PropTypes.string,
    sendMessageTitle: PropTypes.string,
    sendMessagePath: PropTypes.string,
    sendMessageImg: PropTypes.string,
    showMessageCard: PropTypes.bool,
    appParameter: PropTypes.string,
    onGetUserInfo: PropTypes.func,
    onContact: PropTypes.func,
    onGetPhoneNumber: PropTypes.func,
    onError: PropTypes.func,
    onOpenSetting: PropTypes.func
};
//# sourceMappingURL=index.jsx.map