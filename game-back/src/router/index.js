import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './router'
Vue.use(Router)
const RouterConfig={
  routes:routers
}
export const router= new Router(RouterConfig)

// router.beforeEach((to, from, next) => {
//   let token = window.localStorage.getItem('n1token')
//   if (token) {
//     next()
//   } else {
//     if (to.name == 'login') {
//       next();
//     } else {
//       next({
//         name: 'login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   }

// });

router.afterEach((to) => {
  window.scrollTo(0, 0);
});