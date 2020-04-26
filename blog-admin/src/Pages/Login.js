import React, { useState, useEffect } from 'react'
import { Card, Input, Button, Spin, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import Axios from 'axios'
import servicePath from '../config/apiUrl'
import 'antd/dist/antd.css'
import '../static/css/pages/Login.css'

function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // 获取登录状态 如果登录 自动跳转到首页
    useEffect( ()=>{
        getLoginState()
    }, [])

    // 登录
    const loginBtnClick = () => {
        setIsLoading(true)
        if (!userName || !password) {
            message.error('用户名密码不能为空')
            setTimeout(function () {
                setIsLoading(false)
            }, 1000)
            return
        } else {
            let data = {
                username: userName,
                password
            }
            Axios({
                method: 'post',
                url: servicePath.login,
                data,
                withCredentials: true
            }).then(res => {
                setIsLoading(false)
                if (res) {
                    if (res.data.data === '登录成功') {
                        message.success('登录成功')
                        sessionStorage.setItem('openId', res.data.openId)
                        props.changeLogin(true)
                        props.history.push('/index')
                    } else {
                        message.error('用户名或密码错误')
                    }

                } else {
                    message.error('用户名或密码错误')
                }
            }).catch(err => {
                setIsLoading(false)
                message.error('登录异常')
            })
        }
    }

    // 获取是否登录
    const getLoginState = () => {
        Axios(servicePath.isLogin, {
            withCredentials: true
        }).then(res => {
            const isLogin = res && res.data && res.data.success;
            props.changeLogin(isLogin)
            if (isLogin) {
                props.history.push('/index')
            }
        })
    }
    return (
        <div className="Login-div">
            <Spin tip="loading..." spinning={isLoading}>
                <Card title="博客后台管理" bordered={true} style={{ width: 400 }}>
                    <Input id="username" size="large" placeholder="请输入用户名"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.5)' }} />}
                    />
                    <br /><br />
                    <Input.Password id="password" size="large" placeholder="请输入密码"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        prefix={<LockOutlined style={{ color: "rgba(0,0,0,.5)" }}
                        />} />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={loginBtnClick}>登录</Button>
                </Card>
            </Spin>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLogin: isLogin => {
            let action = {
                type: 'changeLogin',
                isLogin
            }
            dispatch(action)
        }
    }
}
export default connect(null, mapDispatchToProps)(Login)