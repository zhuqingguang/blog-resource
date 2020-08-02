import fs from 'fs'
/**
 * 读取文件
 */

export function accessFile (...params) {
    return new Promise((resolve) => {
        fs.access(...params, error => {
            if (error) { resolve(false) }
            resolve(true)
        })
    })
}
