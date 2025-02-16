const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express();
import OpenAi_Chat from './OpenAI/OpenAI';
//配置跨域
app.use(cors())
const port = '6699';
let DeepSeekRequestKeyWord:string
// 解析application/json数据 
app.use(bodyParser.json()); 
// 解析application/x-www-form-urlencoded数据 
app.use(bodyParser.urlencoded({ extended: false }));

// OpenAi_Chat('你好，你是谁？')
app.post('/chat',(req:any,res:any)=>{
    const value:string = req.body
    console.log(req.body);
    res.send(JSON.stringify({
        status:200,
        data:'OK'
    }))
    DeepSeekRequestKeyWord = req.body.data;
})
//SSE
app.get('/api/sse',(req:any,res:any)=>{
    OpenAi_Chat(DeepSeekRequestKeyWord).then(DeepSeekRespone=>{
        res.writeHead(200,{
            'Content-Type':'text/event-stream',
        })
        let arr = DeepSeekRespone.split('')
        let current = 0
        let timer = setInterval(()=>{
            if(current < arr.length){
                res.write(`data:${arr[current]}\n\n`)
                current++
            }else{
                res.write(`event: isEnd\n`)
                res.write(`data: OK\n\n`)
                clearInterval(timer)
            }
        },50)
    })
})

app.listen(port, () => {
    console.log(`express 服务器已经启动`)
  })