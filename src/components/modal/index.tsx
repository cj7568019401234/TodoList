import React, { useEffect, useState } from 'react';
import { ModalProps } from './Modal';
import "./style/index.css";

const classNames = require('classnames');

const Modal = (props: ModalProps) => {
    const [isVisible, setIsVisible] = useState(true);

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
        okType, //确认按钮类型	string	默认：primary
        closeIcon,  //自定义关闭图标	ReactNode	-
    } = props;

    const wrapperStyle = {      //用户自定义的对话框样式
        width: width,
        zIndex: zIndex,
        ...style
    }

    const wrapperClass = classNames({
        'modal__wrapper': !centered,
        'modal__center': !!centered,    //根据用户数据选择是否居中
    })

    const btnClass = classNames({
        'modal__btn': true,
        'modal__btn--primary': okType === 'primary',    //根据用户输入选择确认按钮是否使用基础样式
    })

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(onCancel) onCancel(e);   //点击遮罩层或右上角叉或取消按钮的回调
        else setIsVisible(false);   
    };

    const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {   
        if(onOk) onOk(e);   //点击确定回调
        else setIsVisible(false);
    };

    const closer = closable ? (
        <button className='modal__close' onClick={handleCancel}>
            {closeIcon || <span className='modal__close__x'></span>}
        </button>) 
        : null


    useEffect(() =>{
        return function cleanup() {
            afterClose && afterClose();   
        }
    })   

    //如果用户有输入visible则按照visible控制是否展示组件，否则使用本地isVisible控制
    const isShow = visible === undefined ? isVisible : visible;     

    return isShow &&
        (
            <div className='modal'>
                <div className='modal__container' >
                    {mask && <div className='modal__mask' style={maskStyle}></div>}
                    <div className={wrapperClass} style={wrapperStyle}>
                        {closer}
                        <div className='modal__header'>
                            <span className='modal__title'>{title}</span>
                        </div>
                        <div className='modal__body' style={bodyStyle}>
                            {children}
                        </div>
                        <div className='modal__footer'>
                            <button className='modal__btn' onClick={handleCancel}>{cancelText}</button>
                            <button className={btnClass} onClick={handleOk}>
                                {okText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
}

Modal.defaultProps = {
    width: 520,
    okText: '确定',  //确认按钮文字
    cancelText: '取消',  //取消按钮文字
    mask: true,     //是否展示遮罩
    zIndex: 1000,   //设置 Modal 的 z-index
    closable: true, //是否显示右上角的关闭按钮
    centered: false,    //垂直居中展示 Modal
    okType: 'primary',    //确认按钮类型
    maskClosable: true, //点击蒙层是否允许关闭
};

export default Modal;