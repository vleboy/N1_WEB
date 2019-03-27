import { http } from './http'
import { URL,httpType } from './urlConfig'
// import QS from 'qs'

// get请求 (url拼接参数，请求域名类别）
// 域名类别为: 不传域名默认为n1, 游戏相关接口为game
const get = (urls) => {
    let headers={
        "Content-Type": "application/json; charset=utf-8",
        // "Authorization":token
    }
    return {
     method: 'get',
     url: httpType+ URL + urls,
     headers: headers
    }
}

// post请求
const post = (urls, datas) => {
    // let TOKEN='';
    // if(window.localStorage.getItem('n1token')) {
    //     headers={
    //         "Content-Type": "application/json; charset=utf-8",
    //         "Authorization":TOKEN
    //     }
    // }else{
    //     headers={
    //         "Content-Type": "application/json; charset=utf-8",
    //     }
    // }
    let headers={
                "Content-Type": "application/json; charset=utf-8",
            }
    return {
        method: 'post',
        url: httpType+ URL + urls,
        data:datas,                       //QS.stringify(datas),
        headers: headers
    }
}

//img
const Image = (method, url, data) => ({
    method: method,
    url: url,
    data: data,
    headers: {
        "Content-Type": "image"
    }
})

//example
export async function example(params) {
    return http()
}

//针对业务逻辑里的请求
export async function httpRequest(method,url,params) {
  //参数分别作用 （方法, 请求接口, 参数, 域名接口）
  switch (method) {
    case 'get':
      return http(get(url))
    break
    case 'post':
      return http(post(url,params))
    break
    case 'put':
      return http(Image(method,url,params))
    break
  }
}

// //登录
// export async function logIn(role,username,password,challenge,vid,cb,err){
//     return http(post('/users/auth',{role,username,password,challenge,vid,cb,err}))
// }
