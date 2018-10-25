import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';

var Dialog = React.createClass({

    getInitialState(){
        return {

        }
    },

    render : function(){
    
        return (
            <Modal
                {...others}
                visible={true}
                title="设置文案"
                onCancel={onClose}
                onOk={this.handleOk}
            >
                <Input value={this.state.text} onChange={this.onChange} />
            </Modal>
        )
    }
})

module.exports = Dialog;