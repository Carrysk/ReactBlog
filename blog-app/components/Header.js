import React, { useState, useEffect } from 'react'
import '../public/style/components/header.css'
import { useRouter } from 'next/router'
import { Row, Col, Menu, Icon } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'


const Header = () => {
    const [navArray, setNavArray] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios(servicePath.getTypeInfo).then(serverInfo => {
                if (serverInfo.data.data) {
                    return serverInfo.data.data
                }
            })
            setNavArray(res)
        }
        fetchData();
    }, [])

    const changeMenu = e => {
        router.push('/list?id=' + e.key)
    }
    return (<>
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={13}>
                    <span className="header-logo" onClick={() => router.push('/')}>BLOG</span>
                    <span className="header-txt">一些关于Carrysk</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={changeMenu}>
                        {
                            navArray.map(item => (
                                <Menu.Item key={item.id}>
                                    <Icon type={item.icon} />
                                    {item.typeName}
                                </Menu.Item>
                            ))
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    </>)
}

export default Header