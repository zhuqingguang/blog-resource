import requireJson from './utils/require-json.js'
import _ from 'lodash'
import { FILE_PATH_MAP } from './const.js'

const hasRepetitionList = []
Object.entries(FILE_PATH_MAP).forEach(([ key, path ]) => {
    const list = requireJson(path)
    const result = hasRepetition(list)
    if (result) {
        hasRepetitionList.push(key)
    }
})

if (hasRepetitionList.length) {
    console.log('有重复的元素', hasRepetitionList.join())
} else {
    console.log('All is right')
}
function hasRepetition (list) {
    list = _.flatten(list)
    const set = new Set()
    list.forEach(item => {
        set.add(item.name)
    })
    console.log('set size', set.size)
    console.log('list length', list.length)
    return set.size !== list.length
}
