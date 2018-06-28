import invariant from 'invariant'
/*
    postMode : x-www-form \ json
*/
export default function(config) {
    return (url, { ...options }) => {
        if(typeof(config) == 'function') {
            config = config()
        }
        const { baseUrl, headers, postMode } = config

        invariant(!!baseUrl,`Fetch需要传入一个baseUrl配置项`)
        
        // initial
        options.headers = {}

        // url things
        if(baseUrl[baseUrl.length-1] == '/') {
            url = baseUrl + url
        }else{
            url = baseUrl + '/' + url            
        }

        options.credentials = 'include'
        // method things
        if (!options.method) options.method = "GET"
        options.method = options.method.toUpperCase()
        if (options.method === 'POST' || options.method === 'PUT') {
            options = bodyEncode(postMode)(options)
        }
        if (options.query) {
            url = url + transformQuery(options.query)
        }
        if (headers) {
            options.headers = { ...options.headers, ...headers }
        }
        return fetch(url, options)
            .then(checkStatus)
            .then(parseJSON)
            .catch(err => err.message)
    }
}

function parseJSON(response) {
    return response.json()
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }else{
        throw Error(response.status+','+response.statusText)
    }
}

function transformQuery(query) {
    let queryStr = '?'
    for (let k in query) {
        if (query.hasOwnProperty(k)) {
            queryStr += k
            queryStr += '='
            queryStr += query[k]
            queryStr += '&'
        }
    }
    return queryStr.slice(0, -1)
}

function bodyEncode(mode){
    return (options) => {
        if(mode == 'json') {
            options.headers = { ...options.headers, "Content-Type": "application/json" } 
            options.body = JSON.stringify(options.body)
        }else{
            options.headers = { ...options.headers, "Content-Type": 'application/x-www-form-urlencoded' } 
            options.body = xwwwformBody(options.body)
        }
        return options
    }
    function xwwwformBody(body) {
        const postdata = new FormData()
        for (let k in body) {
            if (body.hasOwnProperty(k)) {
                postdata.append(k, body[k])
            }
        }
        return postdata
    }
}

