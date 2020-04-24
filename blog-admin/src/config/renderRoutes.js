/**
 * router.config.js 
 * 模拟路由守卫 
 * 读取 router.js
 */

import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

const renderRoutes = (routes, authed, authPath = "/login", extraProps = {}, swithProps = {}) =>
    routes ? (
        <Switch {...swithProps} >
            {
                routes.map((route, i) => (
                    <Route
                        key={route.key || i}
                        exact={route.exact || false}
                        path={route.path} //BUG 忘记配置path 导致map 只有一回
                        strict={route.strict}
                        render={(props) => {
                            if (!route.requireAuth || authed || route.path === authPath) {
                                return <route.component {...props} {...extraProps} route={route} />
                            } else {
                                return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
                            }
                        }}
                    >
                    </Route>
                ))
            }
        </Switch>
    ) : null

export default renderRoutes