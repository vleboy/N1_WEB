// console.log(process.env.NODE_ENV);
// export const URL='d3rqtlfdd4m9wd.cloudfront.net'
export let URL = type => {
  if (process.env.NODE_ENV == 'production') {
    switch (type) {
      case 'game':
        return 'https://n1game.na12345.com'
      case 'prize':
        return 'https://game.jvshihui.cn:45557'
      case 'map':
        return 'http://visual.na12345.com'
      default:
        return 'https://n1admin.na12345.com'
    }
  } else {
    switch (type) {
      case 'game':
        return 'https://dgjmusja39cm2.cloudfront.net'
      case 'prize':
        return 'https://testgame.jvshihui.cn:45557'
      // return 'http://192.168.3.200:45557'
      case 'map':
        return 'http://visual.na12345.com'
      default:
        return 'https://d3rqtlfdd4m9wd.cloudfront.net'
    }
  }
}
// console.log(URL);
// export const api = {
//   getVaptcha: httpType + URL() + '/vaptcha/getVaptcha',
//   getDownTime: httpType + URL() + '/vaptcha/getDownTime'
// }
