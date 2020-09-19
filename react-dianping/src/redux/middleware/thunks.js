
const thunksMiddleware = ({dispatch,getState}) => {
  return next => action => {
    if(typeof action === "function"){
      /**
       * “Thunk” 中间件让你可以把 action creators 写成 “thunks”，也就是返回函数的函数。 
       * 这使得控制被反转了： 你会像一个参数一样取得 dispatch ，
       * 所以你也能写一个多次分发的 action creator  
       * */
      return action(dispatch,getState);
    }else{
      return next(action);
    }
  }
}
export default thunksMiddleware;