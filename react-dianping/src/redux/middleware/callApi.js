const callApiMiddleware = ({dispatch,getState}) => {

  return next => action => {
    let {
      types,
      callApi,
      payload = {},
      schema
    } = action;

    if(!types){
      return next(action)
    }
    
    let [requestType,successType,failureType] = types;

    /**
     * 中间件能 “捕捉” 到已经 dispatch 的 Promises 
     * 并把他们变为一对请求和成功/失败的 action. 
     * */
    next(Object.assign({},payload,{
      type : requestType
    }));
    /**
     * 返回给dispatch代码一个promise
     */
    return callApi()
    .then(response => normalize(response,schema))
    .then(response => next(Object.assign({},payload,{
        type : successType,
        response
    })))
    .catch(error => next(Object.assign({},payload,{
        type : failureType,
        error
    })))
  }
}

/**根据schema, 将获取的数据扁平化处理 */
const normalize = (data,schema) => {
  if(!schema) {
    return data;
  }
  let {key,name} = schema;
  let obj = {
    items : {},
    keys : []
  }
  if(Array.isArray(data)){
    data.forEach(item => {
      obj.items[item[key]] = item;
      obj.keys.push(item[key]);
    })
  }else{
    obj.items[data[key]] = data;
    obj.keys.push(data[key]);
  }
  return {
    [name] : obj
  }
}


export default callApiMiddleware;