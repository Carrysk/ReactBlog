import React, { useState } from "react"
import Head from "next/head"
import { Row, Col, List, Icon } from "antd"
import Header from "../components/Header"
import Auther from '../components/Auther'
import Advert from '../components/Advert'
import Footer from '../components/footer'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import "../public/style/pages/index.css"
import axios from "axios"
import servicePath from '../config/apiUrl'

const Home = (list) => {
    const [listData, setListData] = useState(list.data);
    // 文章导航
    const renderer = new marked.Renderer()

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        }
    })

    return (
        <div>
            <Head>
                <title>Home</title>
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
                    <List
                        header={<div>火文</div>}
                        itemLayout="vertical"
                        dataSource={listData}
                        renderItem={item => (<List.Item>
                            <div>
                                <Link href={{ pathname: '/details', query: { article_id: item.id } }}>
                                    <a>
                                        <div className="list-title">{item.title}</div>
                                        <div className="list-icon">
                                            <span><Icon type="calendar" /> {item.addTime}</span>
                                            <span><Icon type="folder" /> {item.typeName}</span>
                                            <span><Icon type="fire" /> {item.view_count}人</span>
                                        </div>
                                        <div className="list-context" dangerouslySetInnerHTML={{ _html: marked('' + item.introduce) }}></div>
                                    </a>
                                </Link>
                            </div>
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

Home.getInitialProps = async () => {
    return await new Promise((resolve) => {
        axios(servicePath.getArticleList).then((res) => {
            resolve(res.data);
        })
    })
}

export default Home;
