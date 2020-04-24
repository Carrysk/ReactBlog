import React, { useState } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons'
import '../static/css/AdminIndex.css'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import Axios from 'axios';

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu



function AdminIndex(props) {

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => setCollapsed(collapsed);

    const handleClickArticle = e => {
        if(e.key==='add') {
            props.history.push('/index/add')
        } else if (e.key ==='list') {
            props.history.push('/index/list')
        }
    }

    const isLogin = () => {
        Axios('')
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <PieChartOutlined />
                        <span>工作台</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <DesktopOutlined />
                        <span>添加文章</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <UserOutlined />
                                <span>文章管理</span>
                            </span>
                        }
                        onClick={handleClickArticle}
                    >
                        <Menu.Item key="add">添加文章</Menu.Item>
                        <Menu.Item key="list">文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <FileOutlined />
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                       <Router key={props.location.key}>
                           <Route path="/index/" exact component={AddArticle} ></Route>
                           <Route path="/index/add/" exact component={AddArticle} ></Route>
                           <Route path="/index/add/:id" exact component={AddArticle} ></Route>
                           <Route path="/index/list/" component={ArticleList} ></Route>
                       </Router>
            </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}


export default AdminIndex