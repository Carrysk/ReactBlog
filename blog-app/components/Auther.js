import { Avatar, Divider, Popover } from "antd"
import { GithubFilled, QqCircleFilled, LoadingOutlined, WechatFilled } from '@ant-design/icons'
import '../public/style/components/auther.css'

const Auther = () => {
    return (<div className="auther-div comm-box">
        <div><Avatar shape="square" size={100} icon={<LoadingOutlined />} /></div>
        <div className="auther-introduction">
            咱也不知道这是什么网站，先写着吧，主要目的是练习REACT/NEXT/EGG ！GO AHEAD！！！
            <Divider>社交账号</Divider>
            <Popover content={<div>https://github.com/Carrysk</div>} ><Avatar size={28} icon={<GithubFilled />} className="account" /></Popover>
            <Popover content={<div>QQ:123112796</div>} ><Avatar size={28} icon={<QqCircleFilled />} className="account" /></Popover>
            <Popover content={<div>WeChat:123112796</div>} ><Avatar size={28} icon={<WechatFilled />} className="account" /></Popover>
        </div>
    </div>)
}

export default Auther