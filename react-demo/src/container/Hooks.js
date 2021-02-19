import React,{ useState } from 'react';

function Hooks(){
  console.log("hooks render");
  const [count,setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// console.log(Hooks);

export default Hooks;


//本质上也是一个普通的函数 
//函数中声明的变量，当函数运行完成后，这个变量也就销毁了，怎么记住状态？ 
//react 记住状态了

//对比mixin共享一个数据空间 每一次调用hook都是独立的

//useState
//useState根据出现的顺序来知道 值对应的key   
//把hooks写在函数的最外层，不能写在ifelse等条件语句

//useEffect定义副作用函数
//每次渲染都会调用一遍传给useEffect的函数      而componentDidMount componentDidUpdate这区分第一次渲染和更新导致的重新渲染
//useEffect中定义的副作用函数，是异步执行的，导致无法根据DOM计算出某个元素的尺寸再重新渲染
//解绑useEffect通过返回一个新的函数即可    解绑的模式不一样  useEffect里的函数，每次组件渲染后都会执行一遍  而componentWillUnmount直到组件销毁才一次 






//reference:https://www.jianshu.com/p/76901410645a