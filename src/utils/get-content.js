import fs from 'fs'
import { parallel } from './request.js'
import cheerio from 'cheerio'
import requireJson from './require-json.js'

import { FILE_PATH_MAP, TARGET_SECTION_LIST, ARTICAL_PATH } from '../const.js'
import _ from 'lodash'
import { accessFile } from './utils.js'

/**
 * 根据 html 获取各个章节的内容
 * @param {string} html html
 * @return {object} { 工具: [], 文章: [] }
 */
async function getSectionContentByHtml (html) {
    try {
        const $ = cheerio.load(html, { decodeEntities: false })
        const result = {}
        $('#main-content h2').each((index, el) => {
            const sectionTitle = $(el).text()
            if (!TARGET_SECTION_LIST.includes(sectionTitle)) {
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
    } catch (e) {
        console.error(e)
        return {}
    }
}

/**
 * 根据 url 列表获取对应的内容列表
 * @param {Array} urlList url 列表
 * @return {Array} [ { 工具: [], 文章: [] } ]
 */
async function getContentListByUrlList (urlList) {
    const result = TARGET_SECTION_LIST.reduce((acc, cur) => {
        acc[cur] = []
        return acc
    }, {})
    const contentListPromise = (await parallel(urlList))
        .map(({ value = '' }) => value)
        .map(html => {
            if (!html) { return {} }
            return getSectionContentByHtml(html)
        })
    const contentList = await Promise.all(contentListPromise)
    contentList.forEach(content => {
        Object.entries(content).forEach(([ sectionTitle, sectionContentList ]) => {
            result[sectionTitle].push(sectionContentList)
        })
    })
    return result
}

async function writeResult (result) {
    const contentListPromise = Object.entries(result).map(([ key, value ]) => {
        const writeFile = async function () {
            const filePath = FILE_PATH_MAP[key]
            const exist = await accessFile(filePath)
            const currentList = exist ? requireJson(filePath) : []
            currentList.unshift(...value.reverse())
            fs.writeFileSync(filePath, JSON.stringify(currentList, null, 4))
        }
        return writeFile()
    })
    return Promise.all(contentListPromise)
}

export default async function (urlList, currencyCount) {
    const subList = _.chunk(urlList, currencyCount)
    const processedUrlList = []
    await subList.reduce((promise, list, index) => {
        return promise.then(() => {
            return getContentListByUrlList(list).then(result => {
                return writeResult(result)
            }).then(() => {
                processedUrlList.push(...list)
            })
        })
    }, Promise.resolve()).finally(() => {
        const articleList = requireJson(ARTICAL_PATH)
        articleList.unshift(...processedUrlList.reverse())
        fs.writeFileSync(ARTICAL_PATH, JSON.stringify(articleList, null, 4))
    })
}
