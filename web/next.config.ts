import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'
import { parseChangelog } from './src/lib/release'

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

function readAppVersion() {
    try {
        const version = readFileSync(join(projectRoot, 'VERSION'), 'utf-8').trim()
        return version || '0.0.0'
    } catch {
        return '0.0.0'
    }
}

const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || readAppVersion()
let appReleases = '[]'
try {
    appReleases = JSON.stringify(parseChangelog(readFileSync(join(projectRoot, 'CHANGELOG.md'), 'utf-8')))
} catch {}

const nextConfig: NextConfig = {
    allowedDevOrigins: [
        '127.0.0.1',
        '10.*.*.*',
        '172.16.*.*',
        '172.17.*.*',
        '172.18.*.*',
        '172.19.*.*',
        '172.20.*.*',
        '172.21.*.*',
        '172.22.*.*',
        '172.23.*.*',
        '172.24.*.*',
        '172.25.*.*',
        '172.26.*.*',
        '172.27.*.*',
        '172.28.*.*',
        '172.29.*.*',
        '172.30.*.*',
        '172.31.*.*',
        '192.168.*.*',
    ],
    env: {
        NEXT_PUBLIC_APP_VERSION: appVersion,
        NEXT_PUBLIC_APP_RELEASES: appReleases,
    },
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

export default nextConfig
