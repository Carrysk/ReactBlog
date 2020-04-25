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
        key: '',
        component: Login,
        exact: true,
        requireAuth: false,
    }, {
        path: '/login',
        key: 'login',
        component: Login,
        exact: true,
        requireAuth: false,
    }, {
        path: '/index',
        key: 'index',
        component: AdminIndex,
        exact: false,
        requireAuth: true,
    }, {
        path: '*',
        key: '*',
        component: Login,
        exact: false,
        requireAuth: false,
    }
]

export default routers