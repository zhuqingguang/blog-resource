import fs from 'fs'
export default function requireJson (path) {
    try {
        fs.accessSync(path)
        const res = fs.readFileSync(path, { encoding: 'utf-8' })
        return JSON.parse(res)
    } catch (e) {
        console.error(e)
        return {}
    }
}
