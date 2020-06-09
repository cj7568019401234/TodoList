import React from 'react';
import "./style/index.css";

class Modal extends React.Component {
    render() {
        const {visible = true} = this.props;    //控制显示或隐藏
        return visible &&
        (
            <div className='modal'>
                <div className='modal__mask'></div>
                <div className='modal__wrapper'>
                    <div className='modal__close'>  <button className='modal__close__x'></button> </div>
                    <div className='modal__header'>
                        <div className='modal__title'>title</div>
                    </div>
                    <div className='modal__body'>
                        body
                    </div>
                    <div className='modal__footer'>
                        <button className='modal__btn'>取消</button>
                        <button className='modal__btn modal__btn--confirm'>确认</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;