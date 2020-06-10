import React, { Children } from 'react';
import { ModalProps } from './Modal';
import "./style/index.css";

const Modal = (props: ModalProps) => {
    const {
        visible,    //控制显示或隐藏
        width,      //宽度  string|number	默认：520
        title,      //标题  string|ReactNode
        cancelText,  //取消按钮文字 
        okText,     //确认按钮文字  string|ReactNode	默认：确定
        mask,       //是否展示遮罩	Boolean	 默认：true
        onCancel,   //点击遮罩层或右上角叉或取消按钮的回调	function(e)
        getContainer,
    } = props;

    const style = {
        width: width,
    }

    // console.log(props);

    return visible &&
        (
            <div className='modal'>
                <div className='modal__mask'></div>
                {/* <div className='modal__wrapper' style={style}> */}
                <div className='modal__wrapper'>
                    <div className='modal__close'>
                        <button className='modal__close__x'></button>
                    </div>
                    <div className='modal__header'>
                        <span className='modal__title'>{title}</span>
                    </div>
                    {/* <div className='modal__body'>{getContainer}</div> */}
                    <div className='modal__body'>body</div>
                    <div className='modal__footer'>
                        <button className='modal__btn' onClick={onCancel}>{cancelText}</button>
                        <button className='modal__btn modal__btn--confirm'>{okText}</button>
                    </div>
                </div>
            </div>
        )
}

Modal.defaultProps = {
    width: 520,
    visible: false, //控制显示或隐藏
    okText: '确定',  //确认按钮文字
    cancelText: '取消',  //取消按钮文字
    getContainer: document.body, //指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom
};

export default Modal;