import React from 'react';
import { ModalProps } from './Modal';
import "./style/index.css";

const classNames = require('classnames');

const Modal = (props: ModalProps) => {
    const {
        visible,    //控制显示或隐藏    Boolean     默认：false
        children,   //用户自定义传入的内容  React.ReactChild | React.ReactChildren |  React.ReactElement[]
        width,      //宽度  string|number	默认：520
        title,      //标题  string|ReactNode
        cancelText,  //取消按钮文字     string|ReactNode	默认：取消      
        okText,     //确认按钮文字  string|ReactNode	默认：确定
        mask,       //是否展示遮罩	Boolean	 默认：true
        maskStyle,  //遮罩样式	object	默认：{}
        onCancel,   //点击遮罩层或右上角叉或取消按钮的回调	function(e)
        onOk,       //点击确定回调	function(e)
        zIndex,     //设置 Modal 的 z-index	Number	默认：1000
        closable,   //是否显示右上角的关闭按钮	boolean	默认：true
        bodyStyle,  //Modal body 样式	object	默认：{}
        afterClose, //Modal 完全关闭后的回调	function	-
        centered,   //垂直居中展示 Modal	Boolean	    默认：false
        style,  //可用于设置浮层的样式，调整浮层位置等	CSSProperties	-
    } = props;

    const wrapperStyle = {
        width: width,
        zIndex: zIndex,
        ...style
    }

    const wrapperClassname = classNames({
        'modal__wrapper': false,
        'modal__center': !!centered,
    })

    return visible &&
        (
            <div className='modal'>
                {mask ? <div className='modal__mask' style={maskStyle}></div> : ''}
                <div className={wrapperClassname} style={wrapperStyle}>
                    {closable ?
                        <div className='modal__close'>
                            <button className='modal__close__x' onClick={onCancel}></button>
                        </div>
                        : ''
                    }
                    <div className='modal__header'>
                        <span className='modal__title'>{title}</span>
                    </div>
                    <div className='modal__body' style={bodyStyle}>
                        {children}
                    </div>
                    <div className='modal__footer'>
                        <button className='modal__btn' onClick={onCancel}>{cancelText}</button>
                        <button className='modal__btn modal__btn--confirm' onClick={onOk}>{okText}</button>
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
    mask: true,     //是否展示遮罩
    zIndex: 1000,   //设置 Modal 的 z-index
    closable: true, //是否显示右上角的关闭按钮
    centered: false,    //垂直居中展示 Modal
    // getContainer: document.body, //指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom
};

export default Modal;