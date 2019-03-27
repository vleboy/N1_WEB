import main from '@/components/main'
import err404 from '@/pages/404'
import login from '@/pages/login'

import home from '@/pages/home'
import operatorList from '@/pages/operator/operatorList'
import addOperator from '@/pages/operator/addOperator'
import gameList from '@/pages/game/gameList' // 游戏列表
import addGame from '@/pages/game/addGame' // 创建游戏
import gameHallConfig from '@/pages/gameHallConfig/gameHallConfig' // 游戏大厅管理
import propList from '@/pages/prop/propList' // 道具列表
import packageList from '@/pages/prop/packageList' // 礼包列表

const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        requireAuth: false
      },
    component: login
};
const page404 = {
    path: '*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在',
        requireAuth: false
    },
    component: err404
};
// 作为main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter={
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    title:'other',
    component: main,
    children: [
        { path: 'home', name: 'home',title:'首页', component: home},
        { path: 'addGame', name: 'addGame',title:'创建游戏', component: addGame},
        { path: 'addOperator', name: 'addOperator',title:'创建供应商', component: addOperator}
    ]
}
// 作为main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter=[
    {
        path:'/operator',
        title:'供应商管理',
        name:'operator',
        component:main,
        children:[{path:'operatorList',title:'供应商管理', name:'operatorList',component:operatorList}]
    },
    {
        path:'/game',
        title:'游戏列表',
        name:'game',
        component:main,
        children:[{path:'gameList',title:'游戏列表', name:'gameList',component:gameList}]
    },
    {
        path:'/gameHall',
        title:'游戏大厅管理',
        name:'gameHall',
        component:main,
        children:[{path:'gameHallConfig',title:'游戏大厅管理', name:'gameHallConfig',component:gameHallConfig}]
    },
    {
        path:'/prop',
        title:'道具列表',
        name:'prop',
        component:main,
        children:[{path:'propList',title:'道具列表', name:'propList',component:propList}]
    },
    {
        path:'/package',
        title:'礼包列表',
        name:'package',
        component:main,
        children:[{path:'packageList',title:'礼包列表', name:'packageList',component:packageList}]
    },
]
export const routers = [
    page404,
    loginRouter,
    otherRouter,
    ...appRouter,
]
