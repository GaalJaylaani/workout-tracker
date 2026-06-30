import {getToken} from '../utils/token.js'

export function plateauCommand(program) {
    program
        .command('plateau-assess')
        .option('--userid <userid>', 'User ID')
        
        .action(async (options) => {
        const res = await fetch(`http://localhost:3000/plateau/assess/${options.userid}`, {
        method: 'POST',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
        const data = await res.json()
        console.log('Assessment:', JSON.stringify(data, null, 2))
    })

    program
        .command('plateau-history')
        .option('--userid <userid>', 'Userid')
        .action(async (options) => {
        const res = await fetch(`http://localhost:3000/plateau/${options.userid}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
        const data = await res.json()
        console.log(JSON.stringify(data))
    })
}

