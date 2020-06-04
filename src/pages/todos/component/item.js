import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { actions } from '../../../store/todos/index'
import '../index.css';

/**
 * 单个任务组件
 */
class Item extends React.Component {
    render() {
        const { id, text, endDate, endTime, isFinished, onToggle, onDelete } = this.props;
        return (
            <div className="item-container" key={id} >
                <Checkbox className="item__check" onChange={onToggle} checked={isFinished ? 'checked' : ''} />
                <div className='item__main'>
                    <label className="item__main__text">{text}</label>
                    {endDate ? (<label className="item__main__date">{endDate}</label>) : ''}
                    {endTime ? (<label className="item__main__time">{endTime}</label>) : ''}
                </div>
                <DeleteOutlined className="btn__del" onClick={onDelete} />
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