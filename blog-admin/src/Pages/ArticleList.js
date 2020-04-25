import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button } from 'antd'
import Axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'

const { confirm } = Modal;

function ArticleList(props) {
    const [list, setList] = useState([])

    useEffect(()=>{
        getArticleList()
    }, [])// 模拟初始化数据

    const getArticleList = ()=> {
        Axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true
        }).then(res=>{
            if (res.data.data instanceof Array) {
                setList(res.data.data)
            }
        }).catch(err=>{
            setList([])
        })
    }

    const modifyArticle = id=> {
        props.history.push('/index/add/' + id);
        return;
    }

    // 删除文章
    const delArticle = id=> {
        confirm({
            title: '删除文章',
            content: '确认删除与否',
            onOk() {
                Axios(servicePath.delArticleById + id, {withCredentials: true}).then(res=>{
                    if(res && res.data && res.data.success) {
                        message.success('文章删除成功')
                        getArticleList()
                    } else if (res && res.data === '请先登录'){
                        props.history.push('/')
                    } else {
                        message.error('文章删除失败')
                    }
                }).catch(err=>{
                    message.error('文章删除失败')
                })
            }
        })
    }

    return (<div>
        <List
            header={
                <Row>
                    <Col span={8} >
                        <b>标题</b>
                    </Col>
                    <Col span={3}>
                        <b>类别</b>
                    </Col>
                    <Col span={3}>
                        <b>发布时间</b>
                    </Col>
                    <Col span={3}>
                        <b>集数</b>
                    </Col>
                    <Col span={3}>
                        <b>浏览量</b>
                    </Col>
                    <Col span={4}>
                        <b>操作</b>
                    </Col>
                </Row>
            }
            bordered
            dataSource={list}
            renderItem={item => (
                <List.Item key={item.id}>
                    <Row className="list-div">
                        <Col span={8}>
                            {item.title}
                        </Col>
                        <Col span={3}>
                            {item.typeName}
                        </Col>
                        <Col span={3}>
                            {item.addTime}
                        </Col>
                        <Col span={3}>
                            共<span>{item.view_count}</span>集
                            </Col>
                        <Col span={3}>
                            {item.view_count}
                        </Col>
                        <Col span={4}>
                            <Button type="primary" onClick={()=>{modifyArticle(item.id)}}>修改</Button>&nbsp;
                            <Button onClick={()=>{delArticle(item.id)}}>删除 </Button>
                        </Col>
                    </Row>
                </List.Item>
            )}
        />
    </div>)
}

export default ArticleList