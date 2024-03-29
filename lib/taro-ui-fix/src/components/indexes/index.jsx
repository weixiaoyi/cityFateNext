import classNames from 'classnames';
import _findIndex from 'lodash/findIndex';
import * as React from 'nervjs';
import PropTypes from 'prop-types';
import { ScrollView, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import AtComponent from '../../common/component';
import { delayQuerySelector, initTestEnv, isTest, uuid } from '../../common/utils';
import AtList from '../list/index';
import AtListItem from '../list/item/index';
import AtToast from '../toast/index';
initTestEnv();
const ENV = Taro.getEnv();
export default class AtIndexes extends AtComponent {
    constructor(props) {
        super(props);
        this.handleClick = (item) => {
            this.props.onClick && this.props.onClick(item);
        };
        this.handleTouchMove = (event) => {
            event.stopPropagation();
            event.preventDefault();
            const { list } = this.props;
            const pageY = event.touches[0].pageY;
            const index = Math.floor((pageY - this.startTop) / this.itemHeight);
            if (index >= 0 && index <= list.length && this.currentIndex !== index) {
                this.currentIndex = index;
                const key = index > 0 ? list[index - 1].key : 'top';
                const touchView = `at-indexes__list-${key}`;
                this.jumpTarget(touchView, index);
            }
        };
        this.handleTouchEnd = () => {
            this.currentIndex = -1;
        };
        this.state = {
            _scrollIntoView: '',
            _scrollTop: 0,
            _tipText: '',
            _isShowToast: false,
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
        };
        // 右侧导航高度
        this.menuHeight = 0;
        // 右侧导航距离顶部高度
        this.startTop = 0;
        // 右侧导航元素高度
        this.itemHeight = 0;
        // 当前索引
        this.currentIndex = -1;
        this.listId = isTest() ? 'indexes-list-AOTU2018' : `list-${uuid()}`;
        this.timeoutTimer = undefined;
    }
    jumpTarget(_scrollIntoView, idx) {
        const { topKey, list } = this.props;
        const _tipText = idx === 0 ? topKey : list[idx - 1].key;
        if (ENV === Taro.ENV_TYPE.WEB) {
            delayQuerySelector(this, '.at-indexes', 0).then(rect => {
                const targetOffsetTop = this.listRef.childNodes[idx].offsetTop;
                const _scrollTop = targetOffsetTop - rect[0].top;
                this.updateState({
                    _scrollTop,
                    _scrollIntoView,
                    _tipText
                });
            });
            return;
        }
        this.updateState({
            _scrollIntoView,
            _tipText
        });
    }
    __jumpTarget(key) {
        const { list } = this.props;
        const index = _findIndex(list, ['key', key]);
        const targetView = `at-indexes__list-${key}`;
        this.jumpTarget(targetView, index + 1);
    }
    updateState(state) {
        const { isShowToast, isVibrate } = this.props;
        const { _scrollIntoView, _tipText, _scrollTop } = state;
        // TODO: Fix dirty hack
        this.setState({
            _scrollIntoView: _scrollIntoView,
            _tipText: _tipText,
            _scrollTop: _scrollTop,
            _isShowToast: isShowToast
        }, () => {
            clearTimeout(this.timeoutTimer);
            this.timeoutTimer = setTimeout(() => {
                this.setState({
                    _tipText: '',
                    _isShowToast: false
                });
            }, 3000);
        });
        if (isVibrate) {
            Taro.vibrateShort();
        }
    }
    initData() {
        delayQuerySelector(this, '.at-indexes__menu').then(rect => {
            const len = this.props.list.length;
            this.menuHeight = rect[0].height;
            this.startTop = rect[0].top;
            this.itemHeight = Math.floor(this.menuHeight / (len + 1));
        });
    }
    handleScroll(e) {
        if (e && e.detail) {
            this.setState({
                _scrollTop: e.detail.scrollTop
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.list.length !== this.props.list.length) {
            this.initData();
        }
    }
    componentDidMount() {
        if (ENV === Taro.ENV_TYPE.WEB) {
            this.listRef = document.getElementById(this.listId);
        }
        this.initData();
    }
    componentWillMount() {
        this.props.onScrollIntoView &&
            this.props.onScrollIntoView(this.__jumpTarget.bind(this));
    }
    render() {
        const { className, customStyle, animation, topKey, list } = this.props;
        const { _scrollTop, _scrollIntoView, _tipText, _isShowToast, isWEB } = this.state;
        const toastStyle = { minWidth: Taro.pxTransform(100) };
        const rootCls = classNames('at-indexes', className);
        const menuList = list.map((dataList, i) => {
            const { key } = dataList;
            const targetView = `at-indexes__list-${key}`;
            return (<View className='at-indexes__menu-item' key={key} onClick={this.jumpTarget.bind(this, targetView, i + 1)}>
          {key}
        </View>);
        });
        const indexesList = list.map(dataList => (<View id={`at-indexes__list-${dataList.key}`} className='at-indexes__list' key={dataList.key}>
        <View className='at-indexes__list-title'>{dataList.title}</View>
        <AtList>
          {dataList.items &&
            dataList.items.map(item => (<AtListItem key={item.name} title={item.name} onClick={this.handleClick.bind(this, item)}/>))}
        </AtList>
      </View>));
        return (<View className={rootCls} style={customStyle}>
        <AtToast customStyle={toastStyle} isOpened={_isShowToast} text={_tipText} duration={2000}/>
        <View className='at-indexes__menu' onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
          <View className='at-indexes__menu-item' onClick={this.jumpTarget.bind(this, 'at-indexes__top', 0)}>
            {topKey}
          </View>
          {menuList}
        </View>
        <ScrollView className='at-indexes__body' id={this.listId} scrollY scrollWithAnimation={animation} scrollTop={isWEB ? _scrollTop : undefined} scrollIntoView={!isWEB ? _scrollIntoView : ''} onScroll={this.handleScroll.bind(this)}>
          <View className='at-indexes__content' id='at-indexes__top'>
            {this.props.children}
          </View>
          {indexesList}
        </ScrollView>
      </View>);
    }
}
AtIndexes.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    animation: PropTypes.bool,
    isVibrate: PropTypes.bool,
    isShowToast: PropTypes.bool,
    topKey: PropTypes.string,
    list: PropTypes.array,
    onClick: PropTypes.func,
    onScrollIntoView: PropTypes.func
};
AtIndexes.defaultProps = {
    customStyle: '',
    className: '',
    animation: false,
    topKey: 'Top',
    isVibrate: true,
    isShowToast: true,
    list: [],
    onClick: () => { },
    onScrollIntoView: () => { }
};
//# sourceMappingURL=index.jsx.map