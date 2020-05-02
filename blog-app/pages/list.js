import React, { useState, useEffect } from "react"
import Head from "next/head"
import { Row, Col, List, Icon, Breadcrumb } from "antd"
import Header from "../components/Header"
import Auther from '../components/Auther'
import Advert from '../components/Advert'
import Footer from '../components/footer'
import axios from 'axios'
import Link from 'next/link'
import ServerPath from '../config/apiUrl'
import "../public/style/pages/list.css"

const ListPage = (props) => {
    const [listData, setListData] = useState(props && props.data) // 保存文章列表
    const [articleType, setArticleType] = useState(props && props.typeAbout) // 保存面包屑导航

    // 使用useEffect 设置组件的值
    useEffect(() => {
        setListData(props && props.data)
        setArticleType(props && props.typeAbout)
    })


    return (
        <div>
            <Head>
                <title>BLOG</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <Row type="flex" className="comm-main" justify="center">
                <Col
                    className="comm-left"
                    xs={24}
                    sm={24}
                    md={16}
                    lg={18}
                    xl={14}
                >
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link href={{ pathname: "/list", query: { id: articleType.id } }}>
                                    <a>{articleType.typeName}</a>
                                </Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <List
                        header={<div>...</div>}
                        itemLayout="vertical"
                        dataSource={listData}
                        renderItem={item => (<List.Item>
                            <div className="list-title">
                                <Link href={{ pathname: '/details', query: { article_id: item.id } }} >
                                    <a href="javascript:void(0)">{item.title}</a>
                                </Link>
                            </div>
                            <div className="list-icon">
                                <span><Icon type="calendar" /> {item.addTime}</span>
                                <span><Icon type="folder" /> {item.typeName}</span>
                                <span><Icon type="fire" /> {item.view_count}人</span>
                            </div>
                            <div className="list-context">{item.context}</div>
                        </List.Item>)}
                    />
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Auther />
                    <Advert />
                </Col>
            </Row>
            <Footer />
        </div>
    )
};

ListPage.getInitialProps = async context => {
    return await new Promise(resolve => {
        let id = context.query.id || 0;
        axios(ServerPath.getArticleListById + context.query.id).then(res => resolve(res.data));
    })
}



export default ListPage;
