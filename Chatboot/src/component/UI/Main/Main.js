import React, {useEffect, useState} from 'react';
import classes from './Main.module.css'
import { UserOutlined, LoadingOutlined  } from '@ant-design/icons';
import { Input, Avatar, Spin } from 'antd';
import Request_POST from "../../../tool/Request";
import evtSource from "../../../tool/SSE";
const { TextArea } = Input;

const Main = () => {
    const [textArea,setTextArea] = useState('');
    const [isDisabled, setDisabled] = useState(false);
    //聊天数组
    const [chatHistory, setChatHistory] = useState([]);
    useEffect(() => {})
    //获取并设置需要发送的聊天内容
    const sendMessage = (e) => {
        //setTextArea(e.target.value.trim());
        setDisabled(true)
        Request_POST('chat',textArea).then((res)=>{
            if(res.status === 200 && res.data === 'OK'){
                //请求成功
                console.log('请求成功');
                let resObj = {
                    sendData:{data:textArea},
                    respondData:{data:''}
                }
                /*let tempArr = {
                    data:textArea
                }*/
                setChatHistory([...chatHistory,resObj]);
                setTextArea('');
                //打开SSE
                //SSEHandler()
                //创建一个临时对象
                /*let tempObj = {
                    data:''
                }*/
                //连接sse
                setTimeout(()=>{
                    let sse = evtSource('api/sse')
                    sse.addEventListener('message', (e) => {
                        resObj.respondData.data += e.data;
                        setChatHistory([...chatHistory,resObj]);
                    })
                    //监听是否传输完毕
                    sse.addEventListener('isEnd', (e) => {
                        if(e.data === 'OK'){
                            setDisabled(false)
                        }
                    })
                },0)
            }
        })
    }

    //连接sse函数
    /*const SSEHandler = () => {
        //创建一个临时对象
        let tempObj = {
            data:''
        }
        //连接sse
        console.log(chatHistory,'chatHistory');
        let sse = evtSource('api/sse')
        sse.addEventListener('message', (e) => {
            tempObj.data += e.data;
            setChatHistory([...chatHistory,tempObj]);
        })
        //监听是否传输完毕
        sse.addEventListener('isEnd', (e) => {
            if(e.data === 'OK'){
                setDisabled(false)
            }
        })
    }*/
    return (
        <div className={classes.Main}>
            <div className={classes.Setting}>
                新对话
            </div>
            <div className={classes.Chat}>
                <div className={classes.Message}>
                    {
                        chatHistory.length>0?chatHistory.map((item,index)=>{
                            return (
                                <div className={classes.Content} key={index}>
                                    <div className={classes.ContentTxt_Right}>
                                        <Avatar className={classes.Ava} shape="square" icon={<UserOutlined/>} size="small"/>
                                        <p className={classes.Popover_Right}>
                                            {item.sendData.data}
                                        </p>
                                    </div>
                                    <div className={classes.ContentTxt_Left}>
                                        <Avatar className={classes.Ava} shape="square" size="small">DS</Avatar>
                                        {
                                            item.respondData.data ?
                                                <p className={classes.Popover_Left}>
                                                    {item.respondData.data}
                                                </p>:
                                            <Spin indicator={<LoadingOutlined spin/>}/>
                                        }
                                    </div>
                                </div>
                            )
                        }) : <h1 className={classes.Warn}>请开始和我聊天吧~</h1>
                    }
                </div>
                <div className={classes.Input}>
                    <TextArea
                        rootClassName={classes.TextArea}
                        style={{
                            height: 100,
                            resize: 'none',
                        }}
                        disabled={isDisabled}
                        rows={4}
                        placeholder="开始与DeepSeek聊天"
                        showCount={true}
                        value={textArea}
                        onChange={e => setTextArea(e.target.value.trim())}
                        onPressEnter={sendMessage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Main;