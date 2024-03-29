import dayjs from 'dayjs';
import classnames from 'classnames';
import * as React from 'nervjs';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import AtCalendarDayList from '../ui/day-list/index';
import AtCalendarDateList from '../ui/date-list/index';
import generateCalendarGroup from '../common/helper';
import { delayQuerySelector } from '../../../common/utils';
const ANIMTE_DURATION = 300;
const defaultProps = {
    marks: [],
    selectedDate: {
        end: Date.now(),
        start: Date.now()
    },
    format: 'YYYY-MM-DD',
    generateDate: Date.now()
};
export default class AtCalendarBody extends React.Component {
    constructor(props) {
        super(props);
        this.changeCount = 0;
        this.currentSwiperIndex = 1;
        this.startX = 0;
        this.swipeStartPoint = 0;
        this.isPreMonth = false;
        this.maxWidth = 0;
        this.isTouching = false;
        this.getGroups = (generateDate, selectedDate) => {
            const dayjsDate = dayjs(generateDate);
            const arr = [];
            const preList = this.generateFunc(dayjsDate.subtract(1, 'month').valueOf(), selectedDate);
            const nowList = this.generateFunc(generateDate, selectedDate, true);
            const nextList = this.generateFunc(dayjsDate.add(1, 'month').valueOf(), selectedDate);
            const preListIndex = this.currentSwiperIndex === 0 ? 2 : this.currentSwiperIndex - 1;
            const nextListIndex = this.currentSwiperIndex === 2 ? 0 : this.currentSwiperIndex + 1;
            arr[preListIndex] = preList;
            arr[nextListIndex] = nextList;
            arr[this.currentSwiperIndex] = nowList;
            return arr;
        };
        this.handleTouchStart = (e) => {
            if (!this.props.isSwiper) {
                return;
            }
            this.isTouching = true;
            this.startX = e.touches[0].clientX;
        };
        this.handleTouchMove = (e) => {
            if (!this.props.isSwiper) {
                return;
            }
            if (!this.isTouching)
                return;
            const { clientX } = e.touches[0];
            const offsetSize = clientX - this.startX;
            this.setState({
                offsetSize
            });
        };
        this.handleTouchEnd = () => {
            if (!this.props.isSwiper) {
                return;
            }
            const { offsetSize } = this.state;
            this.isTouching = false;
            const isRight = offsetSize > 0;
            const breakpoint = this.maxWidth / 2;
            const absOffsetSize = Math.abs(offsetSize);
            if (absOffsetSize > breakpoint) {
                const res = isRight ? this.maxWidth : -this.maxWidth;
                return this.animateMoveSlide(res, () => {
                    this.props.onSwipeMonth(isRight ? -1 : 1);
                });
            }
            this.animateMoveSlide(0);
        };
        this.handleChange = (e) => {
            const { current, source } = e.detail;
            if (source === 'touch') {
                this.currentSwiperIndex = current;
                this.changeCount = this.changeCount + 1;
            }
        };
        this.handleAnimateFinish = () => {
            if (this.changeCount > 0) {
                this.props.onSwipeMonth(this.isPreMonth ? -this.changeCount : this.changeCount);
                this.changeCount = 0;
            }
        };
        this.handleSwipeTouchStart = (e) => {
            const { clientY, clientX } = e.changedTouches[0];
            this.swipeStartPoint = this.props.isVertical ? clientY : clientX;
        };
        const { validDates, marks, format, minDate, maxDate, generateDate, selectedDate, selectedDates } = props;
        this.generateFunc = generateCalendarGroup({
            validDates,
            format,
            minDate,
            maxDate,
            marks,
            selectedDates
        });
        const listGroup = this.getGroups(generateDate, selectedDate);
        this.state = {
            listGroup,
            offsetSize: 0,
            isAnimate: false
        };
    }
    componentWillReceiveProps(nextProps) {
        this.receiveProps(nextProps);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.receiveProps(nextProps);
    }
    receiveProps(nextProps) {
        const { validDates, marks, format, minDate, maxDate, generateDate, selectedDate, selectedDates } = nextProps;
        this.generateFunc = generateCalendarGroup({
            validDates,
            format,
            minDate,
            maxDate,
            marks,
            selectedDates
        });
        const listGroup = this.getGroups(generateDate, selectedDate);
        this.setState({
            offsetSize: 0,
            listGroup
        });
    }
    componentDidMount() {
        delayQuerySelector(this, '.at-calendar-slider__main').then(res => {
            this.maxWidth = res[0].width;
        });
    }
    animateMoveSlide(offset, callback) {
        this.setState({
            isAnimate: true
        }, () => {
            this.setState({
                offsetSize: offset
            });
            setTimeout(() => {
                this.setState({
                    isAnimate: false
                }, () => {
                    callback && callback();
                });
            }, ANIMTE_DURATION);
        });
    }
    handleSwipeTouchEnd(e) {
        const { clientY, clientX } = e.changedTouches[0];
        this.isPreMonth = this.props.isVertical
            ? clientY - this.swipeStartPoint > 0
            : clientX - this.swipeStartPoint > 0;
    }
    render() {
        const { isSwiper } = this.props;
        const { isAnimate, offsetSize, listGroup } = this.state;
        if (!isSwiper) {
            return (<View className={classnames('main', 'at-calendar-slider__main', `at-calendar-slider__main--${process.env.TARO_ENV}`)}>
          <AtCalendarDayList />
          <View className='main__body body'>
            <View className='body__slider body__slider--now'>
              <AtCalendarDateList list={listGroup[1].list} onClick={this.props.onDayClick} onLongClick={this.props.onLongClick}/>
            </View>
          </View>
        </View>);
        }
        /* 需要 Taro 组件库维护 Swiper 使 小程序 和 H5 的表现保持一致  */
        if (process.env.TARO_ENV === 'h5') {
            return (<View className={classnames('main', 'at-calendar-slider__main', `at-calendar-slider__main--${process.env.TARO_ENV}`)} onTouchEnd={this.handleTouchEnd} onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart}>
          <AtCalendarDayList />
          <View className={classnames('main__body  body', {
                'main__body--slider': isSwiper,
                'main__body--animate': isAnimate
            })} style={{
                transform: isSwiper
                    ? `translateX(-100%) translate3d(${offsetSize},0,0)`
                    : '',
                WebkitTransform: isSwiper
                    ? `translateX(-100%) translate3d(${offsetSize}px,0,0)`
                    : ''
            }}>
            <View className='body__slider body__slider--pre'>
              <AtCalendarDateList list={listGroup[0].list}/>
            </View>
            <View className='body__slider body__slider--now'>
              <AtCalendarDateList list={listGroup[1].list} onClick={this.props.onDayClick} onLongClick={this.props.onLongClick}/>
            </View>
            <View className='body__slider body__slider--next'>
              <AtCalendarDateList list={listGroup[2].list}/>
            </View>
          </View>
        </View>);
        }
        return (<View className={classnames('main', 'at-calendar-slider__main', `at-calendar-slider__main--${process.env.TARO_ENV}`)}>
        <AtCalendarDayList />
        <Swiper circular current={1} skipHiddenItemLayout className={classnames('main__body')} onChange={this.handleChange} vertical={this.props.isVertical} onAnimationFinish={this.handleAnimateFinish} onTouchEnd={this.handleSwipeTouchEnd} onTouchStart={this.handleSwipeTouchStart}>
          {listGroup.map((item, key) => (<SwiperItem key={item.value} itemId={key.toString()}>
              <AtCalendarDateList list={item.list} onClick={this.props.onDayClick} onLongClick={this.props.onLongClick}/>
            </SwiperItem>))}
        </Swiper>
      </View>);
    }
}
AtCalendarBody.options = { addGlobalClass: true };
AtCalendarBody.defaultProps = defaultProps;
//# sourceMappingURL=index.jsx.map