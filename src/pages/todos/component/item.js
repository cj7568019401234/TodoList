import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Checkbox, Input, DatePicker, TimePicker} from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import { actions } from '../../../store/todos/index'
import Modal from '../../../components/modal/index'
import '../index.css';

const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';    //日期格式
const format = 'HH:mm'; //时间格式

/**
 * 单个任务组件
 */
class Item extends React.Component {
    state = {
        visible: false,
        text: this.props.text,
        endDate: this.props.endDate,
        endTime: this.props.endTime
    };

    /**
     * 展示对话框
     */
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    /**
     * 处理文本编辑内容发生变化
     *  @param {e} 发生点击事件的Event对象
     */
    handleInput = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    /**
    * 处理日期选择器的变化
    *  @param {value} Moment对象
    *  @param {dateString} 格式化后的被选择日期
    */
    handleDatePicker = (value, dateString) => {
        this.setState({ endDate: dateString })
    }

    /**
    * 处理时间选择器的变化
    *  @param {time} Moment对象
    *  @param {timeString} 格式化后的被选择时间
    */
    handleTimePicker = (time, timeString) => {
        this.setState({ endTime: timeString });
    };

    /**
     * 点击对话框的ok，提交修改
     */
    handleOk = e => {
        const { text, endDate, endTime } = this.state
        this.props.onModify(text, endDate, endTime);
        this.setState({
            visible: false,
        });
    };

    /**
     * 点击对话框的叉叉或者取消按钮，隐藏对话框
     */
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    closeIcon = (<span className='modal__close__x'></span>) //对话框的关闭按钮

    render() {
        const { id, text, endDate, endTime, isFinished, onToggle, onDelete } = this.props;
        const showDate = endDate ? moment(endDate, dateFormat) : '';
        const showTime = endTime ? moment(endTime, format) : '';
        return (
            <div className="item-container" key={id} >
                <Checkbox className="item__check" onChange={onToggle} checked={isFinished ? 'checked' : ''} />
                <FormOutlined className='item__edit' onClick={this.showModal} />
                <Modal
                    title="请编辑任务"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <TextArea rows={4}
                        placeholder="请输入任务"
                        size="middle"
                        onChange={this.handleInput}
                        value={this.state.text}
                    />
                    <DatePicker
                        placeholder="请选择截止日期"
                        defaultValue={showDate}
                        format={dateFormat}
                        onChange={this.handleDatePicker}
                    />
                    <TimePicker
                        placeholder="请选择截止时间"
                        defaultValue={showTime}
                        format={format}
                        onChange={this.handleTimePicker}
                    />
                </Modal>
                <div className='item__main'>
                    <label className="item__main__text">{text}</label>
                    {endDate ? <label className="item__main__date">{endDate}</label> : ''}
                    {endTime ? <label className="item__main__time">{endTime}</label> : ''}
                </div>
                <DeleteOutlined className="item__del" onClick={onDelete} />
                <Divider dashed />
            </div >
        )
    }
}

/**
 * 使用PropTypes进行类型检查
 */
Item.propTypes = {
    id: PropTypes.string.isRequired,    //每个任务的id
    text: PropTypes.string.isRequired,  //任务的内容
    onToggle: PropTypes.func.isRequired,    //扭转任务的函数
    onDelete: PropTypes.func.isRequired,    //删除任务的函数
    onModify: PropTypes.func.isRequired,    //修改任务的函数
    isFinished: PropTypes.bool.isRequired,    //任务的完成状态
}

/**
 * 将需要绑定的响应事件注入到组件上（props上）
 * @param {dispatch} dispatch() 方法
 *  @param {ownProps} 组件本身的props
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps; //id用props的就行，id没变化
    return {
        onToggle: () => dispatch(actions.toggleTodo(id)),
        onDelete: () => dispatch(actions.deleteTodo(id)),
        onModify: (text, endDate, endTime) => dispatch(actions.modifyTodo(id, text, endDate, endTime))
        //text, endDate, endTime需要传本地的
    }
};

export default connect(null, mapDispatchToProps)(Item)