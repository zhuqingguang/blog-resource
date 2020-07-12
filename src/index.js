import fs from 'fs'
import cheerio from 'cheerio'
import request from './utils/request.js'
import requireJson from './utils/require.js'
import { ENTRY_URL, FILE_PATH, TARGET_SECTION, ARTICAL_PATH } from './const.js'

request(ENTRY_URL).then(html => {
    const result = {}
    const processedUrlList = []
    const blogList = getWeeklyBlogList(html)
    blogList.reduce((promise, url) => {
        return promise.then(() => {
            return getSectionListByUrl(url).then(listResult => {
                processedUrlList.push(url)
                Object.entries(listResult).forEach(([ sectionTitle, sectionList ]) => {
                    if (!result[sectionTitle]) {
                        result[sectionTitle] = []
                    }
                    result[sectionTitle].push(sectionList)
                })
            })
        })
    }, Promise.resolve()).finally(() => {
        Object.entries(result).forEach(([ key, value ]) => {
            const filePath = FILE_PATH[key]
            fs.access(filePath, (error) => {
                let currentList = []
                if (!error) {
                    currentList = requireJson(filePath)
                }
                currentList.unshift(...result[key])
                fs.writeFileSync(filePath, JSON.stringify(currentList, null, 4))
            })
        })
        const articleList = requireJson(ARTICAL_PATH)
        articleList.push(...processedUrlList)
        fs.writeFileSync(ARTICAL_PATH, JSON.stringify(articleList, null, 4))
    })
})

function getWeeklyBlogList (html) {
    const $ = cheerio.load(html)
    const aList = $('#alpha-inner .module-content .module-list .module-list-item a')
    const result = []
    aList.each((index, a) => {
        result.push($(a).attr('href'))
    })

    const articleList = requireJson(ARTICAL_PATH)
    return result.slice(articleList.length)
}

/**
 * 获取指定的章节内容
 * @param {string} html html 文档
 * @return {object} { 工具: [], 文章: [] }
 */
function getSectionList (html) {
    const $ = cheerio.load(html, { decodeEntities: false })
    const result = {}
    $('#main-content h2').each((index, el) => {
        const sectionTitle = $(el).text()
        if (!TARGET_SECTION.includes(sectionTitle)) {
            return
        }
        const list = []
        const pList = $(el).nextUntil('h2')
        let cache = {} // { name, url, imgSrc, description }
        pList.each((index, el) => {
            const target = $(el)
            const html = target.html()
            if (/^\d{1,3}、/.test(html)) {
                // 标题,如 1、
                cache.name && list.push(cache)
                cache = {}
                const a = target.find('a')
                cache.url = a.attr('href')
                cache.name = a.text()
            } else if (/<img/.test(html)) {
                // 图片
                cache.imgSrc = target.find('img').attr('src')
            } else {
                // 描述
                cache.description = target.text()
            }
        })
        cache.name && list.push(cache)
        result[sectionTitle] = list
    })
    return result
}

// 根据 url 获取工具内容
async function getSectionListByUrl (url) {
    const html = await request(url)
    try {
        const sectionList = getSectionList(html)
        return sectionList
    } catch (e) {
        console.error(e)
        return []
    }
}
