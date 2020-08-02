import http from 'http'

function request (url) {
    return new Promise((resolve, reject) => {
        const req = http.request(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
        }, res => {
            res.setEncoding('utf8')
            let text = ''
            res.on('data', chunk => {
                text += chunk
            })
            res.on('end', () => {
                resolve(text)
            })
        })
        req.on('error', err => {
            reject(err)
        })
        req.end()
    })
}

export default request

export function parallel (urlList) {
    return Promise.allSettled(urlList.map(url => request(url)))
}
