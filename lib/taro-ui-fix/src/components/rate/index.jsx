import Taro from '@tarojs/taro';
import * as React from 'nervjs';
import { View, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AtComponent from '../../common/component';
import { initTestEnv } from '../../common/utils';
initTestEnv();
export default class AtRate extends AtComponent {
    handleClick(event) {
        this.props.onChange && this.props.onChange(event);
    }
    render() {
        const { customStyle, className, value, max, size, margin } = this.props;
        const iconStyle = {
            marginRight: Taro.pxTransform(margin)
        };
        const starIconStyle = {
            fontSize: size ? `${size}px` : '',
        };
        // 生成星星颜色 className 数组，方便在jsx中直接map
        const classNameArr = [];
        const floorValue = Math.floor(value);
        const ceilValue = Math.ceil(value);
        for (let i = 0; i < max; i++) {
            if (floorValue > i) {
                classNameArr.push('at-rate__icon at-rate__icon--on');
            }
            else if (ceilValue - 1 === i) {
                classNameArr.push('at-rate__icon at-rate__icon--half');
            }
            else {
                classNameArr.push('at-rate__icon at-rate__icon--off');
            }
        }
        return (<View className={classNames('at-rate', className)} style={customStyle}>
        {classNameArr.map((cls, i) => (<View className={cls} key={`at-rate-star-${i}`} style={iconStyle} onClick={this.handleClick.bind(this, i + 1)}>
              <Text className='at-icon at-icon-star-2' style={starIconStyle}></Text>
              <View className='at-rate__left'>
                <Text className='at-icon at-icon-star-2' style={starIconStyle}></Text>
              </View>
            </View>))}
      </View>);
    }
}
AtRate.defaultProps = {
    customStyle: '',
    className: '',
    size: 0,
    value: 0,
    max: 5,
    margin: 5,
    onChange: () => { },
};
AtRate.propTypes = {
    customStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string
    ]),
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    value: PropTypes.number,
    max: PropTypes.number,
    margin: PropTypes.number,
    onChange: PropTypes.func,
};
//# sourceMappingURL=index.jsx.map