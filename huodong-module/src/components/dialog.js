import React from 'react';
import ReactDOM from 'react-dom';


let scrollTop = null;

function extend() {
    var length = arguments.length;
    var target = arguments[0] || {};
    if (typeof target!="object" && typeof target != "function") {
        target = {};
    }
    if (length == 1) {
        target = this;
        i--;
    }
    for (var i = 1; i < length; i++) { 
        var source = arguments[i]; 
        for (var key in source) { 
            // 使用for in会遍历数组所有的可枚举属性，包括原型。
            if (Object.prototype.hasOwnProperty.call(source, key)) { 
                target[key] = source[key]; 
            } 
        } 
    }
    return target; 
}


function Dialog(options){
    var defaults = {
        id: "j-_popup",
        content: "",
        closeBtn:"",
        afterInit: function () {},
        afterClose: function () {}
    };
    this.options = extend(defaults,options);
    this.open();
}
Dialog.list = {};
Dialog.prototype.offset = function(size){
    let _offset = {};
    _offset["left"] = "50%";
    _offset["marginLeft"] = - size.width / 2;
    _offset["top"] = "50%";
    _offset["marginTop"] = - size.height / 2;
    return _offset;
};
Dialog.prototype.autoSize = function(content){
    let size,
        dom;

    this.holder = document.createElement('div');
    document.body.appendChild(this.holder);
    dom = ReactDOM.render(content,this.holder);
    size = {
        width : dom.clientWidth,
        height : dom.clientHeight
    }
    document.body.removeChild(this.holder);
    return size;
};
Dialog.prototype.open = function(){
    let size,
        offset,
        style = {
            "zIndex": "1994",
            "position": "fixed"
        };
   
    this.size = size = this.autoSize(this.options.content);

    this.offset = offset = this.offset(size);

    style = extend(style,offset);

    this.holder = document.createElement('div');
    document.body.appendChild(this.holder);
   
    // body set fixed to fix scroll through
    scrollTop = document.scrollingElement.scrollTop;
    document.body.classList.add('dialog-opened');
    document.body.style.top = -scrollTop + 'px';
   
    ReactDOM.render(
        <div className="u-dialog" id={this.options.id}>
            <div className="u-dialog-container" style={style}>{this.options.content}</div>
            <div className="u-dialog-mask" style={{"opacity": "0.3","width":"100%","height":"100%","backgroundColor":"rgb(0, 0, 0)","position":"fixed","left": "0px","top":"0px","zIndex":"1993"}}></div>
        </div>,
        this.holder
    )

    this.obj =  document.querySelector("#" + this.options.id);

    // this.closeBtn = document.querySelector("#" + this.options.id + " " + this.options.closeBtn);
    // this.closeBtn.addEventListener("click",() => {
    //     this.close();
    // },false);
    Dialog.list[this.options.id] = this;

    typeof this.options.afterInit === "function" && this.options.afterInit.call(this);
};
Dialog.prototype.close = function(){
    document.body.removeChild(this.holder);

    // body remove fixed
    document.body.classList.remove('dialog-opened');
    document.body.style.top = '0px';
    document.scrollingElement.scrollTop = scrollTop;

    delete  Dialog.list[this.options.id];
    typeof this.options.afterClose === "function" && this.options.afterClose.call(this);
};

module.exports = Dialog;