import React, { useState, useEffect } from 'react'
import marked from 'marked'
import { Row, Col, Input, Button, Select, DatePicker, message } from 'antd'
import Axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/pages/AddArticle.css'
const { TextArea } = Input
const { Option } = Select


function AddArticle(props) {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState('')   //发布日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('文章类别') //选择的文章类别

    useEffect(() => {
        initSelectTypeInfo()
        let tempId = parseInt(props.match.params.id, 10)
        if (tempId) {
            getArticleById(tempId);
        }
    }, [])

    marked.setOptions({
        renderer: new marked.Renderer(), // new 一个渲染器
        xagfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const initSelectTypeInfo = () => {
        Axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials: true,
        }).then((res) => {
            if (res && res.data && res.data.data) {
                let types = []
                try {
                    types = JSON.parse(res.data.data)
                } catch (err) {
                    types = []
                }
                setTypeInfo(types)
            } else {
                message.error('请先登录!')
                sessionStorage.removeItem('openId')
                setTimeout(() => {
                    props.history.push('/')
                }, 1000)
            }

        }).catch((err) => {
            // 未登录或者异常 返回登录界面
            message.error('请先登录!')
            setTimeout(() => {
                props.history.push('/')
            }, 1000)
        })
    }

    const getArticleById = id => {

        if (id) {
            Axios(servicePath.getAritcleById + id, {
                withCredentials: true
            }).then(res => {
                if (res && res.data.data) {
                    console.log(res.data.data)
                    let articleData = res.data.data
                    setArticleId(articleData.id)
                    setArticleTitle(articleData.title)
                    setArticleContent(articleData.content)
                    setIntroducemd(articleData.introduce)
                    let contentHtml = marked(articleData.content || '')
                    setMarkdownContent(contentHtml)
                    setSelectType(articleData.typeId)
                    let introHtml = marked(articleData.introduce || '')
                    setIntroducehtml(introHtml)
                }
            })
        }

    }

    // 改变博客内容回调函数
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    // 改变简介回调函数
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    // 改变文章类别回调函数
    const changeSelectType = value => {
        setSelectType(value)
    }

    // 保存文章
    const saveArticleHandler = () => {
        if (!articleTitle) {
            message.error('文章标题不能为空')
            return false
        }
        if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        }
        if (!introducemd) {
            message.error('文章简介不能为空')
            return false
        }
        if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }
        if (selectedType === '文章类别') {
            message.error('请选择文章类别')
            return false
        }

        let sendData = {
            type_id: selectedType,
            title: articleTitle,
            article_content: articleContent,
            introduce: introducemd,
            addTime: new Date(showDate.replace('-', '/')).getTime() / 1000,
            view_count: 0,
        }

        if (articleId === 0) {
            Axios({
                method: 'post',
                data: sendData,
                url: servicePath.addArticle,
                withCredentials: true
            }).then(res => {
                if (res && res.data && res.data.isSuccess) {
                    setArticleId(res.data.articleId)
                    message.success('文章保存成功')
                } else {
                    message.error('文章保存失败')
                }
            }).catch(err => {
                message.error('文章保存失败')
            })
        } else {
            sendData.id = articleId
            Axios({
                method: 'post',
                data: sendData,
                url: servicePath.updateArticle,
                withCredentials: true,
            }).then(res => {
                if (res.data.isSuccess) {
                    message.success('文章保存成功')
                } else {
                    message.error('修改文章失败')
                }
            }).catch(err => {
                message.error('修改文章失败')
            })
        }
    }

    return (<div>
        <Row gutter={5}>
            <Col span={18}>
                <Row gutter={10}>
                    <Col span={18}>
                        <Input placeholder="文章标题" value={articleTitle} onChange={e => setArticleTitle(e.target.value)} size="large" />
                    </Col>
                    <Col span={6}>
                        <Select defaultValue={selectedType} size="large" onChange={changeSelectType}>
                            {
                                typeInfo.map((type, index) => {
                                    return <Option key={type.id} value={type.id}>{type.typeName}</Option>
                                })
                            }
                        </Select>
                    </Col>
                </Row>
                <br />
                <Row gutter={5}>
                    <Col span={12}>
                        <TextArea
                            placeholder="文章内容" rows="35" className="markdown-content"
                            value={articleContent}
                            onChange={changeContent}
                            onPressEnter={changeContent}
                        />
                    </Col>
                    <Col span={12}>
                        <div className="show-html"
                            dangerouslySetInnerHTML={{ __html: markdownContent }}
                        ></div>
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                <Row>
                    <Col span={24}>
                        <Button size="large">暂存文章</Button>&nbsp;&nbsp;
                        <Button type="primary" size="large" onClick={saveArticleHandler}>发布文章</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <br />
                        <TextArea placeholder="文章简介" row="4" value={introducemd} onChange={changeIntroduce}
                            onPressEnter={changeIntroduce} />
                        <br /><br />
                        <div className="introduce-html" dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }}></div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="date-select">
                            <DatePicker
                                placeholder="发布日期"
                                size="large"
                                onChange={(date, dateString) => setShowDate(dateString)}
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>)

}

export default AddArticle