import Main from '@/components/Main'
import err from '@/pages/404'
// games
import allGame from '@/pages/games/allGame'
import caisheng from '@/pages/games/caisheng'
import chuniang from '@/pages/games/chuniang'
import football from '@/pages/games/football'
import fuyun from '@/pages/games/fuyun'
import panda from '@/pages/games/panda'
import sifang from '@/pages/games/sifang'
import taluo from '@/pages/games/taluo'
import xianglong from '@/pages/games/xianglong'
import mysterySea from '@/pages/games/mysterySea'

import sepcialCount from '@/pages/sepcialCount'
const errRouter={
    path: '*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在',
        requireAuth: false
    },
    component: err
}

// 作为main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
// export const otherRouter={
//     path: '/',
//     name: 'otherRouter',
//     redirect: '/home',
//     title:'other',
//     component: main,
//     children: [
//         { path: 'home', name: 'home',title:'首页', component: home},
//     ]
// }
// 作为main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter=[
    {
        path: '/',
        name: 'main',
        redirect: '/allGame',
        component: Main,
        children:[
          {path:'allGame',title: '全部游戏',name:'allGame',component:allGame},
          {path:'caisheng',title: '财神进宝',name:'caisheng',component:caisheng},
          {path:'taluo',title: '塔罗之谜',name:'taluo',component:taluo},
          {path:'chuniang',title: '小厨娘',name:'chuniang',component:chuniang},
          {path:'xianglong',title: '祥龙献瑞',name:'xianglong',component:xianglong},
          {path:'sifang',title: '四方神兽',name:'sifang',component:sifang},
          {path:'fuyun',title: '福运亨通',name:'fuyun',component:fuyun},
          {path:'panda',title: '熊猫传奇',name:'panda',component:panda},
          {path:'football',title: '幸运足球',name:'football',component:football},
          {path:'mysterySea',title: '神秘海域',name:'mysterySea',component:mysterySea},
          {path:'sepcialCount',title: '特殊统计',name:'sepcialCount',component:sepcialCount},
        ]
      }
    ]

export const routers=[
    errRouter,
    ...appRouter
]