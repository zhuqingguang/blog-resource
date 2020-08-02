import request from './utils/request.js'
import cheerio from 'cheerio'
import { ENTRY_URL, ARTICAL_PATH } from './const.js'
import requireJson from './utils/require-json.js'
import getContent from './utils/get-content.js'

run()

async function run () {
    console.time('Process')
    const html = await request(ENTRY_URL)
    const blogList = getWeeklyBlogList(html)
    await getContent(blogList, 10)
    console.timeEnd('Process')
}
function getWeeklyBlogList (html) {
    const $ = cheerio.load(html)
    const aList = $('#alpha-inner .module-content .module-list .module-list-item a')
    const result = []
    aList.each((index, a) => {
        result.push($(a).attr('href'))
    })

    const articleList = requireJson(ARTICAL_PATH)
    return result.reverse().slice(articleList.length)
}
