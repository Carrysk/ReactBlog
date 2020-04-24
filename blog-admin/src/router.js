/**
 *路由器 定义
    path 路径
    component 组件
    exact 是否精确匹配
    requiresAuth 是否需要权限
 */

import Login from './Pages/Login'
import AdminIndex from './Pages/AdminIndex'

const routers = [{
        path: '/',
        component: Login,
        exact: true,
        requiresAuth: false,
    }, {
        path: '/login',
        component: Login,
        exact: true,
        requiresAuth: false,
    }, {
        path: '/index',
        component: AdminIndex,
        exact: false,
        requiresAuth: false,
    }, {
        path: '*',
        component: Login,
        exact: false,
        requiresAuth: false,
    }
]

export default routers