import fs from 'fs'
import os from 'os'
import path from 'path'




const configPath = path.join(os.homedir(), '.apex', 'config.json')
export function saveToken(token) {
    fs.mkdirSync(path.dirname(configPath), { recursive: true })
    fs.writeFileSync(configPath, JSON.stringify({ token }))
}

export function getToken() {
    if (!fs.existsSync(configPath)) return null
    return JSON.parse(fs.readFileSync(configPath)).token
}