let auth = null;
let user = null;
let role = null;
const url = 'http://localhost:8081';

async function getData(path=''){
    let addr = url + path;
    const response = await fetch(addr, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            'Access-Control-Allow-Origin': url,
            'authorization': sessionStorage.getItem("auth")
        },
        //authorization: sessionStorage.getItem("auth"),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body data type must match "Content-Type" header
    });
    return await response.json();
}

async function getDataWithParams(path='', data){
    let addr = url + path;
    let urladdr = new URL(addr);
    urladdr.search = data;
    const response = await fetch(urladdr, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            'Access-Control-Allow-Origin': url,
            'authorization': sessionStorage.getItem("auth")
        },
        //authorization: sessionStorage.getItem("auth"),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body data type must match "Content-Type" header
    });
    return await response.json();
}

async function postData(path = '', data = {}) {
    let addr = url + path;
    const response = await fetch(addr, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': url,
            'authorization': sessionStorage.getItem("auth")
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response;
    // parses JSON response into native JavaScript objects
}