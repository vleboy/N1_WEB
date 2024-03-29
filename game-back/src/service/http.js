import axios from 'axios'
import {Message} from 'iview'
axios.interceptors.request.use(config => config, error => Promise.reject(error))
axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))
Message.config({
    top: 50,
    duration: 3
});
function checkStatus(response) {
    // console.log(response)
  // if (response.data.code != '0') {
  //       Message.warning(response.data.msg);
  //       if(response.data.msg=='TOKEN已过期'){
  //         let host=location.href;
  //         host=host.split('#')[0];
  //         window.location.href=host+'#/login'
  //       }
  //   }
  if (response && (response.status == 200 || response.status == 304 || response.status == 400)) {
    return response.data
  } else {
    Message.warning('网络异常');
    return {
      status: 404,
      msg: '网络异常'
    }
  }
}

export const http = config => {
  return axios(config).then(response => checkStatus(response)).catch((err) => {
    Message.warning('网络连接不稳定');
  })
}
