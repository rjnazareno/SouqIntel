import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))

const commands = [
  { name: 'server', args: ['--prefix', 'server', 'run', 'dev'] },
  { name: 'client', args: ['--prefix', 'client', 'run', 'dev'] }
]

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const children = []
let shuttingDown = false

const stopAll = (signal = 'SIGTERM') => {
  if (shuttingDown) return
  shuttingDown = true

  children.forEach((child) => {
    if (!child.killed) child.kill(signal)
  })
}

commands.forEach(({ name, args }) => {
  const child = spawn(npmCommand, args, {
    cwd: rootDir,
    env: process.env,
    shell: false,
    stdio: ['inherit', 'pipe', 'pipe']
  })

  children.push(child)

  child.stdout.on('data', (data) => {
    process.stdout.write(`[${name}] ${data}`)
  })

  child.stderr.on('data', (data) => {
    process.stderr.write(`[${name}] ${data}`)
  })

  child.on('exit', (code, signal) => {
    if (shuttingDown) return

    const reason = signal ? `signal ${signal}` : `code ${code}`
    console.log(`[${name}] exited with ${reason}`)
    stopAll()
    process.exit(code ?? 1)
  })
})

process.on('SIGINT', () => {
  stopAll('SIGINT')
  process.exit(0)
})

process.on('SIGTERM', () => {
  stopAll('SIGTERM')
  process.exit(0)
})
