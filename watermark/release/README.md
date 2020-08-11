# Fetch

[gitlab](https://gitlab.4399doc.com/game_awesome/fetch) | [反馈](https://gitlab.4399doc.com/game_awesome/fetch/issues)

## 介绍

#####  所属项目组：手游活动

活动网络请求库

## 安装

    npm set registry http://192.168.62.203:4877
    npm install @game/fetch --save

## 文档 

##### 实例方法

```typescript
  // 设置每个请求都携带的公共参数
  public setCommon(commonParams:Object): void

  //设置当环境为本地时，是否请求4040，默认请求test
  public setIsLocal(isLocal:boolean): void

  //发起get请求,具体泛型与类型请使用ts
  public get(url, param={}): Promise<any>

  //发起post请求,具体泛型与类型请使用ts
  public post<T=any>(url, param={}): Promise<any>
```

    
## 示例

```typescript
  import { Fetch } from '@game/fetch'
  
  //当本地开发时需要请求本地4040服务器
  Fetch.setIsLocal(true);

  Fetch.setCommon({
    scooke: 'ddjjdjdjdjd',
    deviceId: '3344343',
  })


  Fetch.get('/xx/xx',{id:333}).then(response=> {
    //处理回调
  })

  Fetch.post('/xx/xx',{id:333}).then(response=> {
    //处理回调
  })
  
```






