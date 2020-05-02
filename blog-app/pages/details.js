import React, { useState } from "react"
import Head from "next/head"
import { Row, Col, Breadcrumb, Icon, Affix } from "antd"
import Header from "../components/Header";
import Auther from '../components/Auther'
import Advert from '../components/Advert'
import Footer from '../components/footer'
import axios from 'axios'
import "../public/style/pages/details.css"
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'

import servicePath from '../config/apiUrl'

const Details = (props) => {
    const renderer = new marked.Renderer()

    // 文章导航
    const tocify = new Tocify();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level)
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
    }

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

    let html = marked(props.data.content + '')

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
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item><a href="/list">视频列表</a></Breadcrumb.Item>
                            <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div>
                        <div className="detailed-title">
                            练习react啊啊啊啊啊
                        </div>
                        <div className="list-icon center">
                            <span><Icon type="clendar" /> 2020-02-20</span>
                            <span><Icon type="folder" /> 视频教程</span>
                            <span><Icon type="fire" /> 1次</span>
                        </div>

                        <div className="detailed-content"
                            dangerouslySetInnerHTML={{ __html: marked('' + props.data.content) }}
                        >

                        </div>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Auther />
                    <Advert />

                    <Affix offsetTop={0}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <div className="toc-list">
                                {tocify && tocify.renderToc()}
                            </div>
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}

Details.getInitialProps = async (context) => {
    return await new Promise(resolve => {
        axios(servicePath.getArticleById + context.query.article_id).then(res => {
            resolve(res.data)
        })
    })
}

export default Details
