import { saveToken } from "../utils/token.js"
import { Command } from "commander"

export function loginCommand(program) {
    program
        .command('login')
        .option('--email <email>', 'your email')
        .option('--password <password>', 'your password')
        .action(async (options) => {
        const res = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: options.email, password: options.password })
    })
        const data = await res.json()
        saveToken(data.data.session.token)
        console.log('Logged in successfully')
    })
}