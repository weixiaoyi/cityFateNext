import classnames from 'classnames';
import dayjs from 'dayjs';
import * as React from 'nervjs';
import _isFunction from 'lodash/isFunction';
import { View } from '@tarojs/components';
import AtCalendarBody from './body/index';
import AtCalendarController from './controller/index';
const defaultProps = {
    validDates: [],
    marks: [],
    isSwiper: true,
    hideArrow: false,
    isVertical: false,
    selectedDates: [],
    isMultiSelect: false,
    format: 'YYYY-MM-DD',
    currentDate: Date.now(),
    monthFormat: 'YYYY年MM月'
};
export default class AtCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.getSingleSelectdState = (value) => {
            const { generateDate } = this.state;
            const stateValue = {
                selectedDate: this.getSelectedDate(value.valueOf())
            };
            const dayjsGenerateDate = value.startOf('month');
            const generateDateValue = dayjsGenerateDate.valueOf();
            if (generateDateValue !== generateDate) {
                this.triggerChangeDate(dayjsGenerateDate);
                stateValue.generateDate = generateDateValue;
            }
            return stateValue;
        };
        this.getMultiSelectedState = (value) => {
            const { selectedDate } = this.state;
            const { end, start } = selectedDate;
            const valueUnix = value.valueOf();
            const state = {
                selectedDate
            };
            if (end) {
                state.selectedDate = this.getSelectedDate(valueUnix, 0);
            }
            else {
                state.selectedDate.end = Math.max(valueUnix, +start);
                state.selectedDate.start = Math.min(valueUnix, +start);
            }
            return state;
        };
        this.triggerChangeDate = (value) => {
            const { format } = this.props;
            if (!_isFunction(this.props.onMonthChange))
                return;
            this.props.onMonthChange(value.format(format));
        };
        this.setMonth = (vectorCount) => {
            const { format } = this.props;
            const { generateDate } = this.state;
            const _generateDate = dayjs(generateDate).add(vectorCount, 'month');
            this.setState({
                generateDate: _generateDate.valueOf()
            });
            if (vectorCount && _isFunction(this.props.onMonthChange)) {
                this.props.onMonthChange(_generateDate.format(format));
            }
        };
        this.handleClickPreMonth = (isMinMonth) => {
            if (isMinMonth === true) {
                return;
            }
            this.setMonth(-1);
            if (_isFunction(this.props.onClickPreMonth)) {
                this.props.onClickPreMonth();
            }
        };
        this.handleClickNextMonth = (isMaxMonth) => {
            if (isMaxMonth === true) {
                return;
            }
            this.setMonth(1);
            if (_isFunction(this.props.onClickNextMonth)) {
                this.props.onClickNextMonth();
            }
        };
        // picker 选择时间改变时触发
        this.handleSelectDate = (e) => {
            const { value } = e.detail;
            const _generateDate = dayjs(value);
            const _generateDateValue = _generateDate.valueOf();
            if (this.state.generateDate === _generateDateValue)
                return;
            this.triggerChangeDate(_generateDate);
            this.setState({
                generateDate: _generateDateValue
            });
        };
        this.handleDayClick = (item) => {
            const { isMultiSelect } = this.props;
            const { isDisabled, value } = item;
            if (isDisabled)
                return;
            const dayjsDate = dayjs(value);
            let stateValue = {};
            if (isMultiSelect) {
                stateValue = this.getMultiSelectedState(dayjsDate);
            }
            else {
                stateValue = this.getSingleSelectdState(dayjsDate);
            }
            this.setState(stateValue, () => {
                this.handleSelectedDate();
            });
            if (_isFunction(this.props.onDayClick)) {
                this.props.onDayClick({ value: item.value });
            }
        };
        this.handleDayLongClick = (item) => {
            if (_isFunction(this.props.onDayLongClick)) {
                this.props.onDayLongClick({ value: item.value });
            }
        };
        const { currentDate, isMultiSelect } = props;
        this.state = this.getInitializeState(currentDate, isMultiSelect);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.receiveProps(nextProps);
    }
    componentWillReceiveProps(nextProps) {
        this.receiveProps(nextProps);
    }
    receiveProps(nextProps) {
        const { currentDate, isMultiSelect } = nextProps;
        if (!currentDate || currentDate === this.props.currentDate)
            return;
        if (isMultiSelect && this.props.isMultiSelect) {
            const { start, end } = currentDate;
            const { start: preStart, end: preEnd } = this.props
                .currentDate;
            if (start === preStart && preEnd === end) {
                return;
            }
        }
        const stateValue = this.getInitializeState(currentDate, isMultiSelect);
        this.setState(stateValue);
    }
    getSelectedDate(start, end) {
        const stateValue = {
            start,
            end: start
        };
        if (typeof end !== 'undefined') {
            stateValue.end = end;
        }
        return stateValue;
    }
    getInitializeState(currentDate, isMultiSelect) {
        let end;
        let start;
        let generateDateValue;
        if (!currentDate) {
            const dayjsStart = dayjs();
            start = dayjsStart.startOf('day').valueOf();
            generateDateValue = dayjsStart.startOf('month').valueOf();
            return {
                generateDate: generateDateValue,
                selectedDate: {
                    start: ''
                }
            };
        }
        if (isMultiSelect) {
            const { start: cStart, end: cEnd } = currentDate;
            const dayjsStart = dayjs(cStart);
            start = dayjsStart.startOf('day').valueOf();
            generateDateValue = dayjsStart.startOf('month').valueOf();
            end = cEnd
                ? dayjs(cEnd)
                    .startOf('day')
                    .valueOf()
                : start;
        }
        else {
            const dayjsStart = dayjs(currentDate);
            start = dayjsStart.startOf('day').valueOf();
            generateDateValue = dayjsStart.startOf('month').valueOf();
            end = start;
        }
        return {
            generateDate: generateDateValue,
            selectedDate: this.getSelectedDate(start, end)
        };
    }
    handleSelectedDate() {
        const selectDate = this.state.selectedDate;
        if (_isFunction(this.props.onSelectDate)) {
            const info = {
                start: dayjs(selectDate.start).format(this.props.format)
            };
            if (selectDate.end) {
                info.end = dayjs(selectDate.end).format(this.props.format);
            }
            this.props.onSelectDate({
                value: info
            });
        }
    }
    render() {
        const { generateDate, selectedDate } = this.state;
        const { validDates, marks, format, minDate, maxDate, isSwiper, className, hideArrow, isVertical, monthFormat, selectedDates } = this.props;
        return (<View className={classnames('at-calendar', className)}>
        <AtCalendarController minDate={minDate} maxDate={maxDate} hideArrow={hideArrow} monthFormat={monthFormat} generateDate={generateDate} onPreMonth={this.handleClickPreMonth} onNextMonth={this.handleClickNextMonth} onSelectDate={this.handleSelectDate}/>
        <AtCalendarBody validDates={validDates} marks={marks} format={format} minDate={minDate} s maxDate={maxDate} isSwiper={isSwiper} isVertical={isVertical} selectedDate={selectedDate} selectedDates={selectedDates} generateDate={generateDate} onDayClick={this.handleDayClick} onSwipeMonth={this.setMonth} onLongClick={this.handleDayLongClick}/>
      </View>);
    }
}
AtCalendar.options = { addGlobalClass: true };
AtCalendar.defaultProps = defaultProps;
//# sourceMappingURL=index.jsx.map