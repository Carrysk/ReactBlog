import { Avatar, Divider } from "antd"
import '../public/style/components/auther.css'

const Auther = () => {
    return (<div className="auther-div comm-box">
        <div><Avatar size={100} src="./favicon.ico"/></div>
        <div className="auther-introduction">
            咱也不知道这是什么网站，先写着吧，主要目的是练习练习react！！！！GO AHEAD！！！
            <Divider>社交账号</Divider>
            <Avatar size={28} icon="github" className="account" />
            <Avatar size={28} icon="qq" className="account" />
            <Avatar size={28} icon="wechat" className="account" />
        </div>
    </div>)
}

export default Auther