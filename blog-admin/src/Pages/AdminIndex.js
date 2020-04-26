import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Avatar, Modal } from 'antd';
import Logo from '../components/Logo'
import {
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import '../static/css/pages/AdminIndex.css'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import Axios from 'axios';
import ServicePath from '../config/apiUrl'
import { connect } from 'react-redux'

const { Header, Content, Footer, Sider } = Layout
const { confirm } = Modal;
const { SubMenu } = Menu



function AdminIndex(props) {

    const [collapsed, setCollapsed] = useState(false)
    const [selectMenuKey, setSelectMenuKey] = useState('1')
    const [curSelectMenu, setCurSelectMenu] = useState('工作台')

    const onCollapse = collapsed => setCollapsed(collapsed);

    const menuClick = e => {
        switch (e.key) {
            case 'add':
                props.history.push('/index/add')
                break
            case 'list':
                props.history.push('/index/list')
                break;
            default:
                props.history.push('/notfound');
                break;

        }
        setSelectMenuKey(e.key)
    }

    const loginOut = () => {
        confirm({
            title: "退出",
            icon: <LogoutOutlined />,
            content: '点击确定退出登录，返回登录界面',
            okType: 'primary',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                Axios(ServicePath.logout, {
                    withCredentials: true
                }).then(() => {
                    sessionStorage.removeItem('openId')
                    props.changeLogin(false)
                    props.history.push('/login')
                }).catch(() => {
                    sessionStorage.removeItem('openId')
                    props.changeLogin(false)
                    props.history.push('/login')
                })
            }
        });
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" >
                    <Logo />
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']}
                    selectedKeys={selectMenuKey}
                    multiple="false"
                    mode="inline"
                    onClick={menuClick}>
                    <Menu.Item key="1">
                        <PieChartOutlined />
                        <span>工作台</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <UserOutlined />
                                <span>文章管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="add">添加文章</Menu.Item>
                        <Menu.Item key="list">文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="message">
                        <FileOutlined />
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    <div className="right-icons">
                        <Avatar size="small" style={{ background: 'rgba(0,0,0,0)' }} icon={<LogoutOutlined />} onClick={() => loginOut()} />
                    </div>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>{curSelectMenu}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ minHeight: 360 }}>
                        <Router key={props.location.key}>
                            <Route path="/index/" exact component={ArticleList} ></Route>
                            <Route path="/index/add/" exact component={AddArticle} ></Route>
                            <Route path="/index/add/:id" exact component={AddArticle} ></Route>
                            <Route path="/index/list/" component={ArticleList} ></Route>
                        </Router>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>BLOG ©2020 Create By Carrysk</Footer>
            </Layout>
        </Layout>
    );
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

export default connect(null, mapDispatchToProps)(AdminIndex)