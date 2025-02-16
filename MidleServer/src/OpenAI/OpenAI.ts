const OpenAI = require('openai');
const apiKey = require('./key.json');


const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: apiKey.key
});

const OpenAi_Chat = async (content:string) => {
    const completion  = await openai.chat.completions.create({
        messages: [{ role: "system", content: content}],
        model: "deepseek-chat",
    })
    console.log(completion.choices[0].message.content)
    return completion.choices[0].message.content
}
export default OpenAi_Chat;