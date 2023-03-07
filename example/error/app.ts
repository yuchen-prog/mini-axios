import axios from "../../src";

axios({
    method: 'get',
    url: '/error/get1'
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err.message);
    console.log(err.request);
})


axios({
    method: 'get',
    url: '/error/get'
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err.message);
})

axios({
    method: 'get',
    url: '/error/timeout',
    timeout: 2000
}).then((res) => {
    console.log(res)

}).catch((e) => {
    console.log(e.message)
    console.log(e.code)
})