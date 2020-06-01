import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Item from './item.js';
import '../index.css';

const { Panel } = Collapse;
// const { Option } = Select;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

/**
 * 任务列表
 * @param {unfinishedList} 未完成任务列表
 * @param {finishedList} 已完成任务列表 
 */
const TodoList = ({ unfinishedList, finishedList }) => {

    // const state = {
    //     expandIconPosition: 'left',
    // };

    // const onPositionChange = expandIconPosition => {
    //     this.setState({ expandIconPosition });
    // };

    const genExtra = () => (
        <SettingOutlined
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );

    return (
        <div>
            <div className='task-container'>
                <Collapse
                    defaultActiveKey={['1']}
                //   onChange={}
                //   expandIconPosition={}
                >
                    <Panel className='task task--todo' header="待完成" key="1" extra={genExtra()}>
                        {
                            unfinishedList.map((item) => (
                                <Item
                                    id={item.id}
                                    text={item.text}
                                    isFinished={item.isFinished}
                                />
                            ))
                        }
                    </Panel>
                    <Panel className='task task--done' header="已完成" key="2" extra={genExtra()}>
                        {
                            finishedList.map((item) => (
                                <Item
                                    id={item.id}
                                    text={item.text}
                                    isFinished={item.isFinished}
                                />
                            ))
                        }
                    </Panel>
                </Collapse>

                {/* <div className='task task--todo'>
                    <h3>待完成
                        <span className='btn btn__num'>{unfinishedList.length}</span>
                    </h3>
                    <div className='task__line task__line--first'></div>
                    {
                        unfinishedList.map((item) => (
                            <Item
                                id={item.id}
                                text={item.text}
                                isFinished={item.isFinished}
                            />
                        ))
                    }
                </div> */}
                {/* <div className='task task--done'>
                    <h3>已完成
                        <span className='btn btn__num'>{finishedList.length}</span>
                    </h3>
                    <div className='task__line task__line--first'></div>
                    {
                        finishedList.map((item) => (
                            <Item
                                id={item.id}
                                text={item.text}
                                isFinished={item.isFinished}
                            />
                        ))
                    }
                </div> */}
            </div>
        </div>
    );
}

/**
 * 使用PropTypes进行类型检查
 */
TodoList.propTypes = {
    finishedList: PropTypes.array.isRequired,
    unfinishedList: PropTypes.array.isRequired
}

/**
 * 将 State 数据转换到 Props 中
 * @param {state} store中维护的state
 */
const mapStateToProps = (state) => {
    return {
        finishedList: state.todoList.filter(item => item.isFinished),  //过滤出已完成的任务
        unfinishedList: state.todoList.filter(item => !item.isFinished)  //过滤出未完成的任务
    }
}

export default connect(mapStateToProps)(TodoList); //将store和组件联系在一起