import { resolve } from 'path'
export const ENTRY_URL = 'http://www.ruanyifeng.com/blog/weekly/'

const getFilePath = filename => resolve(process.cwd(), 'data', filename)

export const ARTICAL_PATH = getFilePath('articleList.json')
export const FILE_PATH_MAP = {
    工具: getFilePath('toolList.json'),
    软件: getFilePath('softwareList.json'),
    教程: getFilePath('lessonList.json'),
    资源: getFilePath('resourceList.json'),
}
export const TARGET_SECTION_LIST = Object.keys(FILE_PATH_MAP)
