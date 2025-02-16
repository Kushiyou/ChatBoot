const BASE_URL = 'http://localhost:6699/'

const evtSource = (url)=>{
    return new EventSource(`${ BASE_URL }${url}`)
};

export default evtSource;