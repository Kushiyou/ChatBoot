const BASE_URL = 'http://localhost:6699/';

const Request_POST = (url,data)=>{
    let URL = `${BASE_URL}${url}`;
    let resData = fetch(URL,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({data:data}),
    }).then(res=>{
        return res.json();
    }).then(json=>{
        return json
    })

    return Promise.resolve(resData);
}

export default Request_POST;