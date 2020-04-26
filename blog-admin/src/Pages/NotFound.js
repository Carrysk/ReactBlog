import React, { useState, useEffect } from 'react'
import '../static/css/pages/NotFound.css'

export default props => {
    const [returnHommeTime, setReturnHomeTime] = useState(3)

    useEffect(() => {
        let timer = setTimeout(() => {
            let curTime = returnHommeTime - 1;
            if (curTime === 0) {
                backToHome();
            } else {
                setReturnHomeTime(returnHommeTime - 1);
            }

            clearTimeout(timer);
            timer = null;
        }, 1000)
    }, [returnHommeTime])

    const backToHome = () => {
        props.history.push('/')
        return;
    }
    return (<div className="not-found">
        <p>404 NOT FOUND</p>
        <p className="not-found-p">
            <span className="not-found-timer">{returnHommeTime}</span>
            秒后自动跳转到
            <span className="not-found-home" onClick={() => backToHome()}>首页</span>
        </p>
    </div>)
}