import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Checkbox, Modal, Input, DatePicker, TimePicker} from 'antd';
import { DeleteOutlined,FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import { actions } from '../../../store/todos/index'
import '../index.css';

const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';
const format = 'HH:mm';

/**
 * 单个任务组件
 */
class Item extends React.Component {

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    render() {
        const { id, text, endDate, endTime, isFinished, onToggle, onDelete } = this.props;
        return (
            <div className="item-container" key={id} >
                <Checkbox className="item__check" onChange={onToggle} checked={isFinished ? 'checked' : ''} />
                <Modal
                    title="请编辑任务"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className='nav__input'>
                        <TextArea rows={4}
                            placeholder="请输入任务"
                            enterButton="添加"
                            size="middle"
                            onChange={this.handleInput}
                            value={text}
                            onSearch={() => this.addTask()}
                    />
                    </div>
                    <DatePicker
                        className='nav__date'
                        format={dateFormat}
                        placeholder="请选择截止日期"
                        defaultValue={moment({endDate})}
                        onChange={this.handleDatePicker}
                    />
                    <TimePicker
                        className='nav__time'
                        format={format}
                        placeholder="请选择截止时间"
                        defaultValue={moment({endTime})}
                        onChange={this.handleTimePicker}
                        format={format}
                    />
                </Modal>

                <div className='item__main'>
                    <label className="item__main__text">{text}</label>
                    {endDate ? (<label className="item__main__date">{endDate}</label>) : ''}
                    {endTime ? (<label className="item__main__time">{endTime}</label>) : ''}
                </div>
                <FormOutlined  onClick={this.showModal} />
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
    id: PropTypes.number.isRequired,    //每个任务的id
    text: PropTypes.string.isRequired,  //任务的内容
    onToggle: PropTypes.func.isRequired,    //扭转任务的函数
    onDelete: PropTypes.func.isRequired,    //删除任务的函数
    isFinished: PropTypes.bool.isRequired,    //任务的完成状态
}

/**
 * 将需要绑定的响应事件注入到组件上（props上）
 * @param {dispatch}  dispatch() 方法
 *  @param {ownProps}   组件本身的props
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps;
    return {
        onToggle: () => dispatch(actions.toggleTodo(id)),
        onDelete: () => dispatch(actions.deleteTodo(id))
    }

};

export default connect(null, mapDispatchToProps)(Item)