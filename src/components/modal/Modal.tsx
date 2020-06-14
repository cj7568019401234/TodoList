import * as React from 'react';

export interface ModalProps {
    /** 对话框是否可见 */
    visible?: boolean;
    /** 标题 */
    title?: React.ReactNode | string;
    /** 是否显示右上角的关闭按钮 */
    closable?: boolean;
    /** 点击确定回调 */
    onOk?: (e: React.MouseEvent<HTMLElement>) => void;
    /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
    afterClose?: () => void;
    /** 垂直居中 */
    centered?: boolean;
    /** 宽度 */
    width?: string | number;
    /** 底部内容 */
    footer?: React.ReactNode;
    /** 确认按钮文字 */
    okText?: string | React.ReactNode;
    /** 确认按钮类型 */
    okType?: string;
    /** 取消按钮文字 */
    cancelText?: React.ReactNode;
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean;
    style?: React.CSSProperties;
    zIndex?: number;
    bodyStyle?: React.CSSProperties;
    maskStyle?: React.CSSProperties;
    mask?: boolean;
    closeIcon?: React.ReactNode;
    children: React.ReactChild | React.ReactChildren |  React.ReactElement[],
  }