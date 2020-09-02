# 内网组件--Tab
[gitlab](https://gitlab.4399doc.com/ued/ued_ks) | [反馈](https://gitlab.4399doc.com/ued/ued_ks/issues)
## 1. 介绍
历史ks组件推送至内网组件平台   
原有代码模板 [https://gitlab.4399doc.com/ued/project/tree/master/feProject/release](https://gitlab.4399doc.com/ued/project/tree/master/feProject/release)  
原有Demo [https://gitlab.4399doc.com/ued/project/tree/master/feProject/resource/plugins](https://gitlab.4399doc.com/ued/project/tree/master/feProject/resource/plugins)

当前代码位置 [https://gitlab.4399doc.com/ued/ued_ks](https://gitlab.4399doc.com/ued/ued_ks)
## 2. 安装
```
npm set registry http://192.168.62.203:4877
npm install --save @ued/tab
```
## 3. 文档
[组件文档](http://project.4399ued.com/feProject/resource/plugins/ue.tab/index.html)  
使用方法
```
import * as $ from 'jquery'
import { tab } from '@ued/tab'

tab({
    tab : $("#ue_tab1 .ue-tab-nav li"),
    defaultIndex : 0,
    tabCurrentClass : "cur",
    only : true,
    delay : 500,
    content : $("#ue_tab1 .ue-tab-content"),
    trigger : "mouseover",
    beforeSwitch : function(){
        //alert("切换之前回调函数");
    },
    afterSwitch : function(){
        //alert("切换之后回调函数");
    },
    beforeShow : function(){
        //alert("显示之前回调函数");
    },
    afterShow : function(){
        //alert("显示之后回调函数");
    }
})
```