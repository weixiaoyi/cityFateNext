/* eslint-disable react/jsx-no-duplicate-props */
import Taro from '@tarojs/taro';
import * as React from 'nervjs';
import { View, Textarea } from '@tarojs/components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AtComponent from '../../common/component';
import { initTestEnv } from '../../common/utils';
function getMaxLength(maxLength, textOverflowForbidden) {
    if (!textOverflowForbidden) {
        return maxLength + 500;
    }
    return maxLength;
}
const ENV = Taro.getEnv();
initTestEnv();
export default class AtTextarea extends AtComponent {
    constructor() {
        super(...arguments);
        this.handleInput = (event) => {
            this.props.onChange(event);
        };
        this.handleFocus = (event) => {
            this.props.onFocus && this.props.onFocus(event);
        };
        this.handleBlur = (event) => {
            this.props.onBlur && this.props.onBlur(event);
        };
        this.handleConfirm = (event) => {
            this.props.onConfirm && this.props.onConfirm(event);
        };
        this.handleLinechange = (event) => {
            this.props.onLinechange && this.props.onLinechange(event);
        };
    }
    render() {
        const { customStyle, className, value, cursorSpacing, placeholder, placeholderStyle, placeholderClass, maxLength, count, disabled, autoFocus, focus, showConfirmBar, selectionStart, selectionEnd, fixed, textOverflowForbidden, height } = this.props;
        const _maxLength = parseInt(maxLength.toString());
        const actualMaxLength = getMaxLength(_maxLength, textOverflowForbidden);
        const textareaStyle = height ? `height:${Taro.pxTransform(Number(height))}` : '';
        const rootCls = classNames('at-textarea', `at-textarea--${ENV}`, {
            'at-textarea--error': _maxLength < value.length
        }, className);
        const placeholderCls = classNames('placeholder', placeholderClass);
        return (<View className={rootCls} style={customStyle}>
        <Textarea className='at-textarea__textarea' style={textareaStyle} placeholderStyle={placeholderStyle} placeholderClass={placeholderCls} cursorSpacing={cursorSpacing} value={value} maxlength={actualMaxLength} placeholder={placeholder} disabled={disabled} autoFocus={autoFocus} focus={focus} showConfirmBar={showConfirmBar} selectionStart={selectionStart} selectionEnd={selectionEnd} fixed={fixed} onInput={this.handleInput} onFocus={this.handleFocus} onBlur={this.handleBlur} onConfirm={this.handleConfirm} onLineChange={this.handleLinechange}/>
        {count && (<View className='at-textarea__counter'>
            {value.length}/{_maxLength}
          </View>)}
      </View>);
    }
}
AtTextarea.defaultProps = {
    customStyle: '',
    className: '',
    value: '',
    cursorSpacing: 100,
    maxLength: 200,
    placeholder: '',
    disabled: false,
    autoFocus: false,
    focus: false,
    showConfirmBar: false,
    selectionStart: -1,
    selectionEnd: -1,
    count: true,
    fixed: false,
    height: '',
    textOverflowForbidden: true,
    onLinechange: () => { },
    onChange: () => { },
    onFocus: () => { },
    onBlur: () => { },
    onConfirm: () => { },
};
AtTextarea.propTypes = {
    customStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string
    ]),
    value: PropTypes.string.isRequired,
    cursorSpacing: PropTypes.number,
    maxLength: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholderClass: PropTypes.string,
    placeholderStyle: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    focus: PropTypes.bool,
    showConfirmBar: PropTypes.bool,
    selectionStart: PropTypes.number,
    selectionEnd: PropTypes.number,
    count: PropTypes.bool,
    textOverflowForbidden: PropTypes.bool,
    fixed: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onLinechange: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onConfirm: PropTypes.func,
};
//# sourceMappingURL=index.jsx.map