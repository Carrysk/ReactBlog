import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import renderRoutes from '../config/renderRoutes'
import routers from '../router'
import axios from 'axios'
import SevicePath from '../config/apiUrl'

import { connect } from 'react-redux'
import { CHANGE_LOGIN} from '../store/actionTypes'

function Main(props) {

    // 鉴权 是否登录 如果没有登录 返回登录界面
    useEffect(() => {
        getIsLogin()
    }, [])

    const getIsLogin = () => {
        axios(SevicePath.isLogin).then(res => {
            props.changeLogin(res && res.data && res.data.success)
        })
    }

    return (
        <Router>
            <Switch>
                {renderRoutes(routers, props.isLogin)}
            </Switch>
        </Router>
    )
}

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin
    }
}

const mapDispatchTiProps = (dispatch)=> {
    return {
        changeLogin: isLogin =>{
            let action = {
                type: CHANGE_LOGIN,
                isLogin
            }
            dispatch(action)
        }
    }
}
export default connect(mapStateToProps, mapDispatchTiProps)(Main)